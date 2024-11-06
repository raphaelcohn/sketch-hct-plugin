// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {assert} from "../common/assert.mjs";
import {stat_file} from "./stat_file.mjs";

export function is_folder_or_symlink_and_is_readable_and_is_searchable(...folder_path_components)
{
	assert.is_non_empty_string_array(folder_path_components)

	const [folder_path, stat] = stat_file(...folder_path_components)

	if (stat === null)
	{
		return [folder_path, false]
	}

	return [folder_path, (stat.isDirectory() || stat.isSymbolicLink()) | stat.is_readable() && stat.is_executable()]
}
