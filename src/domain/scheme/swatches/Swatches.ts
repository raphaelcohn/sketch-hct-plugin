// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {KeyColorSwatch} from "./KeyColorSwatch";
import {SurfaceSwatch} from "./SurfaceSwatch";
import {OnSwatch} from "./OnSwatch";
import {SimpleSwatch} from "./SimpleSwatch";
import {MainSwatch} from "./MainSwatch";
import {ContainerSwatch} from "./ContainerSwatch";
import {FixedSwatch} from "./FixedSwatch";
import {OnFixedSwatch} from "./OnFixedSwatch";
import {SwatchName} from "./SwatchName";
import {Swatch} from "./Swatch";
import {PaletteChoice} from "../PaletteChoice";
import {Tone} from "../../color_space/hct";
import {ThemePair} from "../ThemePair";

export class SwatchUsage
{
	public constructor(readonly swatch: NonNullable<Swatch>, readonly palette_choice: PaletteChoice, readonly tone_pair: NonNullable<ThemePair<Tone>> | null, readonly description: string | null, readonly is_deprecated: boolean, readonly is_fixed: boolean, readonly is_on: boolean, readonly is_container: boolean, readonly is_variant: boolean, readonly is_add_on: boolean)
	{
	}
}

export class Swatches
{
	public static readonly Instance: NonNullable<Swatches> = new Swatches()
	
	readonly #swatches: NonNullable<Map<SwatchName, SwatchUsage>>
	
