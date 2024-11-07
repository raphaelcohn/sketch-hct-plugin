// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import type {WithBackgroundSwatch} from "../WithBackgroundSwatch.mjs";
import {ToneDelta} from "../../../color_space/hct/ToneDelta.mjs";
import {TonePairPolarity} from "./TonePairPolarity.mjs";
import type {ContainerSwatch} from "../ContainerSwatch.mjs";
import type {MainSwatch} from "../MainSwatch.mjs";
import type {FixedSwatch} from "../FixedSwatch.mjs";
import type {Scheme} from "../Scheme.mjs";
import type {ViewingConditions} from "../../ViewingConditions.mjs";
import type {Swatch} from "../Swatch.mjs";
import {choose_if_is_dark} from "../../ThemeMode.choose_if_is_dark.mjs";
import {Sign} from "../../../number/Sign.mjs";
import {is_decreasing} from "../../../contrast/ContrastLevel.is_decreasing.mjs";
import {Tone} from "../../../color_space/hct/Tone.mjs";
import {choose_if_sign_is_positive} from "../../../number/Sign.choose_if_sign_is_positive.mjs";
import type {ThemeMode} from "../../ThemeMode.mjs";
import {from_is_nearer} from "./TonePairPolarity.from_is_nearer.mjs";

/**
 * A constraint in tone distance between two background swatches.
 */
export class DualForegroundTonePair
{
	readonly #from: NonNullable<WithBackgroundSwatch>
	readonly #to: NonNullable<WithBackgroundSwatch>
	readonly #delta: ToneDelta
	readonly #polarity: TonePairPolarity
	readonly #stay_together: boolean
	
	private constructor(from: NonNullable<WithBackgroundSwatch>, to: NonNullable<WithBackgroundSwatch>, delta: ToneDelta, polarity: TonePairPolarity, stay_together: boolean)
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
	static for_container(from: NonNullable<ContainerSwatch>, to: NonNullable<MainSwatch>): NonNullable<DualForegroundTonePair>
	{
		return new DualForegroundTonePair(from, to, ToneDelta.Ten, TonePairPolarity.nearer, false)
	}
	
	/**
	 * @internal
	 * @param normal
	 * @param dim
	 */
	static for_fixed(normal: NonNullable<FixedSwatch>, dim: NonNullable<FixedSwatch>): NonNullable<DualForegroundTonePair>
	{
		return new DualForegroundTonePair(normal, dim, ToneDelta.Ten, TonePairPolarity.lighter, true)
	}
	
	execute(this: NonNullable<DualForegroundTonePair>, this_swatch: NonNullable<WithBackgroundSwatch>, scheme: NonNullable<Scheme>, viewing_conditions: NonNullable<ViewingConditions>, primary_background: NonNullable<Swatch>): NonNullable<Tone>
	{
		const theme_mode = viewing_conditions.theme_mode
		const contrast_level = viewing_conditions.contrast_level
		
		const background_tone = primary_background.tone(scheme, viewing_conditions)
		const [is_this_swatch_nearer, nearer, farther] = this.#nearer_and_farther(this_swatch, theme_mode)
		const expansion_direction = choose_if_is_dark(theme_mode, Sign.Positive, Sign.Negative)
		
		// 1st round: solve to min, each.
		
		const nearer_contrast = nearer.contrast_ratio_for_contrast_level(contrast_level)
		const farther_contrast = farther.contrast_ratio_for_contrast_level(contrast_level)
		
		const nearer_initial_tone = nearer.raw_tone(scheme, viewing_conditions)
		const farther_initial_tone = farther.raw_tone(scheme, viewing_conditions)
		
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
	
	#nearer_and_farther(this: NonNullable<this>, this_swatch: NonNullable<WithBackgroundSwatch>, theme_mode: ThemeMode): [boolean, NonNullable<WithBackgroundSwatch>, NonNullable<WithBackgroundSwatch>]
	{
		if (!DualForegroundTonePair.#are_equivalent_swatches(this_swatch, this.#from) && !DualForegroundTonePair.#are_equivalent_swatches(this_swatch, this.#to))
		{
			throw new RangeError("this_swatch is neither from nor to")
		}
		
		const from_is_nearer = this.#from_is_nearer(theme_mode)
		
		const nearer = from_is_nearer ? this.#from : this.#to
		const farther = from_is_nearer ? this.#to : this.#from
		
		const is_this_swatch_nearer = DualForegroundTonePair.#are_equivalent_swatches(this_swatch, nearer)
		return [is_this_swatch_nearer, nearer, farther]
	}
	
	static #are_equivalent_swatches(left: NonNullable<WithBackgroundSwatch>, right: NonNullable<WithBackgroundSwatch>): boolean
	{
		return Object.getPrototypeOf(left) === Object.getPrototypeOf(right)
	}
	
	#from_is_nearer(this: NonNullable<this>, theme_mode: ThemeMode): boolean
	{
		return from_is_nearer(this.#polarity, theme_mode)
	}
}
