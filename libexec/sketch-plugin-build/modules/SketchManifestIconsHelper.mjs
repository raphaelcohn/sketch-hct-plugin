// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import assert from "../../../lib/bun/functions/common/assert.mts";
import {join} from "node:path";
import {stat_file} from "./functions/file_system/stat_file.mjs";
import {copy_file} from "./functions/file_system/copy_file.mjs";
import {SketchPluginFolders} from "./SketchPluginFolders.mjs";

export class SketchManifestIconsHelper
{
	#sketch_plugin_folders

	constructor(sketch_plugin_folders)
	{
		assert.is_instance_of(sketch_plugin_folders, SketchPluginFolders)

		this.#sketch_plugin_folders = sketch_plugin_folders
	}

	add_icons(file_name_prefix, json)
	{
		assert.is_instance_of(this, SketchManifestIconsHelper)
		assert.is_string(file_name_prefix)
		assert.is_object(json)

		this.#add_icon(file_name_prefix, json, "light")
		this.#add_icon(file_name_prefix, json, "dark")

		return json
	}

	#add_icon(file_name_prefix, json, theme)
	{
		assert.is_instance_of(this, SketchManifestIconsHelper)
		assert.is_string(file_name_prefix)
		assert.is_object(json)
		assert.is_string_enum(theme, "light", "dark")

		const icon_file_name = `${file_name_prefix}.${theme}.icon.128x128.png`

		const [source_icon_file_path, stat] = stat_file(this.#sketch_plugin_folders.asset_file_path(icon_file_name))
		if (stat === null)
		{
			throw new Error(`The icon file ${source_icon_file_path} is absent`)
		}
		if (!(stat.isSymbolicLink() || stat.isFile()))
		{
			throw new Error(`The icon file ${source_icon_file_path} is not a symbolic link or a file`)
		}

		this.#add_icon_to_json(icon_file_name, json, theme)
		this.#copy_icon_to_plugin_resources(source_icon_file_path, icon_file_name)
	}

	#add_icon_to_json(icon_file_name, json, theme)
	{
		assert.is_instance_of(this, SketchManifestIconsHelper)
		assert.is_non_empty_string(icon_file_name)
		assert.is_object(json)
		assert.is_string_enum(theme, "light", "dark")

		const json_property_name = theme === "light" ? "icon" : "darkIcon"
		json[json_property_name] = icon_file_name
	}

	#copy_icon_to_plugin_resources(source_icon_file_path, icon_file_name)
	{
		assert.is_instance_of(this, SketchManifestIconsHelper)
		assert.is_non_empty_string(source_icon_file_path)
		assert.is_non_empty_string(icon_file_name)

		source_icon_file_path.copy_to(this.#sketch_plugin_folders.resource_file_path(icon_file_name))
	}
}
