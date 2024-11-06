// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {assert_is_non_empty_string, assert_is_object, assert_is_string, assert_is_string_array, assert_is_this} from "./assert.mjs";
import {FileEncodingOptions} from "./FileEncodingOptions.mjs";
import {isAbsolute, join} from "node:path";
import {readFileSync} from "node:fs";

export class JsonValidator
{
	constructor(json, file_path, ...field_names)
	{
		assert_is_object(json)
		assert_is_string(file_path)
		assert_is_string_array(field_names)

		this._json = json
		this._file_path = file_path
		this._field_names = field_names
	}

	static _ReadFileOptions = Object.freeze(Object.assign
	(
		{
			flag: 'r'
		},
		FileEncodingOptions
	))

	static read_json_file(...file_path_components)
	{
		assert_is_string_array(file_path_components)

		const file_path = join(...file_path_components)

		let json_string
		try
		{
			json_string = readFileSync(file_path, JsonValidator._ReadFileOptions)
		}
		catch(cause)
		{
			throw new Error(`Could not read JSON file at ${file_path}`, {cause})
		}

		let json
		try
		{
			json = JSON.parse(json_string)
		}
		catch(cause)
		{
			throw new Error(`Could parse JSON at ${file_path}`, {cause})
		}

		return new JsonValidator(Object.freeze(json), file_path)
	}

	object_field(field_name)
	{
		assert_is_this(this, JsonValidator)
		assert_is_string(field_name)

		const json = this._field(field_name, "object")

		const field_names = Array.from(this._field_names)
		field_names.push(field_name)
		return new JsonValidator(json, this._file_path, field_names)
	}

	string_field(field_name)
	{
		assert_is_this(this, JsonValidator)
		assert_is_string(field_name)

		return this._field(field_name, "string")
	}

	_field(field_name, expected_field_type)
	{
		assert_is_this(this, JsonValidator)
		assert_is_string(field_name)
		assert_is_string(expected_field_type)

		const field_value = this._json[field_name]
		const field_type = typeof(field_value)
		if (field_type === 'undefined')
		{
			throw new Error(`${this._json_message()} JSON is missing the field ${field_name}`)
		}
		if (field_type !== expected_field_type)
		{
			throw new Error(`${this._json_message()} JSON's field ${field_name} is not of type ${expected_field_type}`)
		}
		return field_value
	}

	_json_message()
	{
		assert_is_this(this, JsonValidator)

		let field_names_message = ""
		for (let field_name of this._field_names)
		{
			field_names_message = `${field_names_message}.${field_name}`
		}

		return `${this._file_path}${field_names_message}`
	}
}
