// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {join} from "node:path";
import {assert} from "../../assert.mjs";
import execute from "../index.mjs";

export function execute_nodejs_supplied_binary(root_folder_path, nodejs_supplied_binary_name, working_directory_folder_path, ...nodejs_supplied_binary_arguments)
{
	assert.is_absolute_path(root_folder_path)
	assert.is_string_enum(nodejs_supplied_binary_name, "corepack", "node", "npm", "npx")
	assert.is_absolute_path(working_directory_folder_path)
	assert.is_string_array(nodejs_supplied_binary_arguments)

	return execute(join(root_folder_path, "libexec", "nodejs", nodejs_supplied_binary_name), working_directory_folder_path, ...nodejs_supplied_binary_arguments)
}
