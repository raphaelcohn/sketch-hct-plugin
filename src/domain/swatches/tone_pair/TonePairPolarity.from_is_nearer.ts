// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {ThemeMode} from "../ThemeMode";
import {TonePairPolarity} from "./TonePairPolarity";

export function from_is_nearer(tonal_pair_polarity: TonePairPolarity, theme_mode: ThemeMode): boolean
{
	switch (tonal_pair_polarity)
	{
		case TonePairPolarity.nearer:
			return true
		
		case TonePairPolarity.farther:
			return false
		
		case TonePairPolarity.lighter:
			return theme_mode === ThemeMode.Light
		
		case TonePairPolarity.darker:
			return theme_mode === ThemeMode.Dark
		
		default:
			throw new RangeError("invalid tonal pair polarity")
	}
}
