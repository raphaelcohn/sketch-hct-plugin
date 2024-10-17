// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {ThemeMode} from "../ThemeMode";
import {ThemePair} from "../ThemePair";
import {HueChromaToneCoordinates, TonalPalette, Tone} from "../../color_space/hct";

/**
 * @internal
 */
export type FidelityTone = (theme_mode: ThemeMode, tone_ordinary: NonNullable<ThemePair<Tone>>, source_color: NonNullable<HueChromaToneCoordinates>, chosen_palette: NonNullable<TonalPalette>) => NonNullable<Tone>
