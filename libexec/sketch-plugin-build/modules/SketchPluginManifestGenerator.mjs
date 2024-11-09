// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

'use strict'

import { basename, extname, join, posix, sep } from 'node:path';
import {JsonValidator} from "../../../lib/bun/functions/JsonValidator.mts";
import {read_folder} from "../../../lib/bun/functions/file_system/read_folder.mjs";
import {assert} from "../../../lib/bun/functions/common/assert.mts";
import {PackageJson} from "../../../lib/bun/functions/PackageJson.mjs";
import {SketchManifestIconsHelper} from "./SketchManifestIconsHelper.mjs";
import {SketchPluginFolders} from "./SketchPluginFolders.mjs";
import {AbsoluteFolderPath} from "./functions/file_system/AbsoluteFolderPath.mjs";

export class SketchPluginManifestGenerator
{
	static #SketchBundleVersion = 1

	static #SketchMajorVersion = 3

	static #SketchMinorVersion = 4

	static #SketchVersion = `${SketchPluginManifestGenerator.#SketchMajorVersion}.${SketchPluginManifestGenerator.#SketchMinorVersion}`

	static #ExpectedEnginesSketch = `>=${SketchPluginManifestGenerator.#SketchVersion}`

	static SourceFolderName = "src"

	static TemporaryFolderName = "tmp"

	static #TypescriptOutputFolderPath = posix.join(SketchPluginManifestGenerator.TemporaryFolderName, "typescript", "transpiled")

