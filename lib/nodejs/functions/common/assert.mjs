// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {writeSync} from "node:fs";
import {format} from "node:util";
import {argv} from "node:process";
import {isAbsolute} from "node:path";

import { exit, stderr } from 'node:process'
import {exit_error} from "./exit_error.mjs";

export const assert =
{
	is_string(value)
	{
		assert_is_type(value, "string")
	},

	is_object(value)
	{
		assert_is_type(value, "object")
	},
	
	is_number(value)
	{
		assert_is_type(value, "number")
	},
	
	is_boolean(value)
	{
		assert_is_type(value, "boolean")
	},
	
	is_bigint(value)
	{
		assert_is_type(value, "bigint")
	},
	
	is_null(value)
	{
		assert_is_type(value, "null")
	},
	
	is_undefined(value)
	{
		assert_is_type(value, "undefined")
	},
	
	is_symbol(value)
	{
		assert_is_type(value, "symbol")
	},
	
	is_instance_of(value, object_instance)
	{
		assert.is_object(value)
	
		assertion(value instanceof object_instance, "value is not an instanceof %s", object_instance)
	},
	
	is_array(value)
	{
		assertion(Array.isArray(value), "value is not an array")
	},
	
	is_non_empty_string_array(value)
	{
		assert.is_string_array(value)

		assertion(value.length > 0, "value must not be an empty array")
	},

	is_string_array(value)
	{
		assert.is_array(value)
	
		for (let entry of value)
		{
			assert.is_string(entry)
		}
	},
	
	is_string_enum(value, ...enum_values)
	{
		assert.is_string(value)
	
		for (let enum_value of enum_values)
		{
			assert.is_string(enum_value)
			if (value === enum_value)
			{
				return
			}
		}

		assertion(false, "string value %s is not in enum of strings %o", value, enum_values)
	},
	
	is_non_empty_string(value)
	{
		assert.is_string(value)

		assertion(value.length !== 0, "value was an empty string")
	},
	
	is_integer(value)
	{
		assert.is_number(value)

		assertion(Number.isInteger(value), "value must be an integer number, not %d", value)
	},
	
	is_zero_or_positive_integer(value)
	{
		assert.is_integer(value)

		assertion(value >= 0, "value must be zero or a positive integer, not %d", value)
	},
	
	is_positive_integer(value)
	{
		assert.is_integer(value)

		assertion(value > 0, "value must be a positive integer, not %d", value)
	},
	
	is_zero_or_positive_bigint(value)
	{
		assert.is_bigint(value)

		assertion(value >= 0, "value must be zero or positive, not %d", value)
	},
	
	is_absolute_path(value)
	{
		assert.is_non_empty_string(value)

		assertion(isAbsolute(value), "value %s as not an absolute path", value)
	},
	
	argv_has_at_least_two_arguments()
	{
		assert.is_string_array(argv)
	
		const length = argv.length
		assertion(length >= 2, "argv must contain at least 2 arguments, but has %d arguments", length)
	
		const node_interpreter_absolute_file_path = argv[0];
		assert.is_absolute_path(node_interpreter_absolute_file_path)
	
		const node_script_absolute_file_path = argv[1];
		assert.is_absolute_path(node_script_absolute_file_path)
	
		return {
			node_interpreter_absolute_file_path,
	
			node_script_absolute_file_path,
	
			script_arguments: argv.slice(2)
		}
	}
}

function assert_is_type(value, expected_type)
{
	const actual_type = typeof(value);
	assertion(actual_type === expected_type, "value %s was not of type %s but was of type %s", value, expected_type, actual_type)
}

function assertion(assertion_result, util_message, ...util_format_arguments)
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
