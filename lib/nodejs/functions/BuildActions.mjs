// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {copy_recursive_forcibly} from "./file_system/copy_recursive_forcibly.mjs";
import {assert} from "./common/assert.mjs";
import {npm_cache_clean_forcibly, npm_ci, npm_install} from "./execute/npm/index.mjs";
import {remove_file} from "./file_system/remove_file.mjs";
import {tool_version} from "./tool_version.mjs";
import {stat_file} from "./file_system/stat_file.mjs";

export class BuildActions
{
	constructor(root_folder_path)
	{
		assert.is_absolute_path(root_folder_path)

		this._root_folder_path = root_folder_path
	}

	install_dependencies_reproducibily(online_or_offline)
	{
		assert.is_instance_of(this, BuildActions)
		assert.is_string_enum(online_or_offline, "online", "offline")

		if (online_or_offline === "online")
		{
			this._install_dependencies_reproducibly_online()
		}

		npm_ci(this._root_folder_path, this._root_folder_path, online_or_offline === "offline")

		this._npm_install_node_modules_patch()
	}

	_install_dependencies_reproducibly_online()
	{
		assert.is_instance_of(this, BuildActions)

		npm_cache_clean_forcibly(this._root_folder_path, this._root_folder_path)

		try
		{
			const _ = remove_file(this._root_folder_path, "node_modules")
		}
		catch
		{
		}

		const npm_before_iso_date_time = tool_version(this._root_folder_path, "npm-before")

		npm_install(this._root_folder_path, this._root_folder_path, "--package-lock-only", `--before=${npm_before_iso_date_time}`)
	}

	static _node_modules = "node_modules"

	_npm_install_node_modules_patch()
	{
		assert.is_instance_of(this, BuildActions)

		const [folder_path, stat] = stat_file(this._root_folder_path, `${BuildActions._node_modules}.patches`)
		if (stat !== null && (stat.isDirectory() || stat.isSymbolicLink()))
		{
			copy_recursive_forcibly([folder_path], [this._root_folder_path, BuildActions._node_modules])
		}
	}
}
