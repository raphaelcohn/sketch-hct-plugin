// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {assert} from "./common/assert.mjs";
import {dirname, join} from "node:path";
import {SketchPluginFolders} from "../../../libexec/sketch-plugin-build/modules/SketchPluginFolders.mjs";
import {AbsoluteFolderPath} from "./file_system/AbsoluteFolderPath.mjs";

export class Folders
{
	static #TypesFolderName = "@types"
	static #AssetsFolderName = "assets"
	static #BinariesFolderName = "bin"
	static #LibrariesFolderName = "lib"
	static #LibExecFolderName = "libexec"
	static #NodeModulesFolderName = "node_modules"
	static #NodeModulesPatchesFolderName = `${Folders.#NodeModulesFolderName}.patches`
	static #SourceFolderName = "src"
	static #TemporaryFolderName = "tmp"
	static #VersioningFolderName = "versioning"

	#root_folder_path
	#types_folder_path
	#assets_folder_path
	#binaries_folder_path
	#libraries_folder_path
	#lib_exec_folder_path
	#node_modules_folder_path
	#node_modules_patches_folder_path
	#source_folder_path
	#temporary_folder_path
	#versioning_folder_path
	#npm_binaries_folder_path

	constructor(depth)
	{
		assert.is_zero_or_positive_integer(depth)

		this.#root_folder_path = AbsoluteFolderPath.find_root_folder_path(depth)
		this.#types_folder_path = this.#root_folder_path.sub_folder_path(Folders.#TypesFolderName)
		this.#assets_folder_path = this.#root_folder_path.sub_folder_path(Folders.#AssetsFolderName)
		this.#binaries_folder_path = this.#root_folder_path.sub_folder_path(Folders.#BinariesFolderName)
		this.#libraries_folder_path = this.#root_folder_path.sub_folder_path(Folders.#LibrariesFolderName)
		this.#lib_exec_folder_path = this.#root_folder_path.sub_folder_path(Folders.#LibExecFolderName)
		this.#node_modules_folder_path = this.#root_folder_path.sub_folder_path(Folders.#NodeModulesFolderName)
		this.#node_modules_patches_folder_path = this.#root_folder_path.sub_folder_path(Folders.#NodeModulesPatchesFolderName)
		this.#source_folder_path = this.#root_folder_path.sub_folder_path(Folders.#SourceFolderName)
		this.#temporary_folder_path = this.#root_folder_path.sub_folder_path(Folders.#TemporaryFolderName)
		this.#versioning_folder_path = this.#root_folder_path.sub_folder_path(Folders.#VersioningFolderName)
		this.#npm_binaries_folder_path = this.#root_folder_path.sub_folder_path(".bin")
	}

	toString()
	{
		assert.is_instance_of(this, Folders)

		return this.root_folder_path.toString()
	}

	get root_folder_path()
	{
		return this.#root_folder_path
	}

	temporary_folder_subpath(...relative_folder_path_components)
	{
		assert.is_instance_of(this, Folders)
		assert.is_non_empty_string_array(relative_folder_path_components)

		return this.#temporary_folder_path.sub_folder_path(...relative_folder_path_components)
	}

	binary_file_path(binary_name)
	{
		assert.is_instance_of(this, Folders)
		assert.is_non_empty_string(binary_name)

		return this.#temporary_folder_path.sub_file_path(binary_name)
	}

	node_binary_file_path(binary_name)
	{
		assert.is_instance_of(this, Folders)
		assert.is_non_empty_string(binary_name)

		return this.#npm_binaries_folder_path.sub_file_path(binary_name)
	}

	asset_file_path(asset_file_name)
	{
		assert.is_instance_of(this, Folders)
		assert.is_non_empty_string(asset_file_name)

		return this.#assets_folder_path.sub_file_path(asset_file_name)
	}
}
