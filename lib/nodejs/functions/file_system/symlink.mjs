// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {assert} from "../common/assert.mjs";
import {join} from "node:path";
import {symlinkSync} from "node:fs";

export function symlink(path_value, ...write_to_file_path_components)
{
	assert.is_non_empty_string(path_value)
	assert.is_string_array(write_to_file_path_components)

	const file_path = join(...write_to_file_path_components)
	try
	{
		symlinkSync(path_value, file_path, null)
	}
	catch(cause)
	{
		throw new Error(`Could not create symlink at ${file_path}`, {cause})
	}
	return file_path
}
