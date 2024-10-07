// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

abstract class NumericValue
{
	readonly #value: number
	
	protected constructor(value: number, inclusive_minimum_value: number, inclusive_maximum_value: number)
	{
		guard_number(value, 'value')
		
		if (value < inclusive_minimum_value)
		{
			throw new RangeError(`value ${value} is less than inclusive minimum ${inclusive_minimum_value}`)
		}
		
		if (value > inclusive_maximum_value)
		{
			throw new RangeError(`value ${value} is greater than inclusive maximum ${inclusive_maximum_value}`)
		}
		
		this.#value = value
	}
	
	public toString(this: NonNullable<this>): NonNullable<string>
	{
		return `${this.value}`
	}
	
	get value(): NonNullable<number>
	{
		return this.#value
	}
	
	rounded(this: NonNullable<this>): NonNullable<number>
	{
		return Math.round(this.value)
	}
}
