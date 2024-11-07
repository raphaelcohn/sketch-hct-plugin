// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import type {ThemeMode} from "../ThemeMode.mts";
import type {ThemePair} from "../ThemePair.mts";
import type {TonalPalette} from "../../color_space/hct/TonalPalette.mts";
import type {Tone} from "../../color_space/hct/Tone.mts";

/**
 * @internal
 */
export type FidelityTone = (theme_mode: ThemeMode, tone_ordinary: NonNullable<ThemePair<Tone>>, source_color_tone: NonNullable<Tone>, chosen_palette: NonNullable<TonalPalette>) => NonNullable<Tone>
