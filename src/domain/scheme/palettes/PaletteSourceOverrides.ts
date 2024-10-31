// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {TonalPalette} from "../../color_space/hct"
import {DynamicScheme} from "@material/material-color-utilities";
import {TonalPalette as MaterialDesignTonalPalette} from "@material/material-color-utilities";
import {SourceColors} from "./SourceColors";

export class PaletteSourceOverrides
{
	readonly #secondary: TonalPalette | null
	readonly #tertiary: TonalPalette | null
	readonly #error: TonalPalette | null
	readonly #neutral: TonalPalette | null
	readonly #neutral_variant: TonalPalette | null
	
	public constructor
	(
		secondary: TonalPalette | null,
		tertiary: TonalPalette | null,
		error: TonalPalette | null,
		neutral: TonalPalette | null,
		neutral_variant: TonalPalette | null,
	)
	{
		this.#secondary = secondary
		this.#tertiary = tertiary
		this.#error = error
		this.#neutral = neutral
		this.#neutral_variant = neutral_variant
	}
	
	public static from_source_colors(source_colors: SourceColors): PaletteSourceOverrides
	{
		const { secondary, tertiary, error, neutral, neutral_variant } = source_colors
		return new PaletteSourceOverrides
		(
			secondary === null ? null : TonalPalette.from_srgb_space(secondary),
			tertiary === null ? null : TonalPalette.from_srgb_space(tertiary),
			error === null ? null : TonalPalette.from_srgb_space(error),
			neutral === null ? null : TonalPalette.from_srgb_space(neutral),
			neutral_variant === null ? null : TonalPalette.from_srgb_space(neutral_variant),
		)
	}
	
	public static_secondary(this: NonNullable<this>, is_content: boolean, source_color: NonNullable<TonalPalette>): NonNullable<TonalPalette>
	{
		if (this.#secondary === null)
		{
			return source_color.secondary(is_content)
		}
		else
		{
			return this.#secondary.container(is_content)
		}
	}
	
	public static_tertiary(this: NonNullable<this>, is_content: boolean, source_color: NonNullable<TonalPalette>): NonNullable<TonalPalette>
	{
		if (this.#tertiary === null)
		{
			return source_color.tertiary(is_content)
		}
		else
		{
			return this.#tertiary.container(is_content)
		}
	}
	
	public static_error(this: NonNullable<this>, is_content: boolean): NonNullable<TonalPalette>
	{
		if (this.#error === null)
		{
			return TonalPalette.Error
		}
		else
		{
			return this.#error.container(is_content)
		}
	}
	
	public static_neutral(this: NonNullable<this>, is_content: boolean, source_color: NonNullable<TonalPalette>): NonNullable<TonalPalette>
	{
		if (this.#neutral === null)
		{
			return source_color.neutral(is_content)
		}
		else
		{
			return this.#neutral.neutral(is_content)
		}
	}
	
	public static_neutral_variant(this: NonNullable<this>, is_content: boolean, source_color: NonNullable<TonalPalette>): NonNullable<TonalPalette>
	{
		if (this.#neutral_variant === null)
		{
			return source_color.neutral_variant(is_content)
		}
		else
		{
			return this.#neutral_variant.neutral_variant(is_content)
		}
	}
	
	public dynamic_secondary(this: NonNullable<this>, original: DynamicScheme): NonNullable<MaterialDesignTonalPalette>
	{
		if (this.#secondary === null)
		{
			return original.secondaryPalette
		}
		else
		{
			return this.#secondary.into_material_design_tonal_palette()
		}
	}
	
	public dynamic_tertiary(this: NonNullable<this>, original: DynamicScheme): NonNullable<MaterialDesignTonalPalette>
	{
		if (this.#tertiary === null)
		{
			return original.tertiaryPalette
		}
		else
		{
			return this.#tertiary.into_material_design_tonal_palette()
		}
	}
	
	public dynamic_error(this: NonNullable<this>, original: DynamicScheme): NonNullable<MaterialDesignTonalPalette>
	{
		if (this.#error === null)
		{
			return original.errorPalette
		}
		else
		{
			return this.#error.into_material_design_tonal_palette()
		}
	}
	
	public dynamic_neutral(this: NonNullable<this>, original: DynamicScheme): NonNullable<MaterialDesignTonalPalette>
	{
		if (this.#neutral === null)
		{
			return original.neutralPalette
		}
		else
		{
			return this.#neutral.into_material_design_tonal_palette()
		}
	}
	
	public dynamic_neutral_variant(this: NonNullable<this>, original: DynamicScheme): NonNullable<MaterialDesignTonalPalette>
	{
		if (this.#neutral_variant === null)
		{
			return original.neutralVariantPalette
		}
		else
		{
			return this.#neutral_variant.into_material_design_tonal_palette()
		}
	}
}
