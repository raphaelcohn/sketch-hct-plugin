// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import type Target from "./Target.mts"
import type Naming from "./Naming.mts"
import { DefaultNaming } from "./Naming.mts"
import type Loaders from "./Loaders.d.ts"

export default interface Options
{
	target: Target,
	
	bundle_external_packages: boolean,
	
	// List of import paths to be left to resolve at runtime.
	import_paths_to_resolve_at_runtime: string[]
	
	naming: Naming,
	
	loaders: Loaders,
}

export const SketchPluginOptions: Readonly<Options> = Object.freeze
({
	target: Target.node,
	
	bundle_external_packages: true,
	
	import_paths_to_resolve_at_runtime:
	[
		"sketch",
		"sketch/async",
		"sketch/data-supplier",
		"sketch/dom",
		"sketch/settings",
		"sketch/ui",
	],
	
	naming: DefaultNaming
})
