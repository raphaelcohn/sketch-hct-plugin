// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {HueChromaToneCoordinates} from "./HueChromaToneCoordinates";
import {Tone} from "./Tone";
import {Chroma} from "./Chroma";
import {Hue} from "./Hue";
import {Cam16} from "@material/material-color-utilities";
import {AlphaSRgbCoordinates, SRgbCoordinates} from "../srgb";
import {FiniteNumber} from "../../number";
import {TonalPalette as MaterialDesignTonalPalette} from "@material/material-color-utilities";

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
	
	public static try_from_material_design_tonal_palette(material_design_tonal_palette: MaterialDesignTonalPalette): NonNullable<TonalPalette>
	{
		return TonalPalette.try_from(material_design_tonal_palette.hue, material_design_tonal_palette.chroma)
	}
	
	public into_material_design_tonal_palette(this: NonNullable<this>): NonNullable<MaterialDesignTonalPalette>
	{
		return MaterialDesignTonalPalette.fromHueAndChroma(this.hue.valueOf(), this.chroma.valueOf())
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
	
	public with_tone_in_alpha_srgb_space(this: NonNullable<this>, tone: NonNullable<Tone>): NonNullable<AlphaSRgbCoordinates>
	{
		return this.with_tone(tone).into_alpha_srgb_space_coordinate()
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
	
	/**
	 * Assumes `this` is a source color.
	 * @param is_content
	 */
	public container(this: NonNullable<this>, is_content: boolean): NonNullable<TonalPalette>
	{
		return this.primary(is_content)
	}
	
	/**
	 * Assumes `this` is a source color.
	 * @param is_content
	 */
	public primary(this: NonNullable<this>, is_content: boolean): NonNullable<TonalPalette>
	{
		if (is_content)
		{
			return this
		}
		else
		{
			return new TonalPalette(this.hue, this.chroma.max(Chroma.try_from(48)))
		}
	}
	
	/**
	 * Assumes `this` is a source color.
	 * @param is_content
	 */
	public secondary(this: NonNullable<this>, is_content: boolean): NonNullable<TonalPalette>
	{
		const hue = this.hue
		if (is_content)
		{
			return new TonalPalette(hue, this.chroma.divide(FiniteNumber.Three))
		}
		else
		{
			return new TonalPalette(hue, Chroma.try_from(16))
		}
	}
	
	/**
	 * Assumes `this` is a source color.
	 * @param is_content
	 */
	public tertiary(this: NonNullable<this>, is_content: boolean): NonNullable<TonalPalette>
	{
		const hue = this.hue.rotate(FiniteNumber.Sixty)
		if (is_content)
		{
			return new TonalPalette(hue, this.chroma.divide(FiniteNumber.Two))
		}
		else
		{
			return new TonalPalette(hue, Chroma.try_from(24))
		}
	}
	
	/**
	 * Assumes `this` is a source color.
	 * @param is_content
	 */
	public neutral(this: NonNullable<this>, is_content: boolean): NonNullable<TonalPalette>
	{
		const hue = this.hue
		if (is_content)
		{
			return new TonalPalette(hue, this.chroma.divide(FiniteNumber.Twelve).min(Chroma.try_from(0.4)))
		}
		else
		{
			return new TonalPalette(hue, Chroma.try_from(4))
		}
	}
	
	/**
	 * Assumes `this` is a source color.
	 * @param is_content
	 */
	public neutral_variant(this: NonNullable<this>, is_content: boolean): NonNullable<TonalPalette>
	{
		const hue = this.hue
		if (is_content)
		{
			return new TonalPalette(hue, this.chroma.divide(FiniteNumber.Twelve).min(Chroma.try_from(0.4)))
		}
		else
		{
			return new TonalPalette(hue, Chroma.try_from(8))
		}
	}
	
	public static readonly Error: NonNullable<TonalPalette> = new TonalPalette(Hue.try_from(25), Chroma.try_from(84))
	
	/**
	 * @internal
	 */
	static from_srgb_space(srgb_space: NonNullable<SRgbCoordinates>)
	{
		return TonalPalette.from_alpha_srgb_space(srgb_space.into_opaque())
	}
	
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
