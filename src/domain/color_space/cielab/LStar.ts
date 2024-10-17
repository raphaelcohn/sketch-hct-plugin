// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import { argbFromRgba, lstarFromArgb } from "@material/material-color-utilities";
import { AlphaSRgbCoordinates } from "../srgb";
import { CielabCoordinates } from "./CielabCoordinates";
import { Y } from "../ciexyz";
import {FiniteNumber} from "../../number";
import {InclusiveMinimumInclusiveMaximumRange} from "../../number/ranges";
import {AbstractValue} from "../../number/values";

// [CIELAB (`L*a*b*`) color space](https://en.wikipedia.org/wiki/CIELAB_color_space) L* co-ordinate value, as defined by the [International Commission on Illumination (CIE)]<https://en.wikipedia.org/wiki/International_Commission_on_Illumination> in 1976.
// Perceptual Luminance.
// Linear scale from 0 inclusive to 100 inclusive.
export class LStar extends AbstractValue<FiniteNumber>
{
	static readonly #range: NonNullable<InclusiveMinimumInclusiveMaximumRange> = InclusiveMinimumInclusiveMaximumRange.ZeroToOneHundred
	
	/**
	 * @internal
	 */
	static readonly InclusiveMinimum: NonNullable<LStar> = new LStar(LStar.#range.inclusive_minimum)
	
	/**
	 * @internal
	 */
	static readonly InclusiveMaximum: NonNullable<LStar> = new LStar(LStar.#range.inclusive_maximum)
	
	/**
	 * @internal
	 */
	static readonly Mid: NonNullable<LStar> = new LStar(FiniteNumber.Fifty)
	
	public constructor(percentage: FiniteNumber)
	{
		super(percentage.guard_in_range(LStar.#range))
	}
	
	public static try_from(percentage: number): NonNullable<LStar>
	{
		return new LStar(FiniteNumber.try_from(percentage))
	}
	
	public to_ciexyz_y(this: NonNullable<this>): NonNullable<Y>
	{
		let ft = this.value.add(FiniteNumber.Sixteen).divide(FiniteNumber.OneHundredAndSixteen);
		let denominator = CielabCoordinates.lab_inv_f(ft);
		return new Y(FiniteNumber.OneHundred.multiply(denominator))
	}
	
	/**
	 * @internal
	 */
	round(this: NonNullable<this>): NonNullable<LStar>
	{
		return new LStar(this.value.round())
	}
	
	/**
	 * @internal
	 */
	add(this: NonNullable<this>, increment: NonNullable<FiniteNumber>): NonNullable<LStar>
	{
		return new LStar(this.value.add(increment))
	}
	
	/**
	 * @internal
	 */
	add_clamp_to_inclusive_minimum_and_inclusive_maximum(this: NonNullable<this>, increment: NonNullable<FiniteNumber>): NonNullable<LStar>
	{
		return new LStar(this.value.add_clamp_to_inclusive_minimum_and_inclusive_maximum(increment, LStar.#range))
	}
	
	/**
	 * @internal
	 */
	subtract_clamp_to_inclusive_minimum_and_inclusive_maximum(this: NonNullable<this>, decrement: NonNullable<FiniteNumber>): NonNullable<LStar>
	{
		return new LStar(this.value.subtract_clamp_to_inclusive_minimum_and_inclusive_maximum(decrement, LStar.#range))
	}
	
	/**
	 * @internal
	 */
	difference(this: NonNullable<this>, other: NonNullable<this>): NonNullable<FiniteNumber>
	{
		return this.value.subtract(other.value)
	}
	
	/**
	 * @internal
	 */
	average(this: NonNullable<this>, other: NonNullable<this>): NonNullable<LStar>
	{
		return new LStar(this.value.average(other.value))
	}
	
	/**
	 * @internal
	 */
	static from_alpha_srgb_space(alpha_srgb_space: NonNullable<AlphaSRgbCoordinates>): NonNullable<LStar>
	{
		const value = lstarFromArgb(argbFromRgba(alpha_srgb_space.into_rgba()))
		return new LStar(FiniteNumber.try_from(value))
	}
	
	/**
	 * @internal
	 */
	static is_out_of_range(value: NonNullable<FiniteNumber>): boolean
	{
		return value.is_out_of_range(LStar.#range)
	}
}
