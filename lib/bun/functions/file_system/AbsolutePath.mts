// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {statSync, symlinkSync, unlinkSync} from "node:fs";
import {join} from "node:path";
import {AbsoluteFilePath} from "./AbsoluteFilePath.mjs";
import {AbsolutePathStats} from "./AbsolutePathStats.mjs";
import {assert} from "../common/assert.mjs";

export abstract class AbsolutePath
{
	readonly #absolute_path: string
	
	protected constructor(...absolute_path_components: string[])
	{
		const absolute_path = join(...absolute_path_components)
		assert.is_absolute_path(absolute_path)
		
		this.#absolute_path = absolute_path
	}
	
	public toString(this: this, _radix?: number): string
	{
		return this.absolute_path
	}
	
	protected get absolute_path(): string
	{
		assert.is_instance_of(this, AbsolutePath)
		
		return this.#absolute_path
	}
	
	public remove(this: this): void
	{
		try
		{
			unlinkSync(this.absolute_path)
		}
		catch (cause)
		{
			throw new Error(`Could not remove file or folder at ${this.absolute_path} (?does it exist?)`, {cause})
		}
	}
	
	public is_file_or_symlink_and_is_readable_and_not_executable(this: this): boolean
	{
		const stats = this.stat()
		if (stats === null)
		{
			return false
		}
		return stats.is_file_or_symlink_and_is_readable_and_not_executable()
	}
	
	public is_file_or_symlink_and_is_readable_and_executable(this: this): boolean
	{
		const stats = this.stat()
		if (stats === null)
		{
			return false
		}
		return stats.is_file_or_symlink_and_is_readable_and_executable()
	}
	
	public is_folder_or_symlink_and_is_readable_and_is_searchable(this: this): boolean
	{
		const stats = this.stat()
		if (stats === null)
		{
			return false
		}
		return stats.is_folder_or_symlink_and_is_readable_and_is_searchable()
	}
	
	public stat(this: this): AbsolutePathStats | null
	{
		let big_int_stats = statSync(this.absolute_path, StatSyncOptions)
		if (big_int_stats === undefined)
		{
			return null
		}
		else
		{
			return new AbsolutePathStats(big_int_stats)
		}
	}
	
	public symlink(this: this, destination: AbsoluteFilePath): void
	{
		try
		{
			symlinkSync(this.absolute_path, destination.absolute_file_path, null)
		}
		catch(cause)
		{
			throw new Error(`Could not create symlink at ${destination}`, {cause})
		}
	}
}

const StatSyncOptions = Object.freeze
({
	bigint: true,
	throwIfNoEntry: false
})
