// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {FiniteNumber} from "../FiniteNumber.mjs";
import type {Range} from "./Range.mts";
import type {InclusiveOrExclusive} from "./InclusiveOrExclusive.mts";

export class InclusiveMinimumExclusiveMaximumRange implements Range
{
	public static readonly ZeroToThreeHundredAndSixty: InclusiveMinimumExclusiveMaximumRange = new InclusiveMinimumExclusiveMaximumRange(FiniteNumber.Zero, FiniteNumber.ThreeHundredAndSixty)
	
	public readonly MinimumDescription: InclusiveOrExclusive = "inclusive"
	
	public readonly MaximumDescription: InclusiveOrExclusive = "exclusive"
	
	readonly #inclusive_minimum: NonNullable<FiniteNumber>
	
	readonly #exclusive_maximum: NonNullable<FiniteNumber>
	
	public constructor(inclusive_minimum: NonNullable<FiniteNumber>, exclusive_maximum: NonNullable<FiniteNumber>)
	{
		this.#inclusive_minimum = inclusive_minimum
		this.#exclusive_maximum = exclusive_maximum
	}
	
	public validate_minimum(this: NonNullable<this>, value: NonNullable<FiniteNumber>): boolean
	{
		return value >= this.#inclusive_minimum
	}
	
	public validate_maximum(this: NonNullable<this>, value: NonNullable<FiniteNumber>): boolean
	{
		return value < this.#exclusive_maximum
	}
	
	public is_in_range(this: NonNullable<this>, value: NonNullable<FiniteNumber>): boolean
	{
		return this.validate_minimum(value) && this.validate_maximum(value)
	}
	
	public is_out_of_range(this: NonNullable<this>, value: NonNullable<FiniteNumber>): boolean
	{
		return !this.is_in_range(value)
	}
}
