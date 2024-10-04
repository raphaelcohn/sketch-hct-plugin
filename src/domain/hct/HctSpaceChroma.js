// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

export const InclusiveMinimumChromaValue = 0

export class HctSpaceChroma
{
    #value = InclusiveMinimumChromaValue;

    constructor(value)
    {
        guard_number(value, 'value')

        if (HctSpaceChroma.#is_out_of_range(value))
        {
            throw new RangeError(`value is less than ${InclusiveMinimumChromaValue} (was ${value})`)
        }

        this.#value = value
    }

    toString()
    {
        return `${this.value}`
    }

    get value()
    {
        return this.#value
    }

    subtract(decrement)
    {
        guard_number(decrement, 'decrement')

        return new HctSpaceChroma(this.value - decrement)
    }

    divide(denominator)
    {
        guard_number(denominator, 'denominator')

        return new HctSpaceChroma(this.value / denominator)
    }

    is_less_than(other)
    {
        guard_instance(other, HctSpaceChroma, "other")

        return this.value < other.value
    }

    is_greater_than_or_equal_to(other)
    {
        guard_instance(other, HctSpaceChroma, "other")

        return this.value >= other.value
    }

    max(maximum)
    {
        guard_instance(maximum, HctSpaceChroma, 'maximum')

        return new HctSpaceChroma(Math.max(this.value, maximum.value))
    }

    min(minimum)
    {
        guard_instance(minimum, HctSpaceChroma, 'minimum')

        return new HctSpaceChroma(Math.min(this.value, minimum.value))
    }

    static #is_out_of_range(value)
    {
        return value < InclusiveMinimumChromaValue
    }
}
