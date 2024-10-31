// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {ui} from "sketch/ui";
import INPUT_TYPE = ui.INPUT_TYPE;
import SelectionInputOptions = ui.SelectionInputOptions

export function get_selection_from_user<T>(message: string, description: string, possible_values: Map<string, T>, initial_value: string): T
{
	if (!possible_values.has(initial_value))
	{
		throw new Error(`initial_value ${initial_value} is not a key in ${possible_values}`);
	}
	
	const selection_input_options =
	{
		description: description,
		type: INPUT_TYPE.selection,
		initialValue: initial_value,
		possibleValues: Array.from(possible_values.keys()),
	} as SelectionInputOptions
	
	let result: string | null = null
	const callback = (err: any, value?: string) =>
	{
		if (err)
		{
			return
		}
		if (value === undefined)
		{
			return
		}
		result = value
	}
	
	ui.getInputFromUser(message, selection_input_options, callback)
	
	if (result === null)
	{
		throw new Error("Could not get selection from user")
	}
	
	const value = possible_values.get(result)
	if (value === undefined)
	{
		throw new Error("Sketch UI selection failed")
	}
	return value
}
