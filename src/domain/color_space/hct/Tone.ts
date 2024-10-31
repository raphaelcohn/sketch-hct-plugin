// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {Y} from "../ciexyz";
import {LStar} from "../cielab";
import {ContrastRatio} from "../../contrast";
import {AlphaSRgbCoordinates} from "../srgb";
import {FiniteNumber, Sign} from "../../number";
import {AbstractValue} from "../../number/values";
import {PossiblyOutOfRangeTone} from "./PossiblyOutOfRangeTone";

// HCT Tone.
// Perceptual Luminance.
// Linear scale from 0% to 100%.
// A difference of 40 guarantees a contrast ratio >= 3.0.
// A difference of 50 guarantees a contrast ratio >= 4.5.
export class Tone extends AbstractValue<LStar>
{
	/**
	 * @internal
	 */
	static readonly InclusiveMinimum: NonNullable<Tone> = new Tone(LStar.InclusiveMinimum)
	
	/**
	 * @internal
	 */
	static readonly InclusiveMaximum: NonNullable<Tone> = new Tone(LStar.InclusiveMaximum)
	
	/**
	 * @internal
	 */
	static readonly Mid: NonNullable<Tone> = new Tone(LStar.Mid)
	
	public static readonly T0: NonNullable<Tone> = Tone.InclusiveMinimum
	
