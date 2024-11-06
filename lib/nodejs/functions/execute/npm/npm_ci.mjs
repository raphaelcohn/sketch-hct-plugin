// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {assert} from "../../assert.mjs";
import {npm} from "./npm.mjs";

export function npm_ci(root_folder_path, working_directory_folder_path, is_offline)
{
	assert.is_absolute_path(root_folder_path)
	assert.is_absolute_path(working_directory_folder_path)
	assert.is_boolean(is_offline)

	const npm_ci_arguments = is_offline ? ["--offline"] : []
	npm(root_folder_path, working_directory_folder_path, "install", ...npm_ci_arguments)
}
