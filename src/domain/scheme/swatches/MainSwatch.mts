// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import type {TonalPalette} from "../../color_space/hct/TonalPalette.mts";
import {Tone} from "../../color_space/hct/Tone.mjs";
import {ContrastLevelToContrastRatio} from "../../contrast/ContrastLevelToContrastRatio.mjs";
import {PaletteChoice} from "../palettes/PaletteChoice.mjs";
import {DualForegroundTonePair} from "./tone_pair/DualForegroundTonePair.mjs";
import {ThemePair} from "../ThemePair.mjs";
import type {ThemeMode} from "../ThemeMode.mts";
import {AbstractMainOrContainerSwatch} from "./AbstractMainOrContainerSwatch.mjs";
import type {ContainerPaletteChoice} from "./ContainerPaletteChoice.mts";
import {ContainerSwatch} from "./ContainerSwatch.mjs";

export class MainSwatch extends AbstractMainOrContainerSwatch
{
	public static readonly Primary:   NonNullable<MainSwatch> = MainSwatch.#main(PaletteChoice.Primary,   Tone.T100, Tone.T0 )
	public static readonly Secondary: NonNullable<MainSwatch> = MainSwatch.#main(PaletteChoice.Secondary, Tone.T80,  Tone.T40)
	public static readonly Tertiary:  NonNullable<MainSwatch> = MainSwatch.#main(PaletteChoice.Tertiary,  Tone.T90,  Tone.T25)
	public static readonly Error:     NonNullable<MainSwatch> = MainSwatch.#main(PaletteChoice.Error,     Tone.T80,  Tone.T40)
	
	static #main(palette_choice: ContainerPaletteChoice, monochrome_dark: NonNullable<Tone>, monochrome_light: NonNullable<Tone>): NonNullable<MainSwatch>
	{
		return new MainSwatch(palette_choice, new ThemePair(monochrome_dark, monochrome_light))
	}
	
	static readonly #ContrastLevelToContrastRatio: NonNullable<ContrastLevelToContrastRatio> = ContrastLevelToContrastRatio.Mapping_3_45_7_7
	static readonly #OrdinaryTone: NonNullable<ThemePair<Tone>> = new ThemePair(Tone.T80, Tone.T40)
	
	private constructor(palette_choice: ContainerPaletteChoice, tone_monochrome: NonNullable<ThemePair<Tone>>)
	{
		super(palette_choice, MainSwatch.#ContrastLevelToContrastRatio, MainSwatch.#OrdinaryTone, tone_monochrome, MainSwatch.#ordinary_fidelity_tone)
	}
	
	static #ordinary_fidelity_tone(theme_mode: ThemeMode, tone_ordinary: NonNullable<ThemePair<Tone>>, _source_color_tone: NonNullable<Tone>, _chosen_palette: NonNullable<TonalPalette>): NonNullable<Tone>
	{
		return tone_ordinary.choose(theme_mode)
	}
	
	public override get tone_pair(): NonNullable<DualForegroundTonePair>
	{
		return DualForegroundTonePair.for_container(this.#container_swatch, this)
	}
	
	get #container_swatch(): NonNullable<ContainerSwatch>
	{
		return ContainerSwatch.swatch(this.palette_choice as ContainerPaletteChoice)
	}
	
	/**
	 * @internal
	 * @param palette
	 */
	static swatch(palette: ContainerPaletteChoice): NonNullable<MainSwatch>
	{
		switch (palette)
		{
			case PaletteChoice.Primary:
				return MainSwatch.Primary
			
			case PaletteChoice.Secondary:
				return MainSwatch.Secondary
			
			case PaletteChoice.Tertiary:
				return MainSwatch.Tertiary
			
			case PaletteChoice.Error:
				return MainSwatch.Error
			
			default:
				throw new RangeError("palette is out of range")
		}
	}
}
