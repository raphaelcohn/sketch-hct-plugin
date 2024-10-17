// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {FiniteNumber} from "../FiniteNumber";
import {Range} from "./Range";
import {InclusiveOrExclusive} from "./InclusiveOrExclusive";

export class AnyRange implements Range
{
	public static readonly Any: NonNullable<AnyRange> = new AnyRange()
	
	public readonly MinimumDescription: InclusiveOrExclusive = "inclusive"
	
	public readonly MaximumDescription: InclusiveOrExclusive = "inclusive"
	
	private constructor()
	{
	}
	
	public validate_minimum(this: NonNullable<this>, _value: NonNullable<FiniteNumber>): boolean
	{
		return true
	}
	
	public validate_maximum(this: NonNullable<this>, _value: NonNullable<FiniteNumber>): boolean
	{
		return true
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
