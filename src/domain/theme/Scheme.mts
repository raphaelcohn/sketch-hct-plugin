// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import type {SRgbCoordinates} from "../color_space/srgb/SRgbCoordinates.mts";

export interface Scheme
{
	readonly primary: SRgbCoordinates,
	readonly on_primary: SRgbCoordinates,
	readonly primary_container: SRgbCoordinates,
	readonly on_primary_container: SRgbCoordinates,
	
	readonly secondary: SRgbCoordinates,
	readonly on_secondary: SRgbCoordinates,
	readonly secondary_container: SRgbCoordinates,
	readonly on_secondary_container: SRgbCoordinates,
	
	readonly tertiary: SRgbCoordinates,
	readonly on_tertiary: SRgbCoordinates,
	readonly tertiary_container: SRgbCoordinates,
	readonly on_tertiary_container: SRgbCoordinates,
	
	readonly error: SRgbCoordinates,
	readonly on_error: SRgbCoordinates,
	readonly error_container: SRgbCoordinates,
	readonly on_error_container: SRgbCoordinates,
	
	readonly background: SRgbCoordinates,
	readonly on_background: SRgbCoordinates,
	
	readonly surface: SRgbCoordinates,
	readonly on_surface: SRgbCoordinates,
	readonly surface_variant: SRgbCoordinates,
	readonly on_surface_variant: SRgbCoordinates,
	
	readonly outline: SRgbCoordinates,
	readonly outline_variant: SRgbCoordinates,
	
	readonly shadow: SRgbCoordinates,
	readonly scrim: SRgbCoordinates,
	
	readonly inverse_surface: SRgbCoordinates,
	readonly inverse_on_surface: SRgbCoordinates,
	
	readonly inverse_primary: SRgbCoordinates
	
	readonly primary_key_color: SRgbCoordinates
	readonly secondary_key_color: SRgbCoordinates
	readonly tertiary_key_color: SRgbCoordinates
	readonly neutral_key_color: SRgbCoordinates
	readonly neutral_variant_key_color: SRgbCoordinates
	
	readonly surface_dim: SRgbCoordinates | null
	readonly surface_bright: SRgbCoordinates | null
	
	readonly surface_container_lowest: SRgbCoordinates | null
	readonly surface_container_low: SRgbCoordinates | null
	readonly surface_container_mid: SRgbCoordinates | null
	readonly surface_container_high: SRgbCoordinates | null
	readonly surface_container_highest: SRgbCoordinates | null
	
	readonly surface_tint: SRgbCoordinates | null
	
	readonly primary_fixed: SRgbCoordinates | null
	readonly primary_fixed_dim: SRgbCoordinates | null
	readonly on_primary_fixed: SRgbCoordinates | null
	readonly on_primary_fixed_variant: SRgbCoordinates | null
	
	readonly secondary_fixed: SRgbCoordinates | null
	readonly secondary_fixed_dim: SRgbCoordinates | null
	readonly on_secondary_fixed: SRgbCoordinates | null
	readonly on_secondary_fixed_variant: SRgbCoordinates | null
	
	readonly tertiary_fixed: SRgbCoordinates | null
	readonly tertiary_fixed_dim: SRgbCoordinates | null
	readonly on_tertiary_fixed: SRgbCoordinates | null
	readonly on_tertiary_fixed_variant: SRgbCoordinates | null
}