	private constructor()
	{
		// Information on default colors and tones sourced from <https://m3.material.io/styles/color/static/baseline#d3170e61-484c-4c35-a847-2aae11803ccb>.
		// Information on adding additional colors: <https://herrbert74.github.io/posts/custom-color-scheme-with-m3-compose/>.
		// Material theme builder: <https://material-foundation.github.io/material-theme-builder/>
		
		this.#swatches = new Map<SwatchName, SwatchUsage>()
		
		
		this.#set_key(SwatchName.PrimaryPaletteKeyColor,        KeyColorSwatch.PrimaryPaletteKeyColor,        PaletteChoice.Primary)
		this.#set_key(SwatchName.SecondaryPaletteKeyColor,      KeyColorSwatch.SecondaryPaletteKeyColor,      PaletteChoice.Secondary)
		this.#set_key(SwatchName.TertiaryPaletteKeyColor,       KeyColorSwatch.TertiaryPaletteKeyColor,       PaletteChoice.Tertiary)
		this.#set_key(SwatchName.NeutralPaletteKeyColor,        KeyColorSwatch.NeutralPaletteKeyColor,        PaletteChoice.Neutral)
		this.#set_key(SwatchName.NeutralVariantPaletteKeyColor, KeyColorSwatch.NeutralVariantPaletteKeyColor, PaletteChoice.NeutralVariant)
		this.#set_key(SwatchName.ErrorPaletteKeyColor,          KeyColorSwatch.ErrorPaletteKeyColor,          PaletteChoice.Error)
		
		
		this.#set_surface_n(SwatchName.SurfaceDim,     SurfaceSwatch.SurfaceDim,     true,  Tone.T6,  Tone.T87, "Dimmest surface color in light and dark themes")
		this.#set_surface_n(SwatchName.Surface,        SurfaceSwatch.Surface,        false, Tone.T6,  Tone.T98, "Surface color for components like cards, sheets, and menus")
		this.#set_surface_n(SwatchName.SurfaceBright,  SurfaceSwatch.SurfaceBright,  true,  Tone.T24, Tone.T98, "Brightest surface color in light and dark themes")
		this.#set_surface_n(SwatchName.InverseSurface, SimpleSwatch.InverseSurface,  false, Tone.T90, Tone.T20, "Displays opposite color of the surrounding UI (Background fills for elements which contrast against surface)")
		this.#set_surface_n(SwatchName.SurfaceVariant, SurfaceSwatch.SurfaceVariant, false, Tone.T30, Tone.T90, "Alternate surface color, can be used for active states (Blog post https://m3.material.io/blog/tone-based-surface-color-m3 implies should be replaced with Surface Container Highest)")
		
		this.#set_surface_on_x(SwatchName.OnSurface,        OnSwatch.OnSurface,        false, Tone.T90, Tone.T10, "Text and icons shown against the surface color")
		this.#set_surface_on_x(SwatchName.OnSurfaceVariant, OnSwatch.OnSurfaceVariant, true,  Tone.T80, Tone.T30, "For text and icons to indicate active or inactive component state")
		this.#set_surface_on_x(SwatchName.InverseOnSurface, OnSwatch.InverseOnSurface, false, Tone.T20, Tone.T95, "Used for text and icons shown against the inverse surface color")
		
		this.#set_surface_container_n(SwatchName.SurfaceContainerLowest,  SurfaceSwatch.SurfaceContainerLowest,  Tone.T4,  Tone.T100)
		this.#set_surface_container_n(SwatchName.SurfaceContainerLow,     SurfaceSwatch.SurfaceContainerLow,     Tone.T10, Tone.T96)
		this.#set_surface_container_n(SwatchName.SurfaceContainer,        SurfaceSwatch.SurfaceContainer,        Tone.T12, Tone.T94)
		this.#set_surface_container_n(SwatchName.SurfaceContainerHigh,    SurfaceSwatch.SurfaceContainerHigh,    Tone.T17, Tone.T92)
		this.#set_surface_container_n(SwatchName.SurfaceContainerHighest, SurfaceSwatch.SurfaceContainerHighest, Tone.T22, Tone.T90)
		
		this.#set_surface_add_on_scrim_like(SwatchName.Shadow, SimpleSwatch.Shadow, "For shadows applied to elevated components")
		this.#set_surface_add_on_scrim_like(SwatchName.Scrim, SimpleSwatch.Scrim, "Used for scrims which help separate floating components from the background")
		
		this.#set_surface_deprecated(SwatchName.Background,   SurfaceSwatch.Background,  Tone.T6,  Tone.T98, "Note: Background is a legacy color role. It is recommended to use Surface instead of Background")
		this.#set_surface_deprecated(SwatchName.OnBackground, OnSwatch.OnBackground,     Tone.T90, Tone.T10, "Used for text and icons shown against the background color")
		this.#set_surface_deprecated(SwatchName.SurfaceTint,  SurfaceSwatch.SurfaceTint, Tone.T80, Tone.T40, null)
		
		
		this.#set_outline(SwatchName.Outline,        OnSwatch.Outline,        false, Tone.T60, Tone.T50, "Subtle color used for boundaries (Important boundaries, such as a text field outline)")
		this.#set_outline(SwatchName.OutlineVariant, OnSwatch.OutlineVariant, true,  Tone.T30, Tone.T80, "Outline-variant is used to define the border of a component where 3:1 contrast ratio isn’t required, a container, or a divider (Decorative elements, such as dividers)")
		
		
		this.#set_non_surface_x(SwatchName.Primary,                           MainSwatch.Primary,                 PaletteChoice.Primary,   "Main color used across screens and components")
		this.#set_non_surface_x(SwatchName.Secondary,                         MainSwatch.Secondary,               PaletteChoice.Secondary, "Accent color used across screens and components")
		this.#set_non_surface_x(SwatchName.Tertiary,                          MainSwatch.Tertiary,                PaletteChoice.Tertiary,  "?")
		this.#set_non_surface_x(SwatchName.Error,                             MainSwatch.Error,                   PaletteChoice.Error,     "Indicates errors, such as invalid input in a date picker")
		
		this.#set_non_surface_on_x(SwatchName.OnPrimary,                      OnSwatch.OnPrimary,                 PaletteChoice.Primary,   "Text and icons shown against the primary color")
		this.#set_non_surface_on_x(SwatchName.OnSecondary,                    OnSwatch.OnSecondary,               PaletteChoice.Secondary, "Text and icons shown against the secondary color")
		this.#set_non_surface_on_x(SwatchName.OnTertiary,                     OnSwatch.OnTertiary,                PaletteChoice.Tertiary,  "Text and icons shown against the tertiary color")
		this.#set_non_surface_on_x(SwatchName.OnError,                        OnSwatch.OnError,                   PaletteChoice.Error,     "Used for text and icons on the error color")
		
		this.#set_non_surface_x_container(SwatchName.PrimaryContainer,        ContainerSwatch.PrimaryContainer,   PaletteChoice.Primary,   "Standout container color for key components")
		this.#set_non_surface_x_container(SwatchName.SecondaryContainer,      ContainerSwatch.SecondaryContainer, PaletteChoice.Secondary, "Less prominent container color, for components like tonal buttons")
		this.#set_non_surface_x_container(SwatchName.TertiaryContainer,       ContainerSwatch.TertiaryContainer,  PaletteChoice.Tertiary,  "Contrasting container color, for components like input fields")
		this.#set_non_surface_x_container(SwatchName.ErrorContainer,          ContainerSwatch.ErrorContainer,     PaletteChoice.Error,     "Contrasting container color, for components like error fields")
		
		this.#set_non_surface_on_x_container(SwatchName.OnPrimaryContainer,   OnSwatch.OnPrimaryContainer,        PaletteChoice.Primary,   "Contrast-passing color shown against the primary container")
		this.#set_non_surface_on_x_container(SwatchName.OnSecondaryContainer, OnSwatch.OnSecondaryContainer,      PaletteChoice.Secondary, "Contrast-passing color shown against the secondary container")
		this.#set_non_surface_on_x_container(SwatchName.OnTertiaryContainer,  OnSwatch.OnTertiaryContainer,       PaletteChoice.Tertiary,  "Contrast-passing color shown against the tertiary container")
		this.#set_non_surface_on_x_container(SwatchName.OnErrorContainer,     OnSwatch.OnErrorContainer,          PaletteChoice.Error,     "Contrast-passing color shown against the error container")
		
		this.#set_non_surface_x_inverse(SwatchName.InversePrimary,                      OnSwatch.InversePrimary,  PaletteChoice.Primary,   "Displays opposite of the primary color (Actionable elements, such as text buttons, against inverse surface)")
		
		
		this.#set_fixed_x(SwatchName.PrimaryFixed,                       FixedSwatch.PrimaryFixed,              PaletteChoice.Primary  )
		this.#set_fixed_x(SwatchName.SecondaryFixed,                     FixedSwatch.SecondaryFixed,            PaletteChoice.Secondary)
		this.#set_fixed_x(SwatchName.TertiaryFixed,                      FixedSwatch.TertiaryFixed,             PaletteChoice.Tertiary )
		
		this.#set_fixed_x_dim(SwatchName.PrimaryFixedDim,                FixedSwatch.PrimaryFixedDim,           PaletteChoice.Primary  )
		this.#set_fixed_x_dim(SwatchName.SecondaryFixedDim,              FixedSwatch.SecondaryFixedDim,         PaletteChoice.Secondary)
		this.#set_fixed_x_dim(SwatchName.TertiaryFixedDim,               FixedSwatch.TertiaryFixedDim,          PaletteChoice.Tertiary )
		
		this.#set_fixed_on_x(SwatchName.OnPrimaryFixed,                  OnFixedSwatch.OnPrimaryFixed,          PaletteChoice.Primary  )
		this.#set_fixed_on_x(SwatchName.OnSecondaryFixed,                OnFixedSwatch.OnSecondaryFixed,        PaletteChoice.Secondary)
		this.#set_fixed_on_x(SwatchName.OnTertiaryFixed,                 OnFixedSwatch.OnTertiaryFixed,         PaletteChoice.Tertiary )
		
		this.#set_fixed_on_x_variant(SwatchName.OnPrimaryFixedVariant,   OnFixedSwatch.OnPrimaryFixedVariant,   PaletteChoice.Primary )
		this.#set_fixed_on_x_variant(SwatchName.OnSecondaryFixedVariant, OnFixedSwatch.OnSecondaryFixedVariant, PaletteChoice.Secondary)
		this.#set_fixed_on_x_variant(SwatchName.OnTertiaryFixedVariant,  OnFixedSwatch.OnTertiaryFixedVariant,  PaletteChoice.Tertiary )
	}
	
