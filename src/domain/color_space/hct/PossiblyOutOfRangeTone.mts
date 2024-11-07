// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {AbstractValue} from "../../number/values/AbstractValue.mjs";
import {Tone} from "./Tone.mjs";

export class PossiblyOutOfRangeTone extends AbstractValue<Tone>
{
	public static readonly OutOfRangeMinimum: NonNullable<PossiblyOutOfRangeTone> = PossiblyOutOfRangeTone.#out_of_range(Tone.T0)
	public static readonly OutOfRangeMaximum: NonNullable<PossiblyOutOfRangeTone> = PossiblyOutOfRangeTone.#out_of_range(Tone.T100)
	
	public readonly is_out_of_range: boolean
	
	private constructor(value: NonNullable<Tone>, is_out_of_range: boolean)
	{
		super(value)
		this.is_out_of_range = is_out_of_range
	}
	
	public static in_range(value: NonNullable<Tone>): NonNullable<PossiblyOutOfRangeTone>
	{
		return new PossiblyOutOfRangeTone(value, false)
	}
	
	static #out_of_range(value: NonNullable<Tone>): NonNullable<PossiblyOutOfRangeTone>
	{
		return new PossiblyOutOfRangeTone(value, true)
	}
	
	public into_range(this: NonNullable<this>): NonNullable<Tone>
	{
		return this.value
	}
}
