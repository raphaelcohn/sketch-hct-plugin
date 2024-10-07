// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {XyzSpaceY} from "./XyzSpaceY";

export class ContrastRatio extends NumericValue
{
	private static readonly InclusiveMinimumValue: number = 1.0
	
	private static readonly InclusiveMaximumValue: number = 21.0
	
	private static readonly ContrastThreshold: number = 5.0
	
	constructor(value: number)
	{
		super(value, ContrastRatio.InclusiveMinimumValue, ContrastRatio.InclusiveMaximumValue)
	}
	
	static from_lighter_and_darker(lighter: NonNullable<XyzSpaceY>, darker: NonNullable<XyzSpaceY>): ContrastRatio
	{
		return new ContrastRatio((lighter.value + ContrastRatio.ContrastThreshold) / (darker.value + ContrastRatio.ContrastThreshold))
	}
	
	public override toString(this: NonNullable<this>): string
	{
		return `1:${this.value}`
	}
	
	lighten(dark_y: NonNullable<XyzSpaceY>): NonNullable<number>
	{
		return this.value * (dark_y.value + ContrastRatio.ContrastThreshold) - ContrastRatio.ContrastThreshold
	}
	
	darken(light_y: NonNullable<XyzSpaceY>): NonNullable<number>
	{
		return ((light_y.value + ContrastRatio.ContrastThreshold) / this.value) - ContrastRatio.ContrastThreshold
	}
	
	is_contrast_too_low_or_too_high(before_y: NonNullable<XyzSpaceY>, after_y: NonNullable<XyzSpaceY>): boolean
	{
		// Given a color and a contrast ratio to reach, the luminance of a color that reaches that ratio with the color can be calculated.
		// However, that luminance may not contrast as desired, ie the contrast ratio of the input color and the returned luminance may not reach the contrast ratio asked for.
		//
		// When the desired contrast ratio and the result contrast ratio differ by more than this amount, an error value should be returned, or the method should be documented as 'unsafe', meaning, it will return a valid luminance but that luminance may not meet the requested contrast ratio.
		//
		// 0.04 selected because it ensures the resulting ratio rounds to the same tenth.
		const CONTRAST_RATIO_EPSILON: number = 0.04;
		
		const real_contrast = XyzSpaceY.contrast_ratio(before_y, after_y)
		
		const delta = Math.abs(real_contrast.value - this.value)
		return (real_contrast.value < this.value && delta > CONTRAST_RATIO_EPSILON)
	}
	
	static is_out_of_range(value: NonNullable<number>)
	{
		guard_number(value, 'value')
		
		return (value < ContrastRatio.InclusiveMinimumValue) || (value > ContrastRatio.InclusiveMaximumValue)
	}
}
