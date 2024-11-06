#!/usr/bin/env node
// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

'use strict'

import {JsonValidator} from "../../lib/nodejs/functions/JsonValidator.mjs";
import {read_folder} from "../../lib/nodejs/functions/read_folder.mjs";
import {write_json_to_file} from "../../lib/nodejs/functions/write_json_to_file.mjs";
import {stat_file} from "../../lib/nodejs/functions/stat_file.mjs";

const { basename, extname, isAbsolute, join, posix, resolve, sep } = require('node:path')

const SketchMajorVersion = 3

const SketchMinorVersion = 4

import {assert_is_string, assert_is_object, assert_is_array, assert_is_string_enum, assert_is_this, assert_is_boolean, assert_is_non_empty_string} from "../../lib/nodejs/functions/assert.mjs"

export class PackageJson
{
	constructor(json_validator)
	{
		this._json_validator = json_validator
	}

	static new(root_folder_path)
	{
		assert_is_non_empty_string(root_folder_path)

		const json_validator = JsonValidator.read_json_file(root_folder_path, "package.json")
		return new PackageJson(json_validator)
	}

	get package_name()
	{
		return this._json_validator.string_field("name")
	}
}


const ExpectedEnginesSketch = `>=${SketchMajorVersion}.0`
function package_json(root_folder_path)
{
	assert_is_string(root_folder_path)

	const json_validator = JsonValidator.read_json_file(root_folder_path, "package.json")
	
	const package_name = json_validator.string_field("name")
	const description = json_validator.string_field("description")
	const license = json_validator.string_field("license")
	const version = json_validator.string_field("version")
	const homepage = json_validator.string_field("homepage")
	const author = json_validator.object_field("author")

	const author_name = author.string_field("name")
	const author_email = author.string_field("email")

	const engines = json_validator.object_field("engines")

	const engines_sketch = engines.string_field("sketch")
	if (engines_sketch !== ExpectedEnginesSketch)
	{
		throw new Error(`package.json engines.sketch (${engines_sketch}) is not ${ExpectedEnginesSketch}`)
	}

	const skpm = json_validator.object_field("skpm")

	const skpm_name = skpm.string_field("name")
	const skpm_manifest = skpm.string_field("manifest")
	const skpm_main = skpm.string_field("main")

	const name_as_identifier = name_to_identifier(skpm_name);
	if (package_name !== name_as_identifier)
	{
		throw new Error(`package.json name (${package_name}) is not similar to package.json skpm.name (${skpm_name} as ${name_as_identifier})`)
	}

	if (skpm_manifest !== ManifestGenerator.RelativeManifestFilePath)
	{
		throw new Error(`package.json skpm.manifest (${skpm_manifest}) is not ${ManifestGenerator.RelativeManifestFilePath}`)
	}

	const expected_skpm_main = posix.join(ManifestGenerator.TemporaryFolderName, `${package_name}.sketchplugin`)
	if (skpm_main !== expected_skpm_main)
	{
		throw new Error(`package.json skpm.main (${skpm_main}) is not derived from package.json skpm.name (${skpm_name}) (should be ${expected_skpm_main})`)
	}

	return [
		package_name,
		{
			name: skpm_name,
			description,
			license,
			version,
			homepage,
			author: author_name,
			authorEmail: author_email,
		}
	]
}

class ManifestGenerator
{
	static _CommandFileExtension = ".ts"

	static SourceFolderName = "src"

	static AssetsFolderName = "assets"

	static _CommandsFolderName= "commands"

	static TemporaryFolderName = "tmp"

	static _TypescriptOutputFolderPath = posix.join(ManifestGenerator.TemporaryFolderName, "typescript", "transpiled")

	static RelativeManifestFilePath = posix.join(ManifestGenerator._TypescriptOutputFolderPath, "manifest.json")

	// See <https://raw.githubusercontent.com/sketch-hq/SketchAPI/develop/docs/sketch-plugin-manifest-schema.json>
	constructor(root_folder_path, package_name, manifest_from_package_json)
	{
		assert_is_string(root_folder_path)
		assert_is_string(package_name)
		assert_is_object(manifest_from_package_json)

		if (!isAbsolute(root_folder_path))
		{
			throw new Error(`root_folder_path ${root_folder_path} is not absolute`)
		}

		this._root_folder_path = root_folder_path
		this._source_folder_path = join(root_folder_path, ManifestGenerator.SourceFolderName)
		this._assets_folder_path = join(root_folder_path, ManifestGenerator.AssetsFolderName)

		this._package_name = package_name
		this._manifest_json = manifest_from_package_json
		this._manifest_json.commands = []
		this._manifest_json.menu =
		{
			title: this._manifest_json.name,
			isRoot: false,
			items: [],
		}
	}

