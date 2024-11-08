// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {assert} from "./functions/common/assert.mjs";
import {join} from "node:path";
import {Folders} from "./functions/Folders.mjs";
import {remove_recursively_forcibly} from "./functions/file_system/remove_recursively_forcibly.mjs";
import {mkdir_700_p} from "./functions/file_system/mkdir_700_p.mjs";

export class SketchPluginFolders extends Folders
{
	#plugin_folder_path
	#contents_folder_path
	#resources_folder_path
	#sketch_folder_path

	constructor(depth, plugin_package_name_from_package_json)
	{
		assert.is_zero_or_positive_integer(depth)
		assert.is_non_empty_string(plugin_package_name_from_package_json)

		super(depth)

		this.#plugin_folder_path = super.temporary_folder_subpath(plugin_package_name_from_package_json)
		this.#contents_folder_path = join(this.#plugin_folder_path, "Contents")
		this.#resources_folder_path = join(this.#contents_folder_path, "Resources")
		this.#sketch_folder_path = join(this.#contents_folder_path, "Sketch")
	}

	remove_plugin_folder()
	{
		assert.is_instance_of(this, SketchPluginFolders)

		remove_recursively_forcibly(...this.#plugin_folder_path)
	}

	create_empty_plugin_folder()
	{
		assert.is_instance_of(this, SketchPluginFolders)

		mkdir_700_p(this.#resources_folder_path)
		mkdir_700_p(this.#sketch_folder_path)
	}

	resource_file_path(file_name)
	{
		assert.is_instance_of(this, SketchPluginFolders)
		assert.is_non_empty_string(file_name)

		return this.#resources_folder_path.sub_file_path(file_name)
	}

	get manifest_file_path()
	{
		assert.is_instance_of(this, SketchPluginFolders)

		return this.#sketch_folder_file_path("manifest.json")
	}

	command_script_file_path(command_identifier)
	{
		assert.is_instance_of(this, SketchPluginFolders)
		assert.is_non_empty_string(command_identifier)

		return this.#sketch_folder_file_path(`${command_identifier}.js`)
	}

	#sketch_folder_file_path(file_name)
	{
		assert.is_instance_of(this, SketchPluginFolders)
		assert.is_non_empty_string(file_name)

		this.#sketch_folder_path.sub_file_path(file_name)
	}
}
