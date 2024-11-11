// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import type Json from "../json/Json.d.ts"
import {dirname} from "node:path";
import {copyFileSync, readFileSync, writeFileSync} from "node:fs";
import AbsolutePath from "./AbsolutePath.mjs";
import FileEncodingOptions from "./FileEncodingOptions.mjs";
import AbsoluteFolderPath from "./AbsoluteFolderPath.mjs";
import {execFileSync} from "node:child_process";
import assert from "../common/assert.mjs";

export default class AbsoluteFilePath extends AbsolutePath
{
	static #CopyToMode = 0
	
	public constructor(...absolute_file_path_components: string[])
	{
		super(...absolute_file_path_components)
	}
	
	public get absolute_file_path(): string
	{
		assert.is_instance_of(this, AbsoluteFilePath)
		
		return super.absolute_path
	}
	
	public dirname(this: this): AbsoluteFolderPath
	{
		return new AbsoluteFolderPath(dirname(this.absolute_file_path))
	}
	
	public copy_to(this: this, destination: this): void
	{
		try
		{
			copyFileSync(this.absolute_file_path, destination.absolute_file_path, AbsoluteFilePath.#CopyToMode)
		}
		catch(cause: unknown)
		{
			throw new Error(`Could not copy from ${this} to ${destination}`, {cause})
		}
	}
	
	public copy_from(this: this, source: this): void
	{
		return source.copy_to(this)
	}
	
	public write_json_to(this: this, json: Json): void
	{
		const string = JSON.stringify(json)
		return this.write_string_to(string)
	}
	
	public write_string_to(this: this, string: string): void
	{
		try
		{
			writeFileSync(this.absolute_file_path, string, FileWriteOptions)
		}
		catch(cause: unknown)
		{
			throw new Error(`Could not write to ${this.absolute_file_path}`, {cause})
		}
	}
	
	public read_json_from(this: this): Json
	{
		const string = this.read_string_from()
		
		try
		{
			return JSON.parse(string)
		}
		catch(cause)
		{
			throw new Error(`Could parse JSON from file at ${this.absolute_file_path}`, {cause})
		}
	}
	
	public read_string_from(this: this): string
	{
		try
		{
			return readFileSync(this.absolute_file_path, ReadFileOptions)
		}
		catch(cause)
		{
			throw new Error(`Could not read string from file at ${this.absolute_file_path}`, {cause})
		}
	}
	
	public execute(this: this, working_directory: AbsoluteFolderPath, ...binary_arguments: string[]): string
	{
		const options = Object.freeze(Object.assign
		(
			{
				cwd: working_directory.absolute_folder_path
			},
			ExecFileOptions
		))
		return execFileSync(this.absolute_file_path, binary_arguments, options)
	}
}

const TimeoutInMilliseconds = 60_000

const ExecFileOptions = Object.freeze
(
	Object.assign
	(
		{
			shell: false,
			timeout: TimeoutInMilliseconds,
		},
		FileEncodingOptions
	)
)

const FileWriteOptions = Object.freeze(Object.assign
(
	{
		mode: 0o600,
		flag: 'w',
		flush: true
	},
	FileEncodingOptions
))

const ReadFileOptions: Readonly<{encoding: BufferEncoding; flag?: string | undefined}> = Object.freeze(Object.assign
(
	{
		flag: 'r'
	},
	FileEncodingOptions
))
