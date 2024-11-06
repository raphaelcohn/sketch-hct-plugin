// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {cpSync} from "node:fs";
import {assert} from "../common/assert.mjs";
import {join} from "node:path";

const RecursiveCopyOptions = Object.freeze
({
	dereference: false,
	errorOnExit: false,
	filter: undefined,
	force: true,
	mode: 0,
	preserveTimestamps: true,
	recursive: true,
	verbatimSymlinks: false
})

export function copy_recursive_forcibly(source_path_components, destination_path_components)
{
	assert.is_string_array(source_path_components)
	assert.is_string_array(destination_path_components)

	cpSync(join(source_path_components), join(destination_path_components), RecursiveCopyOptions)
}
