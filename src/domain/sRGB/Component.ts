// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {linearized, Rgba} from "@material/material-color-utilities"

export class Component extends NumericValue
{
	private static readonly InclusiveMinimumValue: NonNullable<number> = 0
	
	private static readonly InclusiveMaximumValue: NonNullable<number> = 255
	
	public static readonly InclusiveMinimum: NonNullable<Component> = new Component(Component.InclusiveMinimumValue)
	
	public static readonly InclusiveMaximum: NonNullable<Component> = new Component(Component.InclusiveMaximumValue)
	
	constructor(value: number)
	{
		super(value, Component.InclusiveMinimumValue, Component.InclusiveMaximumValue)
		
		if (!Number.isInteger(value))
		{
			throw new RangeError(`Value (${value}) must be an integer`)
		}
	}
	
	/// Returns a number between 0.0 inclusive and 100.0 inclusive.
	public linearize(): NonNullable<number>
	{
		return linearized(this.value)
	}
	
	static is_out_of_range(value: NonNullable<number>): boolean
	{
		guard_number(value, 'value')
		
		return (value < Component.InclusiveMinimumValue) || (value > Component.InclusiveMaximumValue)
	}
	
	static alpha_from_rgba(rgba: NonNullable<Rgba>): NonNullable<Component>
	{
		return new Component(rgba.a)
	}
	
	static red_from_rgba(rgba: NonNullable<Rgba>): NonNullable<Component>
	{
		return new Component(rgba.r)
	}
	
	static green_from_rgba(rgba: NonNullable<Rgba>): NonNullable<Component>
	{
		return new Component(rgba.g)
	}
	
	static blue_from_rgba(rgba: NonNullable<Rgba>): NonNullable<Component>
	{
		return new Component(rgba.b)
	}
}
