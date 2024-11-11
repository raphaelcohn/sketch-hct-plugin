// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import type Folders from "../../Folders.mts"
import type AbsoluteFolderPath from "../../file_system/AbsoluteFolderPath.mts"
import PackageJson from "../../json/package/PackageJson.mjs"
import x from "../bun/x.mjs"
import FileName from "../../file_system/FileName.mjs"

export default function eslint(folders: Folders, working_directory: AbsoluteFolderPath, package_json: PackageJson, ...eslint_arguments: string[]): string
{
	const typescript_configuration_file_path = working_directory.with_file_name(FileName.tsconfig_json)
	if (!typescript_configuration_file_path.is_file_or_symlink_and_is_readable_and_not_executable())
	{
		throw new Error(`Missing typescript configuration file ${typescript_configuration_file_path} or it is not a file or symbolic link, or is is not readable, or it is executable`)
	}
	
	const eslint_configuration_file_path = working_directory.with_file_name(FileName.eslint_config)
	if (!eslint_configuration_file_path.is_file_or_symlink_and_is_readable_and_not_executable())
	{
		throw new Error(`Missing eslint configuration file ${eslint_configuration_file_path} or it is not a file or symbolic link, or is is not readable, or it is executable`)
	}
	
	const options =
	{
		prefer_bun_runtime_for_scripts: true,
		
		prefer_bun_shell_for_scripts: true,
	}
	
	return x(folders, working_directory, options, "typescript-eslint", package_json, "eslint", ...eslint_arguments)
}
