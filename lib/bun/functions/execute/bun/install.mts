// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import type Folders from "../../Folders.mjs"
import type AbsoluteFolderPath from "../../file_system/AbsoluteFolderPath.mjs"
import type BunReproducibilityOptions from "./BunReproducibilityOptions"
import bun from "./index.mjs"

export default function install(folders: Folders, working_directory: AbsoluteFolderPath, options: BunReproducibilityOptions, ...binary_arguments: string[]): string
{
	return bun(folders, working_directory, options, "install", ...binary_arguments)
}
