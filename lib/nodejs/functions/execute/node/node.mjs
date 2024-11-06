// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {join} from "node:path";
import {assert} from "../../assert.mjs";
import {execute_nodejs_supplied_binary} from "./execute_nodejs_supplied_binary.mjs";

export function node(root_folder_path, working_directory_folder_path, script_path, ...script_arguments)
{
	assert.is_absolute_path(root_folder_path)
	assert.is_non_empty_string(working_directory_folder_path)
	assert.is_string_array(script_path)
	
	return execute_nodejs_supplied_binary(root_folder_path, "node", ...[join(...script_path), ...script_arguments])
}
