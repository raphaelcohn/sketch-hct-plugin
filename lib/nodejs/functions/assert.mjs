// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {writeSync} from "node:fs";
import {format} from "node:util";
import {argv} from "node:process";
import {isAbsolute} from "node:path";

const { exit, stderr } = require('node:process')

export function assert_is_string(value)
{
	assert_is_type(value, "string")
}

export function assert_is_object(value)
{
	assert_is_type(value, "object")
}

export function assert_is_number(value)
{
	assert_is_type(value, "number")
}

export function assert_is_boolean(value)
{
	assert_is_type(value, "boolean")
}

export function assert_is_bigint(value)
{
	assert_is_type(value, "bigint")
}

export function assert_is_null(value)
{
	assert_is_type(value, "null")
}

export function assert_is_undefined(value)
{
	assert_is_type(value, "undefined")
}

export function assert_is_symbol(value)
{
	assert_is_type(value, "symbol")
}

export function assert_is_this(value, object_instance)
{
	assert_is_object(value)

	assert(value instanceof object_instance, "value is not an instanceof %s", object_instance)
}

export function assert_is_array(value)
{
	assert(Array.isArray(value), "value is not an array")
}

export function assert_is_string_array(value)
{
	assert_is_array(value)

	for (let entry of value)
	{
		assert_is_string(entry)
	}
}

export function assert_is_string_enum(value, ...enum_values)
{
	assert_is_string(value)

	for (let enum_value of enum_values)
	{
		assert_is_string(enum_value)
		if (value === enum_value)
		{
			return
		}
	}

	assert(false, "string value %s is not in enum of strings %o", value, enum_values)
}

export function assert_is_non_empty_string(value)
{
	assert_is_string(value)

	assert(value.length !== 0, "value was an empty string")
}

export function assert_is_integer(value)
{
	assert_is_number(value)

	assert(Number.isInteger(value), "value must be an integer number, not %d", value)
}

export function assert_is_zero_or_positive_integer(value)
{
	assert_is_integer(value)

	assert(value >= 0, "value must be zero or a positive integer, not %d", value)
}

export function assert_is_positive_integer(value)
{
	assert_is_integer(value)

	assert(value > 0, "value must be a positive integer, not %d", value)
}

export function assert_is_zero_or_positive_bigint(value)
{
	assert_is_bigint(value)

	assert(value >= 0, "value must be zero or positive, not %d", value)
}

export function assert_is_absolute_path(value)
{
	assert_is_non_empty_string(value)

	assert(isAbsolute(value), "value %s as not an absolute path", value)
}

export function assert_argv_has_at_least_two_arguments()
{
	assert_is_string_array(argv)

	const length = argv.length
	assert(length >= 2, "argv must contain at least 2 arguments, but has %d arguments", length)

	const node_interpreter_absolute_file_path = argv[0];
	assert_is_absolute_path(node_interpreter_absolute_file_path)

	const node_script_absolute_file_path = argv[1];
	assert_is_absolute_path(node_script_absolute_file_path)

	return {
		node_interpreter_absolute_file_path,

		node_script_absolute_file_path,

		script_arguments: argv.slice(2)
	}
}

function assert_is_type(value, type)
{
	assert(typeof(value) === type, "value was not of type %s", type)
}

function assert(assertion_result, util_message, ...util_format_arguments)
{
	//console.assert(assertion_result, util_message, ...util_format_arguments)
	writeSync(stderr.fd, format(`Assertion Failed: ${util_message}`, ...util_format_arguments), null, 'utf8')
	exit(2)
}
