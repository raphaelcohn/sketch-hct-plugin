// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {HueChromaToneCoordinates} from "./HueChromaToneCoordinates";
import {Tone} from "./Tone";
import {Chroma} from "./Chroma";
import {Hue} from "./Hue";
import {Cam16} from "@material/material-color-utilities";
import {AlphaSRgbCoordinates} from "../srgb";
import {FiniteNumber, Sign} from "../../number";
import {TonalPalettePair} from "./TonalPalettePair";

export class TonalPalette
{
	readonly #hue: NonNullable<Hue>
	readonly #chroma: NonNullable<Chroma>
	readonly #hue_chroma_tone_cache: NonNullable<HueChromaToneCalculatedFromToneCache>
	readonly #maximum_chroma_cache: NonNullable<MaximumChromaCalculatedFromChromaCache>
	
	public constructor(hue: NonNullable<Hue>, chroma: NonNullable<Chroma>)
	{
		this.#hue = hue
		this.#chroma = chroma
		this.#hue_chroma_tone_cache = new HueChromaToneCalculatedFromToneCache()
		this.#maximum_chroma_cache = new MaximumChromaCalculatedFromChromaCache()
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
	
	public with_tone(this: NonNullable<this>, tone: NonNullable<Tone>): NonNullable<HueChromaToneCoordinates>
	{
		return this.#hue_chroma_tone_cache.cached(this, tone)
	}
	
	/**
	 * Binary search to find the tone that can provide a chroma that is closest to the requested chroma.
 	 */
	public key_colour(this: NonNullable<this>): NonNullable<HueChromaToneCoordinates>
	{
		let lower_tone = Tone.InclusiveMinimum;
		let upper_tone = Tone.InclusiveMaximum;
		while (lower_tone < upper_tone)
		{
			// Epsilon to accept values slightly higher than the requested chroma.
			const epsilon = FiniteNumber.ZeroPointZeroOne
			const mid_tone = lower_tone.average(upper_tone)
			const maximum_chroma_for_mid_tone = this.#maximum_chroma(mid_tone)
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
				const is_ascending = maximum_chroma_for_mid_tone < this.#maximum_chroma(mid_tone.add(tone_step_size))
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
	
	/**
	 * @internal
	 */
	find_tone_that_gives_desired_chroma(this: NonNullable<this>, tone: NonNullable<Tone>, by_decreasing_tone: boolean)
	{
		const AbsoluteDifference = FiniteNumber.ZeroPointFour
		
		const hue = this.hue
		const chroma = this.chroma
		
		const tone_increment = by_decreasing_tone ? FiniteNumber.NegativeOne : FiniteNumber.One
		
		let closest_to_chroma = HueChromaToneCoordinates.from_with_maximum_chroma(hue, chroma, tone)
		let chroma_peak = closest_to_chroma.chroma
		let desired_tone = tone
		while (closest_to_chroma.chroma < chroma)
		{
			desired_tone = desired_tone.add(tone_increment)
			
			const potential_solution = HueChromaToneCoordinates.from_with_maximum_chroma(hue, chroma, desired_tone)
			const potential_solution_chroma = potential_solution.chroma
			
			if (chroma_peak > potential_solution_chroma)
			{
				break
			}
			
			const potential_delta = potential_solution_chroma.absolute_difference(chroma)
			if (potential_delta < AbsoluteDifference)
			{
				break
			}
			
			const current_delta = closest_to_chroma.chroma.absolute_difference(chroma)
			if (potential_delta < current_delta)
			{
				closest_to_chroma = potential_solution
			}
			
			chroma_peak = chroma_peak.max(potential_solution_chroma)
		}
		
		return desired_tone
	}
	
	/**
	 * @internal
	 */
	round(this: NonNullable<this>): NonNullable<TonalPalette>
	{
		return new TonalPalette(this.hue.round(), this.chroma.round())
	}
	
	#key_color_for_lower_tone(this: NonNullable<this>, lower_tone: NonNullable<Tone>): NonNullable<HueChromaToneCoordinates>
	{
		return HueChromaToneCoordinates.from_with_maximum_chroma(this.hue, this.chroma, lower_tone)
	}
	
	#maximum_chroma(this: NonNullable<this>, tone: NonNullable<Tone>): NonNullable<Chroma>
	{
		return this.#maximum_chroma_cache.cached(this.hue, tone)
	}
	
	public primary(this: NonNullable<this>): NonNullable<TonalPalettePair>
	{
		return this.colourful_color_tones()
	}
	
	public secondary(this: NonNullable<this>): NonNullable<TonalPalettePair>
	{
		const hue = this.hue
		return new TonalPalettePair(new TonalPalette(hue, this.chroma.divide(FiniteNumber.Three)), new TonalPalette(hue, Chroma.try_from(16)))
	}
	
	public tertiary(this: NonNullable<this>): NonNullable<TonalPalettePair>
	{
		const hue = this.hue.rotate(FiniteNumber.Sixty)
		return new TonalPalettePair(new TonalPalette(hue, this.chroma.divide(FiniteNumber.Two)), new TonalPalette(hue, Chroma.try_from(24)))
	}
	
	public neutral(this: NonNullable<this>): NonNullable<TonalPalettePair>
	{
		return this.neutral_color_tones()
	}
	
	public neutral_variant(this: NonNullable<this>): NonNullable<TonalPalettePair>
	{
		return this.variant_neutral_color_tones()
	}
	
	public neutral_color_tones(this: NonNullable<this>): NonNullable<TonalPalettePair>
	{
		const hue = this.hue
		return new TonalPalettePair(new TonalPalette(hue, this.chroma.divide(FiniteNumber.Twelve).min(Chroma.try_from(0.4))), new TonalPalette(hue, Chroma.try_from(4)))
	}
	
	public variant_neutral_color_tones(this: NonNullable<this>): NonNullable<TonalPalettePair>
	{
		const hue = this.hue
		return new TonalPalettePair(new TonalPalette(hue, this.chroma.divide(FiniteNumber.Twelve).min(Chroma.try_from(0.4))), new TonalPalette(hue, Chroma.try_from(8)))
	}
	
	public colourful_color_tones(this: NonNullable<this>): NonNullable<TonalPalettePair>
	{
		return new TonalPalettePair(this, new TonalPalette(this.hue, this.chroma.max(Chroma.try_from(48))))
	}
	
	public static readonly Error: NonNullable<TonalPalette> = new TonalPalette(Hue.try_from(25), Chroma.try_from(84))
	
	/**
	 * @internal
	 */
	static from_alpha_srgb_space(alpha_srgb_space: NonNullable<AlphaSRgbCoordinates>)
	{
		return TonalPalette.#from_cam16(alpha_srgb_space.into_cam16())
	}
	
	static #from_cam16(cam16: NonNullable<Cam16>)
	{
		return new TonalPalette(Hue.try_from(cam16.hue), Chroma.try_from(cam16.chroma))
	}
}

abstract class AbstractCalculatedFromToneCache<From, To>
{
	readonly #cache: Map<NonNullable<Tone>, NonNullable<To>>
	
	protected constructor()
	{
		this.#cache = new Map<NonNullable<Tone>, NonNullable<To>>()
	}
	
	public cached(this: NonNullable<this>, from: NonNullable<From>, tone: NonNullable<Tone>)
	{
		let cached_value = this.#cache.get(tone)
		
		if (cached_value === undefined)
		{
			cached_value = this.calculate(from, tone)
			this.#cache.set(tone, cached_value)
		}
		
		return cached_value
	}
	
	protected abstract calculate(this: NonNullable<this>, from: NonNullable<From>, tone: NonNullable<Tone>): NonNullable<To>
}

class HueChromaToneCalculatedFromToneCache extends AbstractCalculatedFromToneCache<TonalPalette, HueChromaToneCoordinates>
{
	public constructor()
	{
		super();
	}
	
	protected calculate(this: NonNullable<this>, from: NonNullable<TonalPalette>, tone: NonNullable<Tone>): NonNullable<HueChromaToneCoordinates>
	{
		return HueChromaToneCoordinates.from_with_maximum_chroma(from.hue, from.chroma, tone)
	}
}

class MaximumChromaCalculatedFromChromaCache extends AbstractCalculatedFromToneCache<Hue, Chroma>
{
	public constructor()
	{
		super();
	}
	
	protected calculate(this: NonNullable<this>, from: NonNullable<Hue>, tone: NonNullable<Tone>): NonNullable<Chroma>
	{
		return HueChromaToneCoordinates.from_hue_and_tone_with_maximum_chroma(from, tone).chroma
	}
}
