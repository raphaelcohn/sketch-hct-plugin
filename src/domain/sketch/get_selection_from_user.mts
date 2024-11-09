// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import type { ui as ui_ } from "sketch/ui"

const ui = require("sketch/ui") as typeof ui_
const INPUT_TYPE = ui.INPUT_TYPE

export function get_selection_from_user<T>(message: string, description: string, possible_values: Map<string, T>, initial_value: string): [string, T]
{
	if (!possible_values.has(initial_value))
	{
		throw new Error(`initial_value ${initial_value} is not a key in possible_values`);
	}
	
	const selection_input_options =
	{
		description: description,
		type: INPUT_TYPE.selection,
		initialValue: initial_value,
		possibleValues: Array.from(possible_values.keys()),
	} as ui_.SelectionInputOptions
	
	let result: string | null
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const callback = (err: any, value?: string) =>
	{
		if (err)
		{
			result = null
		}
		else if (value === undefined)
		{
			result = null
		}
		else
		{
			result = value
		}
	}
	
	ui.getInputFromUser(message, selection_input_options, callback)
	
	// @ts-ignore callback sets the value of result
	const result_hack = result
	if (result_hack === null)
	{
		throw new Error("Could not get selection from user")
	}
	const value = possible_values.get(result_hack)
	if (value === undefined)
	{
		throw new Error("Sketch UI selection failed")
	}
	return [result_hack, value]
}
