// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {XyzSpaceY} from "../xyz/XyzSpaceY";
import {LabSpaceLStar} from "../lab/LabSpaceLStar";
import {ContrastRatio} from "../ContrastRatio";

export const InclusiveMinimumToneValue = new LabSpaceLStar(InclusiveMinimumLabSpaceLStarValue)

export const InclusiveMaximumToneValue = new LabSpaceLStar(InclusiveMaximumLabSpaceLStarValue)

export const InclusiveMinimumTone = new HctSpaceTone(InclusiveMinimumToneValue)

export const InclusiveMaximumTone = new HctSpaceTone(InclusiveMaximumToneValue)

// Color spaces that measure luminance, such as Y in XYZ, L* in L*a*b*, or T in HCT, are known as perceptually accurate color spaces.
//
// To be displayed, they must gamut map to a "display space", one that has a defined limit on the number of colors.
// Display spaces include sRGB, more commonly understood as RGB/HSL/HSV/HSB.
// Gamut mapping is undefined and not defined by the color space.
// Any gamut mapping algorithm must choose how to sacrifice accuracy in hue, saturation, and/or lightness.
//
// A principled solution is to maintain lightness, thus maintaining contrast/a11y, maintain hue, thus maintaining aesthetic intent, and reduce chroma until the color is in gamut.
//
// HCT chooses this solution, but, that doesn't mean it will _exactly_ matched desired lightness, if only because RGB is quantized: RGB is expressed as a set of integers: there may be an RGB color with, for example, 47.892 lightness, but not 47.891.
//
// To allow for this inherent incompatibility between perceptually accurate color spaces and display color spaces, methods that take a contrast ratio and luminance, and return a luminance that reaches that contrast ratio for the input luminance, purposefully darken/lighten their result such that the desired contrast ratio will be reached even if inaccuracy is introduced.
//
// 0.4 is generous, ex. HCT requires much less delta.
// It was chosen because it provides a rough guarantee that as long as a perceptual color space gamut maps lightness such that the resulting lightness rounds to the same as the requested, the desired contrast ratio will be reached.
const LUMINANCE_GAMUT_MAP_TOLERANCE = 0.4;

// HCT Tone.
// Perceptual Luminance.
// Linear scale from 0% to 100%.
// A difference of 40 guarantees a contrast ratio >= 3.0.
// A difference of 50 guarantees a contrast ratio >= 4.5.
export class HctSpaceTone
{
	#value = InclusiveMinimumToneValue;

	constructor(lab_space_l_star)
	{
		guard_instance(lab_space_l_star, LabSpaceLStar, 'lab_space_l_star')

		this.#value = lab_space_l_star
	}

    toString()
    {
        return `${this.value.value}%`
    }

    get value()
	{
		return this.#value
	}

	to_LabSpaceLStar()
	{
		return this.value
	}

	to_XyzSpaceY()
	{
		return this.value.to_XyzSpaceY()
	}

	add(increment)
	{
		guard_number(increment, "increment")

		return new HctSpaceTone(this.value.add(increment))
	}

    difference(other)
	{
        guard_instance(other, HctSpaceTone, "other")

        return this.value.difference(other.value)
    }

	average(other)
	{
		guard_instance(other, HctSpaceTone, "other")

		return new HctSpaceTone(this.value.average(other.value))
	}

    is_less_than(other)
    {
        guard_instance(other, HctSpaceTone, "other")

        return this.value.is_less_than(other)
    }

	contrast_ratio(other)
	{
		guard_instance(other, HctSpaceTone, "other")

		return XyzSpaceY.contrast_ratio(this.to_LabSpaceLStar(), other.to_LabSpaceLStar())
	}

	lighter(contrast_ratio)
	{
        guard_instance(contrast_ratio, ContrastRatio, "ratio")

        const dark_y = this.to_XyzSpaceY()
		const raw_light_y = contrast_ratio.lighten(dark_y)

		return HctSpaceTone.#darker_or_lighter_common(contrast_ratio, dark_y, raw_light_y, InclusiveMaximumTone, +LUMINANCE_GAMUT_MAP_TOLERANCE)
	}

	darker(contrast_ratio)
	{
        guard_instance(contrast_ratio, ContrastRatio, "ratio")

        const light_y = this.to_XyzSpaceY()
		const raw_dark_y = contrast_ratio.darken(light_y)

		return HctSpaceTone.#darker_or_lighter_common(contrast_ratio, light_y, raw_dark_y, InclusiveMinimumTone, -LUMINANCE_GAMUT_MAP_TOLERANCE)
	}

	static #darker_or_lighter_common(contrast_ratio, before_y, raw_after_y, out_of_range_tone, tolerance)
	{
		if (XyzSpaceY.is_out_of_range(raw_after_y))
		{
			return out_of_range_tone
		}
		const after_y = new XyzSpaceY(raw_after_y)

		if (contrast_ratio.is_contrast_too_low_or_too_high(before_y, after_y))
		{
			return out_of_range_tone
		}

		const raw_after_l_star = after_y.to_LabSpaceLStar().value + tolerance
		if (LabSpaceLStar.is_out_of_range(raw_after_l_star))
		{
			return out_of_range_tone
		}
		const after_l_star = new LabSpaceLStar(raw_after_l_star)

		return new HctSpaceTone(after_l_star)
	}
}