	public get(swatch_name: SwatchName): NonNullable<SwatchUsage>
	{
		const value = this.#swatches.get(swatch_name)
		if (value === undefined)
		{
			throw new RangeError("swatch_name is out of range")
		}
		return value
	}
	
	#set_key(this: NonNullable<this>, swatch_name: SwatchName, swatch: NonNullable<Swatch>, palette_choice: PaletteChoice)
	{
		const is_fixed = Swatches.#swatch_is_fixed(swatch_name)
		const is_on = Swatches.#swatch_is_on(swatch_name)
		const is_container = Swatches.#swatch_is_container(swatch_name)
		const is_variant = Swatches.#swatch_is_variant(swatch_name)
		this.#swatches.set(swatch_name, new SwatchUsage(swatch, palette_choice, null, null, false, is_fixed, is_on, is_container, is_variant, false))
	}
	
	#set_outline(this: NonNullable<this>, swatch_name: SwatchName, swatch: NonNullable<Swatch>, is_variant: boolean, tone_dark: NonNullable<Tone>, tone_light: NonNullable<Tone>, description: string)
	{
		this.#swatches.set(swatch_name, new SwatchUsage(swatch, is_variant ? PaletteChoice.NeutralVariant : PaletteChoice.Neutral, new ThemePair(tone_dark, tone_light), description, false, false, false, false, is_variant, false))
	}
	
