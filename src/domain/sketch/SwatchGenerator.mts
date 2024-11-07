// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import type {Theme} from "../theme/Theme.mts";
import {SwatchPaletteName} from "../theme/SwatchPaletteName.mjs";
import {ThemeMode} from "../scheme/ThemeMode.mjs";
import type {AbstractScheme} from "../theme/AbstractScheme.mts";
import type {CustomColorColors} from "../theme/CustomColorColors.mts";
import type {AddSwatch} from "../theme/AddSwatch.mts";
import type {SRgbCoordinates} from "../color_space/srgb/SRgbCoordinates.mts";
import type {Scheme} from "../scheme/swatches/Scheme.mts";

type SchemeKey = keyof typeof Scheme;

enum Hierarchy
{
	Source = "Source",
	
	Key = "Key",
	
	Harmonized = "Harmonized",
	
	Main = "Main",

	Main_On = "Main/On",
	
	Main_Inverse = "Main/Inverse",

	Container = "Container",

	Container_On = "Container/On Top",

	Surface = "Main",

	Surface_On = "Main/On Top",

	Surface_Variant = "Lower Emphasis",
	
	Surface_Variant_On = "Lower Emphasis/On Top",

	Surface_Background = "Old",
	
	Surface_Background_On = "Old/On Top",
	
	Surface_On_Outline = "Main/On/Outline",
	
	Surface_On_Outline_Variant = "Main/On/Outline/Lower Emphasis",
	
	Surface_Inverse = "Inverse",
	
	Surface_Inverse_On = "Inverse/On Top",
	
	Surface_Dim = "Main (Dimmer)",
	
	Surface_Bright = "Main (Brighter)",
	
	Surface_Container_Lowest = "Container/1 Lowest",
	
	Surface_Container_Low = "Container/2 Low",
	
	Surface_Container_Mid = "Container/3 Mid",
	
	Surface_Container_High = "Container/4 High",
	
	Surface_Container_Highest = "Container/4 Highest",
	
	Fixed_Main = "Fixed/Main",
	
	Fixed_Dim = "Fixed/Dim",
	
	Fixed_Main_On = "Fixed/Main/On Top",
	
	Fixed_Main_On_Variant = "Fixed/Main/On Top/Variant",
}

class ColorsMap
{
	static readonly #ContainerPalettes: SwatchPaletteName[] = [SwatchPaletteName.Primary, SwatchPaletteName.Secondary, SwatchPaletteName.Tertiary]
	
	static readonly #ContainerPalettesWithError: SwatchPaletteName[] = ColorsMap.#palettes_with(ColorsMap.#ContainerPalettes, SwatchPaletteName.Error)
	
	// TODO: Add error.
	static readonly #KeyColorPalettes: SwatchPaletteName[] = ColorsMap.#palettes_with(ColorsMap.#ContainerPalettes, SwatchPaletteName.Neutral, SwatchPaletteName.Neutral_Variant)
	
	static #palettes_with(original: SwatchPaletteName[], ...additional: SwatchPaletteName[]): SwatchPaletteName[]
	{
		const copy = Array.from(original)
		copy.push(...additional)
		return copy
	}
	
	static readonly x_key_color: ColorsMap = ColorsMap.#from_suffixed(Hierarchy.Key, "key_color", ...ColorsMap.#KeyColorPalettes)
	
	static readonly x: ColorsMap = ColorsMap.#from_named(Hierarchy.Main, ...ColorsMap.#ContainerPalettesWithError)
	
	static readonly on_x: ColorsMap = ColorsMap.#from_prefixed(Hierarchy.Main_On, "on", ...ColorsMap.#ContainerPalettesWithError)
	
	static readonly x_container: ColorsMap = ColorsMap.#from_suffixed(Hierarchy.Container, "container", ...ColorsMap.#ContainerPalettesWithError)
	
