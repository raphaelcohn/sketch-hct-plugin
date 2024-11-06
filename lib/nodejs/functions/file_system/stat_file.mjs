// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {assert} from "../common/assert.mjs";
import {join} from "node:path";
import {statSync, constants } from "node:fs";
import { geteuid, getegid } from "node:process";

const StatSyncOptions = Object.freeze
({
	bigint: true,
	throwIfNoEntry: false
})

export function stat_file(...file_path_components)
{
	assert.is_non_empty_string_array(file_path_components)
	const file_path = join(...file_path_components)

	let stat = statSync(file_path, StatSyncOptions)
	if (stat === undefined)
	{
		return [file_path, null]
	}

	stat.is_readable = is_readable
	stat.is_writable = is_writable
	stat.is_executable = is_executable

	return [file_path, stat]
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

function is_readable()
{
	assert.is_object(this)

	return is_mode_x(this, S_IRUSR, S_IRGRP, S_IROTH)
}

function is_writable()
{
	assert.is_object(this)

	return is_mode_x(this, S_IWUSR, S_IWGRP, S_IWOTH)
}

function is_executable()
{
	assert.is_object(this)

	return is_mode_x(this, S_IXUSR, S_IXGRP, S_IXOTH)
}

function is_mode_x(stat, user_bit, group_bit, other_bit)
{
	assert.is_object(stat)
	assert.is_zero_or_positive_integer(user_bit)
	assert.is_zero_or_positive_integer(group_bit)
	assert.is_zero_or_positive_integer(other_bit)

	const mode = Number(stat.mode)

	if (mode_has_bit_set(mode, other_bit))
	{
		return true
	}

	if (Number(stat.gid) === getegid())
	{
		if (mode_has_bit_set(mode, group_bit))
		{
			return true
		}
	}

	if (Number(stat.uid) === geteuid())
	{
		if (mode_has_bit_set(mode, user_bit))
		{
			return true
		}
	}

	return false
}

function mode_has_bit_set(mode, bit)
{
	assert.is_zero_or_positive_integer(mode)
	assert.is_zero_or_positive_integer(bit)

	return (mode & bit) > 0
}
