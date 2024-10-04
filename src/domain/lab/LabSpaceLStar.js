// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {XyzSpaceY} from "../xyz/XyzSpaceY";
import {LabSpace} from "./LabSpace";

export const InclusiveMinimumLabSpaceLStarValue = 0

export const InclusiveMaximumLabSpaceLStarValue = 100

// LAB L*.
// Perceptual Luminance.
// Linear scale from 0 to 100.
export class LabSpaceLStar
{
    #value = InclusiveMinimumLabSpaceLStarValue;

    constructor(value)
    {
        guard_number(value, 'value')

        if (LabSpaceLStar.#is_out_of_range(value))
        {
            throw new RangeError(`value ${value} is out of range`)
        }

        this.#value = value
    }

    toString()
    {
        return `${this.tone}`
    }

    get value()
    {
        return this.#value
    }

    to_XyzSpaceY()
    {
        return new XyzSpaceY(LabSpace.one_hundrend * LabSpaceLStar.#lab_inv_f((this.value + LabSpace.sixteen) / LabSpace.one_hundrend_sixteen))
    }

    add(increment)
    {
        return new LabSpaceLStar(this.value + increment)
    }

    difference(other)
    {
        guard_instance(other, LabSpaceLStar, "other")

        return this.value - other.value
    }

    average(other)
    {
        guard_instance(other, LabSpaceLStar, "other")

        return new LabSpaceLStar((this.value + other.value) / 2)
    }

    is_less_than(other)
    {
        guard_instance(other, LabSpaceLStar, "other")

        return this.value < other.value
    }

    static #lab_inv_f(ft)
    {
        guard_number(ft, 'ft')

        const ft3 = ft * ft * ft;
        if (ft3 > LabSpace.e)
        {
            return ft3
        }
        else
        {
            return (LabSpace.one_hundrend_sixteen * ft - LabSpace.sixteen) / LabSpace.kappa
        }
    }

    static #is_out_of_range(value)
    {
        return (value < InclusiveMinimumLabSpaceLStarValue || value > InclusiveMaximumLabSpaceLStarValue)
    }
}
