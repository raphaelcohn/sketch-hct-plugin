// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {SchemeLike} from "./SchemeLike.mjs";
import type {SRgbCoordinates} from "../color_space/srgb/SRgbCoordinates.mts";
import type {Scheme} from "./Scheme.mts";

export class AbstractScheme extends SchemeLike<SRgbCoordinates> implements Scheme
{
	protected constructor
	(
		primary: SRgbCoordinates,
		on_primary: SRgbCoordinates,
		primary_container: SRgbCoordinates,
		on_primary_container: SRgbCoordinates,
		
		secondary: SRgbCoordinates,
		on_secondary: SRgbCoordinates,
		secondary_container: SRgbCoordinates,
		on_secondary_container: SRgbCoordinates,
		
		tertiary: SRgbCoordinates,
		on_tertiary: SRgbCoordinates,
		tertiary_container: SRgbCoordinates,
		on_tertiary_container: SRgbCoordinates,
		
		error: SRgbCoordinates,
		on_error: SRgbCoordinates,
		error_container: SRgbCoordinates,
		on_error_container: SRgbCoordinates,
		
		background: SRgbCoordinates,
		on_background: SRgbCoordinates,
		
		surface: SRgbCoordinates,
		on_surface: SRgbCoordinates,
		surface_variant: SRgbCoordinates,
		on_surface_variant: SRgbCoordinates,
		
		outline: SRgbCoordinates,
		outline_variant: SRgbCoordinates,
		
		shadow: SRgbCoordinates,
		scrim: SRgbCoordinates,
		
		inverse_surface: SRgbCoordinates,
		inverse_on_surface: SRgbCoordinates,
		
		inverse_primary: SRgbCoordinates,
		
		readonly primary_key_color: SRgbCoordinates,
		readonly secondary_key_color: SRgbCoordinates,
		readonly tertiary_key_color: SRgbCoordinates,
		readonly neutral_key_color: SRgbCoordinates,
		readonly neutral_variant_key_color: SRgbCoordinates,
		
		readonly surface_dim: SRgbCoordinates | null,
		readonly surface_bright: SRgbCoordinates | null,
		
		readonly surface_container_lowest: SRgbCoordinates | null,
		readonly surface_container_low: SRgbCoordinates | null,
		readonly surface_container_mid: SRgbCoordinates | null,
		readonly surface_container_high: SRgbCoordinates | null,
		readonly surface_container_highest: SRgbCoordinates | null,
		
		readonly surface_tint: SRgbCoordinates | null,
		
		readonly primary_fixed: SRgbCoordinates | null,
		readonly primary_fixed_dim: SRgbCoordinates | null,
		readonly on_primary_fixed: SRgbCoordinates | null,
		readonly on_primary_fixed_variant: SRgbCoordinates | null,
		
		readonly secondary_fixed: SRgbCoordinates | null,
		readonly secondary_fixed_dim: SRgbCoordinates | null,
		readonly on_secondary_fixed: SRgbCoordinates | null,
		readonly on_secondary_fixed_variant: SRgbCoordinates | null,
		
		readonly tertiary_fixed: SRgbCoordinates | null,
		readonly tertiary_fixed_dim: SRgbCoordinates | null,
		readonly on_tertiary_fixed: SRgbCoordinates | null,
		readonly on_tertiary_fixed_variant: SRgbCoordinates | null,
	)
	{
		super
		(
			primary,
			on_primary,
			primary_container,
			on_primary_container,
			
			secondary,
			on_secondary,
			secondary_container,
			on_secondary_container,
			
			tertiary,
			on_tertiary,
			tertiary_container,
			on_tertiary_container,
			
			error,
			on_error,
			error_container,
			on_error_container,
			
			background,
			on_background,
			
			surface,
			on_surface,
			surface_variant,
			on_surface_variant,
			
			outline,
			outline_variant,
			
			shadow,
			scrim,
			
			inverse_surface,
			inverse_on_surface,
			
			inverse_primary
		)
	}
	
}
