// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {AbstractValue} from "../../number/values";
import {FiniteNumber} from "../../number";
import {InclusiveMinimumNoMaximumRange} from "../../number/ranges";

export class Chroma extends AbstractValue<FiniteNumber>
{
    static readonly #range: NonNullable<InclusiveMinimumNoMaximumRange> = InclusiveMinimumNoMaximumRange.ZeroToInfinity
    
    public static readonly Zero: NonNullable<Chroma> = new Chroma(FiniteNumber.Zero)
    
    public static readonly Two: NonNullable<Chroma> = new Chroma(FiniteNumber.Two)
    
    public static readonly Six: NonNullable<Chroma> = new Chroma(FiniteNumber.Six)
    
    public static readonly Eight: NonNullable<Chroma> = new Chroma(FiniteNumber.Eight)
    
    public static readonly Ten: NonNullable<Chroma> = new Chroma(FiniteNumber.Ten)
    
    public static readonly Twelve: NonNullable<Chroma> = new Chroma(FiniteNumber.Twelve)
    
    public static readonly Sixteen: NonNullable<Chroma> = new Chroma(FiniteNumber.Sixteen)
    
    public static readonly TwentyFour: NonNullable<Chroma> = Chroma.try_from(24)
    
    public static readonly ThirtyTwo: NonNullable<Chroma> = Chroma.try_from(32)
    
    public static readonly ThirtySix: NonNullable<Chroma> = Chroma.try_from(36)
    
    public static readonly Forty: NonNullable<Chroma> = Chroma.try_from(40)
    
    public static readonly FortyEight: NonNullable<Chroma> = Chroma.try_from(48)
    
    public static readonly TwoHundred: NonNullable<Chroma> = new Chroma(FiniteNumber.TwoHundred)
    
    static readonly PreferredInclusiveMaximum: NonNullable<Chroma> = Chroma.TwoHundred
    
    public constructor(value: NonNullable<FiniteNumber>)
    {
        super(value.guard_in_range(Chroma.#range))
    }
    
    public static try_from(value: number): NonNullable<Chroma>
    {
        return new Chroma(FiniteNumber.try_from(value))
    }
    
    /**
     * @internal
     */
    round(this: NonNullable<this>): NonNullable<Chroma>
    {
        return new Chroma(this.value.round())
    }
    
    /**
     * @internal
     */
    add(this: NonNullable<this>, decrement: NonNullable<FiniteNumber>): NonNullable<Chroma>
    {
        return new Chroma(this.value.add(decrement))
    }
    
    /**
     * @internal
     */
    subtract(this: NonNullable<this>, decrement: NonNullable<FiniteNumber>): NonNullable<Chroma>
    {
        return new Chroma(this.value.subtract(decrement))
    }
    
    /**
     * @internal
     */
    divide(this: NonNullable<this>, denominator: NonNullable<FiniteNumber>): NonNullable<Chroma>
    {
        return new Chroma(this.value.divide(denominator))
    }
    
    /**
     * @internal
     */
    absolute_difference(this: NonNullable<this>, other: NonNullable<this>): NonNullable<FiniteNumber>
    {
        return this.value.absolute_difference(other.value)
    }
    
    /**
     * @internal
     */
    max(this: NonNullable<this>, other: NonNullable<this>): NonNullable<Chroma>
    {
        return new Chroma(this.value.max(other.value))
    }
    
    /**
     * @internal
     */
    min(this: NonNullable<this>, other: NonNullable<this>): NonNullable<Chroma>
    {
        return new Chroma(this.value.min(other.value))
    }
}