	static readonly on_x_container: ColorsMap = ColorsMap.#from_prefixed_suffixed(Hierarchy.Container_On, "on", "container", ...ColorsMap.#ContainerPalettesWithError)
	
	static readonly background: ColorsMap = ColorsMap.#from_solo_hierarchy(Hierarchy.Surface_Background, SwatchPaletteName.Surface, "background")
	static readonly on_background: ColorsMap = ColorsMap.#from_solo_hierarchy(Hierarchy.Surface_Background_On, SwatchPaletteName.Surface, "on_background")
	
	static readonly surface: ColorsMap = ColorsMap.#from_solo_hierarchy(Hierarchy.Surface, SwatchPaletteName.Surface, "surface")
	static readonly on_surface: ColorsMap = ColorsMap.#from_solo_hierarchy(Hierarchy.Surface_On, SwatchPaletteName.Surface, "on_surface")
	static readonly surface_variant: ColorsMap = ColorsMap.#from_solo_hierarchy(Hierarchy.Surface_Variant, SwatchPaletteName.Surface, "surface_variant")
	static readonly on_surface_variant: ColorsMap = ColorsMap.#from_solo_hierarchy(Hierarchy.Surface_Variant_On, SwatchPaletteName.Surface, "on_surface_variant")
	
	static readonly outline: ColorsMap = ColorsMap.#from_solo_hierarchy(Hierarchy.Surface_On_Outline, SwatchPaletteName.Surface, "outline")
	static readonly outline_variant: ColorsMap = ColorsMap.#from_solo_hierarchy(Hierarchy.Surface_On_Outline_Variant, SwatchPaletteName.Surface, "outline_variant")
	
	/*
		Always black; no point in generating.
	
	readonly shadow: SRgbCoordinates,
	readonly scrim: SRgbCoordinates,
	 */
	
	static readonly inverse_surface: ColorsMap = ColorsMap.#from_solo_hierarchy(Hierarchy.Surface_Inverse, SwatchPaletteName.Surface, "inverse_surface")
	static readonly inverse_on_surface: ColorsMap = ColorsMap.#from_solo_hierarchy(Hierarchy.Surface_Inverse_On, SwatchPaletteName.Surface, "inverse_on_surface")
	
	static readonly inverse_primary: ColorsMap = ColorsMap.#from_solo_hierarchy(Hierarchy.Main_Inverse, SwatchPaletteName.Primary, "inverse_primary")
	
	
	
	static readonly surface_dim: ColorsMap = ColorsMap.#from_solo_hierarchy(Hierarchy.Surface_Dim, SwatchPaletteName.Surface, "surface_dim")
	static readonly surface_bright: ColorsMap = ColorsMap.#from_solo_hierarchy(Hierarchy.Surface_Bright, SwatchPaletteName.Surface, "surface_bright")
	
	static readonly surface_container_lowest: ColorsMap = ColorsMap.#from_solo_hierarchy(Hierarchy.Surface_Container_Lowest, SwatchPaletteName.Surface, "surface_container_lowest")
	static readonly surface_container_low: ColorsMap = ColorsMap.#from_solo_hierarchy(Hierarchy.Surface_Container_Low, SwatchPaletteName.Surface, "surface_container_low")
	static readonly surface_container: ColorsMap = ColorsMap.#from_solo_hierarchy(Hierarchy.Surface_Container_Mid, SwatchPaletteName.Surface, "surface_container")
	static readonly surface_container_high: ColorsMap = ColorsMap.#from_solo_hierarchy(Hierarchy.Surface_Container_High, SwatchPaletteName.Surface, "surface_container_high")
	static readonly surface_container_highest: ColorsMap = ColorsMap.#from_solo_hierarchy(Hierarchy.Surface_Container_Highest, SwatchPaletteName.Surface, "surface_container_highest")
	
	/*
		Legacy; no point in generating.
	
		readonly surface_tint: SRgbCoordinates | null,
	 */
	
	
	static readonly x_fixed: ColorsMap = ColorsMap.#from_suffixed(Hierarchy.Fixed_Main, "fixed", ...ColorsMap.#ContainerPalettes)
	
