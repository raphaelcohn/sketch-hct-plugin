#!/usr/bin/env node
// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

'use strict'

const { unlinkSync } = require("node:fs")
const { join } = require('node:path')
const { env } = require('node:process')

import {symlink} from "../../lib/nodejs/functions/symlink.js";
import {execute, execute_node, execute_npm_binary, execute_typescript} from "../../lib/nodejs/functions/execute.mjs";
import {assert_argv_has_at_least_two_arguments, assert_is_string_enum, assert_is_this} from "../../lib/nodejs/functions/assert.mjs"
import {remove_file} from "../../lib/nodejs/functions/remove_file.mjs";
import {find_root_folder_path} from "../../lib/nodejs/functions/find_root_folder_path.mjs";
import {mkdir_700_p} from "../../lib/nodejs/functions/mkdir_700_p.mjs";
import {read_folder} from "../../lib/nodejs/functions/read_folder.mjs";
import {is_folder_or_symlink_and_is_readable_and_is_searchable, stat_file} from "../../lib/nodejs/functions/stat_file.mjs";

class Actions
{
	static _SketchPluginHomeFolderPath = join(env.HOME, "Library", "Application Support", "com.bohemiancoding.sketch3", "Plugins")

	constructor(root_folder_path, sketch_plugin_name)
	{
		this._root_folder_path = root_folder_path
		this._sketch_plugin_name = sketch_plugin_name
		this._sketch_plugin_main = `${this._sketch_plugin_name}.sketchplugin`
		this._sketch_plugin_build_output = join(env.TMPDIR, this._sketch_plugin_main)
	}

	install_dependencies_reproducibly(online_or_offline)
	{
		assert_is_this(this, Actions)
		assert_is_string_enum(online_or_offline, "online", "offline")

		const _ = execute(join(this._root_folder_path, "libexec", "nodejs", `npm-install-${online_or_offline}`))
		return this
	}

	compile_typescript()
	{
		assert_is_this(this, Actions)

		execute_typescript(this._root_folder_path)
		return this
	}

	remove_sketch_plugin_previous_build_output()
	{
		unlinkSync(this._sketch_plugin_build_output)
		return this
	}

	generate_manifest()
	{
		assert_is_this(this, Actions)

		execute_node(this._root_folder_path, "libexec", "skpm", "sketch-generate-manifest.js")
		return this
	}

	execute_skpm_build(...skpm_build_arguments)
	{
		assert_is_this(this, Actions)

		execute_npm_binary("@skpm/builder", "skpm-build", this._root_folder_path, ...skpm_build_arguments)
		return this
	}

	tidy_up_after_skpm_build()
	{
		assert_is_this(this, Actions)

		const _ = remove_file(this._sketch_plugin_build_output, "Resources", ".gitignore")
		return this
	}

	link_build_output()
	{
		assert_is_this(this, Actions)

		const [_, is_not_running_on_macos_desktop_with_sketch_installed] = !is_folder_or_symlink_and_is_readable_and_is_searchable(Actions._SketchPluginHomeFolderPath)
		if (is_not_running_on_macos_desktop_with_sketch_installed)
		{
			return
		}

		const [sketch_plugin_parent_folder, _first_folder_path_created] = mkdir_700_p(Actions._SketchPluginHomeFolderPath, this._sketch_plugin_name)

		// Ensures any changes of plugin name are destroyed.
		read_folder(sketch_plugin_parent_folder, (dirent) =>
		{
			if (dirent.isSymbolicLink())
			{
				remove_file(join(dirent.parentPath, dirent.name))
			}
		})

		const _x = symlink(this._sketch_plugin_build_output, sketch_plugin_parent_folder, this._sketch_plugin_main)
		return this
	}
}

function main()
{
	const root_folder_path = find_root_folder_path(2)
	const { script_arguments } = assert_argv_has_at_least_two_arguments()

	// TODO: Get sketch_plugin_name from package.json
	// TODO: Do not spawn separate script for generating manifest or npm-build-install

	const [ online_or_offline, sketch_plugin_name, ...skpm_build_arguments ] = script_arguments

	new Actions(root_folder_path, sketch_plugin_name)
		.install_dependencies_reproducibly(online_or_offline)
		.compile_typescript()
		.remove_sketch_plugin_previous_build_output()
		.generate_manifest()
		.execute_skpm_build(skpm_build_arguments)
		.tidy_up_after_skpm_build()
		.link_build_output()
}

main()
