// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {Range} from "./ranges";
import {SymbolToPrimitiveHint} from "./values";
import {Value} from "./values";
import {Sign} from "./Sign";
import {Ordering} from "./Ordering";

/// A floating point (double) number with the following values excluded:-
/// * NaN
/// * Positive Infinity
/// * Negative Infinity
/// * Negative Zero (converted on construction to Zero)
export class FiniteNumber implements Value<number>
{
	public static readonly ZeroPointZeroOne: NonNullable<FiniteNumber> = new FiniteNumber(0.01)
	
	public static readonly Zero: NonNullable<FiniteNumber> = new FiniteNumber(0)
	
	public static readonly One: NonNullable<FiniteNumber> = new FiniteNumber(1)
	
	public static readonly Two: NonNullable<FiniteNumber> = new FiniteNumber(2)
	
	public static readonly Three: NonNullable<FiniteNumber> = new FiniteNumber(3)
	
	public static readonly Five: NonNullable<FiniteNumber> = new FiniteNumber(5)
	
	public static readonly Twelve: NonNullable<FiniteNumber> = new FiniteNumber(12)
	
	public static readonly Sixteen: NonNullable<FiniteNumber> = new FiniteNumber(16)
	
	public static readonly TwentyOne: NonNullable<FiniteNumber> = new FiniteNumber(21)
	
	public static readonly TwentySeven: NonNullable<FiniteNumber> = new FiniteNumber(27)
	
	public static readonly Fifty: NonNullable<FiniteNumber> = new FiniteNumber(50)
	
	public static readonly Sixty: NonNullable<FiniteNumber> = new FiniteNumber(60)
	
	public static readonly OneHundred: NonNullable<FiniteNumber> = new FiniteNumber(100)
	
	public static readonly OneHundredAndSixteen: NonNullable<FiniteNumber> = FiniteNumber.OneHundred.add(FiniteNumber.Sixteen)
	
	public static readonly TwoHundred: NonNullable<FiniteNumber> = new FiniteNumber(200)
	
	public static readonly TwoHundredAndFiftyFive: NonNullable<FiniteNumber> = new FiniteNumber(255)
	
	public static readonly ThreeHundredAndSixty: NonNullable<FiniteNumber> = new FiniteNumber(360)
	
	readonly #value: number
	
	private constructor(value: number)
	{
		if (Object.is(value, -0))
		{
			this.#value = 0
		}
		else
		{
			this.#value = value
		}
	}
	
	public static try_from(value: number): NonNullable<FiniteNumber>
	{
		if (!Number.isFinite(value))
		{
			throw new RangeError(`value must be finite, not '${value}'`)
		}
		return new FiniteNumber(value)
	}
	
	public static from<R extends Range>(value: number, range: NonNullable<R>): NonNullable<FiniteNumber>
	{
		return FiniteNumber.try_from(value).guard_in_range(range)
	}
	
	public is_in_range<R extends Range>(this: NonNullable<this>, range: NonNullable<R>): boolean
	{
		return range.is_in_range(this)
	}
	
	public is_out_of_range<R extends Range>(this: NonNullable<this>, range: NonNullable<R>): boolean
	{
		return range.is_out_of_range(this)
	}
	
	public guard_in_range<R extends Range>(this: NonNullable<this>, range: NonNullable<R>): NonNullable<FiniteNumber>
	{
		if (!range.validate_minimum(this))
		{
			throw new RangeError(`value '${this}' is not within the ${range.MinimumDescription} minimum`)
		}
		if (!range.validate_maximum(this))
		{
			throw new RangeError(`value '${this}' is not within the ${range.MaximumDescription} maximum`)
		}
		return this
	}
	
	public is_integer(this: NonNullable<this>): boolean
	{
		return Number.isInteger(this.value)
	}
	
	public guard_is_integer_in_range<R extends Range>(this: NonNullable<this>, range: NonNullable<R>): NonNullable<FiniteNumber>
	{
		if (!this.is_integer())
		{
			throw new RangeError(`value '${this}' is an integer`)
		}
		return this.guard_in_range(range)
	}
	
