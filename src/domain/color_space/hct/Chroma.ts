// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {AbstractValue} from "../../number/values";
import {FiniteNumber} from "../../number";
import {InclusiveMinimumNoMaximumRange} from "../../number/ranges";

export class Chroma extends AbstractValue<FiniteNumber>
{
    static readonly #range: NonNullable<InclusiveMinimumNoMaximumRange> = InclusiveMinimumNoMaximumRange.ZeroToInfinity
    
    static readonly PreferredInclusiveMaximum: NonNullable<Chroma> = new Chroma(FiniteNumber.TwoHundred)
    
    public constructor(value: NonNullable<FiniteNumber>)
    {
        super(value.guard_in_range(Chroma.#range))
    }
    
    public static try_from(value: number): NonNullable<Chroma>
    {
        return new Chroma(FiniteNumber.try_from(value))
    }
    
    round(this: NonNullable<this>): NonNullable<Chroma>
    {
        return new Chroma(this.value.round())
    }

    subtract(this: NonNullable<this>, decrement: NonNullable<FiniteNumber>): NonNullable<Chroma>
    {
        return new Chroma(this.value.subtract(decrement))
    }

    divide(this: NonNullable<this>, denominator: NonNullable<FiniteNumber>): NonNullable<Chroma>
    {
        return new Chroma(this.value.divide(denominator))
    }

    max(this: NonNullable<this>, other: NonNullable<this>): NonNullable<Chroma>
    {
        return new Chroma(this.value.max(other.value))
    }

    min(this: NonNullable<this>, other: NonNullable<this>): NonNullable<Chroma>
    {
        return new Chroma(this.value.min(other.value))
    }
}
