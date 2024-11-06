// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {assert} from "../assert.mjs";
import {read_string_from_file} from "./read_string_from_file.mjs";

export function read_json_from_file(...file_path_components)
{
	assert.is_string_array(file_path_components)

	const [file_path, string] = read_string_from_file(...file_path_components)

	let json
	try
	{
		json = JSON.parse(string)
	}
	catch(cause)
	{
		throw new Error(`Could parse JSON at ${file_path}`, {cause})
	}

	return [file_path, json]
}
