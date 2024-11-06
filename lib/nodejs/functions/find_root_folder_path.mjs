// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {assert_argv_has_at_least_two_arguments, assert_is_positive_integer} from "./assert.mjs";
import {dirname, join} from "node:path";

export function find_root_folder_path(depth)
{
	assert_is_positive_integer(depth)

	const { node_script_absolute_file_path } = assert_argv_has_at_least_two_arguments(depth)

	const parent_folder_path = dirname(node_script_absolute_file_path)
	const path_components = [parent_folder_path]
	for (let index = 0; index < depth; index++)
	{
		path_components.push("..")
	}

	return join(...path_components)
}
