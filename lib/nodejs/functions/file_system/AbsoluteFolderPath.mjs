// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {assert} from "../common/assert.mjs";
import {dirname, join} from "node:path";
import {AbsoluteFilePath} from "./AbsoluteFilePath.mjs";
import {homedir, tmpdir} from "node:os";

export class AbsoluteFolderPath
{
	static Home = new AbsoluteFolderPath(homedir())

	static Temporary = new AbsoluteFolderPath(tmpdir())

	static find_root_folder_path(depth)
	{
		assert.is_positive_integer(depth)

		const { node_script_absolute_file_path } = assert.argv_has_at_least_two_arguments(depth)

		const parent_folder_path = dirname(node_script_absolute_file_path)
		const path_components = [parent_folder_path]
		for (let index = 0; index < depth; index++)
		{
			path_components.push("..")
		}

		return new AbsoluteFolderPath(...path_components)
	}

	#absolute_folder_path

	constructor(...absolute_folder_path_components)
	{
		assert.is_non_empty_string_array(absolute_folder_path_components)

		this.#absolute_folder_path = join(...absolute_folder_path_components)
		assert.is_absolute_path(this.#absolute_folder_path)
	}

	toString()
	{
		assert.is_instance_of(this, AbsoluteFolderPath)

		return this.absolute_folder_path
	}

	get absolute_folder_path()
	{
		return this.#absolute_folder_path
	}

	sub_folder_path(...relative_folder_path_components)
	{
		assert.is_instance_of(this, AbsoluteFolderPath)
		assert.is_non_empty_string_array(relative_folder_path_components)

		return new AbsoluteFolderPath(...[this.#absolute_folder_path, ...relative_folder_path_components])
	}

	sub_file_path(...relative_file_path_components)
	{
		assert.is_instance_of(this, AbsoluteFolderPath)
		assert.is_non_empty_string_array(relative_file_path_components)

		return new AbsoluteFilePath(...[this.#absolute_folder_path, ...relative_file_path_components])
	}
}
