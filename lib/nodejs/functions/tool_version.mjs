// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {assert} from "./common/assert.mjs";
import {read_string_from_file} from "./file_system/read_string_from_file.mjs";

export function tool_version(root_folder_path, tool_name)
{
	assert.is_absolute_path(root_folder_path)
	assert.is_non_empty_string(tool_name)

	const [file_path, string] = read_string_from_file(root_folder_path, "versioning", tool_name)

	const tool_version = string.split("\n")[0];
	if (tool_version.length === 0)
	{
		throw new Error(`${tool_name} has an empty version in ${file_path}`);
	}
	return tool_version
}
