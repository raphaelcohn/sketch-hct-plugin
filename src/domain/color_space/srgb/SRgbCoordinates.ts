// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {Component} from "./Component.js";
import {AlphaSRgbCoordinates} from "./AlphaSRgbCoordinates";

export class SRgbCoordinates
{
	protected static readonly hexadecimal_string_prefix = "#"
	
	public constructor(public readonly red: NonNullable<Component>, public readonly green: NonNullable<Component>, public readonly blue: NonNullable<Component>)
	{
	}
	
	public toString(this: NonNullable<this>): string
	{
		return `${SRgbCoordinates.hexadecimal_string_prefix}${this.red_green_blue_hexadecimal_upper_case_string()}`
	}
	
	public valueOf(this: NonNullable<this>): number
	{
		return new AlphaSRgbCoordinates(Component.TwoHundredAndFiftyFive, this.red, this.green, this.blue).valueOf()
	}
	
	protected red_green_blue_hexadecimal_upper_case_string(this: NonNullable<this>): string
	{
		return `${SRgbCoordinates.component_hexadecimal_upper_case_string(this.red)}${SRgbCoordinates.component_hexadecimal_upper_case_string(this.green)}${SRgbCoordinates.component_hexadecimal_upper_case_string(this.blue)}`
	}
	
	protected static component_hexadecimal_upper_case_string(component: NonNullable<Component>): string
	{
		return `${component.value.toString(16)}`
	}
}
