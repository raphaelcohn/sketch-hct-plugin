// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

function guard_number(value, name)
{
    const typeof_name = typeof name
    if (typeof_name !== 'string')
    {
        throw new TypeError(`name was not a string but was ${typeof_name}`)
    }

    const typeof_value = typeof value
    if (typeof_value !== 'number')
    {
        throw new RangeError(`${name} was not a number but was ${typeof_value}`)
    }
    if (!Number.isFinite(value))
    {
        throw new RangeError(`${name} was NaN or infinite`)
    }
}

function guard_instance(value, instance, name)
{
    const typeof_name = typeof name
    if (typeof_name !== 'string')
    {
        throw new TypeError(`name was not a string but was ${typeof_name}`)
    }

    if (value instanceof instance)
    {
        return
    }
    throw new TypeError(`${name} was not an instance of the appropriate object ${instance}`)
}
