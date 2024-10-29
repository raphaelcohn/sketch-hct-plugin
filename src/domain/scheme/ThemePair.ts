// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {ThemeMode} from "./ThemeMode";
import {choose_if_is_dark} from "./ThemeMode.choose_if_is_dark";

export class ThemePair<T>
{
	readonly #dark: NonNullable<T>
	readonly #light: NonNullable<T>
	
	public constructor(dark: NonNullable<T>, light: NonNullable<T>)
	{
		this.#dark = dark
		this.#light = light
	}
	
	public get dark(): NonNullable<T>
	{
		return this.#dark
	}
	
	public get light(): NonNullable<T>
	{
		return this.#light
	}
	
	public static fixed<T>(both: NonNullable<T>): NonNullable<ThemePair<T>>
	{
		return new ThemePair(both, both)
	}
	
	public choose(this: NonNullable<this>, theme_mode: ThemeMode): NonNullable<T>
	{
		return choose_if_is_dark(theme_mode, this.#dark, this.#light)
	}
}
