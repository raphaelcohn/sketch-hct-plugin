// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

function guard_number(value, name)
{
	const typeof_name = typeof name
	if (typeof_name) != 'string'
	{
		throw new TypeError(`name was not a string but was ${typeof_name}`)
	}

	const typeof_value = typeof value
	if (typeof_value) != 'number'
	{
		throw new RangeError(`${name} was not a number but was ${typeof_value}`)
	}
	if !Number.isFinite(value)
	{
		throw new RangeError(`${name} was NaN or infinite`)
	}
}

function guard_instance(value, instance, name)
{
	const typeof_name = typeof name
	if (typeof_name) != 'string'
	{
		throw new TypeError(`name was not a string but was ${typeof_name}`)
	}

	if value instanceof instance
	{
		return
	}
	throw new TypeError(`${name} was not an instance of the appropriate object ${instance}`)
}

class LabSpace
{
	static get #e() { return 216.0 / 24389.0 }

	static get #kappa() { return 24389.0 / 27.0 }

	static get #sixteen() { return 16.0 }
	
	static get #onehundrend() { return 100.0 }
	
	static get #onehundrendsixteen() { return LabSpace.#onehundrend + LabSpace.#sixteen }
}

const InclusiveMinimumXyzSpaceYValue = 0

const InclusiveMaximumXyzSpaceYValue = 100

