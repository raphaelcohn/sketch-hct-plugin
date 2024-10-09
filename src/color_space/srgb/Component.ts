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
	
	public override toString(this: NonNullable<Component>, radix?: number): string
	{
		return super.toString(radix).toUpperCase()
	}
	
	// Returns a number between 0.0 inclusive and 100.0 inclusive.
	public linearize(this: NonNullable<Component>): NonNullable<LinearizedComponent>
	{
		return new LinearizedComponent(FiniteNumber.try_from(linearized(this.valueOf())))
	}
	
	static alpha_from_rgba(rgba: NonNullable<Rgba>): NonNullable<Component>
	{
		return Component.from_rgba_component(rgba.a)
	}
	
	static red_from_rgba(rgba: NonNullable<Rgba>): NonNullable<Component>
	{
		return Component.from_rgba_component(rgba.r)
	}
	
	static green_from_rgba(rgba: NonNullable<Rgba>): NonNullable<Component>
	{
		return Component.from_rgba_component(rgba.g)
	}
	
	static blue_from_rgba(rgba: NonNullable<Rgba>): NonNullable<Component>
	{
		return Component.from_rgba_component(rgba.b)
	}
	
	private static from_rgba_component(rgba_component: number): NonNullable<Component>
	{
		return new Component(FiniteNumber.try_from(rgba_component))
	}
}
