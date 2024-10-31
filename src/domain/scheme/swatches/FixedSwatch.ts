// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {AbstractWithBackgroundSwatch} from "./AbstractWithBackgroundSwatch";
import {DualForegroundTonePair} from "./tone_pair";
import {ContrastLevelToContrastRatio} from "../../contrast";
import {ThemePair} from "../ThemePair";
import {PrimarySecondaryTertiaryPalette} from "./PrimarySecondaryTertiaryPalette";
import {PaletteChoice} from "../palettes/PaletteChoice";
import {SurfaceSwatch} from "./SurfaceSwatch";
import {Variant} from "../palettes/Variant";
import {Tone} from "../../color_space/hct";
import {Scheme} from "./Scheme";
import {ViewingConditions} from "../ViewingConditions";

export class FixedSwatch extends AbstractWithBackgroundSwatch<SurfaceSwatch>
{
	public static readonly PrimaryFixed:      NonNullable<FixedSwatch> = FixedSwatch.#normal(PaletteChoice.Primary,   Tone.T90, Tone.T40)
	public static readonly PrimaryFixedDim:   NonNullable<FixedSwatch> = FixedSwatch.#dim   (PaletteChoice.Primary,   Tone.T80, Tone.T30)
	public static readonly SecondaryFixed:    NonNullable<FixedSwatch> = FixedSwatch.#normal(PaletteChoice.Secondary, Tone.T90, Tone.T80)
	public static readonly SecondaryFixedDim: NonNullable<FixedSwatch> = FixedSwatch.#dim   (PaletteChoice.Secondary, Tone.T80, Tone.T70)
	public static readonly TertiaryFixed:     NonNullable<FixedSwatch> = FixedSwatch.#normal(PaletteChoice.Tertiary,  Tone.T40, Tone.T90)
	public static readonly TertiaryFixedDim:  NonNullable<FixedSwatch> = FixedSwatch.#dim   (PaletteChoice.Tertiary,  Tone.T80, Tone.T30)
	
	static #normal(palette_choice: PrimarySecondaryTertiaryPalette, ordinary_tone: NonNullable<Tone>, monochrome_tone: NonNullable<Tone>): NonNullable<FixedSwatch>
	{
		return new FixedSwatch(palette_choice, ordinary_tone, monochrome_tone)
	}
	
	static #dim(palette_choice: PrimarySecondaryTertiaryPalette, ordinary_tone: NonNullable<Tone>, monochrome_tone: NonNullable<Tone>): NonNullable<FixedSwatch>
	{
		return new FixedSwatch(palette_choice, ordinary_tone, monochrome_tone)
	}
	
	static readonly #primary_background = new ThemePair(SurfaceSwatch.SurfaceBright, SurfaceSwatch.SurfaceDim);
	
	readonly #ordinary_tone: NonNullable<Tone>
	readonly #monochrome_tone: NonNullable<Tone>
	
	private constructor(palette: PrimarySecondaryTertiaryPalette, ordinary_tone: NonNullable<Tone>, monochrome_tone: NonNullable<Tone>)
	{
		super(palette, true, ContrastLevelToContrastRatio.Mapping_1_1_3_45, FixedSwatch.#primary_background)
		this.#ordinary_tone = ordinary_tone
		this.#monochrome_tone = monochrome_tone
	}
	
	public override tone(this: NonNullable<this>, scheme: NonNullable<Scheme>, viewing_conditions: NonNullable<ViewingConditions>): NonNullable<Tone>
	{
		return this.tone_pair.execute(this, scheme, viewing_conditions, this.primary_background(viewing_conditions.theme_mode))
	}
	
	public override raw_tone(this: NonNullable<this>, scheme: NonNullable<Scheme>, _viewing_conditions: NonNullable<ViewingConditions>): NonNullable<Tone>
	{
		switch (scheme.variant)
		{
			case Variant.Ordinary:
				return this.#ordinary_tone
			
			case Variant.Monochrome:
				return this.#monochrome_tone
			
			case Variant.Fidelity:
				return this.#ordinary_tone
			
			default:
				throw new RangeError("variant is out of range")
		}
	}
	
	private get tone_pair(): NonNullable<DualForegroundTonePair>
	{
		return DualForegroundTonePair.for_fixed(this.#fixed_normal, this.#fixed_dim)
	}
	
	get #fixed_normal(): NonNullable<FixedSwatch>
	{
		switch (this.palette_choice)
		{
			case PaletteChoice.Primary:
				return FixedSwatch.PrimaryFixed
			
			case PaletteChoice.Secondary:
				return FixedSwatch.SecondaryFixed
			
			case PaletteChoice.Tertiary:
				return FixedSwatch.TertiaryFixed
			
			default:
				throw new RangeError("palette_choice is out of range")
		}
	}
	
	get #fixed_dim(): NonNullable<FixedSwatch>
	{
		switch (this.palette_choice)
		{
			case PaletteChoice.Primary:
				return FixedSwatch.PrimaryFixedDim
			
			case PaletteChoice.Secondary:
				return FixedSwatch.SecondaryFixedDim
			
			case PaletteChoice.Tertiary:
				return FixedSwatch.TertiaryFixedDim
			
			default:
				throw new RangeError("palette_choice is out of range")
		}
	}
}
