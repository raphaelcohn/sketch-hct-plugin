// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {AbstractValue} from "../../number/values";
import {FiniteNumber, Sign} from "../../number";
import {InclusiveMinimumNoMaximumRange} from "../../number/ranges";

export class ToneDelta extends AbstractValue<FiniteNumber>
{
	public static readonly Ten: NonNullable<ToneDelta> = ToneDelta.try_from(10)
	
	private constructor(positive_value: NonNullable<FiniteNumber>)
	{
		super(positive_value.guard_is_integer_in_range(InclusiveMinimumNoMaximumRange.OneToInfinity))
	}
	
	public static try_from(positive_value: number): NonNullable<ToneDelta>
	{
		return new ToneDelta(FiniteNumber.try_from(positive_value))
	}
	
	/**
	 * @internal
	 * @param expansion_direction
	 */
	sign(expansion_direction: Sign): NonNullable<FiniteNumber>
	{
		return this.value.sign(expansion_direction)
	}
}
