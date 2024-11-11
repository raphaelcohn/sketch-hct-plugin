// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import type Folders from "../../Folders.mjs"
import type AbsoluteFolderPath from "../../file_system/AbsoluteFolderPath.mjs"
import type BunReproducibilityOptions from "./BunReproducibilityOptions"
import assert from "../../common/assert.mjs"
import BunAutomaticPackageInstallationOption from "./BunAutomaticPackageInstallationOption.mjs"
import BunOnlineChecksPreference from "./BunOnlineChecksPreference.mjs"

/**
 * @internal
 * @param {Folders} folders
 * @param {AbsoluteFolderPath} working_directory
 * @param {BunReproducibilityOptions} options
 * @param {string} subcommand
 * @param {string} subcommand_arguments
 * @returns {string}
 */
export default function bun(folders: Folders, working_directory: AbsoluteFolderPath, options: BunReproducibilityOptions, subcommand: "add" | "build" | "create" | "exec" | "init" | "install" | "link" | "outdated" | "patch" | "pm" | "publish" | "remove" | "repl" | "run" | "test" | "update" | "upgrade" | "x", ...subcommand_arguments: string[]): string
{
	assert.is_non_empty_string(subcommand)
	
	const bun_arguments = [subcommand as string]
	let automatic_package_installation_argument
	switch (options.automatic_package_installation)
	{
		case BunAutomaticPackageInstallationOption.Off:
			automatic_package_installation_argument = "--no-install"
			break
		
		case BunAutomaticPackageInstallationOption.AutomaticInstallationIfNoNodeModules:
			automatic_package_installation_argument = "--install=auto"
			break
		
		case BunAutomaticPackageInstallationOption.FallbackInstallationMissingPackagesOnly:
			automatic_package_installation_argument = "--install=fallback"
			break
		
		case BunAutomaticPackageInstallationOption.ForceInstallationAlways:
			automatic_package_installation_argument = "--install=force"
			break
		
		default:
			throw new RangeError(`options.automatic_package_installation is out of range`)
	}
	bun_arguments.push(automatic_package_installation_argument)
	
	switch (options.online_checks_preference)
	{
		case BunOnlineChecksPreference.Offline:
			bun_arguments.push("--prefer-offline")
			break
		
		case BunOnlineChecksPreference.Neither:
			break
		
		case BunOnlineChecksPreference.OnlineLatest:
			bun_arguments.push("--prefer-latest")
			break
		
		default:
			throw new RangeError(`options.online_checks_preference is out of range`)
	}
	
	if (options.prefer_bun_runtime_for_scripts)
	{
		bun_arguments.push("--index")
	}
	
	if (options.prefer_bun_shell_for_scripts)
	{
		bun_arguments.push("--shell")
	}
	
	bun_arguments.push(...subcommand_arguments)
	
	return folders.binary_file_path("index").execute(working_directory, ...bun_arguments)
}
