// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {SymbolToPrimitiveHint} from "./SymbolToPrimitiveHint";
import {Value} from "./Value";
import {BuiltInValue} from "./BuiltInValue";

export abstract class AbstractValue<N extends BuiltInValue> implements Value<N>
{
	readonly #value: N
	
	protected constructor(value: N)
	{
		this.#value = value
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
		return this.value.valueOf()
	}
	
	public get value(): N
	{
		return this.#value
	}
}
