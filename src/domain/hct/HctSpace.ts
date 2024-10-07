// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import { TonalPalette } from "./TonalPalette"
import { HctSpaceHue } from "./HctSpaceHue"
import { HctSpaceTone } from "./HctSpaceTone"
import {HctSpaceChroma} from "./HctSpaceChroma"
import { LabSpaceLStar } from "../lab/LabSpaceLStar"
import {HctSolver} from "@material/material-color-utilities/hct/hct_solver"
import {AlphaSRgbSpace} from "../sRGB/AlphaSRgbSpace";

export class HctSpace
{
	readonly #hue_and_chroma: NonNullable<TonalPalette>
	readonly #tone: NonNullable<HctSpaceTone>
	
	constructor(hue_and_chroma: NonNullable<TonalPalette>, tone: NonNullable<HctSpaceTone>)
	{
		this.#hue_and_chroma = hue_and_chroma
		this.#tone = tone
	}
	
	static from_hue_and_tone_with_maximum_chroma(hue: NonNullable<HctSpaceHue>, tone: NonNullable<HctSpaceTone>): NonNullable<HctSpace>
	{
		return HctSpace.from_with_maximum_chroma(hue, HctSpaceChroma.PreferredInclusiveMaximum, tone)
	}
	
	static from_with_maximum_chroma(hue: NonNullable<HctSpaceHue>, chroma: NonNullable<HctSpaceChroma>, tone: NonNullable<HctSpaceTone>): NonNullable<HctSpace>
	{
		const argb = HctSolver.solveToInt(hue.value, chroma.value, tone.to_LabSpaceLStar().value)
		return AlphaSRgbSpace.from_argb(argb).into_hct_space()
	}
	
	public static from_alpha_srgb_space(alpha_srgb_space: NonNullable<AlphaSRgbSpace>): NonNullable<HctSpace>
	{
		return new HctSpace(alpha_srgb_space.into_tonal_palette(), alpha_srgb_space.into_tone())
	}
	
	public toString(this: NonNullable<this>): NonNullable<string>
	{
		return `(${this.hue}, ${this.chroma}, ${this.tone})`
	}
	
	public get hue(): HctSpaceHue
	{
		return this.#hue_and_chroma.hue
	}
	
	public get chroma(): HctSpaceChroma
	{
		return this.#hue_and_chroma.chroma
	}
	
	public get tone(): HctSpaceTone
	{
		return this.#tone
	}
	
	// Color science studies of color preference indicate universal distaste for dark yellow-greens, and also show this is correlated to distate for biological waste and rotting food.
	// See:–
	// * Palmer and Schloss, 2010
	// * Handbook of Color Psychology (2015), Chapter 21, Schloss and Palmer
	public is_disliked(this: NonNullable<this>): boolean
	{
		const rounded_hue = this.hue.rounded()
		
		const hue_liked = rounded_hue >= 90.0 && rounded_hue <= 111.0;
		const chroma_liked = this.chroma.rounded() > 16.0;
		const tone_liked = this.tone.value.rounded() < 65.0;
		
		return hue_liked && chroma_liked && tone_liked
	}
	
	public if_disliked_corrected(this: NonNullable<this>): NonNullable<HctSpace>
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
