// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import type AbsoluteFilePath from "../file_system/AbsoluteFilePath.mts"
import type AbsoluteFolderPath from "../file_system/AbsoluteFolderPath.mts"
import FileName from "../file_system/FileName.mjs"

export default function execute(binary_name_or_binary_file_path: FileName | AbsoluteFilePath, working_directory: AbsoluteFolderPath, ...binary_arguments: string[]): string
{
	let file_path
	if (binary_name_or_binary_file_path instanceof FileName)
	{
		let which_file_path = binary_name_or_binary_file_path.which_binary_executable_on_path()
		if (which_file_path === null)
		{
			throw new Error(`${binary_name_or_binary_file_path.toString()} is not on the PATH`)
		}
		file_path = which_file_path
	}
	else
	{
		file_path = binary_name_or_binary_file_path
	}
	
	return file_path.execute(working_directory, ...binary_arguments)
}
