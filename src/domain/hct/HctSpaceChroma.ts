// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

export class HctSpaceChroma extends NumericValue
{
    private static readonly InclusiveMinimumValue: number = 0
    
    public static readonly InclusiveMinimum: NonNullable<HctSpaceChroma> = new HctSpaceChroma(HctSpaceChroma.InclusiveMinimumValue)
    
    static readonly PreferredInclusiveMaximum: NonNullable<HctSpaceChroma> = new HctSpaceChroma(200.0)
    
    constructor(value: number)
    {
        super(value, HctSpaceChroma.InclusiveMinimumValue, Number.MAX_VALUE)
    }

    subtract(this: NonNullable<this>, decrement: NonNullable<number>): NonNullable<HctSpaceChroma>
    {
        guard_number(decrement, 'decrement')

        return new HctSpaceChroma(this.value - decrement)
    }

    divide(this: NonNullable<this>, denominator: NonNullable<number>): NonNullable<HctSpaceChroma>
    {
        guard_number(denominator, 'denominator')

        return new HctSpaceChroma(this.value / denominator)
    }

    is_less_than(this: NonNullable<this>, other: NonNullable<this>): boolean
    {
        return this.value < other.value
    }

    is_greater_than_or_equal_to(this: NonNullable<this>, other: NonNullable<this>): boolean
    {
        return this.value >= other.value
    }

    max(this: NonNullable<this>, maximum: NonNullable<this>): NonNullable<HctSpaceChroma>
    {
        return new HctSpaceChroma(Math.max(this.value, maximum.value))
    }

    min(this: NonNullable<this>, minimum: NonNullable<this>): NonNullable<HctSpaceChroma>
    {
        return new HctSpaceChroma(Math.min(this.value, minimum.value))
    }

    static is_out_of_range(value: NonNullable<number>): boolean
    {
        guard_number(value, 'value')
        
        return value < HctSpaceChroma.InclusiveMinimumValue
    }
}
