// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import type {TonalPalette} from "../../color_space/hct/TonalPalette.mjs";
import {Tone} from "../../color_space/hct/Tone.mjs";
import {ContrastLevelToContrastRatio} from "../../contrast/ContrastLevelToContrastRatio.mjs";
import {PaletteChoice} from "../palettes/PaletteChoice.mjs";
import {DualForegroundTonePair} from "./tone_pair/DualForegroundTonePair.mjs";
import {ThemePair} from "../ThemePair.mjs";
import type {ThemeMode} from "../ThemeMode.mts";
import {choose_if_is_dark} from "../ThemeMode.choose_if_is_dark.mjs";
import {AbstractMainOrContainerSwatch} from "./AbstractMainOrContainerSwatch.mjs";
import type {ContainerPaletteChoice} from "./ContainerPaletteChoice.mts";
import type {FidelityTone} from "./FidelityTone.mts";
import {MainSwatch} from "./MainSwatch.mjs";

export class ContainerSwatch extends AbstractMainOrContainerSwatch
{
	public static readonly PrimaryContainer:   NonNullable<ContainerSwatch> = ContainerSwatch.#container(PaletteChoice.Primary,   Tone.T85, Tone.T25,  ContainerSwatch.#primary_fidelity_tone  )
	public static readonly SecondaryContainer: NonNullable<ContainerSwatch> = ContainerSwatch.#container(PaletteChoice.Secondary, Tone.T30, Tone.T85,  ContainerSwatch.#secondary_fidelity_tone)
	public static readonly TertiaryContainer:  NonNullable<ContainerSwatch> = ContainerSwatch.#container(PaletteChoice.Tertiary,  Tone.T0,  Tone.T100, ContainerSwatch.#tertiary_fidelity_tone )
	public static readonly ErrorContainer:     NonNullable<ContainerSwatch> = ContainerSwatch.#container(PaletteChoice.Error,     Tone.T30, Tone.T90,  ContainerSwatch.#error_fidelity_tone )
	
	static #container(palette_choice: ContainerPaletteChoice, monochrome_dark: NonNullable<Tone>, monochrome_light: NonNullable<Tone>, fidelity_callback: FidelityTone): NonNullable<ContainerSwatch>
	{
		return new ContainerSwatch(palette_choice, new ThemePair(monochrome_dark, monochrome_light), fidelity_callback)
	}
	
	static readonly #ContrastLevelToContrastRatio: NonNullable<ContrastLevelToContrastRatio> = ContrastLevelToContrastRatio.Mapping_1_1_3_45
	static readonly #OrdinaryTone: NonNullable<ThemePair<Tone>> = new ThemePair(Tone.T30, Tone.T90)
	
	private constructor(palette_choice: ContainerPaletteChoice, tone_monochrome: NonNullable<ThemePair<Tone>>, fidelity_tone: FidelityTone)
	{
		super(palette_choice, ContainerSwatch.#ContrastLevelToContrastRatio, ContainerSwatch.#OrdinaryTone, tone_monochrome, fidelity_tone)
	}
	
	public override get tone_pair(): NonNullable<DualForegroundTonePair>
	{
		return DualForegroundTonePair.for_container(this, this.#main_swatch)
	}
	
	get #main_swatch(): NonNullable<MainSwatch>
	{
		return MainSwatch.swatch(this.palette_choice as ContainerPaletteChoice)
	}
	
	/**
	 * @internal
	 * @param palette
	 */
	static swatch(palette: ContainerPaletteChoice): NonNullable<ContainerSwatch>
	{
		switch (palette)
		{
			case PaletteChoice.Primary:
				return ContainerSwatch.PrimaryContainer
			
			case PaletteChoice.Secondary:
				return ContainerSwatch.SecondaryContainer
			
			case PaletteChoice.Tertiary:
				return ContainerSwatch.TertiaryContainer
			
			case PaletteChoice.Error:
				return ContainerSwatch.ErrorContainer
			
			default:
				throw new RangeError("palette is out of range")
		}
	}
	
	static #primary_fidelity_tone(_theme_mode: ThemeMode, _tone_ordinary: NonNullable<ThemePair<Tone>>, source_color_tone: NonNullable<Tone>, _chosen_palette: NonNullable<TonalPalette>): NonNullable<Tone>
	{
		return source_color_tone
	}
	
	static #secondary_fidelity_tone(theme_mode: ThemeMode, tone_ordinary: NonNullable<ThemePair<Tone>>, _source_color_tone: NonNullable<Tone>, chosen_palette: NonNullable<TonalPalette>): NonNullable<Tone>
	{
		const [initial_tone, by_decreasing_tone] = choose_if_is_dark(theme_mode, [tone_ordinary.dark, false], [tone_ordinary.light, true])
		
		return chosen_palette.find_tone_that_gives_desired_chroma(initial_tone, by_decreasing_tone)
	}
	
	static #tertiary_fidelity_tone(_theme_mode: ThemeMode, _tone_ordinary: NonNullable<ThemePair<Tone>>, source_color_tone: NonNullable<Tone>, chosen_palette: NonNullable<TonalPalette>): NonNullable<Tone>
	{
		const proposed = chosen_palette.with_tone(source_color_tone)
		
		return proposed.if_disliked_corrected().tone
	}
	
	static #error_fidelity_tone(theme_mode: ThemeMode, tone_ordinary: NonNullable<ThemePair<Tone>>, _source_color_tone: NonNullable<Tone>, _chosen_palette: NonNullable<TonalPalette>): NonNullable<Tone>
	{
		return tone_ordinary.choose(theme_mode)
	}
}
