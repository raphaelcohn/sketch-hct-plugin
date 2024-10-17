// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {sketch} from "sketch"
import {dom} from "sketch/dom"
import {ui} from "sketch/ui"
import ColorSpace = sketch.Document.ColorSpace
import Swatch = dom.Swatch
import {AlphaSRgbCoordinates} from "../domain/color_space/srgb";
import INPUT_TYPE = ui.INPUT_TYPE
import {HueChromaToneCoordinates, TonalPalette} from "../domain/color_space/hct";

export function example(context: SketchContext)
{
	// @ts-ignore
	const document: sketch.Document = sketch.fromNative(context.document)
	
	if (document.colorSpace != ColorSpace.sRGB)
	{
		ui.alert("Sketch HCT Plugin", "Document color space is not sRGB")
		return
	}
	
	const user_specified_source_color_srgba = get_user_specified_source_color()
	const user_specified_source_color_hct = HueChromaToneCoordinates.from_alpha_srgb_space(user_specified_source_color_srgba)
	const tonal_palette = user_specified_source_color_hct.tonal_palette
	const user_specified_source_key_color_hct = tonal_palette.key_colour()
	/*
		Given a color, we want to generate an entire palette of color swatches
		
		- primary, secondary, tertiary, netural, neutralVariant, error
		
		- the container color pairs and surface colors
		
		- the contrast variants
		
		Want to give alias names ("fix up aliases")
	
	
	 */
	
	//Swatch.from({ name: "HCT/Primary/T10", color: user_specified_source_color.to_lower_case_hexadecimal_string_alpha_last() })
	Swatch.from({ name: "HCT/Source", color: user_specified_source_color_srgba.to_lower_case_hexadecimal_string_alpha_last() })
	
	
}

function get_user_specified_source_color(): NonNullable<AlphaSRgbCoordinates>
{
	let hex_color_string: string = "#000000FF"
	
	const string_input_options =
	{
		description: "Can be any length of CSS hex-color, with or without a leading number sign (hash) and with or without transparency",
		
		type: INPUT_TYPE.string,
		
		initialValue: hex_color_string
	}
	
	const callback = (err: any, value?: string | undefined) =>
	{
		if (err)
		{
			return
		}
		if (value === undefined)
		{
			return
		}
		hex_color_string = value
	}
	
	// @ts-ignore
	ui.getInputFromUser("Please provide a source hexadecimal color", string_input_options, callback);
	return AlphaSRgbCoordinates.try_from_css_hex_color_or_hex_color(hex_color_string)
}
