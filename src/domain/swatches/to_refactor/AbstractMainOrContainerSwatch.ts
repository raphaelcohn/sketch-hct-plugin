// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {ThemeMode} from "../ThemeMode";
import {Variant} from "../Variant";
import {CorePalettes} from "../CorePalettes";
import {HueChromaToneCoordinates, Tone} from "../../color_space/hct";
import {ContrastLevel, ContrastLevelToContrastRatio} from "../../contrast";
import {ThemePair} from "../ThemePair";
import {TonePair} from "../tone_pair";
import {SurfaceSwatch} from "./SurfaceSwatch";
import {Backgrounds} from "../Backgrounds";
import {FidelityTone} from "./FidelityTone";
import {ContainerPaletteChoice} from "./ContainerPaletteChoice";
import {AbstractWithBackgroundsSwatch} from "./AbstractWithBackgroundsSwatch";

/**
 * @internal
 */
export abstract class AbstractMainOrContainerSwatch extends AbstractWithBackgroundsSwatch
{
	static readonly #primary_background: NonNullable<ThemePair<Backgrounds>> = new ThemePair(Backgrounds.with_primary_background(SurfaceSwatch.SurfaceBright), Backgrounds.with_primary_background(SurfaceSwatch.SurfaceDim))
	
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
	
	public tone(this: NonNullable<this>, theme_mode: ThemeMode, variant: Variant, palettes: NonNullable<CorePalettes>, source_color: NonNullable<HueChromaToneCoordinates>, _contrast_level: ContrastLevel): NonNullable<Tone>
	{
		switch (variant)
		{
			case Variant.Ordinary:
				return this.#tone_ordinary.choose(theme_mode)
			
			case Variant.Monochrome:
				return this.#tone_monochrome.choose(theme_mode)
			
			case Variant.Fidelity:
				return this.#fidelity_callback(theme_mode, this.#tone_ordinary, source_color, super.choose_palette(palettes))
			
			default:
				throw new RangeError("variant is out of range")
		}
	}
	
	public abstract get tone_pair(): NonNullable<TonePair>
}
