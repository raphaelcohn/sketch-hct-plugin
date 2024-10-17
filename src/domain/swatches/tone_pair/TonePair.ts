// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {CorePalettes, IsBackgroundSwatch, Swatch, ThemeMode, Variant} from "../."
import {TonePairPolarity} from "./TonePairPolarity"
import {HueChromaToneCoordinates, Tone, ToneDelta} from "../../color_space/hct"
import {from_is_nearer} from "./TonePairPolarity.from_is_nearer"
import {choose_if_sign_is_positive, Sign} from "../../number";
import {choose_if_is_dark} from "../ThemeMode.choose_if_is_dark";
import {ContrastLevel, is_decreasing} from "../../contrast";
import {ContainerSwatch} from "../to_refactor/ContainerSwatch";
import {MainSwatch} from "../to_refactor/MainSwatch";

/**
 * A constraint in tone distance between two background swatches.
 */
export class TonePair
{
	readonly #from: NonNullable<ContainerSwatch>
	readonly #to: NonNullable<MainSwatch>
	readonly #delta: ToneDelta
	readonly #polarity: TonePairPolarity
	readonly #stay_together: boolean
	
	private constructor(from: NonNullable<ContainerSwatch>, to: NonNullable<MainSwatch>, delta: ToneDelta, polarity: TonePairPolarity, stay_together: boolean)
	{
		this.#from = from
		this.#to = to
		this.#delta = delta
		this.#polarity = polarity
		this.#stay_together = stay_together
	}
	
	/**
	 * @internal
	 * @param from
	 * @param to
	 */
	static for_container(from: NonNullable<ContainerSwatch>, to: NonNullable<MainSwatch>): NonNullable<TonePair>
	{
		return new TonePair(from, to, ToneDelta.Ten, TonePairPolarity.nearer, false)
	}
	
	execute<S extends Swatch>(this: NonNullable<TonePair>, this_swatch: NonNullable<S>, contrast_level: ContrastLevel, theme_mode: ThemeMode, variant: Variant, palettes: NonNullable<CorePalettes>, source_color: NonNullable<HueChromaToneCoordinates>, primary_background: NonNullable<Swatch>): NonNullable<Tone>
	{
		const background_tone = primary_background.tone(theme_mode, variant, palettes, source_color, contrast_level)
		const [is_this_swatch_nearer, nearer, farther] = this.#nearer_and_farther(this_swatch, theme_mode)
		const expansion_direction = choose_if_is_dark(theme_mode, Sign.Positive, Sign.Negative)
		
		// 1st round: solve to min, each.
		
		const nearer_contrast = nearer.contrast_ratio_for_contrast_level(contrast_level)
		const farther_contrast = farther.contrast_ratio_for_contrast_level(contrast_level)
		
		const nearer_initial_tone = nearer.tone(theme_mode, variant, palettes, source_color, contrast_level)
		const farther_initial_tone = farther.tone(theme_mode, variant, palettes, source_color, contrast_level)
		
		// If a color is good enough, it is not adjusted.
		let farther_tone = background_tone.find_suitable_foreground_if_this_background(farther_initial_tone, farther_contrast)
		let nearer_tone = background_tone.find_suitable_foreground_if_this_background(nearer_initial_tone, nearer_contrast)
		
		// If decreasing contrast, adjust color to the "bare minimum" that satisfies contrast.
		if (is_decreasing(contrast_level))
		{
			nearer_tone = background_tone.foreground(nearer_contrast)
			farther_tone = background_tone.foreground(farther_contrast)
		}
		
		const signed_delta = this.#delta.sign(expansion_direction)
		const delta_value = this.#delta.value
		if (farther_tone.difference(nearer_tone).sign(expansion_direction) >= delta_value)
		{
			// Good! Tones satisfy the constraint; no change needed.
		}
		else
		{
			// 2nd round: expand farther to match delta.
			farther_tone = nearer_tone.add_clamp_to_inclusive_minimum_and_inclusive_maximum(signed_delta)
			if (farther_tone.difference(nearer_tone).sign(expansion_direction) >= delta_value)
			{
				// Good! Tones now satisfy the constraint; no change needed.
			}
			else
			{
				// 3rd round: contract nearer to match delta.
				nearer_tone = farther_tone.subtract_clamp_to_inclusive_minimum_and_inclusive_maximum(signed_delta)
			}
		}
		
		function father_tone_max(): NonNullable<Tone>
		{
			return farther_tone.maximum(nearer_tone.add_clamp_to_inclusive_minimum_and_inclusive_maximum(signed_delta))
		}
		
		function father_tone_min(): NonNullable<Tone>
		{
			return farther_tone.minimum(nearer_tone.add_clamp_to_inclusive_minimum_and_inclusive_maximum(signed_delta))
		}
		
		// Avoids the 50-59 awkward zone.
		if (nearer_tone.is_in_awkward_zone_t50_to_t60())
		{
			// If `nearer` is in the awkward zone, move it away, together with `farther`.
			nearer_tone = choose_if_sign_is_positive(expansion_direction, Tone.T60, Tone.T49)
			farther_tone = choose_if_sign_is_positive(expansion_direction, father_tone_max, father_tone_min)()
		}
		else if (farther_tone.is_in_awkward_zone_t50_to_t60())
		{
			if (this.#stay_together)
			{
				nearer_tone = choose_if_sign_is_positive(expansion_direction, Tone.T60, Tone.T49)
				farther_tone = choose_if_sign_is_positive(expansion_direction, father_tone_max, father_tone_min)()
			}
			else
			{
				// nearer_tone not required to stay together.
				farther_tone = choose_if_sign_is_positive(expansion_direction, Tone.T60, Tone.T49)
			}
		}
		
		return is_this_swatch_nearer ? nearer_tone : farther_tone
	}
	
	#nearer_and_farther(this: NonNullable<this>, this_swatch: NonNullable<IsBackgroundSwatch>, theme_mode: ThemeMode): [boolean, NonNullable<IsBackgroundSwatch>, NonNullable<IsBackgroundSwatch>]
	{
		if (!TonePair.#are_equivalent_swatches(this_swatch, this.#from) && !TonePair.#are_equivalent_swatches(this_swatch, this.#to))
		{
			throw new RangeError("this_swatch is neither from nor to")
		}
		
		const from_is_nearer = this.#from_is_nearer(theme_mode)
		
		const nearer = from_is_nearer ? this.#from : this.#to
		const farther = from_is_nearer ? this.#to : this.#from
		
		const is_this_swatch_nearer = TonePair.#are_equivalent_swatches(this_swatch, nearer)
		return [is_this_swatch_nearer, nearer, farther]
	}
	
	static #are_equivalent_swatches(left: NonNullable<IsBackgroundSwatch>, right: NonNullable<IsBackgroundSwatch>): boolean
	{
		return Object.getPrototypeOf(left) === Object.getPrototypeOf(right)
	}
	
	#from_is_nearer(this: NonNullable<this>, theme_mode: ThemeMode): boolean
	{
		return from_is_nearer(this.#polarity, theme_mode)
	}
}
