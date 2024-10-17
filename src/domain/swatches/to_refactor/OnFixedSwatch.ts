// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {AbstractWithBackgroundsSwatch} from "./AbstractWithBackgroundsSwatch";
import {PaletteChoice} from "../PaletteChoice";
import {HueChromaToneCoordinates, Tone} from "../../color_space/hct";
import {PrimarySecondaryTertiaryPalette} from "./PrimarySecondaryTertiaryPalette";
import {ContrastLevel, ContrastLevelToContrastRatio} from "../../contrast";
import {ThemePair} from "../ThemePair";
import {Backgrounds} from "../Backgrounds";
import {ThemeMode} from "../ThemeMode";
import {Variant} from "../Variant";
import {CorePalettes} from "../CorePalettes";
import {FixedSwatch} from "./FixedSwatch";

export class OnFixedSwatch extends AbstractWithBackgroundsSwatch
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
	
	private constructor(palette: PrimarySecondaryTertiaryPalette, contrast_level_to_contrast_ratio: NonNullable<ContrastLevelToContrastRatio>, ordinary_tone: NonNullable<Tone>, monochrome_tone: NonNullable<Tone>, primary_background: NonNullable<FixedSwatch>, secondary_background: NonNullable<FixedSwatch>)
	{
		super(palette, false, contrast_level_to_contrast_ratio, new ThemePair(Backgrounds.with_primary_background(primary_background), Backgrounds.with_primary_background(primary_background)))
		
		this.#ordinary_tone = ordinary_tone
		this.#monochrome_tone = monochrome_tone
	}
	
	public override tone(this: NonNullable<this>, _theme_mode: ThemeMode, variant: Variant, _palettes: NonNullable<CorePalettes>, _source_color: NonNullable<HueChromaToneCoordinates>, _contrast_level: ContrastLevel): NonNullable<Tone>
	{
		switch (variant)
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
}
