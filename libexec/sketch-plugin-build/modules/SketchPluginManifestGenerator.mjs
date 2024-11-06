// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

'use strict'

import { basename, extname, isAbsolute, join, posix, resolve, sep } from 'node:path';
import {JsonValidator} from "../../../lib/nodejs/functions/JsonValidator.mjs";
import {read_folder} from "../../../lib/nodejs/functions/file_system/read_folder.mjs";
import {write_json_to_file} from "../../../lib/nodejs/functions/file_system/write_json_to_file.mjs";
import {stat_file} from "../../../lib/nodejs/functions/file_system/stat_file.mjs";
import {assert} from "../../../lib/nodejs/functions/common/assert.mjs";
import {PackageJson} from "../../../lib/nodejs/functions/PackageJson.mjs";

const SketchMajorVersion = 3

const SketchMinorVersion = 4

const ExpectedEnginesSketch = `>=${SketchMajorVersion}.0`

export class SketchPluginManifestGenerator
{
	static _CommandFileExtension = ".ts"

	static SourceFolderName = "src"

	static AssetsFolderName = "assets"

	static _CommandsFolderName= "commands"

	static TemporaryFolderName = "tmp"

	static _TypescriptOutputFolderPath = posix.join(SketchPluginManifestGenerator.TemporaryFolderName, "typescript", "transpiled")

	static RelativeManifestFilePath = posix.join(SketchPluginManifestGenerator._TypescriptOutputFolderPath, "manifest.json")

	// See <https://raw.githubusercontent.com/sketch-hq/SketchAPI/develop/docs/sketch-plugin-manifest-schema.json>
	constructor(root_folder_path)
	{
		assert.is_string(root_folder_path)

		if (!isAbsolute(root_folder_path))
		{
			throw new Error(`root_folder_path ${root_folder_path} is not absolute`)
		}

		this._root_folder_path = root_folder_path
		this._source_folder_path = join(root_folder_path, SketchPluginManifestGenerator.SourceFolderName)
		this._assets_folder_path = join(root_folder_path, SketchPluginManifestGenerator.AssetsFolderName)

		this._manifest_json =
		{
			commands: [],

			menu:
			{
				isRoot: false,

				items: [],
			}
		}
	}

	static generate(root_folder_path, package_json)
	{
		assert.is_absolute_path(root_folder_path)
		assert.is_instance_of(package_json, PackageJson)

		new SketchPluginManifestGenerator(root_folder_path).add_from_package_json(package_json).add_essentials().add_typescript_commands().write_manifest(root_folder_path)
	}
	
	add_from_package_json(package_json)
	{
		assert.is_instance_of(this, SketchPluginManifestGenerator)
		assert.is_instance_of(package_json, PackageJson)

		const engines_sketch = package_json.engines.string_field("sketch")
		if (engines_sketch !== ExpectedEnginesSketch)
		{
			throw new Error(`package.json engines.sketch (${engines_sketch}) is not ${ExpectedEnginesSketch}`)
		}

		const { name: skpm_name, manifest: skpm_manifest, main: skpm_main, assets: _ } = package_json.skpm

		const name_as_identifier = SketchPluginManifestGenerator._name_to_identifier(skpm_name)
		const package_name = package_json.package_name

		if (package_name !== name_as_identifier)
		{
			throw new Error(`package.json name (${package_name}) is not similar to package.json skpm.name (${skpm_name} as ${name_as_identifier})`)
		}

		if (skpm_manifest !== SketchPluginManifestGenerator.RelativeManifestFilePath)
		{
			throw new Error(`package.json skpm.manifest (${skpm_manifest}) is not ${SketchPluginManifestGenerator.RelativeManifestFilePath}`)
		}

		const expected_skpm_main = posix.join(SketchPluginManifestGenerator.TemporaryFolderName, `${package_name}.sketchplugin`)
		if (skpm_main !== expected_skpm_main)
		{
			throw new Error(`package.json skpm.main (${skpm_main}) is not derived from package.json skpm.name (${skpm_name}) (should be ${expected_skpm_main})`)
		}

		this._manifest_json.name = skpm_name
		this._manifest_json.description = package_json.description
		this._manifest_json.license = package_json.license
		this._manifest_json.version = package_json.version
		this._manifest_json.homepage = package_json.homepage

		const [author_name, author_email] = package_json.author_name_and_email
		this._manifest_json.author = author_name
		this._manifest_json.authorEmail = author_email

		this._manifest_json.menu.title = this._manifest_json.name

		return this
	}

	add_essentials(identifier_prefix = "com.stormmq", supplies_data_boolean = false, scope = "document")
	{
		assert.is_instance_of(this, SketchPluginManifestGenerator)
		assert.is_non_empty_string(identifier_prefix)
		assert.is_boolean(supplies_data_boolean)
		assert.is_string_enum(scope, "application", "document")

		this._manifest_json.identifier = `${identifier_prefix}.${this._manifest_json.name}`
		this._manifest_json.bundleVersion = 1
		this._manifest_json.compatibleVersion = `${SketchMajorVersion}.${SketchMinorVersion}`
		this._manifest_json.maxCompatibleVersion = `${SketchMajorVersion}.${SketchMinorVersion}`
		this._manifest_json.suppliesData = supplies_data_boolean
		this._manifest_json.disableCocoaScriptPreprocessor = true
		this._manifest_json.scope = scope
		//this._manifest_json.appcast = `https://github.com/raphaelcohn/${package_name}/.appcast.xml`
		this._add_icons("plugin", this._manifest_json)

		return this
	}