	#set_surface_n(this: NonNullable<this>, swatch_name: SwatchName, swatch: NonNullable<Swatch>, is_add_on: boolean, tone_dark: NonNullable<Tone>, tone_light: NonNullable<Tone>, description: string | null)
	{
		this.#swatches.set(swatch_name, new SwatchUsage(swatch, swatch_name === SwatchName.SurfaceVariant ? PaletteChoice.NeutralVariant : PaletteChoice.Neutral, new ThemePair(tone_dark, tone_light), description, false, false, false, false, swatch_name === SwatchName.SurfaceVariant, is_add_on))
	}
	
	#set_surface_on_x(this: NonNullable<this>, swatch_name: SwatchName, swatch: NonNullable<Swatch>, is_variant: boolean, tone_dark: NonNullable<Tone>, tone_light: NonNullable<Tone>, description: string | null)
	{
		this.#swatches.set(swatch_name, new SwatchUsage(swatch, is_variant ? PaletteChoice.NeutralVariant : PaletteChoice.Neutral, new ThemePair(tone_dark, tone_light), description, false, false, true, false, false, false))
	}
	
	#set_surface_container_n(this: NonNullable<this>, swatch_name: SwatchName, swatch: NonNullable<Swatch>, tone_dark: NonNullable<Tone>, tone_light: NonNullable<Tone>)
	{
		this.#swatches.set(swatch_name, new SwatchUsage(swatch, PaletteChoice.Neutral, new ThemePair(tone_dark, tone_light), null, false, false, false, true, false, false))
	}
	
	#set_surface_deprecated(this: NonNullable<this>, swatch_name: SwatchName, swatch: NonNullable<Swatch>, tone_dark: NonNullable<Tone>, tone_light: NonNullable<Tone>, description: string | null)
	{
		const is_on = Swatches.#swatch_is_on(swatch_name)
		const is_add_on = swatch_name !== SwatchName.SurfaceTint
		const palette_choice = swatch_name === SwatchName.SurfaceTint ? PaletteChoice.Neutral : PaletteChoice.Primary
		this.#swatches.set(swatch_name, new SwatchUsage(swatch, palette_choice, new ThemePair(tone_dark, tone_light), description, true, false, is_on, false, false, is_add_on))
	}
	
	#set_surface_add_on_scrim_like(this: NonNullable<this>, swatch_name: SwatchName, swatch: NonNullable<Swatch>, description: string)
	{
		const is_fixed = Swatches.#swatch_is_fixed(swatch_name)
		const is_on = Swatches.#swatch_is_on(swatch_name)
		const is_container = Swatches.#swatch_is_container(swatch_name)
		const is_variant = Swatches.#swatch_is_variant(swatch_name)
		this.#swatches.set(swatch_name, new SwatchUsage(swatch, PaletteChoice.Neutral, new ThemePair(Tone.T0, Tone.T0), description, false, is_fixed, is_on, is_container, is_variant, true))
	}
	
	#set_non_surface_x_inverse(this: NonNullable<this>, swatch_name: SwatchName, swatch: NonNullable<Swatch>, palette_choice: PaletteChoice, description: string)
	{
		this.#set_non_surface(swatch_name, swatch, palette_choice, description, Tone.T40, Tone.T80, false, false, true)
	}
	
	#set_non_surface_x(this: NonNullable<this>, swatch_name: SwatchName, swatch: NonNullable<Swatch>, palette_choice: PaletteChoice, description: string)
	{
		this.#set_non_surface(swatch_name, swatch, palette_choice, description, Tone.T80, Tone.T40, false, false, false)
	}
	
