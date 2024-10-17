// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {HueChromaToneCoordinates, Tone} from "../../color_space/hct";
import {ContrastLevel, ContrastLevelToContrastRatio, ContrastRatio} from "../../contrast";
import {Backgrounds, CorePalettes, PaletteChoice, Swatch, ThemeMode, ThemePair, Variant} from "../.";
import {SurfaceSwatch} from "./SurfaceSwatch";
import {SimpleSwatch} from "./SimpleSwatch";
import {MainSwatch} from "./MainSwatch";
import {ContainerSwatch} from "./ContainerSwatch";
import {ContainerPaletteChoice} from "./ContainerPaletteChoice";
import {AbstractWithBackgroundsSwatch} from "./AbstractWithBackgroundsSwatch";

export class OnSwatch extends AbstractWithBackgroundsSwatch
{
	public static readonly OnBackground:         NonNullable<OnSwatch> = OnSwatch.#neutral_primary_background_fixed          (Tone.T90, Tone.T10,  ContrastLevelToContrastRatio.Mapping_3_3_45_7,   SurfaceSwatch.Background)
	public static readonly OnSurface:            NonNullable<OnSwatch> = OnSwatch.#neutral_primary_background                (Tone.T90, Tone.T10,  ContrastLevelToContrastRatio.Mapping_45_7_11_21, SurfaceSwatch.SurfaceBright,    SurfaceSwatch.SurfaceDim)
	public static readonly OnSurfaceVariant:     NonNullable<OnSwatch> = OnSwatch.#neutral_variant_primary_background        (Tone.T80, Tone.T30,  ContrastLevelToContrastRatio.Mapping_3_45_7_11,  SurfaceSwatch.SurfaceBright,    SurfaceSwatch.SurfaceDim)
	public static readonly InverseOnSurface:     NonNullable<OnSwatch> = OnSwatch.#neutral_primary_background_fixed          (Tone.T20, Tone.T95,  ContrastLevelToContrastRatio.Mapping_45_7_11_21, SimpleSwatch.InverseSurface)
	public static readonly Outline:              NonNullable<OnSwatch> = OnSwatch.#neutral_variant_primary_background        (Tone.T60, Tone.T50,  ContrastLevelToContrastRatio.Mapping_15_3_45_7,  SurfaceSwatch.SurfaceBright,    SurfaceSwatch.SurfaceDim)
	public static readonly OutlineVariant:       NonNullable<OnSwatch> = OnSwatch.#neutral_variant_primary_background        (Tone.T30, Tone.T80,  ContrastLevelToContrastRatio.Mapping_1_1_3_45,   SurfaceSwatch.SurfaceBright,    SurfaceSwatch.SurfaceDim)
	public static readonly InversePrimary:       NonNullable<OnSwatch> = OnSwatch.#primary_primary_background_fixed          (Tone.T40, Tone.T80,  ContrastLevelToContrastRatio.Mapping_3_45_7_7,   SimpleSwatch.InverseSurface)
	public static readonly OnPrimary:            NonNullable<OnSwatch> = OnSwatch.#palette_primary_background_fixed_main     (Tone.T20, Tone.T100, ContrastLevelToContrastRatio.Mapping_45_7_11_21, MainSwatch.Primary,                 PaletteChoice.Primary,   Tone.T10, Tone.T90)
	public static readonly OnPrimaryContainer:   NonNullable<OnSwatch> = OnSwatch.#palette_primary_background_fixed_container(Tone.T90, Tone.T30,  ContrastLevelToContrastRatio.Mapping_3_45_7_11,  ContainerSwatch.PrimaryContainer,   PaletteChoice.Primary,   Tone.T0,  Tone.T100)
	public static readonly OnSecondary:          NonNullable<OnSwatch> = OnSwatch.#palette_primary_background_fixed_main     (Tone.T20, Tone.T100, ContrastLevelToContrastRatio.Mapping_45_7_11_21, MainSwatch.Secondary,               PaletteChoice.Secondary, Tone.T10, Tone.T100)
	public static readonly OnSecondaryContainer: NonNullable<OnSwatch> = OnSwatch.#palette_primary_background_fixed_container(Tone.T90, Tone.T30,  ContrastLevelToContrastRatio.Mapping_3_45_7_11,  ContainerSwatch.SecondaryContainer, PaletteChoice.Secondary, Tone.T90, Tone.T10)
	public static readonly OnTertiary:           NonNullable<OnSwatch> = OnSwatch.#palette_primary_background_fixed_main     (Tone.T20, Tone.T100, ContrastLevelToContrastRatio.Mapping_45_7_11_21, MainSwatch.Tertiary,                PaletteChoice.Tertiary,  Tone.T10, Tone.T90)
	public static readonly OnTertiaryContainer:  NonNullable<OnSwatch> = OnSwatch.#palette_primary_background_fixed_container(Tone.T90, Tone.T30,  ContrastLevelToContrastRatio.Mapping_3_45_7_11,  ContainerSwatch.TertiaryContainer,  PaletteChoice.Tertiary,  Tone.T0,  Tone.T100)
	public static readonly OnError:              NonNullable<OnSwatch> = OnSwatch.#palette_primary_background_fixed_main     (Tone.T20, Tone.T100, ContrastLevelToContrastRatio.Mapping_45_7_11_21, MainSwatch.Error,                   PaletteChoice.Error,     Tone.T20, Tone.T100)
	public static readonly OnErrorContainer:     NonNullable<OnSwatch> = OnSwatch.#palette_primary_background_fixed_container(Tone.T90, Tone.T30,  ContrastLevelToContrastRatio.Mapping_3_45_7_11,  ContainerSwatch.ErrorContainer,     PaletteChoice.Error,     Tone.T90, Tone.T10)
	
