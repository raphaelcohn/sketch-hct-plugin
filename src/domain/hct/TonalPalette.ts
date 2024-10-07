// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {LabSpaceLStar} from "../lab/LabSpaceLStar";
import {HctSpace} from "./HctSpace";
import {HctSpaceTone} from "./HctSpaceTone";
import {HctSpaceChroma} from "./HctSpaceChroma";
import {HctSpaceHue} from "./HctSpaceHue";
import {Cam16} from "@material/material-color-utilities";
import {AlphaSRgbSpace} from "../sRGB/AlphaSRgbSpace";

class MaximumChromaCache
{
	cache: Map<NonNullable<HctSpaceTone>, NonNullable<HctSpaceChroma>> = new Map()
	
	constructor()
	{
	}
	
	cached(this: NonNullable<this>, hue: NonNullable<HctSpaceHue>, tone: NonNullable<HctSpaceTone>)
	{
		let maximum_chroma = this.cache.get(tone)
		
		if (maximum_chroma === undefined)
		{
			var new_chroma = HctSpace.from_hue_and_tone_with_maximum_chroma(hue, tone).chroma
			this.cache.set(tone, new_chroma);
			maximum_chroma = new_chroma
		}
		
		return maximum_chroma
	}
}

export class TonalPalette
{
	#hue: NonNullable<HctSpaceHue>;
	#chroma: NonNullable<HctSpaceChroma>;
	
	static readonly #maximum_chroma_cache: NonNullable<MaximumChromaCache> = new MaximumChromaCache()
	
	constructor(hue: NonNullable<HctSpaceHue>, chroma: NonNullable<HctSpaceChroma>)
	{
		this.#hue = hue
		this.#chroma = chroma
	}
	
	public toString(this: NonNullable<this>): NonNullable<string>
	{
		return `(${this.hue}, ${this.chroma})`
	}
	
	public get hue(): NonNullable<HctSpaceHue>
	{
		return this.#hue
	}
	
	public get chroma(): NonNullable<HctSpaceChroma>
	{
		return this.#chroma
	}
	
	public get key_colour(): NonNullable<HctSpace>
	{
		// Pivot around 50% because this tone has, on average, the most chroma available.
		const pivot_tone: HctSpaceTone = new HctSpaceTone(new LabSpaceLStar(50))
		
		const tone_step_size: NonNullable<number> = 1
		
		// Epsilon to accept values slightly higher than the requested chroma.
		const epsilon: NonNullable<number> = 0.01
		
		// Binary search to find the tone that can provide a chroma that is closest to the requested chroma.
		let lower_tone = HctSpaceTone.InclusiveMinimum;
		let upper_tone = HctSpaceTone.InclusiveMaximum;
		while (lower_tone.is_less_than(upper_tone))
		{
			const mid_tone = lower_tone.average(upper_tone)
			const maximum_chroma_for_mid_tone = TonalPalette.#maximum_chroma_cache.cached(this.hue, mid_tone)
			
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
						return HctSpace.from_with_maximum_chroma(this.hue, this.chroma, lower_tone)
					}
					lower_tone = mid_tone
				}
			}
			else
			{
				// As there is an insufficient chroma in the `mid_tone`, follow the direction to the chroma peak.
				var is_ascending = maximum_chroma_for_mid_tone.is_less_than(TonalPalette.#maximum_chroma_cache.cached(this.hue, mid_tone.add(tone_step_size)))
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
		
		return HctSpace.from_with_maximum_chroma(this.hue, this.chroma, lower_tone)
	}
	
	public static new_primary_content(hue: HctSpaceHue, chroma: HctSpaceChroma): NonNullable<TonalPalette>
	{
		return new TonalPalette(hue, chroma)
	}
	
	public static new_primary_not_content(hue: HctSpaceHue, chroma: HctSpaceChroma): NonNullable<TonalPalette>
	{
		return new TonalPalette(hue, chroma.max(new HctSpaceChroma(48)))
	}
	
	public static new_secondary_content(hue: HctSpaceHue, chroma: HctSpaceChroma): NonNullable<TonalPalette>
	{
		return new TonalPalette(hue, chroma.divide(3))
	}
	
	public static new_secondary_not_content(hue: HctSpaceHue): NonNullable<TonalPalette>
	{
		return new TonalPalette(hue, new HctSpaceChroma(16))
	}
	
	public static new_tertiary_content(hue: HctSpaceHue, chroma: HctSpaceChroma): NonNullable<TonalPalette>
	{
		return new TonalPalette(hue.add(60), chroma.divide(2))
	}
	
	public static new_tertiary_not_content(hue: HctSpaceHue): NonNullable<TonalPalette>
	{
		return new TonalPalette(hue.add(60), new HctSpaceChroma(24))
	}
	
	public static new_neutral_content(hue: HctSpaceHue, chroma: HctSpaceChroma): NonNullable<TonalPalette>
	{
		return new TonalPalette(hue, chroma.divide(12).min(new HctSpaceChroma(0.4)))
	}
	
	public static new_neutral_not_content(hue: HctSpaceHue): NonNullable<TonalPalette>
	{
		return new TonalPalette(hue, new HctSpaceChroma(4))
	}
	
	public static new_neutral_variant_content(hue: HctSpaceHue, chroma: HctSpaceChroma): NonNullable<TonalPalette>
	{
		return new TonalPalette(hue, chroma.divide(12).min(new HctSpaceChroma(0.4)))
	}
	
	public static new_neutral_variant_not_content(hue: HctSpaceHue): NonNullable<TonalPalette>
	{
		return new TonalPalette(hue, new HctSpaceChroma(8))
	}
	
	public static readonly Error: NonNullable<TonalPalette> = new TonalPalette(new HctSpaceHue(25), new HctSpaceChroma(84))
	
	static from_alpha_srgb_space(alpha_srgb_space: NonNullable<AlphaSRgbSpace>)
	{
		return TonalPalette.#from_cam16(alpha_srgb_space.into_cam16())
	}
	
	static #from_cam16(cam16: NonNullable<Cam16>)
	{
		return new TonalPalette(new HctSpaceHue(cam16.hue), new HctSpaceChroma(cam16.chroma))
	}
}