	#set_non_surface_on_x(this: NonNullable<this>, swatch_name: SwatchName, swatch: NonNullable<Swatch>, palette_choice: PaletteChoice, description: string)
	{
		this.#set_non_surface(swatch_name, swatch, palette_choice, description, Tone.T20, Tone.T100, true, false, false)
	}
	
	#set_non_surface_x_container(this: NonNullable<this>, swatch_name: SwatchName, swatch: NonNullable<Swatch>, palette_choice: PaletteChoice, description: string)
	{
		this.#set_non_surface(swatch_name, swatch, palette_choice, description, Tone.T30, Tone.T90, false, true, false)
	}
	
	#set_non_surface_on_x_container(this: NonNullable<this>, swatch_name: SwatchName, swatch: NonNullable<Swatch>, palette_choice: PaletteChoice, description: string)
	{
		this.#set_non_surface(swatch_name, swatch, palette_choice, description, Tone.T90, Tone.T30, true, true, false)
	}
	
	#set_non_surface(this: NonNullable<this>, swatch_name: SwatchName, swatch: NonNullable<Swatch>, palette_choice: PaletteChoice, description: string, tone_dark: NonNullable<Tone>, tone_light: NonNullable<Tone>, is_on: boolean, is_container: boolean, is_add_on: boolean)
	{
		this.#swatches.set(swatch_name, new SwatchUsage(swatch, palette_choice, new ThemePair(tone_dark, tone_light), description, true, false, is_on, is_container, false, is_add_on))
	}
	
	#set_fixed_x(this: NonNullable<this>, swatch_name: SwatchName, swatch: NonNullable<Swatch>, palette_choice: PaletteChoice.Primary | PaletteChoice.Secondary | PaletteChoice.Tertiary)
	{
		this.#set_fixed(swatch_name, swatch, palette_choice, Tone.T90)
	}
	
	#set_fixed_x_dim(this: NonNullable<this>, swatch_name: SwatchName, swatch: NonNullable<Swatch>, palette_choice: PaletteChoice.Primary | PaletteChoice.Secondary | PaletteChoice.Tertiary)
	{
		this.#set_fixed(swatch_name, swatch, palette_choice, Tone.T80)
	}
	
	#set_fixed_on_x(this: NonNullable<this>, swatch_name: SwatchName, swatch: NonNullable<Swatch>, palette_choice: PaletteChoice.Primary | PaletteChoice.Secondary | PaletteChoice.Tertiary)
	{
		this.#set_fixed(swatch_name, swatch, palette_choice, Tone.T10)
	}
	
	#set_fixed_on_x_variant(this: NonNullable<this>, swatch_name: SwatchName, swatch: NonNullable<Swatch>, palette_choice: PaletteChoice.Primary | PaletteChoice.Secondary | PaletteChoice.Tertiary)
	{
		this.#set_fixed(swatch_name, swatch, palette_choice, Tone.T30)
	}
	
	#set_fixed(this: NonNullable<this>, swatch_name: SwatchName, swatch: NonNullable<Swatch>, palette_choice: PaletteChoice.Primary | PaletteChoice.Secondary | PaletteChoice.Tertiary, tone_fixed: NonNullable<Tone>)
	{
		const is_on = Swatches.#swatch_is_on(swatch_name)
		const is_container = Swatches.#swatch_is_container(swatch_name)
		const is_variant = Swatches.#swatch_is_variant(swatch_name)
		this.#swatches.set(swatch_name, new SwatchUsage(swatch, palette_choice, ThemePair.fixed(tone_fixed), null, false, true, is_on, is_container, is_variant, true))
	}
	static #swatch_is_fixed(swatch_name: SwatchName): boolean
	{
		return swatch_name.endsWith("/Fixed") || swatch_name.includes("/Fixed/")
	}
	
	static #swatch_is_on(swatch_name: SwatchName): boolean
	{
		return swatch_name.endsWith("/On") || swatch_name.includes("/On/")
	}
	
	static #swatch_is_container(swatch_name: SwatchName): boolean
	{
		return swatch_name.endsWith("/Container") || swatch_name.includes("/Container/")
	}
	
	static #swatch_is_variant(swatch_name: SwatchName): boolean
	{
		return swatch_name.endsWith("/Variant")
	}
}
