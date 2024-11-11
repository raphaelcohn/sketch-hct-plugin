// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {format} from "node:util";
import {argv} from "node:process";
import {isAbsolute} from "node:path";
import exit_error from "./exit_error.mjs";
import AbsoluteFilePath from "../file_system/AbsoluteFilePath.mjs";

const assert_inner =
{
	is_string(value: string): void
	{
		assert_is_type(value, "string")
	},

	is_object(value: object): void
	{
		assert_is_type(value, "object")
	},
	
	is_number(value: number): void
	{
		assert_is_type(value, "number")
	},
	
	is_boolean(value: boolean): void
	{
		assert_is_type(value, "boolean")
	},
	
	is_bigint(value: bigint): void
	{
		assert_is_type(value, "bigint")
	},
	
	is_null(value: null): void
	{
		assert_is_type(value, "null")
	},
	
	is_undefined(value: undefined): void
	{
		assert_is_type(value, "undefined")
	},
	
	is_symbol(value: symbol): void
	{
		assert_is_type(value, "symbol")
	},
	
	is_instance_of(value: object, object_instance: Function): void
	{
		assert.is_object(value)
	
		assertion(value instanceof object_instance, "value is not an instanceof %s", object_instance)
	},
	
	is_array(value: any[]): void
	{
		assertion(Array.isArray(value), "value is not an array")
	},
	
	is_non_empty_string_array(value: string[]): void
	{
		assert.is_string_array(value)

		assertion(value.length > 0, "value must not be an empty array")
	},

	is_string_array(value: string[]): void
	{
		assert.is_array(value)
	
		for (let entry of value)
		{
			assert.is_string(entry)
		}
	},
	
	is_string_array_set(value: string[]): Set<string>
	{
		assert.is_string_array(value)
		
		for (let enum_value of value)
		{
			assert.is_string(enum_value)
		}
		const set = new Set(value)
		assertion(set.size === value.length, `value ${value} was not a set`)
		
		return set
	},
	
	is_string_enum(value: string, ...enum_values: string[]): void
	{
		assert.is_string(value)
		const set = assert.is_string_array_set(enum_values)

		assertion(set.has(value), "string value %s is not in enum of strings %o", value, enum_values)
	},
	
	is_non_empty_string(value: string): void
	{
		assert.is_string(value)

		assertion(value.length !== 0, "value was an empty string")
	},
	
	is_integer(value: number): void
	{
		assert.is_number(value)

		assertion(Number.isInteger(value), "value must be an integer number, not %d", value)
	},
	
	is_zero_or_positive_integer(value: number): void
	{
		assert.is_integer(value)

		assertion(value >= 0, "value must be zero or a positive integer, not %d", value)
	},
	
	is_positive_integer(value: number): void
	{
		assert.is_integer(value)

		assertion(value > 0, "value must be a positive integer, not %d", value)
	},
	
	is_zero_or_positive_bigint(value: bigint): void
	{
		assert.is_bigint(value)

		assertion(value >= 0, "value must be zero or positive, not %d", value)
	},
	
	is_absolute_path(value: string): void
	{
		assert.is_non_empty_string(value)

		assertion(isAbsolute(value), "value %s as not an absolute path", value)
	},
	
	argv_has_at_least_two_arguments(): {node_interpreter_absolute_file_path: AbsoluteFilePath, node_script_absolute_file_path: AbsoluteFilePath, script_arguments: string[]}
	{
		assert.is_string_array(argv)
	
		const length = argv.length
		assertion(length >= 2, "argv must contain at least 2 arguments, but has %d arguments", length)

		return {
			node_interpreter_absolute_file_path: new AbsoluteFilePath(argv[0] as string),
	
			node_script_absolute_file_path: new AbsoluteFilePath(argv[1] as string),
	
			script_arguments: argv.slice(2)
		}
	}
}
const assert: Readonly<typeof assert_inner> = Object.freeze(assert_inner)
export default assert

function assert_is_type(value: any, expected_type: string): void
{
	const actual_type = typeof(value);
	assertion(actual_type === expected_type, "value %s was not of type %s but was of type %s", value, expected_type, actual_type)
}

function assertion(assertion_result: boolean, util_message: string, ...util_format_arguments: (string | number | object | boolean | bigint)[]): void
{
	if (assertion_result)
	{
		return
	}

	const stack = new Error().stack
	const without_noise = format("%s", stack).split("\n").slice(2).join("\n")
	const message = format(`Assertion Failed: ${util_message}\n%s\n`, ...[...util_format_arguments, without_noise])

	exit_error(15, message)
}
