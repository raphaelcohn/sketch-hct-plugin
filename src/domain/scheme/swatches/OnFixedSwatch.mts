// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {PaletteChoice} from "../palettes/PaletteChoice.mjs";
import {Tone} from "../../color_space/hct/Tone.mjs";
import type {PrimarySecondaryTertiaryPalette} from "./PrimarySecondaryTertiaryPalette.mts";
import {ContrastLevelToContrastRatio} from "../../contrast/ContrastLevelToContrastRatio.mjs";
import type {ContrastRatio} from "../../contrast/ContrastRatio.mts";
import {ThemePair} from "../ThemePair.mjs";
import {Variant} from "../palettes/Variant.mjs";
import {FixedSwatch} from "./FixedSwatch.mjs";
import {AbstractOnSwatch} from "./AbstractOnSwatch.mjs";
import type {Scheme} from "./Scheme.mts";
import type {ViewingConditions} from "../ViewingConditions.mts";

export class OnFixedSwatch extends AbstractOnSwatch<FixedSwatch>
{
	public static readonly OnPrimaryFixed:          NonNullable<OnFixedSwatch> = OnFixedSwatch.#normal (PaletteChoice.Primary,   Tone.T10, Tone.T100, FixedSwatch.PrimaryFixedDim,   FixedSwatch.PrimaryFixed  )
	public static readonly OnPrimaryFixedVariant:   NonNullable<OnFixedSwatch> = OnFixedSwatch.#variant(PaletteChoice.Primary,   Tone.T30, Tone.T90,  FixedSwatch.PrimaryFixedDim,   FixedSwatch.PrimaryFixed  )
	public static readonly OnSecondaryFixed:        NonNullable<OnFixedSwatch> = OnFixedSwatch.#normal (PaletteChoice.Secondary, Tone.T10, Tone.T10,  FixedSwatch.SecondaryFixedDim, FixedSwatch.SecondaryFixed)
	public static readonly OnSecondaryFixedVariant: NonNullable<OnFixedSwatch> = OnFixedSwatch.#variant(PaletteChoice.Secondary, Tone.T30, Tone.T25,  FixedSwatch.SecondaryFixedDim, FixedSwatch.SecondaryFixed)
	public static readonly OnTertiaryFixed:         NonNullable<OnFixedSwatch> = OnFixedSwatch.#normal (PaletteChoice.Tertiary,  Tone.T10, Tone.T100, FixedSwatch.TertiaryFixedDim,  FixedSwatch.TertiaryFixed )
	public static readonly OnTertiaryFixedVariant:  NonNullable<OnFixedSwatch> = OnFixedSwatch.#variant(PaletteChoice.Tertiary,  Tone.T30, Tone.T30,  FixedSwatch.TertiaryFixedDim,  FixedSwatch.TertiaryFixed )
	
	static #normal(palette: PrimarySecondaryTertiaryPalette, ordinary_tone: NonNullable<Tone>, monochrome_tone: NonNullable<Tone>, primary_background: NonNullable<FixedSwatch>, secondary_background: NonNullable<FixedSwatch>): NonNullable<OnFixedSwatch>
	{
		return new OnFixedSwatch(palette, ContrastLevelToContrastRatio.Mapping_45_7_11_21, ordinary_tone, monochrome_tone, primary_background, secondary_background)
	}
	
	static #variant(palette: PrimarySecondaryTertiaryPalette, ordinary_tone: NonNullable<Tone>, monochrome_tone: NonNullable<Tone>, primary_background: NonNullable<FixedSwatch>, secondary_background: NonNullable<FixedSwatch>): NonNullable<OnFixedSwatch>
	{
		return new OnFixedSwatch(palette, ContrastLevelToContrastRatio.Mapping_3_45_7_11, ordinary_tone, monochrome_tone, primary_background, secondary_background)
	}
	
	readonly #ordinary_tone: NonNullable<Tone>
	readonly #monochrome_tone: NonNullable<Tone>
	readonly #secondary_background: NonNullable<FixedSwatch>
	
	private constructor(palette: PrimarySecondaryTertiaryPalette, contrast_level_to_contrast_ratio: NonNullable<ContrastLevelToContrastRatio>, ordinary_tone: NonNullable<Tone>, monochrome_tone: NonNullable<Tone>, primary_background: NonNullable<FixedSwatch>, secondary_background: NonNullable<FixedSwatch>)
	{
		super(palette, false, contrast_level_to_contrast_ratio, new ThemePair(primary_background, primary_background))
		
		this.#ordinary_tone = ordinary_tone
		this.#monochrome_tone = monochrome_tone
		this.#secondary_background = secondary_background
	}
	
	public override raw_tone(this: NonNullable<this>, scheme: NonNullable<Scheme>, _viewing_conditions: NonNullable<ViewingConditions>): NonNullable<Tone>
	{
		switch (scheme.variant)
		{
			case Variant.Ordinary:
				return this.#ordinary_tone
			
			case Variant.Monochrome:
				return this.#monochrome_tone
			
			case Variant.Fidelity:
				return this.#ordinary_tone
			
			default:
				throw new RangeError("variant is out of range")
		}
	}
	
	protected override raw_tone_adjusted_for_dual_backgrounds(this: NonNullable<this>, after_adjustment_for_primary_background_tone: NonNullable<Tone>, desired_contrast_ratio: NonNullable<ContrastRatio>, scheme: NonNullable<Scheme>, viewing_conditions: NonNullable<ViewingConditions>): NonNullable<Tone>
	{
		const answer = after_adjustment_for_primary_background_tone
		
		const background_1 = this.primary_background(viewing_conditions.theme_mode)
		const background_2 = this.#secondary_background
		
		const background_tone_1 = background_1.raw_tone(scheme, viewing_conditions)
		const background_tone_2 = background_2.raw_tone(scheme, viewing_conditions)
		
		const upper = background_tone_1.maximum(background_tone_2)
		const lower = background_tone_1.minimum(background_tone_2)
		
		if (upper.contrast_ratio(answer) >= desired_contrast_ratio && lower.contrast_ratio(answer) >= desired_contrast_ratio)
		{
			return answer
		}
		
		const light_option_preferred = background_tone_1.prefers_light_foreground() || background_tone_2.prefers_light_foreground()
		
		// The darkest light tone that satisfies the desired ratio (null if not possible).
		const light_option = upper.lighter(desired_contrast_ratio)
		
		if (light_option_preferred)
		{
			return light_option.into_range()
		}
		
		// The lightest dark tone that satisfies the desired ratio.
		const dark_option = lower.darker(desired_contrast_ratio)
		
		if (light_option.is_out_of_range)
		{
			return dark_option.into_range()
		}
		else if (dark_option.is_out_of_range)
		{
			return light_option.into_range()
		}
		else
		{
			return dark_option.into_range()
		}
	}
}
