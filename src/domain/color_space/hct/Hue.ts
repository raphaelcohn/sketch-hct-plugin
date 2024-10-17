// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {AbstractValue} from "../../number/values";
import {FiniteNumber} from "../../number";
import {InclusiveMinimumExclusiveMaximumRange} from "../../number/ranges";

export class Hue extends AbstractValue<FiniteNumber>
{
	static readonly #range: NonNullable<InclusiveMinimumExclusiveMaximumRange> = InclusiveMinimumExclusiveMaximumRange.ZeroToThreeHundredAndSixty
	
	public constructor(degrees: NonNullable<FiniteNumber>)
	{
		super(degrees.guard_in_range(Hue.#range))
	}
	
	public static try_from(degrees: number): NonNullable<Hue>
	{
		return new Hue(FiniteNumber.try_from(degrees))
	}
	
	public rotate(this: NonNullable<this>, increment: NonNullable<FiniteNumber>): NonNullable<Hue>
	{
		const ExclusiveMaximumDegrees = FiniteNumber.ThreeHundredAndSixty
		
		const positive_or_negative_degrees = this.value.add(increment).modulus(ExclusiveMaximumDegrees)
		const degrees = positive_or_negative_degrees.is_negative() ? ExclusiveMaximumDegrees.add(positive_or_negative_degrees) : positive_or_negative_degrees
		return new Hue(degrees)
	}
	
	/**
	 * @internal
	 */
	round(this: NonNullable<this>): NonNullable<Hue>
	{
		return new Hue(this.value.round())
	}
}
