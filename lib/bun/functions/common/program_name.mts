// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import assert from "./assert.mjs";
import type FileName from "../file_system/FileName.mjs"

export default function program_name(): FileName
{
	const { node_script_absolute_file_path } = assert.argv_has_at_least_two_arguments()
	return node_script_absolute_file_path.basename()
}