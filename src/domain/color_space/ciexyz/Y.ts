// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import { ContrastRatio } from "../../contrast";
import { CielabCoordinates } from "../cielab";
import { LStar } from "../cielab";
import {FiniteNumber} from "../../number";
import {InclusiveMinimumInclusiveMaximumRange} from "../../number/ranges";
import {AbstractValue} from "../../number/values";

// CIEXYZ Y co-ordinate, as defined in the [International Commission on Illumination (CIE) 1931 color space](https://en.wikipedia.org/wiki/CIE_1931_color_space).
// Relative Luminance.
// Logarithmic scale between 0 inclusive and 100 inclusive.
export class Y extends AbstractValue<FiniteNumber>
{
	static readonly #range: NonNullable<InclusiveMinimumInclusiveMaximumRange> = InclusiveMinimumInclusiveMaximumRange.ZeroToOneHundred
	
	public constructor(value: NonNullable<FiniteNumber>)
	{
		super(value.guard_in_range(Y.#range))
	}
	
	public static try_from(value: number): NonNullable<Y>
	{
		return new Y(FiniteNumber.try_from(value))
	}
	
	public to_cielab_lstar(): NonNullable<LStar>
	{
		let t = this.value.divide(FiniteNumber.OneHundred)
		return new LStar(CielabCoordinates.lab_f(t).multiply(FiniteNumber.OneHundredAndSixteen).subtract(FiniteNumber.Sixteen))
	}
	
	/**
	 * @internal
	 */
	add_contrast_threshold(this: NonNullable<this>): NonNullable<FiniteNumber>
	{
		return this.value.add(ContrastRatio.ContrastThreshold)
	}
	
	public static contrast_ratio(left: NonNullable<Y>, right: NonNullable<Y>): NonNullable<ContrastRatio>
	{
		const [lighter, darker] = Y.lighter_and_darker(left, right)
		return ContrastRatio.from_lighter_and_darker(lighter, darker)
	}
	
	private static lighter_and_darker(left: NonNullable<Y>, right: NonNullable<Y>): [NonNullable<Y>, NonNullable<Y>]
	{
		return left > right ? [left, right] : [right, left]
	}
	
	/**
	 * @internal
	 */
	static is_out_of_range(value: NonNullable<FiniteNumber>): boolean
	{
		return value.is_out_of_range(Y.#range)
	}
}
