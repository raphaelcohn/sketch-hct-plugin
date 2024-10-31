// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {SRgbCoordinates} from "../color_space/srgb";
import {SchemeLike} from "./SchemeLike";
import {Palettes} from "../scheme";
import {ThemePair} from "../scheme";
import {Tone} from "../color_space/hct";
import {AbstractScheme} from "./AbstractScheme";

export class StaticScheme extends AbstractScheme
{
	private constructor
	(
		primary: SRgbCoordinates,
		on_primary: SRgbCoordinates,
		primary_container: SRgbCoordinates,
		on_primary_container: SRgbCoordinates,
		
		secondary: SRgbCoordinates,
		on_secondary: SRgbCoordinates,
		secondary_container: SRgbCoordinates,
		on_secondary_container: SRgbCoordinates,
		
		tertiary: SRgbCoordinates,
		on_tertiary: SRgbCoordinates,
		tertiary_container: SRgbCoordinates,
		on_tertiary_container: SRgbCoordinates,
		
		error: SRgbCoordinates,
		on_error: SRgbCoordinates,
		error_container: SRgbCoordinates,
		on_error_container: SRgbCoordinates,
		
		background: SRgbCoordinates,
		on_background: SRgbCoordinates,
		
		surface: SRgbCoordinates,
		on_surface: SRgbCoordinates,
		surface_variant: SRgbCoordinates,
		on_surface_variant: SRgbCoordinates,
		
		outline: SRgbCoordinates,
		outline_variant: SRgbCoordinates,
		
		shadow: SRgbCoordinates,
		scrim: SRgbCoordinates,
		
		inverse_surface: SRgbCoordinates,
		inverse_on_surface: SRgbCoordinates,
		
		inverse_primary: SRgbCoordinates,
		
		palettes: Palettes
	)
	{
		super
		(
			primary,
			on_primary,
			primary_container,
			on_primary_container,
			
			secondary,
			on_secondary,
			secondary_container,
			on_secondary_container,
			
			tertiary,
			on_tertiary,
			tertiary_container,
			on_tertiary_container,
			
			error,
			on_error,
			error_container,
			on_error_container,
			
			background,
			on_background,
			
			surface,
			on_surface,
			surface_variant,
			on_surface_variant,
			
			outline,
			outline_variant,
			
			shadow,
			scrim,
			
			inverse_surface,
			inverse_on_surface,
			
			inverse_primary,
			
			palettes.primary.key_colour().into_alpha_srgb_space_coordinate(),
			palettes.secondary.key_colour().into_alpha_srgb_space_coordinate(),
			palettes.tertiary.key_colour().into_alpha_srgb_space_coordinate(),
			palettes.neutral.key_colour().into_alpha_srgb_space_coordinate(),
			palettes.neutral_variant.key_colour().into_alpha_srgb_space_coordinate(),
			
			
			null,
			null,
			
			null,
			null,
			null,
			null,
			null,
			
			null,
			
			null,
			null,
			null,
			null,
			
			null,
			null,
			null,
			null,
			
			null,
			null,
			null,
			null,
		)
	}
	
