// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {Component} from "./Component.mjs";
import {AlphaSRgbCoordinates} from "./AlphaSRgbCoordinates.mjs";
import type {argb} from "./argb.mts";

export class SRgbCoordinates
{
	protected static readonly hexadecimal_string_prefix = "#"
	
	public constructor(public readonly red: NonNullable<Component>, public readonly green: NonNullable<Component>, public readonly blue: NonNullable<Component>)
	{
	}
	
	public static try_from_css_hex_color_or_hex_color(hex_color: string): NonNullable<SRgbCoordinates>
	{
		const length = hex_color.length
		if (length == 0)
		{
			throw new RangeError("hex_color can not be an empty string")
		}
		const first = hex_color.charAt(0)
		const index = (first === '#') ? 1 : 0
		return SRgbCoordinates.try_from_hex_color(hex_color.substring(index))
	}
	
	// See <https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color>
	public static try_from_css_hex_color(css_hex_color_string: string): NonNullable<SRgbCoordinates>
	{
		const length = css_hex_color_string.length
		if (length == 0)
		{
			throw new RangeError("css_hex_color_string can not be an empty string")
		}
		const first = css_hex_color_string.charAt(0)
		if (first !== '#')
		{
			throw new RangeError(`css_hex_color_string starts with ${first} not #`)
		}
		
		return SRgbCoordinates.try_from_hex_color(css_hex_color_string.substring(1))
	}
	
	public static try_from_hex_color(hex_color_string: string): NonNullable<SRgbCoordinates>
	{
		const red_index = 0
		let green_index: number
		let blue_index: number
		let width: 1 | 2
		switch (hex_color_string.length)
		{
			case 3:
				green_index = 1
				blue_index = 2
				width = 1
				break
				
			case 6:
				green_index = 2
				blue_index = 4
				width = 2
				break
				
			default:
				throw new RangeError(`${hex_color_string} did not have a recognised length of 3 or 6`)
		}
		
		const red = Component.try_from_hex_color_coordinates_string(hex_color_string, red_index, width)
		const green = Component.try_from_hex_color_coordinates_string(hex_color_string, green_index, width)
		const blue = Component.try_from_hex_color_coordinates_string(hex_color_string, blue_index, width)
		return new SRgbCoordinates(red, green, blue)
	}
	
	public toString(this: NonNullable<this>): string
	{
		return this.to_upper_case_hexadecimal_string()
	}
	
	public valueOf(this: NonNullable<this>): number
	{
		return new AlphaSRgbCoordinates(Component.TwoHundredAndFiftyFive, this.red, this.green, this.blue).valueOf()
	}
	
	public to_upper_case_hexadecimal_string(this: NonNullable<this>): string
	{
		return `${SRgbCoordinates.hexadecimal_string_prefix}${this.red_green_blue_hexadecimal_upper_case_string()}`
	}
	
	public to_lower_case_hexadecimal_string(this: NonNullable<this>): string
	{
		return `${SRgbCoordinates.hexadecimal_string_prefix}${this.red_green_blue_hexadecimal_lower_case_string()}`
	}
	
	public with_alpha(this: NonNullable<this>, alpha: NonNullable<Component>): NonNullable<AlphaSRgbCoordinates>
	{
		return new AlphaSRgbCoordinates(this.red, this.green, this.blue, alpha)
	}
	
	public into_opaque(this: NonNullable<this>): NonNullable<AlphaSRgbCoordinates>
	{
		return this.with_alpha(Component.TwoHundredAndFiftyFive)
	}
	
	/**
	 *
	 * @internal
	 */
	into_argb(this: NonNullable<this>): argb
	{
		return this.into_opaque().into_argb()
	}
	
	protected red_green_blue_hexadecimal_upper_case_string(this: NonNullable<this>): string
	{
		return `${SRgbCoordinates.component_hexadecimal_upper_case_string(this.red)}${SRgbCoordinates.component_hexadecimal_upper_case_string(this.green)}${SRgbCoordinates.component_hexadecimal_upper_case_string(this.blue)}`
	}
	
	protected red_green_blue_hexadecimal_lower_case_string(this: NonNullable<this>): string
	{
		return `${SRgbCoordinates.component_hexadecimal_upper_case_string(this.red)}${SRgbCoordinates.component_hexadecimal_lower_case_string(this.green)}${SRgbCoordinates.component_hexadecimal_lower_case_string(this.blue)}`
	}
	
	protected static component_hexadecimal_upper_case_string(component: NonNullable<Component>): string
	{
		return component.to_upper_case_hexadecimal_string()
	}
	
	protected static component_hexadecimal_lower_case_string(component: NonNullable<Component>): string
	{
		return component.to_lower_case_hexadecimal_string()
	}
}
