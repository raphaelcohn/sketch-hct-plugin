// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {Variant} from "../Variant";
import {Tone} from "../../color_space/hct";
import {ContrastLevelToContrastRatio} from "../../contrast";
import {ThemePair} from "../ThemePair";
import {DualForegroundTonePair} from "./tone_pair";
import {SurfaceSwatch} from "./SurfaceSwatch";
import {FidelityTone} from "./FidelityTone";
import {ContainerPaletteChoice} from "./ContainerPaletteChoice";
import {AbstractWithBackgroundSwatch} from "./AbstractWithBackgroundSwatch";
import {Scheme} from "../Scheme";
import {ViewingConditions} from "../ViewingConditions";

/**
 * @internal
 */
export abstract class AbstractMainOrContainerSwatch extends AbstractWithBackgroundSwatch<SurfaceSwatch>
{
	static readonly #primary_background: NonNullable<ThemePair<SurfaceSwatch>> = new ThemePair(SurfaceSwatch.SurfaceBright, SurfaceSwatch.SurfaceDim)
	
	readonly #tone_ordinary: NonNullable<ThemePair<Tone>>
	readonly #tone_monochrome: NonNullable<ThemePair<Tone>>
	readonly #fidelity_callback: FidelityTone
	
	protected constructor(palette_choice: ContainerPaletteChoice, contrast_level_to_contrast_ratio: NonNullable<ContrastLevelToContrastRatio>, tone_ordinary: NonNullable<ThemePair<Tone>>, tone_monochrome: NonNullable<ThemePair<Tone>>, fidelity_callback: FidelityTone)
	{
		super(palette_choice, true, contrast_level_to_contrast_ratio, AbstractMainOrContainerSwatch.#primary_background)
		this.#tone_ordinary = tone_ordinary
		this.#tone_monochrome = tone_monochrome
		this.#fidelity_callback = fidelity_callback
	}
	
	public override tone(this: NonNullable<this>, scheme: NonNullable<Scheme>, viewing_conditions: NonNullable<ViewingConditions>): NonNullable<Tone>
	{
		return this.tone_pair.execute(this, scheme, viewing_conditions, this.primary_background(viewing_conditions.theme_mode))
	}
	
	public override raw_tone(this: NonNullable<this>, scheme: NonNullable<Scheme>, viewing_conditions: NonNullable<ViewingConditions>): NonNullable<Tone>
	{
		switch (scheme.variant)
		{
			case Variant.Ordinary:
				return this.#tone_ordinary.choose(viewing_conditions.theme_mode)
			
			case Variant.Monochrome:
				return this.#tone_monochrome.choose(viewing_conditions.theme_mode)
			
			case Variant.Fidelity:
				return this.#fidelity_callback(viewing_conditions.theme_mode, this.#tone_ordinary, scheme.source_color_tone, super.choose_palette(scheme.palettes))
			
			default:
				throw new RangeError("variant is out of range")
		}
	}
	
	protected abstract get tone_pair(): NonNullable<DualForegroundTonePair>
}