	static readonly x_fixed_dim: ColorsMap = ColorsMap.#from_suffixed(Hierarchy.Fixed_Dim, "fixed_dim", ...ColorsMap.#ContainerPalettes)
	
	static readonly on_x_fixed: ColorsMap = ColorsMap.#from_prefixed_suffixed(Hierarchy.Fixed_Main_On, "on", "fixed", ...ColorsMap.#ContainerPalettes)
	
	static readonly on_x_fixed_variant: ColorsMap = ColorsMap.#from_prefixed_suffixed(Hierarchy.Fixed_Main_On_Variant, "on", "fixed", ...ColorsMap.#ContainerPalettes)
	
	
	readonly #hierarchy: Hierarchy
	readonly #entries: Map<SwatchPaletteName, SchemeKey>
	
	private constructor(hierarchy: Hierarchy, entries: [SwatchPaletteName, SchemeKey][])
	{
		this.#hierarchy = hierarchy
		this.#entries = new Map<SwatchPaletteName, SchemeKey>(entries)
	}
	
	public iterate(this: NonNullable<this>, entry_callback: (hierarchy: Hierarchy, swatch_palette_name: SwatchPaletteName, property: SchemeKey) => void)
	{
		for (let entry of this.#entries.entries())
		{
			const swatch_palette_name = entry[0]
			const property = entry[1]
			entry_callback(this.#hierarchy, swatch_palette_name, property)
		}
	}
	
	static #from_named(hierarchy: Hierarchy, ...swatch_palette_names: SwatchPaletteName[]): ColorsMap
	{
		return ColorsMap.#from_palette(hierarchy, swatch_palette_names, ColorsMap.#palette_named_entry)
	}
	
	static #from_prefixed(hierarchy: Hierarchy, prefix: string, ...swatch_palette_names: SwatchPaletteName[]): ColorsMap
	{
		return ColorsMap.#from_palette(hierarchy, swatch_palette_names, (swatch_palette_name: SwatchPaletteName) => ColorsMap.#palette_named_entry_prefixed(swatch_palette_name, prefix))
	}
	
	static #from_suffixed(hierarchy: Hierarchy, suffix: string, ...swatch_palette_names: SwatchPaletteName[]): ColorsMap
	{
		return ColorsMap.#from_palette(hierarchy, swatch_palette_names, (swatch_palette_name: SwatchPaletteName) => ColorsMap.#palette_named_entry_suffixed(swatch_palette_name, suffix))
	}
	
	static #from_prefixed_suffixed(hierarchy: Hierarchy, prefix: string, suffix: string, ...swatch_palette_names: SwatchPaletteName[]): ColorsMap
	{
		return ColorsMap.#from_palette(hierarchy, swatch_palette_names, (swatch_palette_name: SwatchPaletteName) => ColorsMap.#palette_named_entry_prefixed_suffixed(swatch_palette_name, prefix, suffix))
	}
	
	static #from_palette(hierarchy: Hierarchy, swatch_palette_names: SwatchPaletteName[], entry_factory: (swatch_palette_name: SwatchPaletteName) => [SwatchPaletteName, SchemeKey]): ColorsMap
	{
		return new ColorsMap(hierarchy, swatch_palette_names.map((swatch_palette_name: SwatchPaletteName, _index: number, _array: SwatchPaletteName[]) => entry_factory(swatch_palette_name)))
	}
	
	static #from_solo_hierarchy(hierarchy: Hierarchy, swatch_palette_name: SwatchPaletteName, property_name_string: string): ColorsMap
	{
		return new ColorsMap
		(
			hierarchy,
			[
				ColorsMap.#entry(swatch_palette_name, property_name_string)
			]
		)
	}
	
	static #palette_named_entry(swatch_palette_name: SwatchPaletteName): [SwatchPaletteName, SchemeKey]
	{
		return ColorsMap.#palette_named_entry_prefixed_suffixed(swatch_palette_name, "", "")
	}
	
	static #palette_named_entry_prefixed(swatch_palette_name: SwatchPaletteName, property_name_string_prefix: string): [SwatchPaletteName, SchemeKey]
	{
		return ColorsMap.#palette_named_entry_prefixed_suffixed(swatch_palette_name, property_name_string_prefix, "")
	}
	
	static #palette_named_entry_suffixed(swatch_palette_name: SwatchPaletteName, property_name_string_suffix: string): [SwatchPaletteName, SchemeKey]
	{
		return ColorsMap.#palette_named_entry_prefixed_suffixed(swatch_palette_name, "", property_name_string_suffix)
	}
	
	static #palette_named_entry_prefixed_suffixed(swatch_palette_name: SwatchPaletteName, property_name_string_prefix: string, property_name_string_suffix: string): [SwatchPaletteName, SchemeKey]
	{
		const underscore = "_"
		const prefix = property_name_string_prefix.length === 0 ? "" : property_name_string_prefix + underscore
		const body = swatch_palette_name.toLowerCase().replace(" ", underscore)
		const suffix = property_name_string_suffix.length === 0 ? "" : underscore + property_name_string_suffix
		const property_name_string = `${prefix}${body}${suffix}`
		
		return ColorsMap.#entry(swatch_palette_name, property_name_string)
	}
	
	static #entry(swatch_palette_name: SwatchPaletteName, property_name_string: string): [SwatchPaletteName, SchemeKey]
	{
		return [swatch_palette_name, property_name_string as SchemeKey]
	}
}

export class SwatchGenerator
{
	readonly #theme: Theme<AbstractScheme>
	readonly #add_swatch: AddSwatch
	
	public constructor(theme: Theme<AbstractScheme>, add_swatch: AddSwatch)
	{
		this.#theme = theme
		this.#add_swatch = add_swatch
	}
	
	public generate(this: NonNullable<this>): void
	{
		this.#theme.custom_colors.forEach((custom_color: CustomColorColors, _index: number, _array: CustomColorColors[]) =>
		{
			this.#generate_custom_color(custom_color.custom_color_name, Hierarchy.Source, custom_color.source_color)
			this.#generate_custom_color(custom_color.custom_color_name, Hierarchy.Harmonized, custom_color.harmonized_color)
			this.#generate_custom_color(custom_color.custom_color_name, Hierarchy.Key, custom_color.key_color)
		})
		
		this.#generate_source_color(SwatchPaletteName.Primary, Hierarchy.Source, this.#theme.source_colors.primary)
		this.#generate_source_color(SwatchPaletteName.Secondary, Hierarchy.Source, this.#theme.source_colors.secondary)
		this.#generate_source_color(SwatchPaletteName.Tertiary, Hierarchy.Source, this.#theme.source_colors.tertiary)
		this.#generate_source_color(SwatchPaletteName.Error, Hierarchy.Source, this.#theme.source_colors.error)
		this.#generate_source_color(SwatchPaletteName.Neutral, Hierarchy.Source, this.#theme.source_colors.neutral)
		this.#generate_source_color(SwatchPaletteName.Neutral_Variant, Hierarchy.Source, this.#theme.source_colors.neutral_variant)
		
		this.#generate_fixed(ColorsMap.x_key_color)
		this.#generate_source_color(SwatchPaletteName.Error, Hierarchy.Key, this.#theme.palettes.error.key_colour().into_alpha_srgb_space_coordinate())
		
		this.#generate_light_and_dark(ColorsMap.x)
		this.#generate_light_and_dark(ColorsMap.on_x)
		this.#generate_light_and_dark(ColorsMap.x_container)
		this.#generate_light_and_dark(ColorsMap.on_x_container)
		// this.#generate_light_and_dark(ColorsMap.background)
		// this.#generate_light_and_dark(ColorsMap.on_background)
		this.#generate_light_and_dark(ColorsMap.surface)
		this.#generate_light_and_dark(ColorsMap.on_surface)
		this.#generate_light_and_dark(ColorsMap.surface_variant)
		this.#generate_light_and_dark(ColorsMap.on_surface_variant)
		this.#generate_light_and_dark(ColorsMap.outline)
		this.#generate_light_and_dark(ColorsMap.outline_variant)
		// this.#generate_light_and_dark(ColorsMap.shadow)
		// this.#generate_light_and_dark(ColorsMap.scrim)
		this.#generate_light_and_dark(ColorsMap.inverse_surface)
		this.#generate_light_and_dark(ColorsMap.inverse_on_surface)
		this.#generate_light_and_dark(ColorsMap.inverse_primary)
		this.#generate_light_and_dark(ColorsMap.surface_dim)
		this.#generate_light_and_dark(ColorsMap.surface_bright)
		this.#generate_light_and_dark(ColorsMap.surface_container_lowest)
		this.#generate_light_and_dark(ColorsMap.surface_container_low)
		this.#generate_light_and_dark(ColorsMap.surface_container)
		this.#generate_light_and_dark(ColorsMap.surface_container_high)
		this.#generate_light_and_dark(ColorsMap.surface_container_highest)
		//this.#generate_light_and_dark(ColorsMap.surface_tint)
		this.#generate_fixed(ColorsMap.x_fixed)
		this.#generate_fixed(ColorsMap.x_fixed_dim)
		this.#generate_fixed(ColorsMap.on_x_fixed)
		this.#generate_fixed(ColorsMap.on_x_fixed_variant)
	}
	
	#generate_source_color(this: NonNullable<this>, swatch_palette_name: SwatchPaletteName, hierarchy: Hierarchy, source_color: SRgbCoordinates | null)
	{
		if (source_color === null)
		{
			return
		}
		
		this.#new_swatch(swatch_palette_name, hierarchy, source_color, ThemeMode.Dark, true)
	}
	
	#generate_custom_color(this: NonNullable<this>, hierarchy: string, custom_color_name: string, color: SRgbCoordinates)
	{
		this.#new_swatch(custom_color_name, hierarchy, color, ThemeMode.Dark, false)
		this.#new_swatch(custom_color_name, hierarchy, color, ThemeMode.Light, false)
	}
	
	#generate_light_and_dark(this: NonNullable<this>, colors: ColorsMap)
	{
		this.#generate(colors, ThemeMode.Dark, false)
		this.#generate(colors, ThemeMode.Light, false)
	}
	
	#generate_fixed(this: NonNullable<this>, colors: ColorsMap)
	{
		this.#generate(colors, ThemeMode.Dark, true)
	}
	
	#generate(this: NonNullable<this>, colors: ColorsMap, theme_mode: ThemeMode, is_fixed: boolean)
	{
		colors.iterate((hierarchy: Hierarchy, swatch_palette_name: SwatchPaletteName, property: SchemeKey) =>
		{
			const scheme = this.#theme.scheme.choose(theme_mode)
			const color = scheme[property as keyof typeof scheme]
			if (color == null)
			{
				return
			}
			
			this.#new_swatch(swatch_palette_name, hierarchy, color, theme_mode, is_fixed)
		})
	}
	
	#new_swatch(this: NonNullable<this>, swatch_palette_name: string, hierarchy: string, color: SRgbCoordinates, theme_mode: ThemeMode, is_fixed: boolean)
	{
		const section = is_fixed ? "Fixed" : (theme_mode == ThemeMode.Dark ? "Dark" : "Light")
		const swatch_hierarchial_name = `Theme/${section}/${swatch_palette_name}/${hierarchy}`
		this.#add_swatch.add_swatch(swatch_hierarchial_name, color.into_opaque())
	}
}
