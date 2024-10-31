// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {AlphaSRgbCoordinates, SRgbCoordinates} from "../../color_space/srgb";
import {Blend} from "@material/material-color-utilities/blend/blend";
import {argb} from "../../color_space/srgb";
import {CustomColorSchemeLike} from "../CustomColorSchemeLike";
import {TonalPalette} from "../../color_space/hct";
import {CustomColorColors} from "../CustomColorColors";
import {SwatchPaletteName} from "../SwatchPaletteName";

export class CustomColorValue
{
	public constructor(readonly color: SRgbCoordinates, readonly harmonize: boolean)
	{
	}
	
	public generate_scheme(this: NonNullable<this>, custom_color_name: string, theme_source_color: SRgbCoordinates, is_content: boolean): CustomColorColors
	{
		CustomColorValue.#guard_custom_color_name(custom_color_name)
		
		const harmonized_color = this.harmonized(theme_source_color)
		
		const key_color = harmonized_color.into_opaque().into_hue_chroma_tone_coordinates().tonal_palette.key_colour().into_alpha_srgb_space_coordinate()
		
		
		return new CustomColorColors
		(
			custom_color_name,
			this.color,
			harmonized_color,
			key_color,
			CustomColorSchemeLike.generate(TonalPalette.from_srgb_space(harmonized_color), is_content)
		)
	}
	
	public harmonized(source: SRgbCoordinates): SRgbCoordinates
	{
		if (this.harmonize)
		{
			const from = this.#into_argb()
			const to = source.into_argb()
			const blended: argb = Blend.harmonize(from, to);
			return AlphaSRgbCoordinates.from_argb(blended)
		}
		else
		{
			return this.color
		}
	}
	
	#into_argb(this: NonNullable<this>): argb
	{
		return this.color.into_argb()
	}
	
	static #guard_custom_color_name(custom_color_name: string)
	{
		Object.values(SwatchPaletteName).forEach((value: string, _index: number, _array: string[]) =>
		{
			if (value === custom_color_name)
			{
				throw new RangeError(`Custom color name ${custom_color_name} is not valid`)
			}
		})
	}
}
