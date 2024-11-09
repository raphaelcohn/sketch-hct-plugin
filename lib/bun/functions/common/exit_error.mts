// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {exit} from "node:process";
import {assert} from "./assert.mjs";
import {write_stderr} from "../file_system/write_stderr.mjs";
import {program_name} from "./program_name.mjs";

/**
 *
 * @param exit_code Codes 0 to 1 and 3 to 14 inclusive have meaning in node (https://nodejs.org/api/process.html#exit-codes).
 * @param message
 */
export function exit_error(exit_code: number, message: string)
{
	assert.is_positive_integer(exit_code)

	write_stderr(program_name())
	write_stderr(":")
	write_stderr(message)
	write_stderr("\n")
	exit(exit_code)
}
