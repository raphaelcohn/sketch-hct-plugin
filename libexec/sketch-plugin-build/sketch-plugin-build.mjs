#!/usr/bin/env node
// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

'use strict'

import {find_root_folder_path} from "../../lib/nodejs/functions/find_root_folder_path.mjs";
import {assert} from "../../lib/nodejs/functions/assert.mjs";
import {PackageJson} from "../../lib/nodejs/functions/PackageJson.mjs";
import {SketchPluginBuildActions} from "./modules/SketchPluginBuildActions.mjs";

function main()
{
	const root_folder_path = find_root_folder_path(2)
	const { script_arguments } = assert.argv_has_at_least_two_arguments()

	const [ online_or_offline, ...skpm_build_arguments ] = script_arguments

	const sketch_plugin_name = PackageJson.new(root_folder_path).package_name
	new SketchPluginBuildActions(root_folder_path, sketch_plugin_name)
		.install_dependencies_reproducibly(online_or_offline)
		.compile_typescript()
		.remove_sketch_plugin_previous_build_output()
		.generate_manifest()
		.execute_skpm_build(skpm_build_arguments)
		.tidy_up_after_skpm_build()
		.link_build_output()
}

main()
