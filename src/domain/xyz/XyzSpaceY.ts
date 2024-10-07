// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import { ContrastRatio } from "./ContrastRatio";
import { LabSpace } from "../lab/LabSpace";
import { LabSpaceLStar } from "../lab/LabSpaceLStar";

// XYZ Y.
// Relative Luminance.
// Logarithmic scale.
export class XyzSpaceY extends NumericValue
{
	private static readonly InclusiveMinimumValue: number = 0
	
	private static readonly InclusiveMaximumValue: number = 100
	
	public static readonly InclusiveMinimum: NonNullable<XyzSpaceY> = new XyzSpaceY(XyzSpaceY.InclusiveMinimumValue)
	
	public static readonly InclusiveMaximum: NonNullable<XyzSpaceY> = new XyzSpaceY(XyzSpaceY.InclusiveMaximumValue)
	
	constructor(value: number)
	{
		super(value, XyzSpaceY.InclusiveMinimumValue, XyzSpaceY.InclusiveMaximumValue)
	}
	
	public to_LabSpaceLStar(): NonNullable<LabSpaceLStar>
	{
		return new LabSpaceLStar(XyzSpaceY.lab_f(this.value / LabSpace.one_hundrend) * LabSpace.one_hundrend_sixteen - LabSpace.sixteen)
	}
	
	public static contrast_ratio(left: NonNullable<XyzSpaceY>, right: NonNullable<XyzSpaceY>)
	{
		const [lighter, darker] = XyzSpaceY.lighter_and_darker(left, right)
		return ContrastRatio.from_lighter_and_darker(lighter, darker)
	}
	
	is_greater_than(this: NonNullable<this>, other: NonNullable<this>): boolean
	{
		return this.value > other.value
	}
	
	private static lighter_and_darker(left: NonNullable<XyzSpaceY>, right: NonNullable<XyzSpaceY>): [NonNullable<XyzSpaceY>, NonNullable<XyzSpaceY>]
	{
		return left.is_greater_than(right) ? [left, right] : [right, left]
	}
	
	private static lab_f(t: NonNullable<number>): NonNullable<number>
	{
		if (t > LabSpace.e)
		{
			return Math.pow(t, 1.0 / 3.0);
		}
		else
		{
			return (LabSpace.kappa * t + LabSpace.sixteen) / LabSpace.one_hundrend_sixteen;
		}
	}
	
	static is_out_of_range(value: NonNullable<number>): boolean
	{
		guard_number(value, 'value')
		
		return (value < XyzSpaceY.InclusiveMinimumValue || value > XyzSpaceY.InclusiveMaximumValue)
	}
}
