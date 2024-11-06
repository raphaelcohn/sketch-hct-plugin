// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {execFileSync} from "node:child_process";
import {join} from "node:path";
import {assert_is_non_empty_string, assert_is_string_array} from "./assert.mjs";
import {FileEncodingOptions} from "./FileEncodingOptions.mjs";

const TimeoutInMilliseconds = 60_000

const ExecFileOptions = Object.freeze
(
	Object.assign
	(
		{
			shell: false,
			timeout: TimeoutInMilliseconds,
		},
		FileEncodingOptions
	)
)

export function execute_typescript(working_directory_folder_path)
{
	assert_is_non_empty_string(working_directory_folder_path)

	const _ = execute("tsc", working_directory_folder_path)
}

export function execute_node(working_directory_folder_path, ...script_path)
{
	assert_is_non_empty_string(working_directory_folder_path)
	assert_is_string_array(script_path)

	const _ = execute("node", join(...script_path))
}

export function execute_npm_binary(package_name, script_name, working_directory_folder_path, ...script_arguments)
{
	assert_is_non_empty_string(package_name)
	assert_is_non_empty_string(script_name)
	assert_is_non_empty_string(working_directory_folder_path)
	assert_is_string_array(script_arguments)

	const exec_arguments =
	[
		"exec",
		`--package=${package_name}`,
		"--",
		script_name,
	]
	exec_arguments.push(...script_arguments)

	const _ = execute("npm", working_directory_folder_path, ...exec_arguments)
}

export function execute(binary_name_or_binary_file_path, working_directory_folder_path, ...binary_arguments)
{
	assert_is_non_empty_string(binary_name_or_binary_file_path)
	assert_is_non_empty_string(working_directory_folder_path)

	assert_is_string_array(binary_arguments)

	const options = Object.freeze(Object.assign
	(
		{
			cwd: working_directory_folder_path
		},
		ExecFileOptions
	))
	return execFileSync(binary_name_or_binary_file_path, binary_arguments, options)
}
