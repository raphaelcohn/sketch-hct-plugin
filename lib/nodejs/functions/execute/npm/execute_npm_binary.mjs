// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {PackageJson} from "../../PackageJson.mjs";
import {assert} from "../../assert.mjs";
import {npm} from "./npm.mjs";

export function execute_npm_binary(root_folder_path, package_name, script_name, working_directory_folder_path, ...script_arguments)
{
	assert.is_absolute_path(root_folder_path)
	assert.is_non_empty_string(package_name)
	assert.is_non_empty_string(script_name)
	assert.is_absolute_path(working_directory_folder_path)
	assert.is_string_array(script_arguments)

	let version

	try
	{
		version = PackageJson.new(root_folder_path).devDependencies.string_field(package_name)
	}
	catch(cause)
	{
		throw new Error(`The package ${package_name} is not a dependency in package.json's devDependencies`)
	}

	return npm(root_folder_path, working_directory_folder_path, "exec", ...[`--package=${package_name}@${version}`, "--no", "--", script_name, ...script_arguments])
}
