// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {AbstractSwatch} from "./AbstractSwatch";
import {PaletteChoice} from "../palettes/PaletteChoice";
import {Tone} from "../../color_space/hct";
import {ThemePair} from "../ThemePair";
import {Scheme} from "./Scheme";
import {ViewingConditions} from "../ViewingConditions";

export class SimpleSwatch extends AbstractSwatch
{
	public static readonly Shadow:         NonNullable<SimpleSwatch> = new SimpleSwatch(PaletteChoice.Neutral, Tone.T0,  Tone.T0 )
	public static readonly Scrim:          NonNullable<SimpleSwatch> =     SimpleSwatch.Shadow
	public static readonly InverseSurface: NonNullable<SimpleSwatch> = new SimpleSwatch(PaletteChoice.Neutral, Tone.T90, Tone.T20)
	
	readonly #tone_ordinary: NonNullable<ThemePair<Tone>>
	
	private constructor(palette: PaletteChoice, ordinary_dark: NonNullable<Tone>, ordinary_light: NonNullable<Tone>)
	{
		super(palette, false)
		
		this.#tone_ordinary = new ThemePair(ordinary_dark, ordinary_light)
	}
	
	public override tone(this: NonNullable<this>, scheme: NonNullable<Scheme>, viewing_conditions: NonNullable<ViewingConditions>): NonNullable<Tone>
	{
		return this.raw_tone(scheme, viewing_conditions)
	}
	
	public override raw_tone(this: NonNullable<this>, _scheme: NonNullable<Scheme>, viewing_conditions: NonNullable<ViewingConditions>): NonNullable<Tone>
	{
		return this.#tone_ordinary.choose(viewing_conditions.theme_mode)
	}
}
