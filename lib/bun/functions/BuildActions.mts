// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import type Folders from "./Folders.mts"
import AbsoluteFolderPath from "./file_system/AbsoluteFolderPath.mjs"
import install from "./execute/bun/install.mjs"
import BunAutomaticPackageInstallationOption from "./execute/bun/BunAutomaticPackageInstallationOption.mjs"
import BunOnlineChecksPreference from "./execute/bun/BunOnlineChecksPreference.mjs"
import eslint from "./execute/typescript/eslint.mjs"
import compile from "./execute/typescript/compile.mjs"
import PackageJson from "./json/package/PackageJson.mjs"
import bundle from "./execute/bun/bundle/bundle.mjs"

export class BuildActions
{
	readonly #folders;
	readonly #working_directory
	readonly #package_json
	
	constructor(folders: Folders)
	{
		this.#folders = folders
		this.#working_directory = AbsoluteFolderPath.current_working_directory()
		this.#package_json = PackageJson.for_project(folders)
	}

	public install_dependencies_reproducibily(this: this, online_or_offline: "online" | "offline"): void
	{
		this.#folders.node_modules_folder_path.remove_recursively_forcibly()
		
		const bun_install_arguments = ["--ignore-scripts", "--no-save"]
		
		let online_checks_preference
		if (online_or_offline === "offline")
		{
			online_checks_preference = BunOnlineChecksPreference.Offline
			bun_install_arguments.push("--frozen-lockfile")
		}
		else
		{
			online_checks_preference = BunOnlineChecksPreference.OnlineLatest
		}
		
		const options =
		{
			prefer_bun_runtime_for_scripts: true,
			
			prefer_bun_shell_for_scripts: true,
			
			automatic_package_installation: BunAutomaticPackageInstallationOption.AutomaticInstallationIfNoNodeModules,
			
			online_checks_preference,
		}
		
		install(this.#folders, AbsoluteFolderPath.current_working_directory(), options, ...bun_install_arguments)
	}
	
	public eslint_typescript(this: this): string
	{
		return eslint(this.#folders, this.#working_directory, this.#package_json)
	}
	
	public check_typescript(this: this): string
	{
		return compile(this.#folders, this.#working_directory, this.#package_json, "--noEmit")
	}
	
	public bundle(this: this, options: BunBundleOptions, base_url_for_source_map: string | undefined, relative_file_paths: string[][])
	{
		bundle(options, this.#package_json, )
	}
}
