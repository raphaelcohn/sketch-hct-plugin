// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {LabSpaceLStar} from "../lab/LabSpaceLStar";
import {HctSpace} from "./HctSpace";
import {HctSpaceTone, InclusiveMaximumTone, InclusiveMinimumTone} from "./HctSpaceTone";

class MaximumChromaCache
{
    cache = new Map()

    constructor()
    {
    }

    get(tone)
    {
        var maximum_chroma = this.cache.get(tone)
        if (maximum_chroma === undefined)
        {
            const MAX_CHROMA_VALUE = 200.0;
            var new_chroma = HctSpace.from(hue, MAX_CHROMA_VALUE, tone).chroma
            this.cache.set(tone, new_chroma);
            maximum_chroma = new_chroma
        }
        return maximum_chroma
    }
}

const maximum_chroma_cache = new MaximumChromaCache()

export class TonalPalette
{
    #hue = new HctSpaceHue(0);
    #chroma = new HctSpaceChroma(0);

    constructor(hue, chroma)
    {
        guard_instance(hue, HctSpaceHue, 'hue')
        guard_instance(chroma, HctSpaceChroma, 'chroma')

        this.#hue = hue
        this.#chroma = chroma
    }

    toString()
    {
        return `(${this.hue}, ${this.chroma})`
    }

    get hue()
    {
        return this.#hue
    }

    get chroma()
    {
        return this.#chroma
    }

    get key_colour()
    {
        // Pivot around 50% because this tone has, on average, the most chroma available.
        const pivot_tone = new HctSpaceTone(new LabSpaceLStar(50))

        const tone_step_size = 1

        // Epsilon to accept values slightly higher than the requested chroma.
        const epsilon = 0.01

        // Binary search to find the tone that can provide a chroma that is closest to the requested chroma.
        let lower_tone = InclusiveMinimumTone;
        let upper_tone = InclusiveMaximumTone;
        while (lower_tone.is_less_than(upper_tone))
        {
            const mid_tone = lower_tone.average(upper_tone)
            const maximum_chroma_for_mid_tone = maximum_chroma_cache.get(mid_tone)

            var sufficient_chroma = maximum_chroma_for_mid_tone.is_greater_than_or_equal_to(this.chroma.subtract(epsilon))
            if (sufficient_chroma)
            {
                // Either range `[lower_tone, mid_tone]` or `[mid_tone, upper_tone]` has the answer, so search in the range that is closer the pivot tone.
                if (Math.abs(lower_tone.difference(pivot_tone)) < Math.abs(upper_tone.difference(pivot_tone)))
                {
                    upper_tone = mid_tone
                }
                else
                {
                    if (lower_tone === mid_tone)
                    {
                        return HctSpace.from(this.hue, this.chroma, lower_tone)
                    }
                    lower_tone = mid_tone
                }
            }
            else
            {
                // As there is an insufficient chroma in the `mid_tone`, follow the direction to the chroma peak.
                var is_ascending = maximum_chroma_for_mid_tone.is_less_than(maximum_chroma_cache.get(mid_tone.add(tone_step_size)))
                if (is_ascending)
                {
                    lower_tone = mid_tone.add(tone_step_size)
                }
                else
                {
                    // Keep `mid_tone` for potential chroma peak.
                    upper_tone = mid_tone
                }
            }
        }

        return HctSpace.from(this.hue, this.chroma, lower_tone)
    }

    static new_primary_content(hue, chroma)
    {
        return new TonalPalette(hue, chroma)
    }

    static new_primary_not_content(hue, chroma)
    {
        return new TonalPalette(hue, chroma.max(new HctSpaceChroma(48)))
    }

    static new_secondary_content(hue, chroma)
    {
        return new TonalPalette(hue, chroma.divide(3))
    }

    static new_secondary_not_content(hue, chroma)
    {
        return new TonalPalette(hue, new HctSpaceChroma(16))
    }

    static new_tertiary_content(hue, chroma)
    {
        return new TonalPalette(hue.add(60), chroma.divide(2))
    }

    static new_tertiary_not_content(hue, chroma)
    {
        return new TonalPalette(hue.add(60), new HctSpaceChroma(24))
    }

    static new_neutral_content(hue, chroma)
    {
        return new TonalPalette(hue, chroma.divide(12).min(new HctSpaceChroma(0.4)))
    }

    static new_neutral_not_content(hue, _chroma)
    {
        return new TonalPalette(hue, new HctSpaceChroma(4))
    }

    static new_neutral_variant_content(hue, chroma)
    {
        return new TonalPalette(hue, chroma.divide(12).min(new HctSpaceChroma(0.4)))
    }

    static new_neutral_variant_not_content(hue, _chroma)
    {
        return new TonalPalette(hue, new HctSpaceChroma(8))
    }

    static new_error()
    {
        return new TonalPalette(new HctSpaceHue(25), new HctSpaceChroma(84))
    }
}
