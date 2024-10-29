// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {ui} from "sketch/ui";
import INPUT_TYPE = ui.INPUT_TYPE;
import StringInputOptions = ui.StringInputOptions;

export function get_string_from_user(message: string, description: string, initial_value: string): string
{
	const string_input_options =
	{
		description,
		type: INPUT_TYPE.string,
		initialValue: initial_value
	} as StringInputOptions<string>
	
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
	
	ui.getInputFromUser(message, string_input_options, callback)
	
	if (result === null)
	{
		throw new Error("Could not get string from user")
	}
	return result
}
