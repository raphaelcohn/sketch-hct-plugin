// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {TonalPalettePair} from "../color_space/hct/TonalPalettePair";
import {TonalPalette} from "../color_space/hct";
import {CorePalettesSourceKeyColors} from "./CorePalettesSourceKeyColors";
import {PaletteChoice} from "./PaletteChoice";

export class CorePalettes
{
	readonly #primary: NonNullable<TonalPalettePair>
	readonly #secondary: NonNullable<TonalPalettePair>
	readonly #tertiary: NonNullable<TonalPalettePair>
	readonly #neutral: NonNullable<TonalPalettePair>
	readonly #neutral_variant: NonNullable<TonalPalettePair>
	readonly #error: NonNullable<TonalPalettePair>
	
	public constructor(primary: NonNullable<TonalPalettePair>, secondary: NonNullable<TonalPalettePair>, tertiary: NonNullable<TonalPalettePair>, neutral: NonNullable<TonalPalettePair>, neutral_variant: NonNullable<TonalPalettePair>, error: NonNullable<TonalPalettePair>)
	{
		this.#primary = primary
		this.#secondary = secondary
		this.#tertiary = tertiary
		this.#neutral = neutral
		this.#neutral_variant = neutral_variant
		this.#error = error
	}
	
	public static from_source_key_color(source_key_color: NonNullable<TonalPalette>): NonNullable<CorePalettes>
	{
		return new CorePalettes
		(
			source_key_color.primary(),
			source_key_color.secondary(),
			source_key_color.tertiary(),
			source_key_color.neutral(),
			source_key_color.neutral_variant(),
			TonalPalettePair.Error,
		)
	}
	
	public static from_source_key_colors(source_key_color: NonNullable<TonalPalette>, key_colors: CorePalettesSourceKeyColors): NonNullable<CorePalettes>
	{
		return new CorePalettes
		(
			source_key_color.primary(),
			(key_colors.secondary === undefined ? source_key_color.secondary() : key_colors.secondary.colourful_color_tones()),
			(key_colors.tertiary === undefined ? source_key_color.tertiary() : key_colors.tertiary.colourful_color_tones()),
			(key_colors.neutral === undefined ? source_key_color.neutral() : key_colors.neutral.neutral_color_tones()),
			(key_colors.neutral_variant === undefined ? source_key_color.neutral_variant() : key_colors.neutral_variant.variant_neutral_color_tones()),
			(key_colors.error === undefined ? TonalPalettePair.Error : key_colors.error.colourful_color_tones())
		)
	}
	
	public choose_palette(this: NonNullable<this>, palette_choice: PaletteChoice): NonNullable<TonalPalettePair>
	{
		switch (palette_choice)
		{
			case PaletteChoice.Primary:
				return this.primary
			
			case PaletteChoice.Secondary:
				return this.secondary
			
			case PaletteChoice.Tertiary:
				return this.tertiary
			
			case PaletteChoice.Neutral:
				return this.neutral
			
			case PaletteChoice.NeutralVariant:
				return this.slightly_more_colorful_than_neutral
			
			case PaletteChoice.Error:
				return this.error
			
			default:
				throw new RangeError("Invalid value of palette_choice")
		}
	}
	
	/// A colourful palette.
	public get primary(): NonNullable<TonalPalettePair>
	{
		return this.#primary
	}
	
	/// A less colourful palette than the colourful palette, but with the same hue.
	public get secondary(): NonNullable<TonalPalettePair>
	{
		return this.#secondary
	}
	
	/// A colourful palette but with a hue typically rotated clockwise by 60° to the colourful palette.
	public get tertiary(): NonNullable<TonalPalettePair>
	{
		return this.#tertiary
	}
	
	/// Usually not colorful at all, intended for background & surface colors.
	public get neutral(): NonNullable<TonalPalettePair>
	{
		return this.#neutral
	}
	
	/// Usually not colorful, but slightly more colorful than neutral; intended for backgrounds & surfaces.
	public get slightly_more_colorful_than_neutral(): NonNullable<TonalPalettePair>
	{
		return this.#neutral_variant
	}
	
	public get error(): NonNullable<TonalPalettePair>
	{
		return this.#error
	}
}
