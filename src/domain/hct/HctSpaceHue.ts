// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

export class HctSpaceHue extends NumericValue
{
	private static readonly InclusiveMinimumValue: number = 0
	
	private static readonly ExclusiveMaximumValue: number = 360
	
	public static readonly InclusiveMinimum: NonNullable<HctSpaceHue> = new HctSpaceHue(HctSpaceHue.InclusiveMinimumValue)
	
	constructor(value: number)
	{
		super(value, HctSpaceHue.InclusiveMinimumValue, HctSpaceHue.ExclusiveMaximumValue - Number.EPSILON)
	}
	
	add(this: NonNullable<this>, increment: NonNullable<number>): NonNullable<HctSpaceHue>
	{
		guard_number(increment, 'increment')
		
		return new HctSpaceHue((this.value + increment) % HctSpaceHue.ExclusiveMaximumValue)
	}
	
	static is_out_of_range(value: NonNullable<number>): boolean
	{
		guard_number(value, 'value')
		
		return (value < HctSpaceHue.InclusiveMinimumValue) || (value >= HctSpaceHue.ExclusiveMaximumValue)
	}
}
