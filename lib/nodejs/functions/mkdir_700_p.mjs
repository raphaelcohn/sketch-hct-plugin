// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {mkdirSync} from "fs";
import {assert_is_string_array} from "./assert.mjs";
import {join} from "node:path";

const MkdirOptions = Object.freeze({ recursive: true, mode: 0o755 })

export function mkdir_700_p(...folder_path_components)
{
	assert_is_string_array(folder_path_components)
	const folder_path = join(...folder_path_components)
	let first_folder_path_created
	try
	{
		first_folder_path_created = mkdirSync(folder_path, MkdirOptions)
	}
	catch(cause)
	{
		throw new Error(`Could not mkdir -p ${folder_path}`, {cause})
	}

	return [folder_path, first_folder_path_created === undefined ? null: first_folder_path_created]
}