	add_typescript_commands()
	{
		assert.is_instance_of(this, SketchPluginManifestGenerator)
		this._process_folder_contents(SketchPluginManifestGenerator._CommandsFolderName, this._manifest_json.menu.items)

		return this
	}

	write_manifest(root_folder_path)
	{
		assert.is_instance_of(this, SketchPluginManifestGenerator)
		assert.is_absolute_path(root_folder_path)

		try
		{
			const _file_path = write_json_to_file(this._manifest_json, root_folder_path, SketchPluginManifestGenerator.RelativeManifestFilePath)
		}
		catch (cause)
		{
			throw new Error('Could not write sketch plugin manifest JSON', {cause})
		}

		return this
	}

	_process_folder_contents(relative_folder_path, menu_items)
	{
		assert.is_instance_of(this, SketchPluginManifestGenerator)
		assert.is_string(relative_folder_path)
		assert.is_object(menu_items)

		const absolute_folder_path = join(this._source_folder_path, relative_folder_path);

		read_folder(absolute_folder_path, (dirent) =>
		{
			const name = dirent.name
			if (dirent.isDirectory())
			{
				this._process_folder(relative_folder_path, name, menu_items)
			}
			else if (dirent.isFile())
			{
				this._process_file(relative_folder_path, name, menu_items)
			}
		})
	}

	_process_folder(relative_folder_path, folder_name, menu_items)
	{
		assert.is_instance_of(this, SketchPluginManifestGenerator)
		assert.is_string(relative_folder_path)
		assert.is_string(folder_name)
		assert.is_array(menu_items)

		const submenu =
		{
			title: folder_name,
			items: []
		}

		menu_items.push(submenu)
		this._process_folder_contents(join(relative_folder_path, folder_name), submenu.items)
	}

	_process_file(relative_folder_path, file_name, menu_items)
	{
		assert.is_instance_of(this, SketchPluginManifestGenerator)
		assert.is_string(relative_folder_path)
		assert.is_string(file_name)
		assert.is_array(menu_items)

		if (extname(file_name) !== SketchPluginManifestGenerator._CommandFileExtension)
		{
			return
		}
		const command_function_name = basename(file_name, SketchPluginManifestGenerator._CommandFileExtension)
		this._add_command_file(command_function_name, relative_folder_path, menu_items)
	}

	_add_command_file(command_function_name, relative_folder_path, menu_items)
	{
		assert.is_instance_of(this, SketchPluginManifestGenerator)
		assert.is_string(command_function_name)
		assert.is_string(relative_folder_path)
		assert.is_array(menu_items)

		const commands_function_details = JsonValidator.read_json_file(this._source_folder_path, join(relative_folder_path, `${command_function_name}.json`))

		const command_relative_name = `${SketchPluginManifestGenerator._name_to_identifier(relative_folder_path).replaceAll(sep, ".")}.${command_function_name}`
		const identifier = `${this._manifest_json.identifier}.${command_relative_name}`
		const item = {
			identifier,
			name: commands_function_details.string_field("name"),
			description: commands_function_details.string_field("description"),
			shortcut: commands_function_details.string_field("shortcut"),
			script: posix.join(relative_folder_path, `${command_function_name}.js`),
			handler: command_function_name
		}
		this._add_icons(command_relative_name, item)

		this._manifest_json.commands.push(item)

		menu_items.push(identifier)
	}

	_add_icons(file_name_prefix, json)
	{
		assert.is_instance_of(this, SketchPluginManifestGenerator)
		assert.is_string(file_name_prefix)
		assert.is_object(json)

		this._add_icon(file_name_prefix, json, "light")
		this._add_icon(file_name_prefix, json, "dark")
	}

	_add_icon(file_name_prefix, json, theme)
	{
		assert.is_instance_of(this, SketchPluginManifestGenerator)
		assert.is_string(file_name_prefix)
		assert.is_object(json)
		assert.is_string_enum(theme, "light", "dark")

		const icon_file_name = `${file_name_prefix}.${theme}.icon.128x128.png`

		const [icon_file_path, stat] = stat_file(this._assets_folder_path, icon_file_name)
		if (stat === null)
		{
			throw new Error(`The icon file ${icon_file_path} is absent`)
		}
		if (!(stat.isSymbolicLink() || stat.isFile()))
		{
			throw new Error(`The icon file ${icon_file_path} is not a symbolic link or a file`)
		}

		const json_property_name = theme === "light" ? "icon" : "darkIcon"
		json[json_property_name] = icon_file_name
	}

	static _name_to_identifier(name)
	{
		assert.is_string(name)

		return name.replaceAll(" ", "-").toLocaleLowerCase("en-US")
	}
}
