// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import type {AbsoluteFolderPath} from "../../file_system/AbsoluteFolderPath.mjs";
import {bun_x} from "../index.mjs";
import type {Folders} from "../../Folders.mjs";

export function compile_typescript(folders: Folders, working_directory_folder_path: AbsoluteFolderPath, ...typescript_arguments: string[]): string
{
	const typescript_configuration_file_path = working_directory_folder_path.sub_file_path("tsconfig.json")
	
	if (!typescript_configuration_file_path.is_file_or_symlink_and_is_readable_and_not_executable())
	{
		throw new Error(`Missing typescript configuration file ${typescript_configuration_file_path} or it is not a file or symbolic link, or is is not readable, or it is executable`)
	}
	
	// TODO: Need to look up version from package.json, check package is in there - otherwise we're running wild!
	const version = "5.6.2"
	return bun_x(folders, working_directory_folder_path, true, "typescript", package_version, "tsc", ...typescript_arguments)
}
