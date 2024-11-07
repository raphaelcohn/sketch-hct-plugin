// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {ContrastRatio} from "./ContrastRatio.mjs";
import {ContrastLevel} from "./ContrastLevel.mjs";

export class ContrastLevelToContrastRatio
{
	readonly #map: Map<ContrastLevel, ContrastRatio>
	
	public static readonly Mapping_1_1_3_45  : ContrastLevelToContrastRatio = new ContrastLevelToContrastRatio(ContrastRatio.One,           ContrastRatio.One,           ContrastRatio.Three,         ContrastRatio.FourPointFive)
	public static readonly Mapping_15_3_45_7 : ContrastLevelToContrastRatio = new ContrastLevelToContrastRatio(ContrastRatio.OnePointFive,  ContrastRatio.Three,         ContrastRatio.FourPointFive, ContrastRatio.Seven        )
	public static readonly Mapping_3_3_45_7  : ContrastLevelToContrastRatio = new ContrastLevelToContrastRatio(ContrastRatio.Three,         ContrastRatio.Three,         ContrastRatio.Three,         ContrastRatio.FourPointFive)
	public static readonly Mapping_3_45_7_7  : ContrastLevelToContrastRatio = new ContrastLevelToContrastRatio(ContrastRatio.Three,         ContrastRatio.FourPointFive, ContrastRatio.Seven,         ContrastRatio.Seven        )
	public static readonly Mapping_3_45_7_11 : ContrastLevelToContrastRatio = new ContrastLevelToContrastRatio(ContrastRatio.Three,         ContrastRatio.FourPointFive, ContrastRatio.Seven,         ContrastRatio.Eleven       )
	public static readonly Mapping_45_7_11_21: ContrastLevelToContrastRatio = new ContrastLevelToContrastRatio(ContrastRatio.FourPointFive, ContrastRatio.Seven,         ContrastRatio.Eleven,        ContrastRatio.TwentyOne    )
	
	private constructor(low: ContrastRatio, normal: ContrastRatio, medium: ContrastRatio, high: ContrastRatio)
	{
		this.#map = new Map<ContrastLevel, ContrastRatio>()
		this.#map.set(ContrastLevel.Low, low)
		this.#map.set(ContrastLevel.Normal, normal)
		this.#map.set(ContrastLevel.Medium, medium)
		this.#map.set(ContrastLevel.High, high)
	}
	
	/**
	 * @internal
	 */
	contrast_ratio_for_contrast_level(this: NonNullable<this>, contrast_level: NonNullable<ContrastLevel>): NonNullable<ContrastRatio>
	{
		const value = this.#map.get(contrast_level)
		if (value === undefined)
		{
			throw new Error("Unknown contrast level")
		}
		return value
	}
}
