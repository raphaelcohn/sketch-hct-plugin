// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {AlphaSRgbCoordinates} from "../color_space/srgb";
import {AddSwatch} from "../theme/AddSwatch";

const dom = require("sketch/dom");
const Swatch = dom.Swatch

import {dom as typescript_dom} from "sketch/dom";
type Document = typescript_dom.Document
type Swatch = typescript_dom.Swatch

export class SketchAddSwatch implements AddSwatch
{
	readonly #document: Document
	
	public constructor(document: Document)
	{
		this.#document = document
	}
	
	public add_swatch(swatch_hierarchial_name: string, color: AlphaSRgbCoordinates): void
	{
		const swatches = this.#document.swatches;
		
		let replaced = false
		swatches.forEach((value: Swatch, _index: number, _array: Swatch[]) =>
		{
			if (value.name === swatch_hierarchial_name)
			{
				value.color = color.to_lower_case_hexadecimal_string_alpha_last()
				replaced = true
			}
		})
		
		if (!replaced)
		{
			const swatch = Swatch.from({ name: swatch_hierarchial_name, color: color.to_lower_case_hexadecimal_string_alpha_last() })
			swatches.push(swatch)
		}
    }
}
