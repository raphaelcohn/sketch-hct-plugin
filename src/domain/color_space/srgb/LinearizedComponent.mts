// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {AbstractValue} from "../../number/values/AbstractValue.mjs";
import {FiniteNumber} from "../../number/FiniteNumber.mjs";
import {InclusiveMinimumInclusiveMaximumRange} from "../../number/ranges/InclusiveMinimumInclusiveMaximumRange.mjs";
import {delinearized} from "@material/material-color-utilities";
import {Component} from "./Component.mjs";

export class LinearizedComponent extends AbstractValue<FiniteNumber>
{
	static readonly #range: NonNullable<InclusiveMinimumInclusiveMaximumRange> = InclusiveMinimumInclusiveMaximumRange.ZeroToOneHundred
	
	public constructor(value: NonNullable<FiniteNumber>)
	{
		super(value.guard_in_range(LinearizedComponent.#range))
	}
	
	public static try_from(value: number): NonNullable<LinearizedComponent>
	{
		return new LinearizedComponent(FiniteNumber.try_from(value))
	}
	
	// Returns a number between 0 inclusive and 255 inclusive.
	public delinearize(this: NonNullable<LinearizedComponent>): Component
	{
		return new Component(FiniteNumber.try_from(delinearized(this.valueOf())))
	}
}
