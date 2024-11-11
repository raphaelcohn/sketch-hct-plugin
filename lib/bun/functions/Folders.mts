// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import assert from "./common/assert.mjs";
import AbsoluteFolderPath from "./file_system/AbsoluteFolderPath.mjs";
import type AbsoluteFilePath from "./file_system/AbsoluteFilePath.mts";
import PackageJson from "./json/package/PackageJson.mjs"
import FileName from "./file_system/FileName.mjs"

export default class Folders
{
	//static readonly #TypesFolderName = "@types"
	static readonly #AssetsFolderName = "assets"
	static readonly #BinariesFolderName = "bin"
	//static readonly #LibrariesFolderName = "lib"
	//static readonly #LibExecFolderName = "libexec"
	static readonly #NodeModulesFolderName = "node_modules"
	//static readonly #NodeModulesPatchesFolderName = `patches`
	//static readonly #SourceFolderName = "src"
	static readonly #TemporaryFolderName = "tmp"
	static readonly #VersioningFolderName = "versioning"

	readonly #root_folder_path
	//readonly #types_folder_path
	readonly #assets_folder_path
	readonly #binaries_folder_path
	//readonly #libraries_folder_path
	//readonly #lib_exec_folder_path
	readonly #node_modules_folder_path
	//readonly #node_modules_patches_folder_path
	//readonly #source_folder_path
	readonly #temporary_folder_path
	readonly #versioning_folder_path
	readonly #node_modules_binaries_folder_path
	
	public constructor(depth: number)
	{
		assert.is_zero_or_positive_integer(depth)

		this.#root_folder_path = AbsoluteFolderPath.find_root_folder_path(depth)
		//this.#types_folder_path = this.#root_folder_path.sub_folder_path(Folders.#TypesFolderName)
		this.#assets_folder_path = this.#root_folder_path.sub_folder_path(Folders.#AssetsFolderName)
		this.#binaries_folder_path = this.#root_folder_path.sub_folder_path(Folders.#BinariesFolderName)
		//this.#libraries_folder_path = this.#root_folder_path.sub_folder_path(Folders.#LibrariesFolderName)
		//this.#lib_exec_folder_path = this.#root_folder_path.sub_folder_path(Folders.#LibExecFolderName)
		this.#node_modules_folder_path = this.#root_folder_path.sub_folder_path(Folders.#NodeModulesFolderName)
		//this.#node_modules_patches_folder_path = this.#root_folder_path.sub_folder_path(Folders.#NodeModulesPatchesFolderName)
		//this.#source_folder_path = this.#root_folder_path.sub_folder_path(Folders.#SourceFolderName)
		this.#temporary_folder_path = this.#root_folder_path.sub_folder_path(Folders.#TemporaryFolderName)
		this.#versioning_folder_path = this.#root_folder_path.sub_folder_path(Folders.#VersioningFolderName)
		this.#node_modules_binaries_folder_path = this.#root_folder_path.sub_folder_path(".bin")
	}
	
	public toString(this: this, _radix?: number): string
	{
		assert.is_instance_of(this, Folders)

		return this.root_folder_path.toString()
	}
	
	public get root_folder_path(): AbsoluteFolderPath
	{
		assert.is_instance_of(this, Folders)
		
		return this.#root_folder_path
	}
	
	public get node_modules_folder_path(): AbsoluteFolderPath
	{
		assert.is_instance_of(this, Folders)
		
		return this.#node_modules_folder_path
	}
	
	public package_json(this: this): PackageJson
	{
		return PackageJson.for_project(this)
	}
	
	public package_json_file_path(this: this): AbsoluteFilePath
	{
		return this.root_folder_file_path(FileName.package_json)
	}
	
	public root_folder_file_path(this: this, file_name: FileName): AbsoluteFilePath
	{
		return file_name.absolute_file_path(this.#root_folder_path)
	}
	
	public temporary_folder_subpath(this: this, ...relative_folder_path_components: string[]): AbsoluteFolderPath
	{
		assert.is_non_empty_string_array(relative_folder_path_components)

		return this.#temporary_folder_path.sub_folder_path(...relative_folder_path_components)
	}
	
	public binary_file_path(this: this, binary_name: string): AbsoluteFilePath
	{
		assert.is_non_empty_string(binary_name)

		return this.#binaries_folder_path.sub_file_path(binary_name)
	}
	
	public node_modules_binary_file_path(this: this, binary_name: string): AbsoluteFilePath
	{
		assert.is_non_empty_string(binary_name)

		return this.#node_modules_binaries_folder_path.sub_file_path(binary_name)
	}

	public asset_file_path(this: this, asset_file_name: string): AbsoluteFilePath
	{
		assert.is_non_empty_string(asset_file_name)

		return this.#assets_folder_path.sub_file_path(asset_file_name)
	}
	
	public tool_version(this: this, tool_name: string): string
	{
		assert.is_non_empty_string(tool_name)
		
		return this.#versioning_folder_path.sub_file_path(tool_name).read_string_from()
	}
}
