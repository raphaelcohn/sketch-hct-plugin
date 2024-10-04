// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

export const InclusiveMinimumHueValue = 0

export const ExclusiveMaximumHueValue = 360

export class HctSpaceHue
{
    #value = 0;

    constructor(value)
    {
        guard_number(value, 'value')

        if (HctSpaceHue.#is_out_of_range(value))
        {
            throw new RangeError(`value ${value} is out of range`)
        }

        this.#value = value
    }

    toString()
    {
        return `${this.value}°`
    }

    get value()
    {
        return this.#value
    }

    add(increment)
    {
        guard_number(increment, 'increment')

        return new HctSpaceHue((self.value + increment) % ExclusiveMaximumHueValue)
    }

    static #is_out_of_range(value)
    {
        return (value < InclusiveMinimumHueValue) || (value >= ExclusiveMaximumHueValue)
    }
}
