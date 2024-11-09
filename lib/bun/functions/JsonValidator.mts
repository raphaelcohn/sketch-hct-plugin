// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {assert} from "./common/assert.mjs";
import type { AbsoluteFilePath } from "./file_system/AbsoluteFilePath.mjs"
import type { Json } from "./file_system/Json.mjs"

export class JsonValidator
{
	readonly #json: Readonly<Json>
	readonly #file_path: AbsoluteFilePath
	readonly #field_names: string[]
	
	public constructor(json: Readonly<Json>, file_path: AbsoluteFilePath, ...field_names: string[])
	{
		this.#json = json
		this.#file_path = file_path
		this.#field_names = field_names
	}

	public static read_json_file(file_path: AbsoluteFilePath): JsonValidator
	{
		return new JsonValidator(Object.freeze(file_path.read_json_from()), file_path)
	}

	public object_field(this: this, field_name: string): JsonValidator
	{
		assert.is_non_empty_string(field_name)

		const json = this.#field(field_name, "object")

		return new JsonValidator(json, this.#file_path, ...[...this.#field_names, field_name])
	}
	
	public string_field(this: this, field_name: string): string
	{
		assert.is_non_empty_string(field_name)

		return this.#field(field_name, "string")
	}
	
	public array_field(this: this, field_name: string): Json[]
	{
		assert.is_non_empty_string(field_name)

		const field = this.#field(field_name, "object")
		if (!Array.isArray(field))
		{
			throw new TypeError(`${this.#json_message()} JSON's field ${field_name} is not an array`)
		}

		return field
	}

	#field(this: this, field_name: string, expected_field_type: "string" | "number" | "boolean" | "object" | "null"): string | number | boolean | null | Readonly<Json>
	{
		const field_value = this.#json[field_name]
		const field_type = typeof(field_value)
		if (field_value === "undefined")
		{
			throw new Error(`${this.#json_message()} JSON is missing the field ${field_name}`)
		}
		if (field_type !== expected_field_type)
		{
			throw new TypeError(`${this.#json_message()} JSON's field ${field_name} is not of type ${expected_field_type}`)
		}
		return field_value
	}

	#json_message(this: this): string
	{
		assert.is_instance_of(this, JsonValidator)

		let field_names_message = ""
		for (let field_name of this.#field_names)
		{
			field_names_message = `${field_names_message}.${field_name}`
		}

		return `${this.#file_path}${field_names_message}`
	}
}
