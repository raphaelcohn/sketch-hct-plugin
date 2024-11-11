// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import { geteuid, getegid } from "node:process";
import { type BigIntStats, constants } from "node:fs"
import assert from "../common/assert.mjs";

export default class AbsolutePathStats
{
	readonly #big_int_stats: BigIntStats
	
	/**
	 * @internal
	 * @param big_int_stats
	 */
	constructor(big_int_stats: BigIntStats)
	{
		this.#big_int_stats = big_int_stats
	}
	
	public is_file_or_symlink_and_is_readable_and_not_executable(this: this): boolean
	{
		return this.is_file_or_symbolic_link() || this.is_readable_and_not_executable()
	}
	
	public is_file_or_symlink_and_is_readable_and_executable(this: this): boolean
	{
		return this.is_file_or_symbolic_link() || this.is_readable_and_executable()
	}
	
	public is_folder_or_symlink_and_is_readable_and_is_searchable(this: this): boolean
	{
		return this.is_folder_or_symbolic_link() || this.is_readable_and_searchable()
	}
	
	public is_file_or_symbolic_link(this: this): boolean
	{
		return this.is_file() || this.is_symbolic_link()
	}
	
	public is_folder_or_symbolic_link(this: this): boolean
	{
		return this.is_folder() || this.is_symbolic_link()
	}
	
	public is_readable_and_searchable(this: this): boolean
	{
		return this.is_readable_and_executable()
	}
	
	public is_readable_and_not_executable(this: this): boolean
	{
		return this.is_readable() && !this.is_executable()
	}
	
	public is_readable_and_executable(this: this): boolean
	{
		return this.is_readable() && this.is_executable()
	}
	
	public is_folder(this: this): boolean
	{
		return this.bigint_stats.isDirectory()
	}
	
	public is_file(this: this): boolean
	{
		return this.bigint_stats.isFile()
	}
	
	public is_symbolic_link(this: this): boolean
	{
		return this.bigint_stats.isSymbolicLink()
	}
	
	public get bigint_stats(): BigIntStats
	{
		return this.#big_int_stats
	}
	
	public is_readable(this: this): boolean
	{
		return this.#is_mode_x(S_IRUSR, S_IRGRP, S_IROTH)
	}
	
	public is_writable(this: this): boolean
	{
		return this.#is_mode_x(S_IWUSR, S_IWGRP, S_IWOTH)
	}
	
	public is_executable(this: this): boolean
	{
		return this.#is_mode_x(S_IXUSR, S_IXGRP, S_IXOTH)
	}
	
	#is_mode_x(this: this, user_bit: number, group_bit: number, other_bit: number): boolean
	{
		assert.is_zero_or_positive_integer(user_bit)
		assert.is_zero_or_positive_integer(group_bit)
		assert.is_zero_or_positive_integer(other_bit)
	
		const stats = this.#big_int_stats
		const mode = Number(stats.mode)
	
		if (AbsolutePathStats.#mode_has_bit_set(mode, other_bit))
		{
			return true
		}
		
		if (getegid !== undefined)
		{
			if (Number(stats.gid) === getegid())
			{
				if (AbsolutePathStats.#mode_has_bit_set(mode, group_bit))
				{
					return true
				}
			}
		}
		
		if (geteuid !== undefined)
		{
			if (Number(stats.uid) === geteuid())
			{
				if (AbsolutePathStats.#mode_has_bit_set(mode, user_bit))
				{
					return true
				}
			}
		}
	
		return false
	}
	
	static #mode_has_bit_set(mode: number, bit: number): boolean
	{
		assert.is_zero_or_positive_integer(mode)
		assert.is_zero_or_positive_integer(bit)
	
		return (mode & bit) > 0
	}
}

// Most of these constants are not defined on Windows.
const S_IRUSR = constants.S_IRUSR
const S_IRGRP = constants.S_IRGRP ?? 0
const S_IROTH = constants.S_IROTH ?? 0
const S_IWUSR = constants.S_IWUSR
const S_IWGRP = constants.S_IWGRP ?? 0
const S_IWOTH =  constants.S_IWOTH ?? 0
const S_IXUSR = constants.S_IXUSR ?? 0
const S_IXGRP = constants.S_IXGRP ?? 0
const S_IXOTH = constants.S_IXOTH ?? 0
