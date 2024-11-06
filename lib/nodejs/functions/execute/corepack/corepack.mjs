// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {assert} from "../../../../../../lib/nodejs/functions/assert.mjs";
import {execute_nodejs_supplied_binary} from "../../../../../../lib/nodejs/functions/execute/node/execute_nodejs_supplied_binary.mjs";

export function corepack(root_folder_path, working_directory_folder_path, ...corepack_arguments)
{
	assert.is_absolute_path(root_folder_path)
	assert.is_non_empty_string(working_directory_folder_path)
	assert.is_string_array(corepack_arguments)

	return execute_nodejs_supplied_binary(root_folder_path, "corepack", ...corepack_arguments)
}
