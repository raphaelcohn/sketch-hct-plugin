// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {HueChromaToneCoordinates} from "./HueChromaToneCoordinates";
import {Tone} from "./Tone";
import {Chroma} from "./Chroma";
import {Hue} from "./Hue";
import {Cam16} from "@material/material-color-utilities";
import {AlphaSRgbCoordinates} from "../srgb";
import {FiniteNumber} from "../../number";

class MaximumChromaCache
{
	cache: Map<NonNullable<Tone>, NonNullable<Chroma>> = new Map()
	
	constructor()
	{
	}
	
	cached(this: NonNullable<this>, hue: NonNullable<Hue>, tone: NonNullable<Tone>): NonNullable<Chroma>
	{
		let maximum_chroma = this.cache.get(tone)
		
		if (maximum_chroma === undefined)
		{
			var new_chroma = HueChromaToneCoordinates.from_hue_and_tone_with_maximum_chroma(hue, tone).chroma
			this.cache.set(tone, new_chroma);
			return new_chroma
		}
		
		return maximum_chroma
	}
}

export class TonalPalette
{
	#hue: NonNullable<Hue>
	#chroma: NonNullable<Chroma>
	
	static readonly #maximum_chroma_cache: NonNullable<MaximumChromaCache> = new MaximumChromaCache()
	
	public constructor(hue: NonNullable<Hue>, chroma: NonNullable<Chroma>)
	{
		this.#hue = hue
		this.#chroma = chroma
	}
	
	public static try_from(hue_degrees: number, chroma: number): NonNullable<TonalPalette>
	{
		return new TonalPalette(Hue.try_from(hue_degrees), Chroma.try_from(chroma))
	}
	
	public toString(this: NonNullable<this>): string
	{
		return `(${this.hue}, ${this.chroma})`
	}
	
	public get hue(): NonNullable<Hue>
	{
		return this.#hue
	}
	
	public get chroma(): NonNullable<Chroma>
	{
		return this.#chroma
	}
	
	public key_colour(this: NonNullable<this>): NonNullable<HueChromaToneCoordinates>
	{
		// Binary search to find the tone that can provide a chroma that is closest to the requested chroma.
		let lower_tone = Tone.InclusiveMinimum;
		let upper_tone = Tone.InclusiveMaximum;
		while (lower_tone < upper_tone)
		{
			// Epsilon to accept values slightly higher than the requested chroma.
			const epsilon = FiniteNumber.ZeroPointZeroOne
			const mid_tone = lower_tone.average(upper_tone)
			const maximum_chroma_for_mid_tone = this.#cached(mid_tone)
			const sufficient_chroma = maximum_chroma_for_mid_tone >= this.chroma.subtract(epsilon)
			
			if (sufficient_chroma)
			{
				// Pivot around 50% because this tone has, on average, the most chroma available.
				const pivot_tone = Tone.Mid
				
				// Either range `[lower_tone, mid_tone]` or `[mid_tone, upper_tone]` has the answer, so search in the range that is closer the pivot tone.
				if (lower_tone.absolute_difference(pivot_tone) < upper_tone.absolute_difference(pivot_tone))
				{
					upper_tone = mid_tone
				}
				else
				{
					if (lower_tone === mid_tone)
					{
						return this.#key_color_for_lower_tone(lower_tone)
					}
					lower_tone = mid_tone
				}
			}
			else
			{
				const tone_step_size: FiniteNumber = FiniteNumber.One
				
				// As there is an insufficient chroma in the `mid_tone`, follow the direction to the chroma peak.
				const is_ascending = maximum_chroma_for_mid_tone < this.#cached(mid_tone.add(tone_step_size))
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
		
		return this.#key_color_for_lower_tone(lower_tone)
	}
	
	round(this: NonNullable<this>): NonNullable<TonalPalette>
	{
		return new TonalPalette(this.hue.round(), this.chroma.round())
	}
	
	#key_color_for_lower_tone(this: NonNullable<this>, lower_tone: NonNullable<Tone>): NonNullable<HueChromaToneCoordinates>
	{
		return HueChromaToneCoordinates.from_with_maximum_chroma(this.hue, this.chroma, lower_tone)
	}
	
	#cached(this: NonNullable<this>, tone: NonNullable<Tone>): NonNullable<Chroma>
	{
		return TonalPalette.#maximum_chroma_cache.cached(this.hue, tone)
	}
	
	public static new_primary_content(hue: Hue, chroma: Chroma): NonNullable<TonalPalette>
	{
		return new TonalPalette(hue, chroma)
	}
	
	public static new_primary_not_content(hue: Hue, chroma: Chroma): NonNullable<TonalPalette>
	{
		return new TonalPalette(hue, chroma.max(Chroma.try_from(48)))
	}
	
	public static new_secondary_content(hue: Hue, chroma: Chroma): NonNullable<TonalPalette>
	{
		return new TonalPalette(hue, chroma.divide(FiniteNumber.Three))
	}
	
	public static new_secondary_not_content(hue: Hue): NonNullable<TonalPalette>
	{
		return new TonalPalette(hue, Chroma.try_from(16))
	}
	
	public static new_tertiary_content(hue: Hue, chroma: Chroma): NonNullable<TonalPalette>
	{
		return new TonalPalette(hue.rotate(FiniteNumber.Sixty), chroma.divide(FiniteNumber.Two))
	}
	
	public static new_tertiary_not_content(hue: Hue): NonNullable<TonalPalette>
	{
		return new TonalPalette(hue.rotate(FiniteNumber.Sixty), Chroma.try_from(24))
	}
	
	public static new_neutral_content(hue: Hue, chroma: Chroma): NonNullable<TonalPalette>
	{
		return new TonalPalette(hue, chroma.divide(FiniteNumber.Twelve).min(Chroma.try_from(0.4)))
	}
	
	public static new_neutral_not_content(hue: Hue): NonNullable<TonalPalette>
	{
		return new TonalPalette(hue, Chroma.try_from(4))
	}
	
	public static new_neutral_variant_content(hue: Hue, chroma: Chroma): NonNullable<TonalPalette>
	{
		return new TonalPalette(hue, chroma.divide(FiniteNumber.Twelve).min(Chroma.try_from(0.4)))
	}
	
	public static new_neutral_variant_not_content(hue: Hue): NonNullable<TonalPalette>
	{
		return new TonalPalette(hue, Chroma.try_from(8))
	}
	
	public static readonly Error: NonNullable<TonalPalette> = new TonalPalette(Hue.try_from(25), Chroma.try_from(84))
	
	static from_alpha_srgb_space(alpha_srgb_space: NonNullable<AlphaSRgbCoordinates>)
	{
		return TonalPalette.#from_cam16(alpha_srgb_space.into_cam16())
	}
	
	static #from_cam16(cam16: NonNullable<Cam16>)
	{
		return new TonalPalette(Hue.try_from(cam16.hue), Chroma.try_from(cam16.chroma))
	}
}