	public [Symbol.toPrimitive](this: NonNullable<this>, hint: SymbolToPrimitiveHint): string | number
	{
		switch (hint)
		{
			case SymbolToPrimitiveHint.string:
				return this.toString(10)
			
			case SymbolToPrimitiveHint.number:
				return this.valueOf()
			
			case SymbolToPrimitiveHint.default:
				return this.valueOf()
			
			default:
				throw new RangeError(`hint (${hint}) is not string, number or default`)
		}
	}
	
	public toString(this: NonNullable<this>, radix?: number): string
	{
		return this.value.toString(radix)
	}
	
	public valueOf(this: NonNullable<this>): number
	{
		return this.value
	}
	
	get value(): number
	{
		return this.#value
	}
	
	public add(this: NonNullable<this>, increment: NonNullable<this>): NonNullable<FiniteNumber>
	{
		return new FiniteNumber(this.value + increment.value)
	}
	
	public subtract(this: NonNullable<this>, increment: NonNullable<this>): NonNullable<FiniteNumber>
	{
		return new FiniteNumber(this.value - increment.value)
	}
	
	public round(this: NonNullable<this>): NonNullable<FiniteNumber>
	{
		return new FiniteNumber(Math.round(this.value))
	}
	
	public cube(this: NonNullable<this>): NonNullable<FiniteNumber>
	{
		return new FiniteNumber(this.value * this.value * this.value)
	}
	
	public cube_root(this: NonNullable<this>): NonNullable<FiniteNumber>
	{
		const cube_root_power = 1.0 / 3.0
		
		return new FiniteNumber(Math.pow(this.value, cube_root_power))
	}
	
	public multiply(this: NonNullable<this>, scalar: NonNullable<this>): NonNullable<FiniteNumber>
	{
		return new FiniteNumber(this.value * scalar.value)
	}
	
	public divide(this: NonNullable<this>, denominator: NonNullable<this>): NonNullable<FiniteNumber>
	{
		return new FiniteNumber(this.value / denominator.value)
	}
	
	public modulus(this: NonNullable<this>, denominator: NonNullable<this>): NonNullable<FiniteNumber>
	{
		return new FiniteNumber(this.value % denominator.value)
	}
	
	public average(this: NonNullable<this>, ...others: NonNullable<this>[]): NonNullable<FiniteNumber>
	{
		let value = this.value
		for(const other of others)
		{
			value += other.value
		}
		
		return new FiniteNumber(value / (others.length + 1))
	}
	
	public absolute_difference(this: NonNullable<this>, other: NonNullable<this>): NonNullable<FiniteNumber>
	{
		return new FiniteNumber(Math.abs(this.value - other.value))
	}
	
	public max(this: NonNullable<this>, other: NonNullable<this>): NonNullable<FiniteNumber>
	{
		return new FiniteNumber(Math.max(this.value, other.value))
	}
	
	public min(this: NonNullable<this>, other: NonNullable<this>): NonNullable<FiniteNumber>
	{
		return new FiniteNumber(Math.min(this.value, other.value))
	}
	
	public sign(this: NonNullable<this>, sign: Sign): NonNullable<FiniteNumber>
	{
		return FiniteNumber.try_from(this.value * sign)
	}
	
	public ordering(this: NonNullable<this>): Ordering
	{
		// Checks against zero work because we eliminate the value `-0.0` in the constructor.
		if (this.value > 0)
		{
			return Ordering.GreaterThan
		}
		else if (this.value < 0)
		{
			return Ordering.LessThan
		}
		else
		{
			return Ordering.EqualTo
		}
	}
	
	public is_positive(this: NonNullable<this>): boolean
	{
		// Checks against zero work because we eliminate the value `-0.0` in the constructor.
		return this.value > 0
	}
	
	public is_zero(this: NonNullable<this>): boolean
	{
		// Checks against zero work because we eliminate the value `-0.0` in the constructor.
		return this.value == 0
	}
	
	public is_negative(this: NonNullable<this>): boolean
	{
		// Checks against zero work because we eliminate the value `-0.0` in the constructor.
		return this.value < 0
	}
}
