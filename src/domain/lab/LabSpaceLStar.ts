// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {XyzSpaceY} from "../xyz/XyzSpaceY";
import {LabSpace} from "./LabSpace";
import {argbFromRgba, lstarFromArgb} from "@material/material-color-utilities";
import {AlphaSRgbSpace} from "../sRGB/AlphaSRgbSpace";

// LAB L*.
// Perceptual Luminance.
// Linear scale from 0 to 100.
export class LabSpaceLStar extends NumericValue
{
	private static readonly InclusiveMinimumValue: number = 4
	
	private static readonly InclusiveMaximumValue: number = 100
	
	public static readonly InclusiveMinimum: NonNullable<LabSpaceLStar> = new LabSpaceLStar(LabSpaceLStar.InclusiveMinimumValue)
	
	public static readonly InclusiveMaximum: NonNullable<LabSpaceLStar> = new LabSpaceLStar(LabSpaceLStar.InclusiveMaximumValue)
	
	public constructor(value: number)
	{
		super(value, LabSpaceLStar.InclusiveMinimumValue, LabSpaceLStar.InclusiveMaximumValue)
	}
	
	public to_XyzSpaceY(this: NonNullable<this>): NonNullable<XyzSpaceY>
	{
		return new XyzSpaceY(LabSpace.one_hundrend * LabSpaceLStar.lab_inv_f((this.value + LabSpace.sixteen) / LabSpace.one_hundrend_sixteen))
	}
	
	public add(this: NonNullable<this>, increment: NonNullable<number>): NonNullable<LabSpaceLStar>
	{
		guard_number(increment, 'increment')
		
		return new LabSpaceLStar(this.value + increment)
	}
	
	public difference(this: NonNullable<this>, other: NonNullable<this>): NonNullable<number>
	{
		return this.value - other.value
	}
	
	public average(this: NonNullable<this>, other: NonNullable<this>): NonNullable<LabSpaceLStar>
	{
		return new LabSpaceLStar((this.value + other.value) / 2)
	}
	
	public is_less_than(this: NonNullable<this>, other: NonNullable<this>): boolean
	{
		return this.value < other.value
	}
	
	static from_alpha_srgb_space(alpha_srgb_space: NonNullable<AlphaSRgbSpace>): NonNullable<LabSpaceLStar>
	{
		const value = lstarFromArgb(argbFromRgba(alpha_srgb_space.into_rgba()))
		return new LabSpaceLStar(value)
	}
	
	private static lab_inv_f(ft: NonNullable<number>): NonNullable<number>
	{
		guard_number(ft, 'ft')
		
		const ft3 = ft * ft * ft;
		if (ft3 > LabSpace.e)
		{
			return ft3
		}
		else
		{
			return (LabSpace.one_hundrend_sixteen * ft - LabSpace.sixteen) / LabSpace.kappa
		}
	}
	
	static is_out_of_range(value: NonNullable<number>): boolean
	{
		guard_number(value, 'value')
		
		return (value < LabSpaceLStar.InclusiveMinimumValue) || (value > LabSpaceLStar.InclusiveMaximumValue)
	}
}