	static #primary_primary_background_fixed(ordinary_dark: NonNullable<Tone>, ordinary_light: NonNullable<Tone>, contrast_level_to_contrast_ratio: NonNullable<ContrastLevelToContrastRatio>, primary_background_fixed: NonNullable<Swatch>): NonNullable<OnSwatch>
	{
		return OnSwatch.#palette(ordinary_dark, ordinary_light, contrast_level_to_contrast_ratio, primary_background_fixed, primary_background_fixed, PaletteChoice.Primary)
	}
	
	static #neutral_primary_background_fixed(ordinary_dark: NonNullable<Tone>, ordinary_light: NonNullable<Tone>, contrast_level_to_contrast_ratio: NonNullable<ContrastLevelToContrastRatio>, primary_background_fixed: NonNullable<Swatch>): NonNullable<OnSwatch>
	{
		return OnSwatch.#neutral_primary_background(ordinary_dark, ordinary_light, contrast_level_to_contrast_ratio, primary_background_fixed, primary_background_fixed)
	}
	
	static #neutral_primary_background(ordinary_dark: NonNullable<Tone>, ordinary_light: NonNullable<Tone>, contrast_level_to_contrast_ratio: NonNullable<ContrastLevelToContrastRatio>, primary_background_dark: NonNullable<Swatch>, primary_background_light: NonNullable<Swatch>): NonNullable<OnSwatch>
	{
		return OnSwatch.#palette(ordinary_dark, ordinary_light, contrast_level_to_contrast_ratio, primary_background_dark, primary_background_light, PaletteChoice.Neutral)
	}
	
	static #neutral_variant_primary_background(ordinary_dark: NonNullable<Tone>, ordinary_light: NonNullable<Tone>, contrast_level_to_contrast_ratio: NonNullable<ContrastLevelToContrastRatio>, primary_background_dark: NonNullable<Swatch>, primary_background_light: NonNullable<Swatch>): NonNullable<OnSwatch>
	{
		return OnSwatch.#palette(ordinary_dark, ordinary_light, contrast_level_to_contrast_ratio, primary_background_dark, primary_background_light, PaletteChoice.NeutralVariant)
	}
	
	static #palette(ordinary_dark: NonNullable<Tone>, ordinary_light: NonNullable<Tone>, contrast_level_to_contrast_ratio: NonNullable<ContrastLevelToContrastRatio>, primary_background_dark: NonNullable<Swatch>, primary_background_light: NonNullable<Swatch>, palette_choice: PaletteChoice): NonNullable<OnSwatch>
	{
		return OnSwatch.#palette_main(ordinary_dark, ordinary_light, contrast_level_to_contrast_ratio, primary_background_light, primary_background_dark, palette_choice, ordinary_dark, ordinary_light)
	}
	
	static #palette_primary_background_fixed_main(ordinary_dark: NonNullable<Tone>, ordinary_light: NonNullable<Tone>, contrast_level_to_contrast_ratio: NonNullable<ContrastLevelToContrastRatio>, primary_background_fixed: NonNullable<Swatch>, palette_choice: ContainerPaletteChoice, monochrome_dark: NonNullable<Tone>, monochrome_light: NonNullable<Tone>): NonNullable<OnSwatch>
	{
		return OnSwatch.#palette_main(ordinary_dark, ordinary_light, contrast_level_to_contrast_ratio, primary_background_fixed, primary_background_fixed, palette_choice, monochrome_dark, monochrome_light)
	}
	
	static #palette_primary_background_fixed_container(ordinary_dark: NonNullable<Tone>, ordinary_light: NonNullable<Tone>, contrast_level_to_contrast_ratio: NonNullable<ContrastLevelToContrastRatio>, primary_background_fixed: NonNullable<ContainerSwatch>, palette_choice: ContainerPaletteChoice, monochrome_dark: NonNullable<Tone>, monochrome_light: NonNullable<Tone>): NonNullable<OnSwatch>
	{
		return OnSwatch.#new(ordinary_dark, ordinary_light, contrast_level_to_contrast_ratio, primary_background_fixed, primary_background_fixed, palette_choice, monochrome_dark, monochrome_light, primary_background_fixed)
	}
	
