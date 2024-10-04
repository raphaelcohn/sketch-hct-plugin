// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import { TonalPalete } from "./TonalPalette"
import { HctSpaceHue } from "./HctSpaceHue"
import { HctSpaceTone } from "./HctSpaceTone";
import {HctSpaceChroma} from "./HctSpaceChroma";

export class HctSpace
{
    #hue_and_chroma = new TonalPalete(new HctSpaceHue(0), new HctSpaceChroma(0))
    #tone = new HctSpaceTone(0);

    constructor(hue_and_chroma, tone)
    {
        guard_instance(hue_and_chroma, TonalPalete, 'hue_and_chroma')
        guard_instance(tone, HctSpaceTone, 'tone')

        this.#hue_and_chroma = hue_and_chroma
        this.#tone = tone
    }

    toString()
    {
        return `(${this.hue}, ${this.chroma}, ${this.tone})`
    }

    static from(hue, chroma, tone)
    {
        /*
            int argb = HctSolver.solveToInt(hue, chroma, tone);
            return new Hct(argb);
         */
        throw new Error("Requires implementation of HCT SOLVER; needed to be able to compute Hex values of colours")
    }

    get hue()
    {
        return this.#hue_and_chroma.hue
    }

    get chroma()
    {
        return this.#hue_and_chroma.chroma
    }

    get tone()
    {
        return this.#tone
    }

    // Color science studies of color preference indicate universal distaste for dark yellow-greens, and also show this is correlated to distate for biological waste and rotting food.
    // See:–
    // * Palmer and Schloss, 2010
    // * Handbook of Color Psychology (2015), Chapter 21, Schloss and Palmer
    is_disliked()
    {
        const rounded_hue = Math.round(hct.hue.value)

        const hue_liked = rounded_hue >= 90.0 && rounded_hue <= 111.0;
        const chroma_liked = Math.round(hct.chroma.value) > 16.0;
        const tone_liked = Math.round(hct.tone.value) < 65.0;

        return hue_liked && chroma_liked && tone_liked;
    }

    if_disliked_corrected()
    {
        if (this.is_disliked())
        {
            return new HctSpace(this.#hue_and_chroma, new HctSpaceTone(new LabSpaceLStar(70.0)))
        }
        else
        {
            return this
        }
    }
}
