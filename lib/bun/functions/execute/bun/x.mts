// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import type Folders from "../../Folders.mts"
import type AbsoluteFolderPath from "../../file_system/AbsoluteFolderPath.mts"
import type BunRuntimeOptimizationOptions from "./BunRuntimeOptimizationOptions.d.ts"
import PackageJson from "../../json/package/PackageJson.mjs"
import assert from "../../common/assert.mjs"
import bun from "./index.mjs"
import BunAutomaticPackageInstallationOption from "./BunAutomaticPackageInstallationOption.mjs"
import BunOnlineChecksPreference from "./BunOnlineChecksPreference.mjs"

export default function x(folders: Folders, working_directory: AbsoluteFolderPath, runtime_optimization_options: BunRuntimeOptimizationOptions, package_name: string, package_json: PackageJson, binary_name: string, ...binary_arguments: string[]): string
{
	assert.is_non_empty_string(package_name)
	assert.is_non_empty_string(binary_name)
	
	const package_version = package_json.devDependencies.string_field(package_name)
	
	const options =
	{
		...runtime_optimization_options,
		
		automatic_package_installation: BunAutomaticPackageInstallationOption.Off,
		
		online_checks_preference: BunOnlineChecksPreference.Offline,
	}
	
	return bun(folders, working_directory, options, "x", ...[`${package_name}@${package_version}`, binary_name, ...binary_arguments])
}
