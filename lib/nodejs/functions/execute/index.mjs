// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {execFileSync} from "node:child_process";
import {FileEncodingOptions} from "../file_system/FileEncodingOptions.mjs";
import {assert} from "../assert.mjs";

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

export default function(binary_name_or_binary_file_path, working_directory_folder_path, ...binary_arguments)
{
	assert.is_non_empty_string(binary_name_or_binary_file_path)
	assert.is_non_empty_string(working_directory_folder_path)

	assert.is_string_array(binary_arguments)

	const options = Object.freeze(Object.assign
	(
		{
			cwd: working_directory_folder_path
		},
		ExecFileOptions
	))
	return execFileSync(binary_name_or_binary_file_path, binary_arguments, options)
}