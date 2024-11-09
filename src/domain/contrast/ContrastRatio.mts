// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {Y} from "../color_space/ciexyz/Y.mjs";
import {AbstractValue} from "../number/values/AbstractValue.mjs";
import {FiniteNumber} from "../number/FiniteNumber.mjs";
import {InclusiveMinimumInclusiveMaximumRange} from "../number/ranges/InclusiveMinimumInclusiveMaximumRange.mjs";

export class ContrastRatio extends AbstractValue<FiniteNumber>
{
	public static readonly One: NonNullable<ContrastRatio> = ContrastRatio.try_from(1)
	
	public static readonly OnePointFive: NonNullable<ContrastRatio> = ContrastRatio.try_from(1.5)
	
	public static readonly Three: NonNullable<ContrastRatio> = ContrastRatio.try_from(3)
	
	public static readonly FourPointFive: NonNullable<ContrastRatio> = ContrastRatio.try_from(4.5)
	
	public static readonly Seven: NonNullable<ContrastRatio> = ContrastRatio.try_from(7)
	
	public static readonly Eleven: NonNullable<ContrastRatio> = ContrastRatio.try_from(11)
	
	public static readonly TwentyOne: NonNullable<ContrastRatio> = ContrastRatio.try_from(21)
	
	static readonly #range: NonNullable<InclusiveMinimumInclusiveMaximumRange> = new InclusiveMinimumInclusiveMaximumRange(FiniteNumber.One, FiniteNumber.TwentyOne)
	
	/**
	 * @internal
	 */
	static readonly ContrastThreshold: NonNullable<FiniteNumber> = FiniteNumber.Five
	
	private constructor(value: NonNullable<FiniteNumber>)
	{
		super(value.guard_in_range(ContrastRatio.#range))
	}
	
	public static try_from(ratio: number): NonNullable<ContrastRatio>
	{
		return new ContrastRatio(FiniteNumber.try_from(ratio))
	}
	
	/**
	 * @internal
	 */
	static from_lighter_and_darker(lighter: NonNullable<Y>, darker: NonNullable<Y>): ContrastRatio
	{
		return new ContrastRatio(lighter.add_contrast_threshold().divide(darker.add_contrast_threshold()))
	}
	
	public override toString(this: NonNullable<this>): string
	{
		return `1:${this.value.toString(10)}`
	}
	
	/**
	 * @internal
	 */
	lighten(this: NonNullable<this>, dark_y: NonNullable<Y>): NonNullable<FiniteNumber>
	{
		return ContrastRatio.subtract_contrast_threshold_from(this.value.multiply(dark_y.add_contrast_threshold()))
	}
	
	/**
	 * @internal
	 */
	darken(this: NonNullable<this>, light_y: NonNullable<Y>): NonNullable<FiniteNumber>
	{
		return ContrastRatio.subtract_contrast_threshold_from(light_y.add_contrast_threshold().divide(this.value))
	}
	
	private static subtract_contrast_threshold_from(value: NonNullable<FiniteNumber>)
	{
		return value.subtract(ContrastRatio.ContrastThreshold)
	}
	
	/**
	 * @internal
	 */
	is_contrast_too_low_or_too_high(before_y: NonNullable<Y>, after_y: NonNullable<Y>): boolean
	{
		// Given a color and a contrast ratio to reach, the luminance of a color that reaches that ratio with the color can be calculated.
		// However, that luminance may not contrast as desired, ie the contrast ratio of the input color and the returned luminance may not reach the contrast ratio asked for.
		//
		// When the desired contrast ratio and the real contrast ratio differ by more than this amount it will return a valid luminance but that luminance may not meet the requested contrast ratio.
		//
		// 0.04 selected because it ensures the resulting ratio rounds to the same tenth.
		const CONTRAST_RATIO_EPSILON = FiniteNumber.try_from(0.04)
		
		const real_contrast = Y.contrast_ratio(before_y, after_y)
		const delta = real_contrast.absolute_difference(this)
		return (real_contrast.value < this.value && delta > CONTRAST_RATIO_EPSILON)
	}
	
	/**
	 * @internal
	 */
	absolute_difference(this: NonNullable<this>, other: NonNullable<this>): NonNullable<FiniteNumber>
	{
		return this.value.absolute_difference(other.value)
	}
}
