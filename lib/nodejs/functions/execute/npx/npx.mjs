// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {assert} from '../../common/assert.mjs';

export function npx(root_folder_path, working_directory_folder_path, ...npx_arguments)
{
	assert.is_absolute_path(root_folder_path)
	assert.is_non_empty_string(working_directory_folder_path)
	assert.is_string_array(npx_arguments)

	throw new Error("Unsupported; prefer the use of the function `execute_npm_binary()`")
}