	add_essentials(identifier_prefix = "com.stormmq", supplies_data_boolean = false, scope = "document")
	{
		assert_is_this(this, ManifestGenerator)
		assert_is_string(identifier_prefix)
		assert_is_boolean(supplies_data_boolean)
		assert_is_string_enum(scope, "application", "document")

		this._manifest_json.identifier = `${identifier_prefix}.${this._package_name}`
		this._manifest_json.bundleVersion = 1
		this._manifest_json.compatibleVersion = `${SketchMajorVersion}.${SketchMinorVersion}`
		this._manifest_json.maxCompatibleVersion = `${SketchMajorVersion}.${SketchMinorVersion}`
		this._manifest_json.suppliesData = supplies_data_boolean
		this._manifest_json.disableCocoaScriptPreprocessor = true
		this._manifest_json.scope = scope
		//this._manifest_json.appcast = `https://github.com/raphaelcohn/${this._package_name}/.appcast.xml`
		this._add_icons("plugin", this._manifest_json)
	}

	add_typescript_commands()
	{
		assert_is_this(this, ManifestGenerator)
		this._process_folder_contents(ManifestGenerator._CommandsFolderName, this._manifest_json.menu.items)
	}

	write_manifest()
	{
		assert_is_this(this, ManifestGenerator)

		try
		{
			const _file_Path = write_json_to_file(this._manifest_json, this._root_folder_path, ManifestGenerator.RelativeManifestFilePath)
		}
		catch (cause)
		{
			throw new Error('Could not write sketch plugin manifest JSON', {cause})
		}
	}

	_process_folder_contents(relative_folder_path, menu_items)
	{
		assert_is_this(this, ManifestGenerator)
		assert_is_string(relative_folder_path)
		assert_is_object(menu_items)

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
		assert_is_this(this, ManifestGenerator)
		assert_is_string(relative_folder_path)
		assert_is_string(folder_name)
		assert_is_array(menu_items)

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
		assert_is_this(this, ManifestGenerator)
		assert_is_string(relative_folder_path)
		assert_is_string(file_name)
		assert_is_array(menu_items)

		if (extname(file_name) !== ManifestGenerator._CommandFileExtension)
		{
			return
		}
		const command_function_name = basename(file_name, ManifestGenerator._CommandFileExtension)
		this._add_command_file(command_function_name, relative_folder_path, menu_items)
	}

	_add_command_file(command_function_name, relative_folder_path, menu_items)
	{
		assert_is_this(this, ManifestGenerator)
		assert_is_string(command_function_name)
		assert_is_string(relative_folder_path)
		assert_is_array(menu_items)

		const commands_function_details = JsonValidator.read_json_file(this._source_folder_path, join(relative_folder_path, `${command_function_name}.json`))

		const command_relative_name = `${name_to_identifier(relative_folder_path).replaceAll(sep, ".")}.${command_function_name}`
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
		assert_is_this(this, ManifestGenerator)
		assert_is_string(file_name_prefix)
		assert_is_object(json)

		this._add_icon(file_name_prefix, json, "light")
		this._add_icon(file_name_prefix, json, "dark")
	}

	_add_icon(file_name_prefix, json, theme)
	{
		assert_is_this(this, ManifestGenerator)
		assert_is_string(file_name_prefix)
		assert_is_object(json)
		assert_is_string_enum(theme, "light", "dark")

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
}

function name_to_identifier(name)
{
	assert_is_string(name)

	return name.replaceAll(" ", "-").toLocaleLowerCase("en-US")
}

function current_working_directory()
{
	return resolve()
}

function main()
{
	const root_folder_path = current_working_directory()
	const [package_name, manifest_json] = package_json(root_folder_path)
	const manifest_generator = new ManifestGenerator(root_folder_path, package_name, manifest_json)
	manifest_generator.add_essentials()
	manifest_generator.add_typescript_commands()
	manifest_generator.write_manifest()
}

main()