	static #palette_main(ordinary_dark: NonNullable<Tone>, ordinary_light: NonNullable<Tone>, contrast_level_to_contrast_ratio: NonNullable<ContrastLevelToContrastRatio>, primary_background_dark: NonNullable<Swatch>, primary_background_light: NonNullable<Swatch>, palette_choice: PaletteChoice, monochrome_dark: NonNullable<Tone>, monochrome_light: NonNullable<Tone>): NonNullable<OnSwatch>
	{
		return OnSwatch.#new(ordinary_dark, ordinary_light, contrast_level_to_contrast_ratio, primary_background_light, primary_background_dark, palette_choice, monochrome_dark, monochrome_light, null)
	}
	
	static #new(ordinary_dark: NonNullable<Tone>, ordinary_light: NonNullable<Tone>, contrast_level_to_contrast_ratio: NonNullable<ContrastLevelToContrastRatio>, primary_background_dark: NonNullable<Swatch>, primary_background_light: NonNullable<Swatch>, palette_choice: PaletteChoice, monochrome_dark: NonNullable<Tone>, monochrome_light: NonNullable<Tone>, tone_fidelity_primary_background_fixed: NonNullable<ContainerSwatch> | null): NonNullable<OnSwatch>
	{
		return new OnSwatch(palette_choice, new ThemePair(ordinary_dark, ordinary_light), new ThemePair(monochrome_dark, monochrome_light), tone_fidelity_primary_background_fixed, new ThemePair(Backgrounds.with_primary_background(primary_background_dark), Backgrounds.with_primary_background(primary_background_light)), contrast_level_to_contrast_ratio)
	}
	
	readonly #tone_ordinary: NonNullable<ThemePair<Tone>>
	readonly #tone_monochrome: NonNullable<ThemePair<Tone>>
	readonly #tone_fidelity_primary_background_fixed: NonNullable<ContainerSwatch> | null
	
	private constructor(palette_choice: PaletteChoice, tone_ordinary: NonNullable<ThemePair<Tone>>, tone_monochrome: NonNullable<ThemePair<Tone>>, tone_fidelity_primary_background_fixed: NonNullable<ContainerSwatch> | null, primary_background: NonNullable<ThemePair<Backgrounds>>, contrast_level_to_constrast_ratio: NonNullable<ContrastLevelToContrastRatio>)
	{
		super(palette_choice, false, contrast_level_to_constrast_ratio, primary_background)
		
		this.#tone_ordinary = tone_ordinary
		this.#tone_monochrome = tone_monochrome
		this.#tone_fidelity_primary_background_fixed = tone_fidelity_primary_background_fixed
	}
	
	public tone(this: NonNullable<this>, theme_mode: ThemeMode, variant: Variant, palettes: NonNullable<CorePalettes>, source_color: NonNullable<HueChromaToneCoordinates>, contrast_level: ContrastLevel): NonNullable<Tone>
	{
		return this.#tones_for_variant(variant, palettes, source_color, contrast_level).choose(theme_mode)
	}
	
	#tones_for_variant(this: NonNullable<this>, variant: Variant, palettes: NonNullable<CorePalettes>, source_color: NonNullable<HueChromaToneCoordinates>, contrast_level: ContrastLevel): NonNullable<ThemePair<Tone>>
	{
		switch (variant)
		{
			case Variant.Ordinary:
				return this.#tone_ordinary
			
			case Variant.Monochrome:
				return this.#tone_monochrome
			
			case Variant.Fidelity:
				if (this.#tone_fidelity_primary_background_fixed === null)
				{
					return this.#tone_ordinary
				}
				else
				{
					const tone_fidelity_dark = OnSwatch.#fidelity_foreground_tone(ThemeMode.Dark, this.#tone_fidelity_primary_background_fixed, palettes, source_color, contrast_level)
					const tone_fidelity_light = OnSwatch.#fidelity_foreground_tone(ThemeMode.Light, this.#tone_fidelity_primary_background_fixed, palettes, source_color, contrast_level)
					return new ThemePair(tone_fidelity_dark, tone_fidelity_light)
				}
			
			default:
				throw new RangeError("variant is out of range")
		}
		
	}
	
	static #fidelity_foreground_tone(theme_mode: ThemeMode, primary_background_fixed: NonNullable<ContainerSwatch>, palettes: NonNullable<CorePalettes>, source_color: NonNullable<HueChromaToneCoordinates>, contrast_level: ContrastLevel): NonNullable<Tone>
	{
		const tone = primary_background_fixed.tone(theme_mode, Variant.Fidelity, palettes, source_color, contrast_level)
		return tone.foreground(ContrastRatio.FourPointFive)
	}
}
