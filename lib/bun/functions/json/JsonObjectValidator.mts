// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import assert from "../common/assert.mjs";
import type AbsoluteFilePath from "../file_system/AbsoluteFilePath.mjs"
import type Json from "./Json.d.ts"
import type JsonObject from "./JsonObject.d.ts"
import type JsonValue from "./JsonValue.d.ts"

type FieldTypeOf = "string" | "number" | "boolean" | "null" | "object"

export default class JsonObjectValidator
{
	public static read_file(file_path: AbsoluteFilePath): JsonObjectValidator
	{
		return JsonObjectValidator.#from_json(file_path.read_json_from(), file_path)
	}
	
	static #from_json(json: Json, file_path: AbsoluteFilePath, ...field_names: string[]): JsonObjectValidator
	{
		return new JsonObjectValidator(Object.freeze(JsonObjectValidator.#as_json_object_or_error(json)), file_path, ...field_names)
	}
	
	static #as_json_object_or_error(json: Json): JsonObject
	{
		if (json === null)
		{
			throw new TypeError("json is null and not a JsonObject")
		}
		const type_of_json: string = typeof(json)
		if (type_of_json === "object")
		{
			if (Array.isArray(json))
			{
				throw new TypeError("json is an array and not a JsonObject")
			}
			return json as JsonObject
		}
		throw new TypeError(`json is not a JsonObject but is a primitive of type ${type_of_json}`)
	}
	
	readonly #json: JsonObject
	readonly #file_path: AbsoluteFilePath
	readonly #field_names: string[]
	
	public constructor(json: Readonly<JsonObject>, file_path: AbsoluteFilePath, ...field_names: string[])
	{
		this.#file_path = file_path
		this.#field_names = field_names
		this.#json = json
	}
	
	public object_field(this: this, field_name: string): JsonObjectValidator
	{
		assert.is_non_empty_string(field_name)
		
		const field = this.#single_value_field(field_name, "object") as JsonObject
		if (field === null)
		{
			throw new TypeError(`${this.#json_message()} JSON's field ${field_name} is null and not a JsonObject`)
		}
		const json = Object.freeze(field)

		return new JsonObjectValidator(json, this.#file_path, ...[...this.#field_names, field_name])
	}
	
	public string_field(this: this, field_name: string): string
	{
		assert.is_non_empty_string(field_name)
		
		return this.#single_value_field(field_name, "string") as string
	}
	
	public number_field(this: this, field_name: string): number
	{
		assert.is_non_empty_string(field_name)
		
		return this.#single_value_field(field_name, "number") as number
	}
	
	public boolean_field(this: this, field_name: string): boolean
	{
		assert.is_non_empty_string(field_name)

		return this.#single_value_field(field_name, "boolean") as boolean
	}
	
	public null_field(this: this, field_name: string): null
	{
		assert.is_non_empty_string(field_name)

		return this.#single_value_field(field_name, "null") as null
	}
	
	public string_array_field(this: this, field_name: string): string[]
	{
		assert.is_non_empty_string(field_name)
		
		return this.#primitive_array_field(field_name, "string")
	}
	
	public number_array_field(this: this, field_name: string): number[]
	{
		assert.is_non_empty_string(field_name)
		
		return this.#primitive_array_field(field_name, "number")
	}
	
	public boolean_array_field(this: this, field_name: string): boolean[]
	{
		assert.is_non_empty_string(field_name)
		
		return this.#primitive_array_field(field_name, "boolean")
	}
	
	public null_array_field(this: this, field_name: string): null[]
	{
		assert.is_non_empty_string(field_name)
		
		return this.#primitive_array_field(field_name, "null")
	}
	
	#primitive_array_field<T extends string | number | boolean | null>(this: this, field_name: string, expected_field_type_of: FieldTypeOf): T[]
	{
		assert.is_non_empty_string(field_name)
		
		const array = this.#array_value_field(field_name)
		for (const element of array)
		{
			if (expected_field_type_of === "null")
			{
				if (element !== null)
				{
					throw new TypeError(`${this.#json_message()} JSON's field ${field_name} is not a ${expected_field_type_of} array`)
				}
			}
			else if (typeof(element) !== expected_field_type_of)
			{
				throw new TypeError(`${this.#json_message()} JSON's field ${field_name} is not a ${expected_field_type_of} array`)
			}
		}
		return array as T[]
	}
	
	#single_value_field(this: this, field_name: string, expected_field_type_of: FieldTypeOf): JsonValue
	{
		assert.is_non_empty_string(field_name)
		
		const field = this.#field(field_name, expected_field_type_of, false)
		if (Array.isArray(field))
		{
			throw new TypeError(`${this.#json_message()} JSON's field ${field_name} is an array`)
		}
		return field as string | number | boolean | null | JsonObject
	}
	
	#array_value_field(this: this, field_name: string): JsonValue[]
	{
		assert.is_non_empty_string(field_name)

		const field = this.#field(field_name, "object", true)
		if (!Array.isArray(field))
		{
			throw new TypeError(`${this.#json_message()} JSON's field ${field_name} is not an array`)
		}

		return field
	}

	#field(this: this, field_name: string, expected_field_type_of: FieldTypeOf, is_array_field: boolean): Json
	{
		const field_value = this.#json[field_name]
		const field_type = typeof(field_value)
		
		if (field_value === "undefined")
		{
			throw new Error(`${this.#json_message()} JSON is missing the field ${field_name}`)
		}
		
		const is_array = Array.isArray(field_value)
		if (!(is_array && is_array_field))
		{
			throw new TypeError(`${this.#json_message()} JSON's field ${field_name} is ${is_array_field ? "not supposed" : "supposed"} to be an array but ${is_array ? "is": "is not"} an array`)
		}
		
		if (expected_field_type_of === "null")
		{
			if (field_value === null)
			{
				return null
			}
			throw new TypeError(`${this.#json_message()} JSON's field ${field_name} is not null`)
		}
		
		if (field_type !== expected_field_type_of)
		{
			throw new TypeError(`${this.#json_message()} JSON's field ${field_name} is not of type ${expected_field_type_of}`)
		}
		
		return field_value as Json
	}

	#json_message(this: this): string
	{
		assert.is_instance_of(this, JsonObjectValidator)

		let field_names_message = ""
		for (let field_name of this.#field_names)
		{
			field_names_message = `${field_names_message}.${field_name}`
		}

		return `${this.#file_path}${field_names_message}`
	}
}
