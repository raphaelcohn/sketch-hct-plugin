// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {TonalPalette, Tone} from "../color_space/hct";
import {ThemePair} from "../scheme";
import {SRgbCoordinates} from "../color_space/srgb";

export class CustomColorSchemeLike<X>
{
	constructor
	(
		readonly color: X,
		readonly on_color: X,
		readonly color_container: X,
		readonly on_color_container: X,
	)
	{
	}
	
	public static generate(tonal_palette: TonalPalette, is_content: boolean): ThemePair<CustomColorSchemeLike<SRgbCoordinates>>
	{
		return new ThemePair(CustomColorSchemeLike.#dark(tonal_palette, is_content), CustomColorSchemeLike.#light(tonal_palette, is_content))
	}
	
	static #dark(tonal_palette: TonalPalette, is_content: boolean): CustomColorSchemeLike<SRgbCoordinates>
	{
		return CustomColorSchemeLike.#create(tonal_palette, is_content, CustomColorSchemeLike.#DarkTones)
	}
	
	static #light(tonal_palette: TonalPalette, is_content: boolean): CustomColorSchemeLike<SRgbCoordinates>
	{
		return CustomColorSchemeLike.#create(tonal_palette, is_content, CustomColorSchemeLike.#LightTones)
	}
	
	static #create(tonal_palette: TonalPalette, is_content: boolean, tones: CustomColorSchemeLike<Tone>): CustomColorSchemeLike<SRgbCoordinates>
	{
		const primary = tonal_palette.container(is_content);
		return new CustomColorSchemeLike
		(
			primary.with_tone_in_alpha_srgb_space(tones.color),
			primary.with_tone_in_alpha_srgb_space(tones.on_color),
			primary.with_tone_in_alpha_srgb_space(tones.color_container),
			primary.with_tone_in_alpha_srgb_space(tones.on_color_container),
		)
	}
	
	static readonly #DarkTones: CustomColorSchemeLike<Tone> = new CustomColorSchemeLike
	(
		Tone.T80,
		Tone.T20,
		Tone.T30,
		Tone.T90,
	)
	
	static readonly #LightTones: CustomColorSchemeLike<Tone> = new CustomColorSchemeLike
	(
		Tone.T40,
		Tone.T100,
		Tone.T90,
		Tone.T10,
	)
}
