// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {DynamicScheme as MaterialDesignDynamicScheme} from "@material/material-color-utilities";
import {Hct, SchemeContent, SchemeTonalSpot} from "@material/material-color-utilities";
import type {SRgbCoordinates} from "../../color_space/srgb/SRgbCoordinates.mts";
import type {CustomColorValue} from "./CustomColorValue.mts";
import {TonalPalette} from "../../color_space/hct/TonalPalette.mjs";
import {ThemePair} from "../../scheme/ThemePair.mjs";
import type {Theme} from "../Theme.mts";
import {DynamicScheme} from "../DynamicScheme.mjs";
import {StaticScheme} from "../StaticScheme.mjs";
import {ContrastLevel} from "../../contrast/ContrastLevel.mjs";
import type {CustomColorColors} from "../CustomColorColors.mts";
import type {SourceColors} from "../../scheme/palettes/SourceColors.mts";
import type {Scheme} from "../Scheme.mts";
import {PaletteSourceOverrides} from "../../scheme/palettes/PaletteSourceOverrides.mjs";
import {Palettes} from "../../scheme/palettes/Palettes.mjs";

export class MaterialThemeInput
{
	readonly #custom_colors: Map<string, CustomColorValue>
	readonly #palette_source_overrides: PaletteSourceOverrides
	
	public constructor(readonly source_colors: SourceColors, custom_colors: Map<string, CustomColorValue>, readonly color_match: boolean)
	{
		this.#custom_colors = custom_colors
		this.#palette_source_overrides = PaletteSourceOverrides.from_source_colors(source_colors)
	}
	
	public get source(): SRgbCoordinates
	{
		return this.source_colors.primary
	}
	
	public into_static_theme(this: NonNullable<this>): Theme<StaticScheme>
	{
		const source = this.source
		const source_palette = TonalPalette.from_srgb_space(source)
		const palettes = Palettes.from_static(source_palette, this.#is_content, this.#palette_source_overrides)[0]
		
		return this.#new_theme(StaticScheme.generate(palettes), palettes)
	}
	
	public into_dynamic_theme(this: NonNullable<this>): Theme<DynamicScheme>
	{
		const source = this.source
		let dynamic_scheme_constructor
		if (this.#is_content)
		{
			dynamic_scheme_constructor = SchemeContent
		}
		else
		{
			dynamic_scheme_constructor = SchemeTonalSpot
		}
		const source_color = source.into_opaque().into_hue_chroma_tone_coordinates().into_hct()
		
		const dark = this.#new_dynamic_scheme(dynamic_scheme_constructor, source_color, ContrastLevel.Normal, true)
		const light = this.#new_dynamic_scheme(dynamic_scheme_constructor, source_color, ContrastLevel.Normal, false)
		
		// Generated palettes are independent of ThemeMode and ContrastLevel for both SchemeContent and SchemeTonalSpot.
		const palettes = Palettes.from_dynamic(dark)
		
		return this.#new_theme(new ThemePair(new DynamicScheme(dark), new DynamicScheme(light)), palettes)
	}
	
	#new_theme<S extends Scheme>(this: NonNullable<this>, scheme: ThemePair<S>, palettes: Palettes): Theme<S>
	{
		return {
			source_colors: this.source_colors,
			scheme,
			palettes,
			custom_colors: this.#harmonize_custom_colors(),
		}
	}
	
	#harmonize_custom_colors(this: NonNullable<this>): CustomColorColors[]
	{
		const source = this.source
		const is_content = this.#is_content
		const custom_color_colors = []
		for (const entry of this.#custom_colors.entries())
		{
			const custom_color_name = entry[0]
			const custom_color_value = entry[1]
			custom_color_colors.push(custom_color_value.generate_scheme(custom_color_name, source, is_content))
		}
		return custom_color_colors
	}
	
	#new_dynamic_scheme(this: NonNullable<this>, dynamic_scheme_constructor: typeof SchemeContent, source_color: Hct, contrast_level: ContrastLevel, is_dark: boolean): MaterialDesignDynamicScheme
	{
		const dynamic_scheme =  new dynamic_scheme_constructor(source_color, is_dark, contrast_level)
		return this.#override_palettes(dynamic_scheme)
	}
	
	#override_palettes(this: NonNullable<this>, original: MaterialDesignDynamicScheme): MaterialDesignDynamicScheme
	{
		const palette_source_overrides = this.#palette_source_overrides
		
		const adjusted = new MaterialDesignDynamicScheme
		({
			sourceColorArgb: original.sourceColorArgb,
			variant: original.variant,
			contrastLevel: original.contrastLevel,
			isDark: original.isDark,
			primaryPalette: original.primaryPalette,
			secondaryPalette: palette_source_overrides.dynamic_secondary(original),
			tertiaryPalette: palette_source_overrides.dynamic_tertiary(original),
			neutralPalette: palette_source_overrides.dynamic_neutral(original),
			neutralVariantPalette: palette_source_overrides.dynamic_neutral_variant(original),
		})
		adjusted.errorPalette = palette_source_overrides.dynamic_error(original)
		
		return adjusted
	}
	
	get #is_content(): boolean
	{
		return this.color_match
	}
}
