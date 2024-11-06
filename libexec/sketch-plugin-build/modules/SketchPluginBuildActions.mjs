// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import { join } from 'node:path'
import { homedir, tmpdir } from 'node:os'

import {SketchPluginManifestGenerator} from "./SketchPluginManifestGenerator.mjs";
import {symlink} from "../../../lib/nodejs/functions/file_system/symlink.mjs";
import {compile_typescript} from "../../../lib/nodejs/functions/execute/typescript/index.mjs";
import {execute_npm_binary} from "../../../lib/nodejs/functions/execute/npm/index.mjs";
import {assert} from "../../../lib/nodejs/functions/common/assert.mjs";
import {remove_file} from "../../../lib/nodejs/functions/file_system/remove_file.mjs";
import {mkdir_700_p} from "../../../lib/nodejs/functions/file_system/mkdir_700_p.mjs";
import {read_folder} from "../../../lib/nodejs/functions/file_system/read_folder.mjs";
import {is_folder_or_symlink_and_is_readable_and_is_searchable} from "../../../lib/nodejs/functions/file_system/is_folder_or_symlink_and_is_readable_and_is_searchable.mjs";
import {BuildActions} from "../../../lib/nodejs/functions/BuildActions.mjs";
import {remove_recursively_forcibly} from "../../../lib/nodejs/functions/file_system/remove_recursively_forcibly.mjs";
import {PackageJson} from "./functions/PackageJson.mjs";

export class SketchPluginBuildActions
{
	static _SketchPluginHomeFolderPath = join(homedir(), "Library", "Application Support", "com.bohemiancoding.sketch3", "Plugins")

	static build(root_folder_path, online_or_offline, skpm_build_arguments)
	{
		assert.is_absolute_path(root_folder_path)
		assert.is_string_enum(online_or_offline, "online", "offline")
		assert.is_string_array(skpm_build_arguments)

		const package_json = PackageJson.new(root_folder_path);
		const sketch_plugin_name = package_json.package_name

		new SketchPluginBuildActions(root_folder_path, sketch_plugin_name)
			.install_dependencies_reproducibly(online_or_offline)
			.compile_typescript()
			.remove_sketch_plugin_previous_build_output()
			.generate_manifest(package_json)
			.execute_skpm_build(skpm_build_arguments)
			.link_build_output()
	}

	constructor(root_folder_path, sketch_plugin_name)
	{
		assert.is_absolute_path(root_folder_path)
		assert.is_non_empty_string(sketch_plugin_name)

		this._root_folder_path = root_folder_path
		this._sketch_plugin_name = sketch_plugin_name
		this._sketch_plugin_main = `${this._sketch_plugin_name}.sketchplugin`
		this._sketch_plugin_build_output = join(tmpdir(), this._sketch_plugin_main)
	}

	install_dependencies_reproducibly(online_or_offline)
	{
		assert.is_instance_of(this, SketchPluginBuildActions)
		assert.is_string_enum(online_or_offline, "online", "offline")

		new BuildActions(this._root_folder_path).install_dependencies_reproducibily(online_or_offline)

		return this
	}

	compile_typescript()
	{
		assert.is_instance_of(this, SketchPluginBuildActions)

		compile_typescript(this._root_folder_path, this._root_folder_path)

		return this
	}

	remove_sketch_plugin_previous_build_output()
	{
		remove_recursively_forcibly(this._sketch_plugin_build_output)

		return this
	}

	generate_manifest(package_json)
	{
		assert.is_instance_of(this, SketchPluginBuildActions)
		assert.is_instance_of(package_json, PackageJson)

		SketchPluginManifestGenerator.generate(this._root_folder_path, package_json)

		return this
	}

	execute_skpm_build(skpm_build_arguments)
	{
		assert.is_instance_of(this, SketchPluginBuildActions)
		assert.is_string_array(skpm_build_arguments)

		execute_npm_binary(this._root_folder_path, "@skpm/builder", "skpm-build", this._root_folder_path, ...skpm_build_arguments)

		return this
	}

	link_build_output()
	{
		assert.is_instance_of(this, SketchPluginBuildActions)

		const [_, ok] = is_folder_or_symlink_and_is_readable_and_is_searchable(SketchPluginBuildActions._SketchPluginHomeFolderPath)
		const is_not_running_on_macos_desktop_with_sketch_installed = !ok
		if (is_not_running_on_macos_desktop_with_sketch_installed)
		{
			return
		}

		const [sketch_plugin_parent_folder, _first_folder_path_created] = mkdir_700_p(SketchPluginBuildActions._SketchPluginHomeFolderPath, this._sketch_plugin_name)

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