// XYZ Y.
// Relative Luminance.
// Logarithmic scale.
class XyzSpaceY
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

	get value()
	{
		return this.#value
	}

	to_LabSpaceLStar()
	{
		return XyzSpaceY.#lab_f(this.value / LabSpace.#onehundrend) * LabSpace.#onehundrendsixteen - LabSpace.#sixteen;
	}

	static #lab_f(t)
	{
		guard_number(t, 't')

		if (t > LabSpace.#e)
		{
			return Math.pow(t, 1.0 / 3.0);
		}
		else
		{
			return (LabSpace.#kappa * t + LabSpace.#sixteen) / LabSpace.#onehundrendsixteen;
		}
	}

	static #is_out_of_range(raw_y)
	{
		return (raw_y < InclusiveMinimumXyzSpaceYValue || raw_y > InclusiveMaximumXyzSpaceYValue)
	}

	static contrast_ratio(y1, y2)
	{
		const [lighter, darker] = XyzSpaceY.lighter_and_darker(y1, y2)
		return new ContrastRatio((lighter.value + ContrastThreshold) / (darker.value + ContrastThreshold))
	}

	static lighter_and_darker(left, right)
	{
		guard_instance(left, XyzSpaceY, "left")
		guard_instance(right, XyzSpaceY, "right")

		return y1.is_greater_than(y2) ? [y1, y2] : [y2, y1]
	}

	is_greater_than(other)
	{
		guard_instance(other, XyzSpaceY, "other")

		return this.value > other.value
	}
}

const InclusiveMinimumLabSpaceLStarValue = 0

const InclusiveMaximumLabSpaceLStarValue = 100

// LAB L*.
// Perceptual Luminance.
// Linear scale from 0 to 100.
class LabSpaceLStar
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

	get value()
	{
		return this.#value
	}
	
	to_XyzSpaceY()
	{
		return new XyzSpaceY(100.0 * LabSpaceLStar.#lab_inv_f((this.value + LabSpace.#sixteen) / LabSpace.#onehundrendsixteen))
	}

	add(increment)
	{
		return new LabSpaceLStar(this.value + increment)
	}

	average(other)
	{
		guard_instance(other, LabSpaceLStar, "other")

		return new LabSpaceLStar((this.value + other.value) / 2)
	}

	static #lab_inv_f(ft)
	{
		guard_number(ft, 'ft')

		const ft3 = ft * ft * ft;
		if (ft3 > LabSpace.#e)
		{
			return ft3
		}
		else
		{
			return (LabSpace.#onehundrendsixteen * ft - LabSpace.#sixteen) / LabSpace.#kappa
		}
	}

	static #is_out_of_range(value)
	{
		return (value < InclusiveMinimumLabSpaceLStarValue || value > InclusiveMaximumLabSpaceLStarValue)
	}
}

class HctSpace
{
	#hue_and_chroma = new TonalPalete(new HctSpaceHue(0), new HctSpaceChroma(0))
	#tone = new HctSpaceTone(0);
	
	constructor(hue_and_chroma, tone)
	{
		guard_instance(hue_and_chroma, TonalPalete, 'hue_and_chroma')
		guard_instance(tone, HctSpaceTone, 'tone')

		this.#hue_and_chroma = hue_and_chroma
		this.#tone = tone
	}

	get hue()
	{
		return this.#hue_and_chroma.hue
	}

	get chroma()
	{
		return this.#hue_and_chroma.chroma
	}

	get tone()
	{
		return this.#tone
	}

	// Color science studies of color preference indicate universal distaste for dark yellow-greens, and also show this is correlated to distate for biological waste and rotting food.
	// See:–
	// * Palmer and Schloss, 2010
	// * Handbook of Color Psychology (2015), Chapter 21, Schloss and Palmer
	is_disliked()
	{
		const rounded_hue = Math.round(hct.hue.value)

		const hue_liked = rounded_hue >= 90.0 && rounded_hue <= 111.0;
		const chroma_liked = Math.round(hct.chroma.value) > 16.0;
		const tone_liked = Math.round(hct.tone.value) < 65.0;

		return hue_liked && chroma_liked && tone_liked;
	}

	if_disliked_corrected()
	{
		if (this.is_disliked())
		{
			return new HctSpace(this.#hue_and_chroma, new HctSpaceTone(new LabSpaceLStar(70.0)))
		}
		else
		{
			return this
		}
	}
}

class MaximumChromaCache
{
	cache = new Map()

	constructor()
	{
	}

	get(tone)
	{
		var maximum_chroma = this.cache.get(tone)
		if (maximum_chroma == undefined)
		{
			const MAX_CHROMA_VALUE = 200.0;
			var new_chroma = HctSpace.from(hue, MAX_CHROMA_VALUE, tone).chroma
			this.cache.set(tone, new_chroma);
			maximum_chroma = new_chroma
		}
		return maximum_chroma
	}
}

const MaximumChromaCache = new MaximumChromaCache()

class TonalPalete
{
	#hue = new HctSpaceHue(0);
	#chroma = new HctSpaceChroma(0);
	
	constructor(hue, chroma)
	{
		guard_instance(hue, HctSpaceHue, 'hue')
		guard_instance(chroma, HctSpaceChroma, 'chroma')

		this.#hue = hue
		this.#chroma = chroma
	}

	get hue()
	{
		return this.#hue
	}

	get chroma()
	{
		return this.#chroma
	}

	get key_colour()
	{
		// Pivot around 50% because this tone has, on average, the most chroma available.
		// Thus it is most likely to have a direct answer.
		const pivot_tone = 50;
		const tone_step_size = 1;
		// Epsilon to accept values slightly higher than the requested chroma.
		const epsilon = 0.01;

		// Binary search to find the tone that can provide a chroma that is closest
		// to the requested chroma.
		var lower_tone = InclusiveMinimumLabSpaceLStarValue;
		var upper_tone = InclusiveMaximumLabSpaceLStarValue;
		while (lower_tone < upper_tone)
		{
			const mid_tone = lower_tone.average(upper_tone)
			const maximum_chroma_for_mid_tone = MaximumChromaCache.get(mid_tone)

			var sufficient_chroma = maximum_chroma_for_mid_tone.is_greater_than_or_equal_to(this.chroma.subtract(epsilon))
			if (sufficient_chroma)
			{
				// Either range [lower_tone, mid_tone] or [mid_tone, upper_tone] has the answer, so search in the range that is closer the pivot tone.
				if (Math.abs(lower_tone - pivot_tone) < Math.abs(upper_tone - pivot_tone))
				{
					upper_tone = mid_tone
				}
				else
				{
					if (lower_tone == mid_tone)
					{
						return HctSpace.from(this.hue, this.chroma, lower_tone)
					}
					lower_tone = mid_tone
				}
			}
			else
			{
				// As there is no sufficient chroma in the mid_tone, follow the direction to the chroma peak.
				var is_ascending = maximum_chroma_for_mid_tone.is_less_than(MaximumChromaCache.get(mid_tone.add(tone_step_size)))
				if (is_ascending)
				{
					lower_tone = mid_tone.add(tone_step_size)
				}
				else
				{
					// Keep mid_tone for potential chroma peak.
					upper_tone = mid_tone
				}
			}
		}

		return Hct.from(this.hue, this.chroma, lower_tone)
	}
	
	static new_primary_content(hue, chroma)
	{
		return new TonalPalette(hue, chroma)
	}
	
	static new_primary_not_content(hue, chroma)
	{
		return new TonalPalette(hue, chroma.max(new HctSpaceChroma(48)))
	}

	static new_secondary_content(hue, chroma)
	{
		return new TonalPalette(hue, chroma.divide(3))
	}

	static new_secondary_not_content(hue, chroma)
	{
		return new TonalPalette(hue, new HctSpaceChroma(16))
	}

	static new_tertiary_content(hue, chroma)
	{
		return new TonalPalette(hue.add(60), chroma.divide(2))
	}

	static new_tertiary_not_content(hue, chroma)
	{
		return new TonalPalette(hue.add(60), new HctSpaceChroma(24))
	}

	static new_neutral_content(hue, chroma)
	{
		return new TonalPalette(hue, chroma.divide(12).min(new HctSpaceChroma(0.4)))
	}

	static new_neutral_not_content(hue, chroma)
	{
		return new TonalPalette(hue, new HctSpaceChroma(4))
	}

	static new_neutral_variant_content(hue, chroma)
	{
		return new TonalPalette(hue, chroma.divide(12).min(new HctSpaceChroma(0.4)))
	}

	static new_neutral_variant_not_content(hue, chroma)
	{
		return new TonalPalette(hue, new HctSpaceChroma(8))
	}

	static new_error()
	{
		return new TonalPalette(new HctSpaceHue(25), new HctSpaceChroma(84))
	}
}

const InclusiveMinimumHueValue = 0

const ExclusiveMaximumHueValue = 360

class HctSpaceHue
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

const InclusiveMinimumChromaValue = 0

class HctSpaceChroma
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

	static from(hue, chroma, tone)
	{
		/*
		    int argb = HctSolver.solveToInt(hue, chroma, tone);
    		return new Hct(argb);
		 */
		throw new Error("Requires implementation of HCT SOLVER; needed to be able to compute Hex values of colours")
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

const ContrastThreshold = 5.0

const InclusiveMinimumToneValue = new LabSpaceLStar(InclusiveMinimumLabSpaceLStarValue)

const InclusiveMaximumToneValue = new LabSpaceLStar(InclusiveMaximumLabSpaceLStarValue)

const InclusiveMinimumTone = new HctSpaceTone(InclusiveMinimumToneValue)

const InclusiveMaximumTone = new HctSpaceTone(InclusiveMaximumToneValue)

// Given a color and a contrast ratio to reach, the luminance of a color that reaches that ratio with the color can be calculated.
// However, that luminance may not contrast as desired, i.e. the contrast ratio of the input color and the returned luminance may not reach the contrast ratio asked for.
//
// When the desired contrast ratio and the result contrast ratio differ by more than this amount, an error value should be returned, or the method should be documented as 'unsafe', meaning, it will return a valid luminance but that luminance may not meet the requested contrast ratio.
//
// 0.04 selected because it ensures the resulting ratio rounds to the same tenth.
const CONTRAST_RATIO_EPSILON = 0.04;

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
class HctSpaceTone
{
	#value = InclusiveMinimumToneValue;
	
	constructor(lab_space_l_star)
	{
		guard_instance(lab_space_l_star, LabSpaceLStar, 'lab_space_l_star')

		this.#value = lab_space_l_star
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

		this.value.add(increment)
	}

	average(other)
	{
		guard_instance(other, HctSpaceTone, "other")

		return new HctSpaceTone(this.value.average(other.value))
	}

	lighter(ratio)
	{
		const dark_y = this.to_XyzSpaceY()
		const raw_light_y = ratio.#lighten(dark_y)

		return HctSpaceTone.#darker_or_lighter_common(ratio, dark_y, raw_light_y, InclusiveMaximumTone, +LUMINANCE_GAMUT_MAP_TOLERANCE)
	}

	darker(ratio)
	{
		const light_y = this.to_XyzSpaceY()
		const raw_dark_y = ratio.#darken(light_y)

		return HctSpaceTone.#darker_or_lighter_common(ratio, light_y, raw_dark_y, InclusiveMinimumTone, -LUMINANCE_GAMUT_MAP_TOLERANCE)
	}

	static #darker_or_lighter_common(ratio, before_y, raw_after_y, out_of_range_tone, tolerance)
	{
		if XyzSpaceY.#is_out_of_range(raw_after_y)
		{
			return out_of_range_tone
		}
		const after_y = new XyzSpaceY(raw_after_y)

		if (ratio.#is_contrast_too_low_or_too_high(before_y, after_y))
		{
			return out_of_range_tone
		}

		const raw_after_l_star = after_y.to_LabSpaceLStar().value + tolerance
		if (LabSpaceLStar.#is_out_of_range(raw_after_l_star))
		{
			return out_of_range_tone
		}
		const after_l_star = new LabSpaceLStar(raw_after_l_star)

		return new HctSpaceTone(after_l_star)
	}

	contrast_ratio(other)
	{
		guard_instance(other, HctSpaceTone, "other")

		return XyzSpaceY.contrast_ratio(this.to_LabSpaceLStar(), other.to_LabSpaceLStar())
	}
}

const InclusiveMinimumContrastRatioValue = 1.0

const InclusiveMaximumContrastRatioValue = 21.0

class ContrastRatio
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

	get value()
	{
		return this.#value
	}

	#lighten(dark_y)
	{
		guard_instance(dark_y, XyzSpaceY, "dark_y")

		return this.value * (dark_y.value + ContrastThreshold) - ContrastThreshold
	}

	#darken(light_y)
	{
		guard_instance(light_y, XyzSpaceY, "light_y")

		return ((light_y + ContrastThreshold) / this.value) - ContrastThreshold
	}

	static #is_out_of_range(value)
	{
		return (value < InclusiveMinimumContrastRatioValue) || (value > InclusiveMaximumContrastRatioValue)
	}

	static #is_contrast_too_low_or_too_high(before_y, after_y)
	{
		const real_contrast = XyzSpaceY.contrast_ratio(before_y, after_y)

		const delta = Math.abs(real_contrast.value - this.value)
		return (real_contrast < this.value && delta > CONTRAST_RATIO_EPSILON)
	}
}

const sketch = require('sketch')
