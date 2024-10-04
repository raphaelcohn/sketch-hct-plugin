// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {XyzSpaceY} from "./xyz/XyzSpaceY";

export const ContrastThreshold = 5.0

export const InclusiveMinimumContrastRatioValue = 1.0

export const InclusiveMaximumContrastRatioValue = 21.0

// Given a color and a contrast ratio to reach, the luminance of a color that reaches that ratio with the color can be calculated.
// However, that luminance may not contrast as desired, i.e. the contrast ratio of the input color and the returned luminance may not reach the contrast ratio asked for.
//
// When the desired contrast ratio and the result contrast ratio differ by more than this amount, an error value should be returned, or the method should be documented as 'unsafe', meaning, it will return a valid luminance but that luminance may not meet the requested contrast ratio.
//
// 0.04 selected because it ensures the resulting ratio rounds to the same tenth.
const CONTRAST_RATIO_EPSILON = 0.04;

export class ContrastRatio
{
    #value = InclusiveMinimumContrastRatioValue

    constructor(value)
    {
        guard_number(value, 'value')

        if (ContrastRatio.#is_out_of_range(value))
        {
            throw new RangeError(`value ${value} is out of range`)
        }

        this.#value = value
    }

    toString()
    {
        return `1:${this.value}`
    }

    get value()
    {
        return this.#value
    }

    lighten(dark_y)
    {
        guard_instance(dark_y, XyzSpaceY, "dark_y")

        return this.value * (dark_y.value + ContrastThreshold) - ContrastThreshold
    }

    darken(light_y)
    {
        guard_instance(light_y, XyzSpaceY, "light_y")

        return ((light_y + ContrastThreshold) / this.value) - ContrastThreshold
    }

    static #is_out_of_range(value)
    {
        return (value < InclusiveMinimumContrastRatioValue) || (value > InclusiveMaximumContrastRatioValue)
    }

    is_contrast_too_low_or_too_high(before_y, after_y)
    {
        const real_contrast = XyzSpaceY.contrast_ratio(before_y, after_y)

        const delta = Math.abs(real_contrast.value - this.value)
        return (real_contrast < this.value && delta > CONTRAST_RATIO_EPSILON)
    }
}