	public static readonly T2: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(2)))
	
	public static readonly T4: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(4)))
	
	public static readonly T6: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(6)))
	
	public static readonly T10: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(10)))
	
	public static readonly T11: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(11)))
	
	public static readonly T12: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(12)))
	
	public static readonly T16: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(16)))
	
	public static readonly T17: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(17)))
	
	public static readonly T20: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(20)))
	
	public static readonly T21: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(21)))
	
	public static readonly T22: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(22)))
	
	public static readonly T24: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(24)))
	
	public static readonly T25: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(25)))
	
	public static readonly T26: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(26)))
	
	public static readonly T29: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(29)))
	
	public static readonly T30: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(30)))
	
	public static readonly T34: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(34)))
	
	public static readonly T40: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(40)))
	
	public static readonly T49: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(49)))
	
	public static readonly T50: NonNullable<Tone> = Tone.Mid
	
	public static readonly T60: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(60)))
	
	public static readonly T70: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(70)))
	
	public static readonly T75: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(75)))
	
	public static readonly T80: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(80)))
	
	public static readonly T84: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(84)))
	
	public static readonly T85: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(85)))
	
	public static readonly T87: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(87)))
	
	public static readonly T88: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(88)))
	
	public static readonly T90: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(90)))
	
	public static readonly T92: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(92)))
	
	public static readonly T94: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(94)))
	
	public static readonly T95: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(95)))
	
	public static readonly T96: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(96)))
	
	public static readonly T98: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(98)))
	
	public static readonly T99: NonNullable<Tone> = new Tone(new LStar(FiniteNumber.try_from(99)))
	
	public static readonly T100: NonNullable<Tone> = Tone.InclusiveMaximum
	
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
	
	public find_suitable_foreground_if_this_background(this: NonNullable<this>, other_initial_tone: NonNullable<this>, other_contrast_ratio: NonNullable<ContrastRatio>): NonNullable<Tone>
	{
		return this.contrast_ratio(other_initial_tone) >= other_contrast_ratio ? other_initial_tone : this.foreground(other_contrast_ratio)
	}
	
	public contrast_ratio(this: NonNullable<this>, other: NonNullable<this>): NonNullable<ContrastRatio>
	{
		return Y.contrast_ratio(this.to_ciexyz_y(), other.to_ciexyz_y())
	}
	
	public lighter(contrast_ratio: NonNullable<ContrastRatio>): NonNullable<PossiblyOutOfRangeTone>
	{
		const dark_y = this.to_ciexyz_y()
		const raw_light_y = contrast_ratio.lighten(dark_y)
		
		return Tone.#darker_or_lighter_common(contrast_ratio, dark_y, raw_light_y, PossiblyOutOfRangeTone.OutOfRangeMaximum, Sign.Positive)
	}
	
	public darker(contrast_ratio: NonNullable<ContrastRatio>): NonNullable<PossiblyOutOfRangeTone>
	{
		const light_y = this.to_ciexyz_y()
		const raw_dark_y = contrast_ratio.darken(light_y)
		
		return Tone.#darker_or_lighter_common(contrast_ratio, light_y, raw_dark_y, PossiblyOutOfRangeTone.OutOfRangeMinimum, Sign.Negative)
	}
	
	public to_cielab_lstar(this: NonNullable<this>): NonNullable<LStar>
	{
		return this.value
	}
	
	public to_ciexyz_y(this: NonNullable<this>): NonNullable<Y>
	{
		return this.value.to_ciexyz_y()
	}
	
	/**
	 * Given a background tone (this), find a foreground tone, while ensuring they reach a contrast ratio that is as close to [desired_contrast_ratio] as possible.
	 *
	 * @internal
	 * @param desired_contrast_ratio The contrast ratio desired between this (the background tone) and the resultant foreground tone.
	 * @return resultant foreground tone.
	 */
	foreground(this: NonNullable<this>, desired_contrast_ratio: ContrastRatio): NonNullable<Tone>
	{
		const lighter_tone = this.lighter(desired_contrast_ratio).into_range()
		const darker_tone = this.darker(desired_contrast_ratio).into_range()
		const lighter_actual_contrast_ratio = lighter_tone.contrast_ratio(this)
		const darker_actual_contrast_ratio = darker_tone.contrast_ratio(this)
		
		if (this.prefers_light_foreground())
		{
			// This handles an edge case.
			//
			// The initial contrast ratio is high (ex. 13:1), and the ratio passed to the function is that high	ratio, and both the lighter and darker ratio fails to pass that ratio.
			//
			// This was observed with Tonal Spot’s On Primary Container turning black momentarily between high and max contrast in light mode:–
			// * The primary container’s standard tone was T90.
			// * The on primary container's standard tone was T10.
			// * The ThemeMode was Light.
			// * The contrast value was ` 0.6568521221032331`.
			const AbsoluteDifference = FiniteNumber.ZeroPointOne
			const negligibleDifference = lighter_actual_contrast_ratio.absolute_difference(darker_actual_contrast_ratio) < AbsoluteDifference && lighter_actual_contrast_ratio < desired_contrast_ratio && darker_actual_contrast_ratio < desired_contrast_ratio
			
			return (lighter_actual_contrast_ratio >= desired_contrast_ratio || lighter_actual_contrast_ratio >= darker_actual_contrast_ratio || negligibleDifference) ? lighter_tone : darker_tone
		}
		else
		{
			return (darker_actual_contrast_ratio >= desired_contrast_ratio || darker_actual_contrast_ratio >= lighter_actual_contrast_ratio) ? darker_tone : lighter_tone
		}
	}
	
	public minimum(this: NonNullable<this>, other: NonNullable<this>): NonNullable<Tone>
	{
		return (this <= other) ? this: other
	}
	
	public maximum(this: NonNullable<this>, other: NonNullable<this>): NonNullable<Tone>
	{
		return (this > other) ? this: other
	}
	
	/**
	 * Adjust a tone such that white has a contrast ratio of 4.5:1, if the tone is reasonably close to supporting it.
	 * @internal
	 */
	is_in_awkward_zone_t50_to_t60(this: NonNullable<this>): boolean
	{
		return Tone.T50 <= this && this < Tone.T60
	}
	
	/**
	 * Adjust a tone such that white has a contrast ratio of 4.5:1, if the tone is reasonably close to supporting it.
	 * @internal
	 */
	enable_light_foreground(this: NonNullable<this>): NonNullable<Tone>
	{
		if (this.prefers_light_foreground() && !this.#allows_light_foreground())
		{
			return Tone.T49
		}
		else
		{
			return this
		}
	}
	
	/**
	 * @internal
	 * @return whether this tone prefers a light foreground.
	 *
	 * People prefer white foregrounds on ~T60-70.
	 * Observed over time, and also by Andrew Somers during research for APCA.
	 *
	 * T60 used as to create the smallest discontinuity possible when skipping down to T49 in order to ensure light foregrounds.
	 * Since `tertiaryContainer` in dark monochrome variant requires a tone of 60, it should not be adjusted.
	 * Therefore, 60 is excluded here.
	 */
	prefers_light_foreground(this: NonNullable<this>): boolean
	{
		return this.round() < Tone.T60
	}
	
	/**
	 * @return whether this tone can reach a contrast ratio of 4.5 with a lighter color.
	 */
	#allows_light_foreground(this: NonNullable<this>): boolean
	{
		return this.round() < Tone.T49
	}
	
	/**
	 * @internal
	 */
	round(this: NonNullable<this>): NonNullable<Tone>
	{
		return new Tone(this.value.round())
	}
	
	/**
	 * @internal
	 */
	add(this: NonNullable<this>, increment: NonNullable<FiniteNumber>): NonNullable<Tone>
	{
		return new Tone(this.value.add(increment))
	}
	
	/**
	 * @internal
	 */
	add_clamp_to_inclusive_minimum_and_inclusive_maximum(this: NonNullable<this>, increment: NonNullable<FiniteNumber>): NonNullable<Tone>
	{
		return new Tone(this.value.add_clamp_to_inclusive_minimum_and_inclusive_maximum(increment))
	}
	
	/**
	 * @internal
	 */
	subtract_clamp_to_inclusive_minimum_and_inclusive_maximum(this: NonNullable<this>, decrement: NonNullable<FiniteNumber>): NonNullable<Tone>
	{
		return new Tone(this.value.subtract_clamp_to_inclusive_minimum_and_inclusive_maximum(decrement))
	}
	
	/**
	 * @internal
	 */
    difference(this: NonNullable<this>, other: NonNullable<this>): NonNullable<FiniteNumber>
	{
        return this.value.difference(other.value)
    }
	
	/**
	 * @internal
	 */
	absolute_difference(this: NonNullable<this>, other: NonNullable<this>): NonNullable<FiniteNumber>
	{
		return this.value.value.absolute_difference(other.value.value)
	}
	
	/**
	 * @internal
	 */
	average(this: NonNullable<this>, other: NonNullable<this>): NonNullable<Tone>
	{
		return new Tone(this.value.average(other.value))
	}

	static #darker_or_lighter_common(contrast_ratio: NonNullable<ContrastRatio>, before_y: NonNullable<Y>, raw_after_y: NonNullable<FiniteNumber>, out_of_range_tone: NonNullable<PossiblyOutOfRangeTone>, tolerance_sign: Sign): NonNullable<PossiblyOutOfRangeTone>
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

		const tolerance = Tone.#tolerance(tolerance_sign)
		const raw_after_l_star = after_y.to_cielab_lstar().value.add(tolerance)
		if (LStar.is_out_of_range(raw_after_l_star))
		{
			return out_of_range_tone
		}
		const after_l_star = new LStar(raw_after_l_star)

		return PossiblyOutOfRangeTone.in_range(new Tone(after_l_star))
	}
	
	static #tolerance(tolerance_sign: Sign): NonNullable<FiniteNumber>
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
