// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {ui} from "sketch/ui";
import INPUT_TYPE = ui.INPUT_TYPE;
import SelectionInputOptions = ui.SelectionInputOptions

export function get_selection_from_user<A extends {}, Z extends string>(message: string, description: string, initial_value_index: number, possible_values_object: { [key in keyof A]: string }): keyof Z
{
	if (!Number.isInteger(initial_value_index) || Number.isNaN(initial_value_index) || initial_value_index < 0)
	{
		throw new RangeError(`initial_value_index ${initial_value_index} is not a zero or positive integer`)
	}
	
	const keys = Object.keys(possible_values_object)
	const number_of_keys = keys.length
	if (number_of_keys >= initial_value_index)
	{
		throw new RangeError(`initial_value_index ${initial_value_index} exceeds number of keys ${number_of_keys}`)
	}
	
	const selection_input_options =
	{
		description: description,
		type: INPUT_TYPE.selection,
		initialValue: keys[initial_value_index],
		possibleValues: keys,
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
	
	const key = result as keyof Z
	return key
}
