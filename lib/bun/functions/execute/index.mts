// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {AbsoluteFilePath} from "../file_system/AbsoluteFilePath.mjs";
import type {AbsoluteFolderPath} from "../file_system/AbsoluteFolderPath.mjs";
import {assert} from "../common/assert.mjs";
import type {Folders} from "../Folders.mjs";
import {PackageJson} from "../PackageJson.mjs";

export default function(binary_name_or_binary_file_path: string | AbsoluteFilePath, working_directory_folder_path: AbsoluteFolderPath, ...binary_arguments: string[]): string
{
	let file_path
	if (typeof(binary_name_or_binary_file_path) === "string")
	{
		file_path = AbsoluteFilePath.which(binary_name_or_binary_file_path)
	}
	else
	{
		file_path = binary_name_or_binary_file_path
	}
	
	return file_path.execute(working_directory_folder_path, ...binary_arguments)
}

export function bun_x(folders: Folders, working_directory_folder_path: AbsoluteFolderPath, prefer_bun_over_nodejs: boolean, package_name: string, binary_name: string, ...binary_arguments: string[]): string
{
	assert.is_non_empty_string(package_name)
	assert.is_non_empty_string(package_version)
	
	folders.package_json_file_path().read_json_from()
	
	xxxx
	
	const bun_x_arguments = prefer_bun_over_nodejs ? ["--bun"] : []
	bun_x_arguments.push(...[`${package_name}@${package_version}`, binary_name, ...binary_arguments])
	return bun(folders, working_directory_folder_path, "x", ...bun_x_arguments)
}

export function bun(folders: Folders, working_directory_folder_path: AbsoluteFolderPath, subcommand: string, ...bun_arguments: string[]): string
{
	assert.is_non_empty_string(subcommand)
	
	return folders.binary_file_path("bun").execute(working_directory_folder_path, ...[subcommand, ...bun_arguments])
}
