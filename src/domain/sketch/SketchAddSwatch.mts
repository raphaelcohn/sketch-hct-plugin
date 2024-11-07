// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {dom as dom_} from "sketch/dom";
const dom: typeof dom_ = require("sketch/dom");
const Swatch = dom.Swatch
import type {AlphaSRgbCoordinates} from "../color_space/srgb/AlphaSRgbCoordinates.mts";
import type {AddSwatch} from "../theme/AddSwatch.mts";

export class SketchAddSwatch implements AddSwatch
{
	readonly #document: dom_.Document
	
	public constructor(document: dom_.Document)
	{
		this.#document = document
	}
	
	public add_swatch(swatch_hierarchial_name: string, color: AlphaSRgbCoordinates): void
	{
		const swatches = this.#document.swatches;
		
		let replaced = false
		swatches.forEach((value: dom_.Swatch, _index: number, _array: dom_.Swatch[]) =>
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
