// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {assert} from "../common/assert.mjs";
import {FileEncodingOptions} from "./FileEncodingOptions.mjs";
import {readdirSync} from "node:fs";

const ReadDirOptions = Object.freeze(Object.assign
(
	{
		withFileTypes: true,
		recursive: false
	},
	FileEncodingOptions
))

export function read_folder(folder_path, dirent_user_callback)
{
	assert.is_non_empty_string(folder_path)

	let files
	try
	{
		files = readdirSync(folder_path, ReadDirOptions)
	}
	catch(error)
	{
		throw new Error(`Could not read the directory in path ${folder_path}`, { cause: error })
	}

	for (let dirent of files)
	{
		dirent_user_callback(dirent)
	}
}
