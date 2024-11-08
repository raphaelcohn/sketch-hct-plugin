#!/usr/bin/env node
// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

'use strict'

import {find_root_folder_path} from "../../lib/nodejs/functions/find_root_folder_path.mjs";
import {assert} from "../../lib/nodejs/functions/common/assert.mjs";
import {SketchPluginBuildActions} from "./modules/SketchPluginBuildActions.mjs";
import {exit_error} from "../../lib/nodejs/functions/common/exit_error.mjs";

function main()
{
	const root_folder_path = find_root_folder_path(2)
	const { script_arguments } = assert.argv_has_at_least_two_arguments()

	const [ online_or_offline, ...extra ] = script_arguments

	if (online_or_offline === undefined)
	{
		exit_error(15, `Please supply 1 command line argument, online or offline`)
	}

	if (extra.length > 0)
	{
		exit_error(15, `Please supply only 1 command line argument, not more`)
	}

	SketchPluginBuildActions.build(root_folder_path, online_or_offline)
}

main()
