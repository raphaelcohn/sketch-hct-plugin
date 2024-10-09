// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {Y} from "../ciexyz";
import {LStar} from "../cielab";
import {ContrastRatio} from "../ciexyz";
import {AlphaSRgbCoordinates} from "../srgb";
import {FiniteNumber, Sign} from "../../number";
import {AbstractValue} from "../../number/values";

// HCT Tone.
// Perceptual Luminance.
// Linear scale from 0% to 100%.
// A difference of 40 guarantees a contrast ratio >= 3.0.
// A difference of 50 guarantees a contrast ratio >= 4.5.
export class Tone extends AbstractValue<LStar>
{
	static readonly InclusiveMinimum: NonNullable<Tone> = new Tone(LStar.InclusiveMinimum)
	
	static readonly InclusiveMaximum: NonNullable<Tone> = new Tone(LStar.InclusiveMaximum)
	
	static readonly Mid: NonNullable<Tone> = new Tone(LStar.Mid)
	
	public constructor(cielab_l_star: LStar)
	{
		super(cielab_l_star)
	}
	
	public static try_from(percentage: number): NonNullable<Tone>
	{
		return new Tone(LStar.try_from(percentage))
	}
	
	public static from_alpha_srgb_space(alpha_srgb_space: NonNullable<AlphaSRgbCoordinates>): NonNullable<Tone>
	{
		return new Tone(LStar.from_alpha_srgb_space(alpha_srgb_space))
	}

    public override toString(this: NonNullable<this>, _radix?: number): string
    {
        return `${this.value}%`
    }
	
	public contrast_ratio(this: NonNullable<this>, other: NonNullable<this>): NonNullable<ContrastRatio>
	{
		return Y.contrast_ratio(this.to_ciexyz_y(), other.to_ciexyz_y())
	}
	
	public lighter(contrast_ratio: NonNullable<ContrastRatio>): NonNullable<Tone>
	{
		const dark_y = this.to_ciexyz_y()
		const raw_light_y = contrast_ratio.lighten(dark_y)
		
		return Tone.#darker_or_lighter_common(contrast_ratio, dark_y, raw_light_y, Tone.InclusiveMinimum, Sign.Positive)
	}
	
	public darker(contrast_ratio: NonNullable<ContrastRatio>): NonNullable<Tone>
	{
		const light_y = this.to_ciexyz_y()
		const raw_dark_y = contrast_ratio.darken(light_y)
		
		return Tone.#darker_or_lighter_common(contrast_ratio, light_y, raw_dark_y, Tone.InclusiveMaximum, Sign.Negative)
	}
	
	public to_cielab_lstar(this: NonNullable<this>): NonNullable<LStar>
	{
		return this.value
	}
	
	public to_ciexyz_y(this: NonNullable<this>): NonNullable<Y>
	{
		return this.value.to_ciexyz_y()
	}
	
	round(this: NonNullable<this>): NonNullable<Tone>
	{
		return new Tone(this.value.round())
	}

	add(this: NonNullable<this>, increment: NonNullable<FiniteNumber>): NonNullable<Tone>
	{
		return new Tone(this.value.add(increment))
	}

    difference(this: NonNullable<this>, other: NonNullable<this>): NonNullable<FiniteNumber>
	{
        return this.value.difference(other.value)
    }
	
	absolute_difference(this: NonNullable<this>, other: NonNullable<this>): NonNullable<FiniteNumber>
	{
		return this.value.value.absolute_difference(other.value.value)
	}

	average(this: NonNullable<this>, other: NonNullable<this>): NonNullable<Tone>
	{
		return new Tone(this.value.average(other.value))
	}

	static #darker_or_lighter_common(contrast_ratio: NonNullable<ContrastRatio>, before_y: NonNullable<Y>, raw_after_y: NonNullable<FiniteNumber>, out_of_range_tone: NonNullable<Tone>, tolerance_sign: Sign): NonNullable<Tone>
	{
		if (Y.is_out_of_range(raw_after_y))
		{
			return out_of_range_tone
		}
		const after_y = new Y(raw_after_y)

		if (contrast_ratio.is_contrast_too_low_or_too_high(before_y, after_y))
		{
			return out_of_range_tone
		}

		const tolerance = Tone.tolerance(tolerance_sign)
		const raw_after_l_star = after_y.to_cielab_lstar().value.add(tolerance)
		if (LStar.is_out_of_range(raw_after_l_star))
		{
			return out_of_range_tone
		}
		const after_l_star = new LStar(raw_after_l_star)

		return new Tone(after_l_star)
	}
	
	static tolerance(tolerance_sign: Sign): NonNullable<FiniteNumber>
	{
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
		const LUMINANCE_GAMUT_MAP_TOLERANCE = FiniteNumber.try_from(0.4)
		return LUMINANCE_GAMUT_MAP_TOLERANCE.sign(tolerance_sign)
	}
}
