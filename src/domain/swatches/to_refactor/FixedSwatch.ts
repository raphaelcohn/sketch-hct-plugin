// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {AbstractWithBackgroundsSwatch} from "./AbstractWithBackgroundsSwatch";
import {TonePair} from "../tone_pair";
import {ContrastLevelToContrastRatio} from "../../contrast";
import {ThemePair} from "../ThemePair";
import {Backgrounds} from "../Backgrounds";
import {PrimarySecondaryTertiaryPalette} from "./PrimarySecondaryTertiaryPalette";
import {PaletteChoice} from "../PaletteChoice";

export class FixedSwatch extends AbstractWithBackgroundsSwatch
{
	public static readonly PrimaryFixed:      NonNullable<FixedSwatch> = FixedSwatch.#normal(PaletteChoice.Primary,   )
	public static readonly PrimaryFixedDim:   NonNullable<FixedSwatch> = FixedSwatch.#dim   (PaletteChoice.Primary,   )
	public static readonly SecondaryFixed:    NonNullable<FixedSwatch> = FixedSwatch.#normal(PaletteChoice.Secondary, )
	public static readonly SecondaryFixedDim: NonNullable<FixedSwatch> = FixedSwatch.#dim   (PaletteChoice.Secondary, )
	public static readonly TertiaryFixed:     NonNullable<FixedSwatch> = FixedSwatch.#normal(PaletteChoice.Tertiary,  )
	public static readonly TertiaryFixedDim:  NonNullable<FixedSwatch> = FixedSwatch.#dim   (PaletteChoice.Tertiary,  )
	
	private constructor(palette: PrimarySecondaryTertiaryPalette, contrast_level_to_contrast_ratio: NonNullable<ContrastLevelToContrastRatio>, primary_background: NonNullable<ThemePair<Backgrounds>>)
	{
		super(palette, true, contrast_level_to_contrast_ratio, primary_background)
	}
	
	public get tone_pair(): NonNullable<TonePair>
	{
	
	}
}
