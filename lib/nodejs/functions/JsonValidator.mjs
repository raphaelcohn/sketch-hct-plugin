// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {assert} from "./common/assert.mjs";
import {read_json_from_file} from "./file_system/read_json_from_file.mjs";

export class JsonValidator
{
	constructor(json, file_path, ...field_names)
	{
		assert.is_object(json)
		assert.is_string(file_path)
		assert.is_string_array(field_names)

		this._json = json
		this._file_path = file_path
		this._field_names = field_names
	}

	static read_json_file(...file_path_components)
	{
		assert.is_string_array(file_path_components)

		const [file_path, json] = read_json_from_file(...file_path_components)

		return new JsonValidator(Object.freeze(json), file_path)
	}

	object_field(field_name)
	{
		assert.is_instance_of(this, JsonValidator)
		assert.is_string(field_name)

		const json = this._field(field_name, "object")

		const field_names = Array.from(this._field_names)
		field_names.push(field_name)
		return new JsonValidator(json, this._file_path, field_names)
	}

	string_field(field_name)
	{
		assert.is_instance_of(this, JsonValidator)
		assert.is_string(field_name)

		return this._field(field_name, "string")
	}

	array_field(field_name)
	{
		assert.is_instance_of(this, JsonValidator)
		assert.is_string(field_name)

		const field = this._field(field_name, "object")
		if (!Array.isArray(field))
		{
			throw new TypeError(`${this._json_message()} JSON's field ${field_name} is not an array`)
		}

		return field
	}

	_field(field_name, expected_field_type)
	{
		assert.is_instance_of(this, JsonValidator)
		assert.is_string(field_name)
		assert.is_string(expected_field_type)

		const field_value = this._json[field_name]
		const field_type = typeof(field_value)
		if (field_type === 'undefined')
		{
			throw new Error(`${this._json_message()} JSON is missing the field ${field_name}`)
		}
		if (field_type !== expected_field_type)
		{
			throw new TypeError(`${this._json_message()} JSON's field ${field_name} is not of type ${expected_field_type}`)
		}
		return field_value
	}

	_json_message()
	{
		assert.is_instance_of(this, JsonValidator)

		let field_names_message = ""
		for (let field_name of this._field_names)
		{
			field_names_message = `${field_names_message}.${field_name}`
		}

		return `${this._file_path}${field_names_message}`
	}
}
