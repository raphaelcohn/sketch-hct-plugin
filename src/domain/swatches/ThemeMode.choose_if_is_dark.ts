// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {ThemeMode} from "./ThemeMode";

/**
 * @internal
 */
export function choose_if_is_dark<T>(theme_mode: ThemeMode, is_dark: T, is_light: T): T
{
	switch (theme_mode)
	{
		case ThemeMode.Dark:
			return is_dark
		
		case ThemeMode.Light:
			return is_light
		
		default:
			throw new RangeError("theme_mode is out of range")
	}
}
