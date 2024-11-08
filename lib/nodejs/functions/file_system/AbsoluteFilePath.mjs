// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {assert} from "../common/assert.mjs";
import {join} from "node:path";
import {copy_file} from "./copy_file.mjs";
import {write_json_to_file} from "./write_json_to_file.mjs";
import {read_json_from_file} from "./read_json_from_file.mjs";
import {write_string_to_file} from "./write_string_to_file.mjs";
import {read_string_from_file} from "./read_string_from_file.mjs";

export class AbsoluteFilePath
{
	#absolute_file_path

	constructor(...absolute_file_path_components)
	{
		assert.is_non_empty_string_array(absolute_file_path_components)

		this.#absolute_file_path = join(...absolute_file_path_components)
		assert.is_absolute_path(this.#absolute_file_path)
	}

	toString()
	{
		assert.is_instance_of(this, AbsoluteFilePath)

		return this.absolute_file_path
	}

	get absolute_file_path()
	{
		assert.is_instance_of(this, AbsoluteFilePath)

		return this.#absolute_file_path
	}

	copy_to(destination_absolute_file_path)
	{
		assert.is_instance_of(this, AbsoluteFilePath)
		assert.is_instance_of(destination_absolute_file_path, AbsoluteFilePath)

		copy_file([this.absolute_file_path, destination_absolute_file_path.absolute_file_path])
	}

	copy_from(source_absolute_file_path)
	{
		assert.is_instance_of(this, AbsoluteFilePath)
		assert.is_instance_of(source_absolute_file_path, AbsoluteFilePath)

		copy_file([source_absolute_file_path.absolute_file_path, this.absolute_file_path])
	}

	write_string_to(string)
	{
		assert.is_instance_of(this, AbsoluteFilePath)

		write_string_to_file(string, this.absolute_file_path)
	}

	write_json_to(json)
	{
		assert.is_instance_of(this, AbsoluteFilePath)

		write_json_to_file(json, this.absolute_file_path)
	}

	read_string_from()
	{
		assert.is_instance_of(this, AbsoluteFilePath)

		return read_string_from_file(this.absolute_file_path)
	}

	read_json_from()
	{
		assert.is_instance_of(this, AbsoluteFilePath)

		return read_json_from_file(this.absolute_file_path)
	}
}
