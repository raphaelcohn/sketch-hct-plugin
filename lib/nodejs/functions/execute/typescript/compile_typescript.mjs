// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {join} from "node:path";
import {assert} from "../../assert.mjs";
import {stat_file} from "../../file_system/stat_file.mjs";
import {execute_npm_binary} from "../npm/index.mjs";

export function compile_typescript(root_folder_path, working_directory_folder_path)
{
	assert.is_absolute_path(root_folder_path)
	assert.is_non_empty_string(working_directory_folder_path)

	const [typescript_configuration_file_path, stat] = stat_file(join(working_directory_folder_path, "tsconfig.json"))
	if (stat === null)
	{
		throw new Error(`Missing typescript configuration file ${typescript_configuration_file_path}`)
	}
	const is_ok = (stat.isSymbolicLink() || stat.isFile()) && stat.is_readable()

	if (!is_ok)
	{
		throw new Error(`Typescript configuration file ${typescript_configuration_file_path} is either not a file or symbolic link or is not readable by the current process`)
	}

	return execute_npm_binary(root_folder_path, "typescript", "tsc", working_directory_folder_path)
}
