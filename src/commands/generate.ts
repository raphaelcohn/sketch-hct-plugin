// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.


const ui = require('sketch/ui')
const sketch = require('sketch')
const ColorSpace = sketch.Document.ColorSpace

//import {MaterialThemeBuilderUrlParser} from "../domain/theme/material-theme-builder-url-parser/MaterialThemeBuilderUrlParser";
//import {get_string_from_user} from "../domain/sketch/get_string_from_user";
import {get_selection_from_user} from "../domain/sketch/get_selection_from_user";
// import {SwatchGenerator} from "../domain/sketch/SwatchGenerator";
// import {SketchAddSwatch} from "../domain/sketch/SketchAddSwatch";

const YesNo: Map<string, boolean> = new Map<string, boolean>([["Yes", true], ["No", false]])

export function generate(_context: SketchContext)
{
	// @ts-ignore
	const document: sketch.Document = sketch.fromNative(context.document)
	if (document.colorSpace != ColorSpace.sRGB)
	{
		ui.alert("Material Theme Builder", "Document color space is not sRGB")
		return
	}
	
	//const url_string = get_string_from_user("Material Theme Builder", "Supply the material design theme URL that is copied to the clipboard (from https://material-foundation.github.io/material-theme-builder/)", MaterialThemeBuilderUrlParser.DefaultUrlString)
	const harmonize_custom_colors = get_selection_from_user("Material Theme Builder", "Harmonize custom colors (not preserved by Material Theme Builder URL)?", YesNo, "Yes")
	
	ui.alert("Debugging", `${harmonize_custom_colors}`)
	
	// const parser = MaterialThemeBuilderUrlParser.from_url_string(url_string)
	// const material_theme_input = parser.parse(harmonize_custom_colors)
	//
	// //const static_theme = material_theme_input.into_static_theme()
	// const dynamic_theme = material_theme_input.into_dynamic_theme()
	//
	// const swatch_generator = new SwatchGenerator(dynamic_theme, new SketchAddSwatch(document))
	// swatch_generator.generate()
}
