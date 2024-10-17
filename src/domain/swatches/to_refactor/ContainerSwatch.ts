// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {HueChromaToneCoordinates, TonalPalette, Tone} from "../../color_space/hct";
import {ContrastLevelToContrastRatio} from "../../contrast";
import {PaletteChoice} from "../PaletteChoice";
import {TonePair} from "../tone_pair";
import {ThemePair} from "../ThemePair";
import {ThemeMode} from "../ThemeMode";
import {choose_if_is_dark} from "../ThemeMode.choose_if_is_dark";
import {AbstractMainOrContainerSwatch} from "./AbstractMainOrContainerSwatch";
import {ContainerPaletteChoice} from "./ContainerPaletteChoice";
import {FidelityTone} from "./FidelityTone";
import {MainSwatch} from "./MainSwatch";

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
	
	public override get tone_pair(): NonNullable<TonePair>
	{
		return TonePair.for_container(this, this.#main_swatch)
	}
	
	get #main_swatch(): NonNullable<MainSwatch>
	{
		return MainSwatch.swatch(<ContainerPaletteChoice>this.palette_choice)
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
	
	static #primary_fidelity_tone(_theme_mode: ThemeMode, _tone_ordinary: NonNullable<ThemePair<Tone>>, source_color: NonNullable<HueChromaToneCoordinates>, _chosen_palette: NonNullable<TonalPalette>): NonNullable<Tone>
	{
		return source_color.tone
	}
	
	static #secondary_fidelity_tone(theme_mode: ThemeMode, tone_ordinary: NonNullable<ThemePair<Tone>>, _source_color: NonNullable<HueChromaToneCoordinates>, chosen_palette: NonNullable<TonalPalette>): NonNullable<Tone>
	{
		const [initial_tone, by_decreasing_tone] = choose_if_is_dark(theme_mode, [tone_ordinary.dark, false], [tone_ordinary.light, true])
		
		return chosen_palette.find_tone_that_gives_desired_chroma(initial_tone, by_decreasing_tone)
	}
	
	static #tertiary_fidelity_tone(_theme_mode: ThemeMode, _tone_ordinary: NonNullable<ThemePair<Tone>>, source_color: NonNullable<HueChromaToneCoordinates>, chosen_palette: NonNullable<TonalPalette>): NonNullable<Tone>
	{
		const proposed = chosen_palette.with_tone(source_color.tone)
		
		return proposed.if_disliked_corrected().tone
	}
	
	static #error_fidelity_tone(theme_mode: ThemeMode, tone_ordinary: NonNullable<ThemePair<Tone>>, _source_color: NonNullable<HueChromaToneCoordinates>, _chosen_palette: NonNullable<TonalPalette>): NonNullable<Tone>
	{
		return tone_ordinary.choose(theme_mode)
	}
}
