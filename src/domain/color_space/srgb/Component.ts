// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {linearized, Rgba} from "@material/material-color-utilities"
import {AbstractValue} from "../../number/values";
import {FiniteNumber} from "../../number";
import {InclusiveMinimumInclusiveMaximumRange} from "../../number/ranges";
import {LinearizedComponent} from "./LinearizedComponent";

export class Component extends AbstractValue<FiniteNumber>
{
	public static readonly TwoHundredAndFiftyFive: NonNullable<Component> = new Component(FiniteNumber.TwoHundredAndFiftyFive)
	
	static readonly #range: NonNullable<InclusiveMinimumInclusiveMaximumRange> = InclusiveMinimumInclusiveMaximumRange.ZeroToTwoHundredAndFiftyFive
	
	public constructor(value: NonNullable<FiniteNumber>)
	{
		super(value.guard_is_integer_in_range(Component.#range))
	}
	
	public static try_from(value: number): NonNullable<Component>
	{
		return new Component(FiniteNumber.try_from(value))
	}
	
	public static try_from_hex_color(hex_color_string: string): NonNullable<Component>
	{
		let value: NonNullable<FiniteNumber>
		switch (hex_color_string.length)
		{
			case 1:
				const digit = FiniteNumber.try_from_integer_hexadecimal_eithercase(hex_color_string)
				value = digit.shift_left(FiniteNumber.Four).add(digit)
				break
			
			case 2:
				value = FiniteNumber.try_from_integer_hexadecimal_eithercase(hex_color_string)
				break
			
			default:
				throw new RangeError(`${hex_color_string} did not have a recognised length of 1 or 2`)
		}
		return new Component(value)
	}
	
	/**
	 * @internal
	 */
	static try_from_hex_color_coordinates_string(hex_color_string: string, index: number, width: 1 | 2): NonNullable<Component>
	{
		return Component.try_from_hex_color(hex_color_string.substring(index, index + width))
	}
	
	public override toString(this: NonNullable<Component>, radix?: number): string
	{
		return this.to_upper_case_hexadecimal_string(radix)
	}
	
	public to_upper_case_hexadecimal_string(this: NonNullable<Component>, radix?: number): string
	{
		return super.toString(radix).toUpperCase()
	}
	
	public to_lower_case_hexadecimal_string(this: NonNullable<Component>, radix?: number): string
	{
		return super.toString(radix)
	}
	
	// Returns a number between 0.0 inclusive and 100.0 inclusive.
	public linearize(this: NonNullable<Component>): NonNullable<LinearizedComponent>
	{
		return new LinearizedComponent(FiniteNumber.try_from(linearized(this.valueOf())))
	}
	
	/**
	 * @internal
	 */
	static alpha_from_rgba(rgba: NonNullable<Rgba>): NonNullable<Component>
	{
		return Component.#from_rgba_component(rgba.a)
	}
	
	/**
	 * @internal
	 */
	static red_from_rgba(rgba: NonNullable<Rgba>): NonNullable<Component>
	{
		return Component.#from_rgba_component(rgba.r)
	}
	
	/**
	 * @internal
	 */
	static green_from_rgba(rgba: NonNullable<Rgba>): NonNullable<Component>
	{
		return Component.#from_rgba_component(rgba.g)
	}
	
	/**
	 * @internal
	 */
	static blue_from_rgba(rgba: NonNullable<Rgba>): NonNullable<Component>
	{
		return Component.#from_rgba_component(rgba.b)
	}
	
	static #from_rgba_component(rgba_component: number): NonNullable<Component>
	{
		return new Component(FiniteNumber.try_from(rgba_component))
	}
}
