// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {ContrastLevel} from "./ContrastLevel.mjs";
import {Tone} from "../color_space/hct/Tone.mjs";

export class ContrastLevelToTone
{
	readonly #map: Map<ContrastLevel, Tone>
	
	private constructor(low: Tone, normal: Tone, medium: Tone, high: Tone)
	{
		this.#map = new Map<ContrastLevel, Tone>()
		this.#map.set(ContrastLevel.Low, low)
		this.#map.set(ContrastLevel.Normal, normal)
		this.#map.set(ContrastLevel.Medium, medium)
		this.#map.set(ContrastLevel.High, high)
	}
	
	public static flat(only_tone: Tone): NonNullable<ContrastLevelToTone>
	{
		return new ContrastLevelToTone(only_tone, only_tone, only_tone, only_tone)
	}
	
	public static try_from(low: Tone, normal: Tone, medium: Tone, high: Tone): NonNullable<ContrastLevelToTone>
	{
		if ((low <= normal) && (normal <= medium) && (medium <= high))
		{
			return new ContrastLevelToTone(low, normal, medium, high)
		}
		if ((high <= medium) && (medium <= normal) && (normal <= high))
		{
			return new ContrastLevelToTone(low, normal, medium, high)
		}
		throw new RangeError("tones must ascend or descend consistently or remain level")
	}
	
	/**
	 * @internal
	 */
	contrast_ratio_for_level(this: NonNullable<this>, contrast_level: NonNullable<ContrastLevel>): NonNullable<Tone>
	{
		const value = this.#map.get(contrast_level)
		if (value === undefined)
		{
			throw new Error("Unknown contrast level")
		}
		return value
	}
}
