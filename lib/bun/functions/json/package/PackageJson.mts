// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import JsonObjectValidator from "../JsonObjectValidator.mjs"
import assert from "../../common/assert.mjs"
import type Folders from "../../Folders.mts"
import type AbsoluteFolderPath from "../../file_system/AbsoluteFolderPath.mts"
import type AbsoluteFilePath from "../../file_system/AbsoluteFilePath.mts"
import type PackageName from "./PackageName.d.ts"
import type Version from "./Version.d.ts"
import type UniformResourceLocator from "./UniformResourceLocator.d.ts"
import type EMail from "./EMail.d.ts"
import type License from "./license/License.d.ts"
import type PackageType from "./PackageType.d.ts"
import FileName from "../../file_system/FileName.mjs"

export default class PackageJson
{
	static readonly #ValidPackageTypes: Set<string> = new Set(["script", "module", "commonjs"])
	
	readonly #json_object_validator: JsonObjectValidator
	
	private constructor(json_object_validator: JsonObjectValidator)
	{
		this.#json_object_validator = json_object_validator
	}
	
	public static for_project(folders: Folders): PackageJson
	{
		return PackageJson.for_file_path(folders.package_json_file_path())
	}
	
	public static for_folder_path(folder_path: AbsoluteFolderPath): PackageJson
	{
		return PackageJson.for_file_path(folder_path.with_file_name(FileName.package_json))
	}
	
	public static for_file_path(package_json_file_path: AbsoluteFilePath): PackageJson
	{
		return new PackageJson(JsonObjectValidator.read_file(package_json_file_path))
	}

	get package_name(): PackageName
	{
		assert.is_instance_of(this, PackageJson)
		
		return this.#json_object_validator.string_field("name")
	}

	get description(): string
	{
		assert.is_instance_of(this, PackageJson)
		
		return this.#json_object_validator.string_field("description")
	}
	
	get type(): PackageType
	{
		assert.is_instance_of(this, PackageJson)
		
		const value = this.#json_object_validator.string_field("type")
		if (PackageJson.#ValidPackageTypes.has(value))
		{
			return value as PackageType
		}
		throw new TypeError(`package type is invalid (${value}`)
	}

	get license(): License
	{
		assert.is_instance_of(this, PackageJson)
		
		return this.#json_object_validator.string_field("license")
	}

	get version(): Version
	{
		assert.is_instance_of(this, PackageJson)
		
		return this.#json_object_validator.string_field("version")
	}

	get homepage(): UniformResourceLocator
	{
		assert.is_instance_of(this, PackageJson)
		
		return this.#json_object_validator.string_field("homepage")
	}

	get author_name_and_email(): [string, EMail]
	{
		assert.is_instance_of(this, PackageJson)
		
		const author = this.#json_object_validator.object_field("author")
		return [author.string_field("name"), author.string_field("email")]
	}

	get engines(): JsonObjectValidator
	{
		assert.is_instance_of(this, PackageJson)
		
		return this.#json_object_validator.object_field("engines")
	}

	get devDependencies(): JsonObjectValidator
	{
		assert.is_instance_of(this, PackageJson)
		
		return this.#json_object_validator.object_field("devDependencies")
	}

	get skpm(): { name: string, manifest: string, main: string, assets: string[] }
	{
		assert.is_instance_of(this, PackageJson)
		
		const skpm = this.#json_object_validator.object_field("skpm")
		return {
			name: skpm.string_field("name"),
			manifest: skpm.string_field("manifest"),
			main: skpm.string_field("main"),
			assets: skpm.string_array_field("assets"),
		}
	}
}
