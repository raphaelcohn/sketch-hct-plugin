// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import { ContrastRatio, ContrastThreshold } from "../ContrastRatio";

import { LabSpace } from "../lab/LabSpace";

export const InclusiveMinimumXyzSpaceYValue = 0

export const InclusiveMaximumXyzSpaceYValue = 100

// XYZ Y.
// Relative Luminance.
// Logarithmic scale.
export class XyzSpaceY
{
    #value = InclusiveMinimumXyzSpaceYValue

    constructor(value)
    {
        guard_number(value, 'value')

        if (XyzSpaceY.#is_out_of_range(value))
        {
            return new RangeError(`value ${value} is out of range`)
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

    to_LabSpaceLStar()
    {
        return XyzSpaceY.#lab_f(this.value / LabSpace.one_hundrend) * LabSpace.one_hundrend_sixteen - LabSpace.sixteen;
    }

    static #lab_f(t)
    {
        guard_number(t, 't')

        if (t > LabSpace.e)
        {
            return Math.pow(t, 1.0 / 3.0);
        }
        else
        {
            return (LabSpace.kappa * t + LabSpace.sixteen) / LabSpace.one_hundrend_sixteen;
        }
    }

    static #is_out_of_range(raw_y)
    {
        return (raw_y < InclusiveMinimumXyzSpaceYValue || raw_y > InclusiveMaximumXyzSpaceYValue)
    }

    static contrast_ratio(left, right)
    {
        const [lighter, darker] = XyzSpaceY.lighter_and_darker(left, right)
        return new ContrastRatio((lighter.value + ContrastThreshold) / (darker.value + ContrastThreshold))
    }

    static lighter_and_darker(left, right)
    {
        guard_instance(left, XyzSpaceY, "left")
        guard_instance(right, XyzSpaceY, "right")

        return left.is_greater_than(right) ? [left, right] : [right, left]
    }

    is_greater_than(other)
    {
        guard_instance(other, XyzSpaceY, "other")

        return this.value > other.value
    }
}
