// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {assert} from "../assert.mjs";
import {join} from "node:path";
import {writeFileSync} from "node:fs";
import {FileEncodingOptions} from "./FileEncodingOptions.mjs";

const FileWriteOptions = Object.freeze(Object.assign
(
	{
		mode: 0o600,
		flag: 'w',
		flush: true
	},
	FileEncodingOptions
))

export function write_string_to_file(string, ...file_path_components)
{
	assert.is_string(string)
	assert.is_string_array(file_path_components)

	const file_path = join(...file_path_components)

	const data = JSON.stringify(this._manifest_json)
	try
	{
		writeFileSync(file_path, data, FileWriteOptions)
	}
	catch (error)
	{
		throw new Error(`Could not write to ${file_path}`)
	}
	return file_path
}
