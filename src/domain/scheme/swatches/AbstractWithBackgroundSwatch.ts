// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {AbstractSwatch} from "./AbstractSwatch";
import {ContrastLevel, ContrastLevelToContrastRatio, ContrastRatio} from "../../contrast";
import {PaletteChoice} from "../palettes/PaletteChoice";
import {ThemeMode} from "../ThemeMode";
import {ThemePair} from "../ThemePair";
import {WithBackgroundSwatch} from "./WithBackgroundSwatch";
import {Swatch} from "./Swatch";

/**
 * @internal
 */
export abstract class AbstractWithBackgroundSwatch<BackgroundSwatch extends Swatch> extends AbstractSwatch implements WithBackgroundSwatch
{
	readonly #contrast_level_to_contrast_ratio: NonNullable<ContrastLevelToContrastRatio>
	readonly #primary_background: NonNullable<ThemePair<BackgroundSwatch>>
	
	protected constructor(palette: PaletteChoice, is_background: boolean, contrast_level_to_contrast_ratio: NonNullable<ContrastLevelToContrastRatio>, primary_background: NonNullable<ThemePair<BackgroundSwatch>>)
	{
		super(palette, is_background)
		this.#contrast_level_to_contrast_ratio = contrast_level_to_contrast_ratio
		this.#primary_background = primary_background
	}
	
	public contrast_ratio_for_contrast_level(contrast_level: ContrastLevel): ContrastRatio
	{
		return this.#contrast_level_to_contrast_ratio.contrast_ratio_for_contrast_level(contrast_level)
	}
	
	public primary_background(this: NonNullable<this>, theme_mode: ThemeMode): NonNullable<BackgroundSwatch>
	{
		return this.#primary_background.choose(theme_mode)
	}
}
