// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {assert} from "../common/assert.mjs";
import {join} from "node:path";
import {readFileSync} from "node:fs";
import {FileEncodingOptions} from "./FileEncodingOptions.mjs";

const ReadFileOptions = Object.freeze(Object.assign
(
	{
		flag: 'r'
	},
	FileEncodingOptions
))

export function read_string_from_file(...file_path_components)
{
	assert.is_non_empty_string_array(file_path_components)

	const file_path = join(...file_path_components)

	let string
	try
	{
		string = readFileSync(file_path, ReadFileOptions)
	}
	catch(cause)
	{
		throw new Error(`Could not read JSON file at ${file_path}`, {cause})
	}

	return [file_path, string]
}