	static RelativeManifestFilePath = posix.join(SketchPluginManifestGenerator.#TypescriptOutputFolderPath, "manifest.json")

	static generate(root_folder_path, package_json)
	{
		assert.is_absolute_path(root_folder_path)
		assert.is_instance_of(package_json, PackageJson)

		const plugin_folder_name = `${X}.sketchplugin`

		// TODO: Create a folders object

		// TODO: These paths needs to exist before execution of this code.
		const sketch_plugin_resources_folder_path = join(tmpdir(), plugin_folder_name, "Contents", "Resources")
		const sketch_plugin_sketch_folder_path = join(tmpdir(), plugin_folder_name, "Contents", "Sketch")
		const sketch_manifest_icons_helper = new SketchManifestIconsHelper(root_folder_path, sketch_plugin_resources_folder_path)

		new SketchPluginManifestGenerator(root_folder_path, sketch_manifest_icons_helper, package_json).add_from_package_json().add_essentials().add_plugin_icons().write_manifest(sketch_plugin_sketch_folder_path)
	}

	#plugin_identifier
	#package_json
	#sketch_manifest_icons_helper
	#source_folder_path
	#esbuild_commands
	#manifest_json

	// See <https://raw.githubusercontent.com/sketch-hq/SketchAPI/develop/docs/sketch-plugin-manifest-schema.json>
	constructor(root_folder_path, sketch_manifest_icons_helper, package_json, identifier_prefix = "com.stormmq")
	{
		assert.is_absolute_path(root_folder_path)
		assert.is_instance_of(sketch_manifest_icons_helper, SketchManifestIconsHelper)
		assert.is_instance_of(package_json, PackageJson)
		assert.is_non_empty_string(identifier_prefix)

		const source_folder_path = join(root_folder_path, SketchPluginManifestGenerator.SourceFolderName);
		const plugin_identifier = `${identifier_prefix}.${package_json.name}`

		const [esbuild_commands, manifest_commands, manifest_menu_items] = new SketchPluginCommandsProcessor(this.#source_folder_path, plugin_identifier, sketch_manifest_icons_helper).process()

		this.#plugin_identifier = plugin_identifier
		this.#sketch_manifest_icons_helper = sketch_manifest_icons_helper
		this.#source_folder_path = source_folder_path
		this.#esbuild_commands = esbuild_commands
		this.#manifest_json =
		{
			commands: manifest_commands,

			menu:
			{
				isRoot: false,

				items: manifest_menu_items,
			}
		}
	}

	add_from_package_json()
	{
		assert.is_instance_of(this, SketchPluginManifestGenerator)

		const engines_sketch = this.#package_json.engines.string_field("sketch")
		if (engines_sketch !== SketchPluginManifestGenerator.#ExpectedEnginesSketch)
		{
			throw new Error(`package.json engines.sketch (${engines_sketch}) is not ${SketchPluginManifestGenerator.#ExpectedEnginesSketch}`)
		}

		const { name: skpm_name, manifest: skpm_manifest, main: skpm_main, assets: _ } = this.#package_json.skpm

		const name_as_identifier = SketchPluginManifestGenerator.#name_to_identifier(skpm_name)
		const package_name = this.#package_json.package_name

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

		this.#manifest_json.name = skpm_name
		this.#manifest_json.description = this.#package_json.description
		this.#manifest_json.license = this.#package_json.license
		this.#manifest_json.version = this.#package_json.version
		this.#manifest_json.homepage = this.#package_json.homepage

		const [author_name, author_email] = this.#package_json.author_name_and_email
		this.#manifest_json.author = author_name
		this.#manifest_json.authorEmail = author_email

		this.#manifest_json.menu.title = this.#manifest_json.name

		return this
	}

	add_essentials(supplies_data_boolean = false, scope = "document")
	{
		assert.is_instance_of(this, SketchPluginManifestGenerator)
		assert.is_boolean(supplies_data_boolean)
		assert.is_string_enum(scope, "application", "document")

		this.#manifest_json.identifier = this.#plugin_identifier
		this.#manifest_json.bundleVersion = SketchPluginManifestGenerator.#SketchBundleVersion
		this.#manifest_json.compatibleVersion = `${SketchPluginManifestGenerator.#SketchVersion}`
		this.#manifest_json.maxCompatibleVersion = `${SketchPluginManifestGenerator.#SketchVersion}`
		this.#manifest_json.suppliesData = supplies_data_boolean
		this.#manifest_json.disableCocoaScriptPreprocessor = true
		this.#manifest_json.scope = scope
		//this.#manifest_json.appcast = `https://github.com/raphaelcohn/${package_name}/.appcast.xml`

		return this
	}

	add_plugin_icons()
	{
		assert.is_instance_of(this, SketchPluginManifestGenerator)

		this.#sketch_manifest_icons_helper.add_icons("plugin", this.#manifest_json)

		return this
	}

	write_manifest(sketch_folder_paths)
	{
		assert.is_instance_of(this, SketchPluginManifestGenerator)
		assert.is_instance_of(sketch_folder_paths, SketchPluginFolders)

		const manifest_file_path = sketch_folder_paths.manifest_file_path()
		try
		{
			manifest_file_path.write_json_to(this.#manifest_json)
		}
		catch (cause)
		{
			throw new Error(`Could not write sketch plugin manifest JSON to folder ${manifest_file_path}`, {cause})
		}

		return this
	}

	static #name_to_identifier(name)
	{
		assert.is_string(name)

		return name.replaceAll(" ", "-").toLocaleLowerCase("en-US")
	}
}

class SketchPluginCommandsProcessor
{
	static #CommandsFolderName= "commands"
	static #CommandFileExtension = ".ts"

	#source_folder_path
	#command_identifier_prefix
	#sketch_manifest_icons_helper
	#esbuild_commands
	#manifest_commands
	#manifest_menu_items

	constructor(source_folder_path, command_identifier_prefix, sketch_manifest_icons_helper)
	{
		assert.is_instance_of(source_folder_path, AbsoluteFolderPath)
		assert.is_non_empty_string(command_identifier_prefix)
		assert.is_instance_of(sketch_manifest_icons_helper, SketchManifestIconsHelper)

		this.#source_folder_path = source_folder_path
		this.#command_identifier_prefix = command_identifier_prefix
		this.#sketch_manifest_icons_helper = sketch_manifest_icons_helper
		this.#esbuild_commands = new Map()
		this.#manifest_commands = []
		this.#manifest_menu_items = []
	}

	process()
	{
		assert.is_instance_of(this, SketchPluginManifestGenerator)

		this.#process_folder_contents(SketchPluginCommandsProcessor.#CommandsFolderName, this.#manifest_menu_items)
		return [this.#esbuild_commands, this.#manifest_commands, this.#manifest_menu_items]
	}

	#process_folder_contents(relative_folder_path, menu_items)
	{
		assert.is_instance_of(this, SketchPluginManifestGenerator)
		assert.is_non_empty_string(relative_folder_path)
		assert.is_object(menu_items)

		const absolute_folder_path = this.#source_folder_path.sub_folder_path(this.#source_folder_path, relative_folder_path)

		read_folder(absolute_folder_path, (dirent) =>
		{
			const name = dirent.name
			if (dirent.isDirectory())
			{
				this.#process_folder(relative_folder_path, name, menu_items)
			}
			else if (dirent.isFile())
			{
				this.#process_file(relative_folder_path, name, menu_items)
			}
		})
	}

	#process_folder(relative_folder_path, folder_name, menu_items)
	{
		assert.is_instance_of(this, SketchPluginManifestGenerator)
		assert.is_non_empty_string(relative_folder_path)
		assert.is_string(folder_name)
		assert.is_array(menu_items)

		const submenu =
		{
			title: folder_name,
			items: []
		}

		menu_items.push(submenu)
		this.#process_folder_contents(join(relative_folder_path, folder_name), submenu.items)
	}

	#process_file(relative_folder_path, file_name, menu_items)
	{
		assert.is_instance_of(this, SketchPluginManifestGenerator)
		assert.is_non_empty_string(relative_folder_path)
		assert.is_string(file_name)
		assert.is_array(menu_items)

		if (extname(file_name) !== SketchPluginCommandsProcessor.#CommandFileExtension)
		{
			return
		}
		this.#add_command_file(relative_folder_path, file_name, menu_items)
	}

	#add_command_file(relative_folder_path, file_name, menu_items)
	{
		assert.is_instance_of(this, SketchPluginManifestGenerator)
		assert.is_non_empty_string(relative_folder_path)
		assert.is_non_empty_string(file_name)
		assert.is_array(menu_items)

		const command_function_name = basename(file_name, SketchPluginCommandsProcessor.#CommandFileExtension)
		const command_relative_identifier = SketchPluginCommandsProcessor.#generated_command_relative_identifier(relative_folder_path, command_function_name)

		this.#add_command_file_esbuild(relative_folder_path, file_name, command_relative_identifier)
		const command_absolute_identifier = this.#add_command_file_manifest_commands(relative_folder_path, file_name, command_relative_identifier, command_function_name)
		this.#add_command_file_manifest_menu_items(menu_items, command_absolute_identifier)
	}

	#add_command_file_esbuild(relative_folder_path, file_name, command_relative_identifier)
	{
		assert.is_instance_of(this, SketchPluginManifestGenerator)
		assert.is_non_empty_string(relative_folder_path)
		assert.is_non_empty_string(file_name)
		assert.is_non_empty_string(command_relative_identifier)

		this.#esbuild_commands.set(command_relative_identifier, join(this.#source_folder_path, relative_folder_path, file_name))
	}

	#add_command_file_manifest_commands(relative_folder_path, file_name, command_relative_identifier, command_function_name)
	{
		assert.is_instance_of(this, SketchPluginManifestGenerator)
		assert.is_non_empty_string(relative_folder_path)
		assert.is_non_empty_string(file_name)
		assert.is_non_empty_string(command_relative_identifier)
		assert.is_non_empty_string(command_function_name)

		const commands_function_details = JsonValidator.read_json_file(this.#source_folder_path, join(relative_folder_path, `${command_function_name}.json`))
		const command_absolute_identifier = `${this.#command_identifier_prefix}.${command_relative_identifier}`

		this.#manifest_commands.push
		(
			this.#sketch_manifest_icons_helper.add_icons
			(
				command_relative_identifier,
			{
					identifier: command_absolute_identifier,
					name: commands_function_details.string_field("name"),
					description: commands_function_details.string_field("description"),
					shortcut: commands_function_details.string_field("shortcut"),
					script: `${command_relative_identifier}.js`,
					handler: command_function_name
				}
			)
		)

		return command_absolute_identifier
	}

	#add_command_file_manifest_menu_items(menu_items, command_absolute_identifier)
	{
		assert.is_instance_of(this, SketchPluginManifestGenerator)
		assert.is_array(menu_items)
		assert.is_non_empty_string(command_absolute_identifier)

		menu_items.push(command_absolute_identifier)
	}

	static #generated_command_relative_identifier(relative_folder_path, command_function_name)
	{
		assert.is_instance_of(this, SketchPluginManifestGenerator)
		assert.is_non_empty_string(command_function_name)
		assert.is_non_empty_string(relative_folder_path)

		return `${SketchPluginManifestGenerator.#name_to_identifier(relative_folder_path).replaceAll(sep, ".")}.${command_function_name}`
	}
}
