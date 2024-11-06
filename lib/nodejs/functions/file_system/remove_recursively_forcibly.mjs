// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {rmSync} from "node:fs";
import {assert} from "../common/assert.mjs";
import {join} from "node:path";

const RetryDelayMilliseconds = 100

const RemoveRecursivelyOptions = Object.freeze
({
	force: true,
	maxRetries: 3,
	recursive: true,
	retryDelay: RetryDelayMilliseconds
})

export function remove_recursively_forcibly(...file_path_components)
{
	assert.is_non_empty_string_array(file_path_components)

	const file_path = join(...file_path_components)

	try
	{
		rmSync(file_path, RemoveRecursivelyOptions)
	}
	catch(cause)
	{
		throw new Error(`Could not recursively delete ${file_path}`, {cause})
	}

	return file_path
}
