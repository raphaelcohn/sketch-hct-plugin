// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {PaletteChoice} from "../PaletteChoice";
import {Tone} from "../../color_space/hct";
import {AbstractSwatch} from "./AbstractSwatch";
import {ContrastLevelToTone} from "../../contrast";
import {ThemePair} from "../ThemePair";
import {Scheme} from "../Scheme";
import {ViewingConditions} from "../ViewingConditions";

export class SurfaceSwatch extends AbstractSwatch
{
	public static readonly Background:              NonNullable<SurfaceSwatch> = SurfaceSwatch.#neutral_dark_level_light_level        (Tone.T6 , Tone.T98)
	public static readonly SurfaceVariant:          NonNullable<SurfaceSwatch> = SurfaceSwatch.#neutral_variant_dark_level_light_level(Tone.T90, Tone.T10)
	public static readonly SurfaceBright:           NonNullable<SurfaceSwatch> = SurfaceSwatch.#neutral_dark_level                    (Tone.T98, Tone.T24, Tone.T24, Tone.T29, Tone.T34 )
	public static readonly Surface:                 NonNullable<SurfaceSwatch> = SurfaceSwatch.#neutral_dark_level_light_level        (Tone.T6,  Tone.T98)
	public static readonly SurfaceDim:              NonNullable<SurfaceSwatch> = SurfaceSwatch.#neutral_dark_level                    (Tone.T6,  Tone.T87, Tone.T87, Tone.T80, Tone.T75 )
	public static readonly SurfaceContainerLowest:  NonNullable<SurfaceSwatch> = SurfaceSwatch.#neutral_light_level                   (Tone.T4,  Tone.T4 , Tone.T2 , Tone.T0 , Tone.T100)
	public static readonly SurfaceContainerLow:     NonNullable<SurfaceSwatch> = SurfaceSwatch.#neutral                               (Tone.T10, Tone.T10, Tone.T11, Tone.T12, Tone.T96, Tone.T96, Tone.T96, Tone.T95)
	public static readonly SurfaceContainer:        NonNullable<SurfaceSwatch> = SurfaceSwatch.#neutral                               (Tone.T12, Tone.T12, Tone.T16, Tone.T20, Tone.T94, Tone.T94, Tone.T92, Tone.T90)
	public static readonly SurfaceContainerHigh:    NonNullable<SurfaceSwatch> = SurfaceSwatch.#neutral                               (Tone.T17, Tone.T17, Tone.T21, Tone.T25, Tone.T92, Tone.T92, Tone.T88, Tone.T85)
	public static readonly SurfaceContainerHighest: NonNullable<SurfaceSwatch> = SurfaceSwatch.#neutral                               (Tone.T22, Tone.T22, Tone.T26, Tone.T30, Tone.T90, Tone.T90, Tone.T84, Tone.T80)
	public static readonly SurfaceTint:             NonNullable<SurfaceSwatch> = SurfaceSwatch.#primary_dark_level_light_level        (Tone.T80, Tone.T40)
	
	readonly #tones: NonNullable<ThemePair<ContrastLevelToTone>>
	
	private constructor(palette_choice: PaletteChoice, tones: NonNullable<ThemePair<ContrastLevelToTone>>)
	{
		super(palette_choice, true)
		this.#tones = tones
	}
	
	static #primary_dark_level_light_level(dark: NonNullable<Tone>, light: NonNullable<Tone>): NonNullable<SurfaceSwatch>
	{
		return SurfaceSwatch.#new(PaletteChoice.Primary, dark, dark, dark, dark, light, light, light, light)
	}
	
	static #neutral_dark_level_light_level(dark: NonNullable<Tone>, light: NonNullable<Tone>): NonNullable<SurfaceSwatch>
	{
		return SurfaceSwatch.#neutral_dark_level(dark, light, light, light, light)
	}
	
	static #neutral_dark_level(dark: NonNullable<Tone>, light_low: NonNullable<Tone>, light_normal: NonNullable<Tone>, light_medium: NonNullable<Tone>, light_high: NonNullable<Tone>): NonNullable<SurfaceSwatch>
	{
		return SurfaceSwatch.#neutral(dark, dark, dark, dark, light_low, light_normal, light_medium, light_high)
	}
	
	static #neutral_light_level(dark_low: NonNullable<Tone>, dark_normal: NonNullable<Tone>, dark_medium: NonNullable<Tone>, dark_high: NonNullable<Tone>, light: NonNullable<Tone>): NonNullable<SurfaceSwatch>
	{
		return SurfaceSwatch.#neutral(dark_low, dark_normal, dark_medium, dark_high, light, light, light, light)
	}
	
	static #neutral(dark_low: NonNullable<Tone>, dark_normal: NonNullable<Tone>, dark_medium: NonNullable<Tone>, dark_high: NonNullable<Tone>, light_low: NonNullable<Tone>, light_normal: NonNullable<Tone>, light_medium: NonNullable<Tone>, light_high: NonNullable<Tone>): NonNullable<SurfaceSwatch>
	{
		return SurfaceSwatch.#new(PaletteChoice.Neutral, dark_low, dark_normal, dark_medium, dark_high, light_low, light_normal, light_medium, light_high)
	}
	
	static #neutral_variant_dark_level_light_level(dark: NonNullable<Tone>, light: NonNullable<Tone>): NonNullable<SurfaceSwatch>
	{
		return SurfaceSwatch.#neutral_variant(dark, dark, dark, dark, light, light, light, light)
	}
	
	static #neutral_variant(dark_low: NonNullable<Tone>, dark_normal: NonNullable<Tone>, dark_medium: NonNullable<Tone>, dark_high: NonNullable<Tone>, light_low: NonNullable<Tone>, light_normal: NonNullable<Tone>, light_medium: NonNullable<Tone>, light_high: NonNullable<Tone>): NonNullable<SurfaceSwatch>
	{
		return SurfaceSwatch.#new(PaletteChoice.NeutralVariant, dark_low, dark_normal, dark_medium, dark_high, light_low, light_normal, light_medium, light_high)
	}
	
	static #new(palette_choice: PaletteChoice, dark_low: NonNullable<Tone>, dark_normal: NonNullable<Tone>, dark_medium: NonNullable<Tone>, dark_high: NonNullable<Tone>, light_low: NonNullable<Tone>, light_normal: NonNullable<Tone>, light_medium: NonNullable<Tone>, light_high: NonNullable<Tone>): NonNullable<SurfaceSwatch>
	{
		const dark = ContrastLevelToTone.try_from(dark_low, dark_normal, dark_medium, dark_high)
		const light = ContrastLevelToTone.try_from(light_low, light_normal, light_medium, light_high)
		return new SurfaceSwatch(palette_choice, new ThemePair(dark, light))
	}
	
	public override tone(this: NonNullable<this>, scheme: NonNullable<Scheme>, viewing_conditions: NonNullable<ViewingConditions>): NonNullable<Tone>
	{
		return this.raw_tone(scheme, viewing_conditions)
	}
	
	public override raw_tone(this: NonNullable<this>, _scheme: NonNullable<Scheme>, viewing_conditions: NonNullable<ViewingConditions>): NonNullable<Tone>
	{
		return this.#tones.choose(viewing_conditions.theme_mode).contrast_ratio_for_level(viewing_conditions.contrast_level)
	}
}
