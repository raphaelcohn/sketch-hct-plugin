// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {FiniteNumber} from "../FiniteNumber.mjs";
import type {Range} from "./Range.mts";
import type {InclusiveOrExclusive} from "./InclusiveOrExclusive.mts";

export class InclusiveMinimumInclusiveMaximumRange implements Range
{
	public static readonly ZeroToOneHundred: InclusiveMinimumInclusiveMaximumRange = new InclusiveMinimumInclusiveMaximumRange(FiniteNumber.Zero, FiniteNumber.OneHundred)
	
	public static readonly ZeroToTwoHundredAndFiftyFive: InclusiveMinimumInclusiveMaximumRange = new InclusiveMinimumInclusiveMaximumRange(FiniteNumber.Zero, FiniteNumber.TwoHundredAndFiftyFive)
	
	public readonly MinimumDescription: InclusiveOrExclusive = "inclusive"
	
	public readonly MaximumDescription: InclusiveOrExclusive = "inclusive"
	
	readonly #inclusive_minimum: NonNullable<FiniteNumber>
	
	readonly #inclusive_maximum: NonNullable<FiniteNumber>
	
	public constructor(inclusive_minimum: NonNullable<FiniteNumber>, inclusive_maximum: NonNullable<FiniteNumber>)
	{
		this.#inclusive_minimum = inclusive_minimum
		this.#inclusive_maximum = inclusive_maximum
	}
	
	public validate_minimum(this: NonNullable<this>, value: NonNullable<FiniteNumber>): boolean
	{
		return value >= this.#inclusive_minimum
	}
	
	public validate_maximum(this: NonNullable<this>, value: NonNullable<FiniteNumber>): boolean
	{
		return value <= this.#inclusive_maximum
	}
	
	public is_in_range(this: NonNullable<this>, value: NonNullable<FiniteNumber>): boolean
	{
		return this.validate_minimum(value) && this.validate_maximum(value)
	}
	
	public is_out_of_range(this: NonNullable<this>, value: NonNullable<FiniteNumber>): boolean
	{
		return !this.is_in_range(value)
	}
	
	public get inclusive_minimum(): NonNullable<FiniteNumber>
	{
		return this.#inclusive_minimum
	}
	
	public get inclusive_maximum(): NonNullable<FiniteNumber>
	{
		return this.#inclusive_maximum
	}
	
	public clamp(this: NonNullable<this>, value: NonNullable<FiniteNumber>): NonNullable<FiniteNumber>
	{
		if (value < this.inclusive_minimum)
		{
			return this.inclusive_minimum
		}
		if (value > this.inclusive_maximum)
		{
			return this.inclusive_maximum
		}
		return value
	}
}
