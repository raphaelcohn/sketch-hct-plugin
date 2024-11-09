// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {HctSolver} from "@material/material-color-utilities"
import type {argb} from "../srgb/argb.mts"
import {TonalPalette} from "./TonalPalette.mjs"
import {Hue} from "./Hue.mjs"
import {Tone} from "./Tone.mjs"
import {Chroma} from "./Chroma.mjs"
import {AlphaSRgbCoordinates} from "../srgb/AlphaSRgbCoordinates.mjs";
import {Hct, TemperatureCache} from "@material/material-color-utilities";

export class HueChromaToneCoordinates
{
	readonly #hue_and_chroma: NonNullable<TonalPalette>
	readonly #tone: NonNullable<Tone>
	
	public constructor(hue_and_chroma: NonNullable<TonalPalette>, tone: NonNullable<Tone>)
	{
		this.#hue_and_chroma = hue_and_chroma
		this.#tone = tone
	}
	
	public static try_from(hue_degrees: number, chroma: number, tone_percentage: number): NonNullable<HueChromaToneCoordinates>
	{
		return new HueChromaToneCoordinates(TonalPalette.try_from(hue_degrees, chroma), Tone.try_from(tone_percentage))
	}
	
	/**
	 * @internal
	 */
	static from_hue_and_tone_with_maximum_chroma(hue: NonNullable<Hue>, tone: NonNullable<Tone>): NonNullable<HueChromaToneCoordinates>
	{
		return HueChromaToneCoordinates.from_with_maximum_chroma(hue, Chroma.PreferredInclusiveMaximum, tone)
	}
	
	/**
	 * @internal
	 */
	static from_with_maximum_chroma(hue: NonNullable<Hue>, chroma: NonNullable<Chroma>, tone: NonNullable<Tone>): NonNullable<HueChromaToneCoordinates>
	{
		const argb = HctSolver.solveToInt(hue.valueOf(), chroma.valueOf(), tone.to_cielab_lstar().valueOf()) as argb
		return AlphaSRgbCoordinates.from_argb(argb).into_hue_chroma_tone_coordinates()
	}
	
	public static from_alpha_srgb_space(alpha_srgb_space: NonNullable<AlphaSRgbCoordinates>): NonNullable<HueChromaToneCoordinates>
	{
		return new HueChromaToneCoordinates(alpha_srgb_space.into_tonal_palette(), alpha_srgb_space.into_tone())
	}
	
	static #from_hct(hct: NonNullable<Hct>): NonNullable<HueChromaToneCoordinates>
	{
		return HueChromaToneCoordinates.try_from(hct.hue, hct.chroma, hct.tone)
	}
	
	public toString(this: NonNullable<this>): string
	{
		return `(${this.hue.toString()}, ${this.chroma.toString()}, ${this.tone.toString()})`
	}
	
	public get tonal_palette(): NonNullable<TonalPalette>
	{
		return this.#hue_and_chroma
	}
	
	public get hue(): Hue
	{
		return this.#hue_and_chroma.hue
	}
	
	public get chroma(): Chroma
	{
		return this.#hue_and_chroma.chroma
	}
	
	public get tone(): Tone
	{
		return this.#tone
	}
	
	// Color science studies of color preference indicate universal distaste for dark yellow-greens, and also show this is correlated to distate for biological waste and rotting food.
	// See:–
	// * Palmer and Schloss, 2010
	// * Handbook of Color Psychology (2015), Chapter 21, Schloss and Palmer
	public is_disliked(this: NonNullable<this>): boolean
	{
		const rounded = this.round()
		
		const hue_disliked = rounded.hue >= Hue.try_from(90) && rounded.hue <= Hue.try_from(111)
		const chroma_disliked = rounded.chroma > Chroma.try_from(16)
		const tone_disliked = rounded.tone < Tone.try_from(65)
		
		return hue_disliked && chroma_disliked && tone_disliked
	}
	
	public if_disliked_corrected(this: NonNullable<this>): NonNullable<HueChromaToneCoordinates>
	{
		if (this.is_disliked())
		{
			return new HueChromaToneCoordinates(this.#hue_and_chroma, Tone.try_from(70))
		}
		else
		{
			return this
		}
	}
	
	public complement_by_temperature(this: NonNullable<this>): NonNullable<HueChromaToneCoordinates>
	{
		const result = this.#temperature_cache().complement
		return HueChromaToneCoordinates.#from_hct(result)
	}
	
	public analogous_by_temperature_last(this: NonNullable<this>, non_zero_integer_count: number, non_zero_number_of_divisions_of_the_colour_wheel: number): NonNullable<HueChromaToneCoordinates>
	{
		if (!Number.isInteger(non_zero_integer_count) || non_zero_integer_count < 1)
		{
			throw new RangeError(`non_zero_integer_count is not a positive integer (${non_zero_integer_count.toString(10)}`)
		}
		if (!Number.isInteger(non_zero_number_of_divisions_of_the_colour_wheel) || non_zero_number_of_divisions_of_the_colour_wheel < 1)
		{
			throw new RangeError(`non_zero_number_of_divisions_of_the_colour_wheel is not a positive integer (${non_zero_number_of_divisions_of_the_colour_wheel.toString(10)}`)
		}
		const result = this.#temperature_cache().analogous(non_zero_integer_count, non_zero_number_of_divisions_of_the_colour_wheel)
		
		const last = result[non_zero_integer_count - 1]
		return HueChromaToneCoordinates.#from_hct(last as Hct)
	}
	
	#temperature_cache(this: NonNullable<this>): NonNullable<TemperatureCache>
	{
		const input = this.into_hct()
		return new TemperatureCache(input)
	}
	
	/**
	 * @internal
	 */
	into_hct(this: NonNullable<this>): NonNullable<Hct>
	{
		return Hct.from(this.hue.valueOf(), this.chroma.valueOf(), this.tone.valueOf())
	}
	
	/**
	 * @internal
	 */
	into_alpha_srgb_space_coordinate(this: NonNullable<this>): NonNullable<AlphaSRgbCoordinates>
	{
		const argb = this.into_hct().toInt()
		return AlphaSRgbCoordinates.from_argb(argb)
	}
	
	/**
	 * @internal
	 */
	round(this: NonNullable<this>): NonNullable<HueChromaToneCoordinates>
	{
		return new HueChromaToneCoordinates(this.#hue_and_chroma.round(), this.#tone.round())
	}
}
