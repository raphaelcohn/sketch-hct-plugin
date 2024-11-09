// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {homedir, tmpdir} from "node:os";
import {rmSync, mkdirSync, type Dirent, type ObjectEncodingOptions} from "node:fs";
import {AbsoluteFilePath} from "./AbsoluteFilePath.mjs";
import {AbsolutePath} from "./AbsolutePath.mjs";
import {type CopySyncOptions, cpSync, readdirSync} from "fs";
import {FileEncodingOptions} from "./FileEncodingOptions.mjs";
import {cwd, env} from "process";
import {assert} from "../common/assert.mjs";
import {delimiter, isAbsolute} from "path";

class CurrentWorkingDirectoryAndEnvironmentVariableCache<T>
{
	readonly #environment_variable_getter
	
	#current_working_directory: AbsoluteFolderPath
	
	#environment_variable_value: string
	
	readonly #cached_value_calculator
	
	#cached_value: T
	
	/**
	 * @internal
	 */
	constructor(environment_variable_getter: () => string, cached_value_calculator: (current_working_directory: AbsoluteFolderPath, environment_variable_value: string) => T)
	{
		this.#environment_variable_getter = environment_variable_getter
		this.#current_working_directory = AbsoluteFolderPath.current_working_directory()
		this.#environment_variable_value = this.#environment_variable_getter()
		this.#cached_value_calculator = cached_value_calculator
		this.#cached_value = this.#cached_value_calculator(this.#current_working_directory, this.#environment_variable_value)
	}
	
	get(this: this): T
	{
		const current_working_directory = AbsoluteFolderPath.current_working_directory()
		const environment_variable_value = this.#environment_variable_getter()
		
		if (current_working_directory === this.#current_working_directory && environment_variable_value === this.#environment_variable_value)
		{
			return this.#cached_value
		}
		
		this.#current_working_directory = current_working_directory
		this.#environment_variable_value = environment_variable_value
		this.#cached_value = this.#cached_value_calculator(current_working_directory, this.#environment_variable_value)
		
		return this.#cached_value
	}
}


export class AbsoluteFolderPath extends AbsolutePath
{
	static #home = new CurrentWorkingDirectoryAndEnvironmentVariableCache(homedir, AbsoluteFolderPath.#single_path_getter)
	
	static #temporary = new CurrentWorkingDirectoryAndEnvironmentVariableCache(tmpdir, AbsoluteFolderPath.#single_path_getter)
	
	static #PATH = new CurrentWorkingDirectoryAndEnvironmentVariableCache(() => env["PATH"] ?? "", AbsoluteFolderPath.#multiple_path_getter)
	
	static #single_path_getter(current_working_directory: AbsoluteFolderPath, environment_variable_value: string): AbsoluteFolderPath
	{
		if (isAbsolute(environment_variable_value))
		{
			return new AbsoluteFolderPath(environment_variable_value)
		}
		else
		{
			return current_working_directory.sub_folder_path(environment_variable_value)
		}
	}
	
	static #multiple_path_getter(current_working_directory: AbsoluteFolderPath, environment_variable_value: string): AbsoluteFolderPath[]
	{
		const paths = []
		
		for (let path of environment_variable_value.split(delimiter))
		{
			if (path === "")
			{
				continue
			}
			let absolute_path
			if (isAbsolute(path))
			{
				absolute_path = new AbsoluteFolderPath(path)
			}
			else
			{
				absolute_path = current_working_directory.sub_folder_path(path)
			}
			paths.push(absolute_path)
		}
		
		return paths
	}
	
	public static current_working_directory(): AbsoluteFolderPath
	{
		return new AbsoluteFolderPath(cwd())
	}
	
	public static home(): AbsoluteFolderPath
	{
		return AbsoluteFolderPath.#home.get()
	}
	
	public static temporary(): AbsoluteFolderPath
	{
		return AbsoluteFolderPath.#temporary.get()
	}
	
	public static PATH(): AbsoluteFolderPath[]
	{
		return AbsoluteFolderPath.#PATH.get()
	}
	
	public static find_root_folder_path(depth: number): AbsoluteFolderPath
	{
		assert.is_positive_integer(depth)

		const { node_script_absolute_file_path } = assert.argv_has_at_least_two_arguments()

		const parent_folder_path = node_script_absolute_file_path.dirname()
		const path_components = [parent_folder_path]
		for (let index = 0; index < depth; index++)
		{
			path_components.push("..")
		}

		return new AbsoluteFolderPath(...path_components)
	}
	
	public constructor(...absolute_folder_path_components: string[])
	{
		super(...absolute_folder_path_components)
	}
	
	public get absolute_folder_path(): string
	{
		assert.is_instance_of(this, AbsoluteFolderPath)
		
		return this.absolute_path
	}
	
	public sub_folder_path(this: this, ...relative_folder_path_components: string[]): AbsoluteFolderPath
	{
		return new AbsoluteFolderPath(...[this.absolute_folder_path, ...relative_folder_path_components])
	}
	
	public sub_file_path(this: this, ...relative_file_path_components: string[]): AbsoluteFilePath
	{
		return new AbsoluteFilePath(...[this.absolute_folder_path, ...relative_file_path_components])
	}
	
	public remove_recursively_forcibly(this: this)
	{
		try
		{
			rmSync(this.absolute_folder_path, RemoveRecursivelyOptions)
		}
		catch(cause)
		{
			throw new Error(`Could not recursively delete ${this}`, {cause})
		}
	}
	
	public mkdir_700_p(this: this): AbsoluteFolderPath | null
	{
		let first_folder_path_created
		try
		{
			first_folder_path_created = mkdirSync(this.absolute_folder_path, MkdirOptions)
		}
		catch(cause)
		{
			throw new Error(`Could not mkdir -m 0700 -p ${this}`, {cause})
		}
		
		return first_folder_path_created === undefined ? null: new AbsoluteFolderPath(first_folder_path_created)
	}
	
	public entries(this: this): Dirent[]
	{
		try
		{
			return readdirSync(this.absolute_folder_path, ReadDirOptions)
		}
		catch(cause)
		{
			throw new Error(`Could not read the directory in path ${this}`, {cause})
		}
	}
	
	public copy_to_recursively_forcibly(this: this, to: this): void
	{
		try
		{
			cpSync(this.absolute_folder_path, to.absolute_folder_path, RecursiveCopyOptions)
		}
		catch(cause)
		{
			throw new Error(`Could not recursively copy ${this} to ${to}`, {cause})
		}
	}
}

const MkdirOptions = Object.freeze({ recursive: true, mode: 0o755 })

const RetryDelayMilliseconds = 100

const RemoveRecursivelyOptions = Object.freeze
({
	force: true,
	maxRetries: 3,
	recursive: true,
	retryDelay: RetryDelayMilliseconds
})

const ReadDirOptions: Readonly<ObjectEncodingOptions & { withFileTypes: true; recursive?: boolean | undefined }> = Object.freeze(Object.assign
(
	{
		withFileTypes: true,
		recursive: false
	},
	FileEncodingOptions
)) as Readonly<ObjectEncodingOptions & { withFileTypes: true; recursive?: boolean | undefined }>

const RecursiveCopyOptions: Readonly<CopySyncOptions> = Object.freeze
({
	dereference: false,
	errorOnExit: false,
	//filter: undefined,
	force: true,
	mode: 0,
	preserveTimestamps: true,
	recursive: true,
	verbatimSymlinks: false,
})