	public static generate(palettes: Palettes): ThemePair<StaticScheme>
	{
		return new ThemePair(StaticScheme.#dark(palettes), StaticScheme.#light(palettes))
	}
	
	static #dark(palettes: Palettes): StaticScheme
	{
		return StaticScheme.#create(palettes, StaticScheme.#DarkTones)
	}
	
	static #light(palettes: Palettes): StaticScheme
	{
		return StaticScheme.#create(palettes, StaticScheme.#LightTones)
	}
	
	static #create(palettes: Palettes, tones: SchemeLike<Tone>): StaticScheme
	{
		const primary = palettes.primary
		const secondary = palettes.secondary
		const tertiary = palettes.tertiary
		const error = palettes.error
		const neutral = palettes.neutral
		const neutral_variant = palettes.neutral_variant
		
		return new StaticScheme
		(
			primary.with_tone_in_alpha_srgb_space(tones.primary),
			primary.with_tone_in_alpha_srgb_space(tones.on_primary),
			primary.with_tone_in_alpha_srgb_space(tones.primary_container),
			primary.with_tone_in_alpha_srgb_space(tones.on_primary_container),
			
			secondary.with_tone_in_alpha_srgb_space(tones.secondary),
			secondary.with_tone_in_alpha_srgb_space(tones.on_secondary),
			secondary.with_tone_in_alpha_srgb_space(tones.secondary_container),
			secondary.with_tone_in_alpha_srgb_space(tones.on_secondary_container),
			
			tertiary.with_tone_in_alpha_srgb_space(tones.tertiary),
			tertiary.with_tone_in_alpha_srgb_space(tones.on_tertiary),
			tertiary.with_tone_in_alpha_srgb_space(tones.tertiary_container),
			tertiary.with_tone_in_alpha_srgb_space(tones.on_tertiary_container),
			
			error.with_tone_in_alpha_srgb_space(tones.error),
			error.with_tone_in_alpha_srgb_space(tones.on_error),
			error.with_tone_in_alpha_srgb_space(tones.error_container),
			error.with_tone_in_alpha_srgb_space(tones.on_error_container),
			
			neutral.with_tone_in_alpha_srgb_space(tones.background),
			neutral.with_tone_in_alpha_srgb_space(tones.on_background),
			
			neutral.with_tone_in_alpha_srgb_space(tones.surface),
			neutral.with_tone_in_alpha_srgb_space(tones.on_surface),
			neutral.with_tone_in_alpha_srgb_space(tones.surface_variant),
			neutral_variant.with_tone_in_alpha_srgb_space(tones.on_surface_variant),
			
			neutral_variant.with_tone_in_alpha_srgb_space(tones.outline),
			neutral_variant.with_tone_in_alpha_srgb_space(tones.outline_variant),
			
			neutral.with_tone_in_alpha_srgb_space(tones.shadow),
			neutral.with_tone_in_alpha_srgb_space(tones.scrim),
			
			neutral.with_tone_in_alpha_srgb_space(tones.inverse_surface),
			neutral.with_tone_in_alpha_srgb_space(tones.inverse_on_surface),
			
			neutral.with_tone_in_alpha_srgb_space(tones.inverse_primary),
			
			palettes
		)
	}
	
	static readonly #DarkTones: SchemeLike<Tone> = new SchemeLike
	(
		Tone.T80,
		Tone.T20,
		Tone.T30,
		Tone.T90,
		Tone.T80,
		Tone.T20,
		Tone.T30,
		Tone.T90,
		Tone.T80,
		Tone.T20,
		Tone.T30,
		Tone.T90,
		Tone.T80,
		Tone.T20,
		Tone.T30,
		Tone.T80,
		Tone.T10,
		Tone.T90,
		Tone.T10,
		Tone.T90,
		Tone.T30,
		Tone.T80,
		Tone.T60,
		Tone.T30,
		Tone.T0,
		Tone.T0,
		Tone.T90,
		Tone.T20,
		Tone.T40
	)
	
	static readonly #LightTones: SchemeLike<Tone> = new SchemeLike
	(
		Tone.T40,
		Tone.T100,
		Tone.T90,
		Tone.T10,
		Tone.T40,
		Tone.T100,
		Tone.T90,
		Tone.T10,
		Tone.T40,
		Tone.T100,
		Tone.T90,
		Tone.T10,
		Tone.T40,
		Tone.T100,
		Tone.T90,
		Tone.T10,
		Tone.T99,
		Tone.T10,
		Tone.T99,
		Tone.T10,
		Tone.T90,
		Tone.T30,
		Tone.T50,
		Tone.T80,
		Tone.T0,
		Tone.T0,
		Tone.T20,
		Tone.T95,
		Tone.T80
	)
}
