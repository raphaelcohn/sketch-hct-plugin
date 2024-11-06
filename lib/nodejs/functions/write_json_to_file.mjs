// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {assert_is_object, assert_is_string, assert_is_string_array} from "./assert.mjs";
import {join} from "node:path";
import {writeFileSync} from "node:fs";
import {FileEncodingOptions} from "./FileEncodingOptions.mjs";
import {write_string_to_file} from "./write_string_to_file.mjs";

export function write_json_to_file(json, ...file_path_components)
{
	assert_is_object(json)
	assert_is_string_array(file_path_components)

	return write_string_to_file(JSON.stringify(json))
}
