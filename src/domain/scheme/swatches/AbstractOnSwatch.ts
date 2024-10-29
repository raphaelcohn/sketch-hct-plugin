// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {Swatch} from "./Swatch";
import {AbstractWithBackgroundSwatch} from "./AbstractWithBackgroundSwatch";
import {PaletteChoice} from "../PaletteChoice";
import {ContrastLevelToContrastRatio, ContrastRatio, is_decreasing} from "../../contrast";
import {ThemePair} from "../ThemePair";
import {Tone} from "../../color_space/hct";
import {Scheme} from "../Scheme";
import {ViewingConditions} from "../ViewingConditions";

/**
 * @internal
 */
export abstract class AbstractOnSwatch<BackgroundSwatch extends Swatch> extends AbstractWithBackgroundSwatch<BackgroundSwatch>
{
	protected constructor(palette: PaletteChoice, is_background: boolean, contrast_level_to_contrast_ratio: NonNullable<ContrastLevelToContrastRatio>, primary_background: NonNullable<ThemePair<BackgroundSwatch>>)
	{
		super(palette, is_background, contrast_level_to_contrast_ratio, primary_background)
	}
	
	public override tone(this: NonNullable<this>, scheme: NonNullable<Scheme>, viewing_conditions: NonNullable<ViewingConditions>): NonNullable<Tone>
	{
		let answer = this.raw_tone(scheme, viewing_conditions)
		
		const background_tone = this.primary_background(viewing_conditions.theme_mode).tone(scheme, viewing_conditions)
		const desired_contrast_ratio = this.contrast_ratio_for_contrast_level(viewing_conditions.contrast_level)
		
		if (background_tone.contrast_ratio(answer) >= desired_contrast_ratio)
		{
			// Don't "improve" what's good enough.
		}
		else
		{
			// Rough improvement.
			answer = background_tone.foreground(desired_contrast_ratio)
		}
		
		if (is_decreasing(viewing_conditions.contrast_level))
		{
			answer = background_tone.foreground(desired_contrast_ratio)
		}
		
		if (this.is_background && answer.is_in_awkward_zone_t50_to_t60())
		{
			// Must adjust.
			if (Tone.T49.contrast_ratio(background_tone) >= desired_contrast_ratio)
			{
				answer = Tone.T49
			}
			else
			{
				answer = Tone.T60
			}
		}
		
		return this.raw_tone_adjusted_for_dual_backgrounds(answer, desired_contrast_ratio, scheme, viewing_conditions)
	}
	
	protected abstract raw_tone_adjusted_for_dual_backgrounds(this: NonNullable<this>, after_adjustment_for_primary_background_tone: NonNullable<Tone>, desired_contrast_ratio: NonNullable<ContrastRatio>, scheme: NonNullable<Scheme>, viewing_conditions: NonNullable<ViewingConditions>): NonNullable<Tone>
}
