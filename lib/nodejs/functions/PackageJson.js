// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {assert_is_non_empty_string} from "./assert.mjs";
import {JsonValidator} from "./JsonValidator.mjs";

export class PackageJson
{
	constructor(json_validator)
	{
		this._json_validator = json_validator
	}

	static new(root_folder_path)
	{
		assert_is_non_empty_string(root_folder_path)

		const json_validator = JsonValidator.read_json_file(root_folder_path, "package.json")
		return new PackageJson(json_validator)
	}

	get package_name()
	{
		return this._json_validator.string_field("name")
	}

	get package_name()
	{
		return this._json_validator.string_field("name")
	}
}
