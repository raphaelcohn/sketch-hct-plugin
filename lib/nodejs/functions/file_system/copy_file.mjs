// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {copyFileSync} from "node:fs"
import {assert} from "../common/assert.mjs";
import {join} from "node:path";

const mode = 0

export function copy_file(from_file_path_components, ...to_file_path_components)
{
	assert.is_non_empty_string_array(from_file_path_components)
	assert.is_non_empty_string_array(to_file_path_components)

	const from_file_path = join(...from_file_path_components)
	const to_file_path = join(...to_file_path_components)
	try
	{
		copyFileSync(from_file_path_components, to_file_path_components, mode)
	}
	catch(cause)
	{
		throw new Error(`Could not copy to ${to_file_path}`, {cause})
	}
	return to_file_path
}
