// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {sketch} from "sketch"
import {dom} from "sketch/dom"
import {ui} from "sketch/ui"
import {AlphaSRgbCoordinates} from "../domain/color_space/srgb";
import {HueChromaToneCoordinates} from "../domain/color_space/hct";
import {Scheme, SchemeGenerationRule} from "../domain/scheme";
import {get_string_from_user} from "../domain/sketch/get_string_from_user";
import {get_selection_from_user} from "../domain/sketch/get_selection_from_user";
import {ContrastLevel} from "../domain/contrast";
import ColorSpace = sketch.Document.ColorSpace;
import Swatch = dom.Swatch;

export function example(context: SketchContext)
{
	const document: sketch.Document = sketch.fromNative(context.document)
	
	if (document.colorSpace != ColorSpace.sRGB)
	{
		ui.alert("Sketch HCT Plugin", "Document color space is not sRGB")
		return
	}
	
	const user_specified_scheme_generation_rule = get_user_specified_scheme_generation_rule()
	const user_specified_source_color_srgba = get_user_specified_source_color()
	const user_specified_source_color_hct = HueChromaToneCoordinates.from_alpha_srgb_space(user_specified_source_color_srgba)
	
	const scheme = Scheme.generate(user_specified_scheme_generation_rule, user_specified_source_color_hct)
	
	const color = scheme.swatch_color_pair(PrimaryPaletteKeyColor, ContrastLevel.Normal)
	
	
	
	
	//Swatch.from({ name: "HCT/Primary/T10", color: user_specified_source_color.to_lower_case_hexadecimal_string_alpha_last() })
	Swatch.from({ name: "HCT/Source", color: user_specified_source_color_srgba.to_lower_case_hexadecimal_string_alpha_last() })
	
	
}

function get_user_specified_scheme_generation_rule(): NonNullable<SchemeGenerationRule>
{
	let x = get_selection_from_user("Choose scheme generation rule", "A scheme generation rule controls how the source color is converted into hue and chroma for the primary, secondary, tertiary, neutral and neutral variant palettes", 4, SchemeGenerationRule)
	let z = SchemeGenerationRule[x as keyof typeof SchemeGenerationRule] as SchemeGenerationRule
	return z
}

function get_user_specified_source_color(): NonNullable<AlphaSRgbCoordinates>
{
	const InitialHexColorString = "#000000FF"
	const hex_color_string = get_string_from_user("Please provide a source hexadecimal color", "Please provide a source hexadecimal color", InitialHexColorString)
	return AlphaSRgbCoordinates.try_from_css_hex_color_or_hex_color(hex_color_string)
}
