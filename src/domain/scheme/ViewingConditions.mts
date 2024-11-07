// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {ThemeMode} from "./ThemeMode.mjs";
import {ContrastLevel} from "../contrast/ContrastLevel.mjs";

export class ViewingConditions
{
	public static readonly LightLow: NonNullable<ViewingConditions> = ViewingConditions.light(ContrastLevel.Low)
	public static readonly LightNormal: NonNullable<ViewingConditions> = ViewingConditions.light(ContrastLevel.Normal)
	public static readonly LightMedium: NonNullable<ViewingConditions> = ViewingConditions.light(ContrastLevel.Medium)
	public static readonly LightHigh: NonNullable<ViewingConditions> = ViewingConditions.light(ContrastLevel.High)
	
	public static readonly DarkLow: NonNullable<ViewingConditions> = ViewingConditions.dark(ContrastLevel.Low)
	public static readonly DarkNormal: NonNullable<ViewingConditions> = ViewingConditions.dark(ContrastLevel.Normal)
	public static readonly DarkMedium: NonNullable<ViewingConditions> = ViewingConditions.dark(ContrastLevel.Medium)
	public static readonly DarkHigh: NonNullable<ViewingConditions> = ViewingConditions.dark(ContrastLevel.High)
	
	public constructor(readonly theme_mode: ThemeMode, readonly contrast_level: ContrastLevel)
	{
	}
	
	public static light(contrast_level: ContrastLevel): NonNullable<ViewingConditions>
	{
		return new ViewingConditions(ThemeMode.Light, contrast_level)
	}
	
	public static dark(contrast_level: ContrastLevel): NonNullable<ViewingConditions>
	{
		return new ViewingConditions(ThemeMode.Dark, contrast_level)
	}
}
