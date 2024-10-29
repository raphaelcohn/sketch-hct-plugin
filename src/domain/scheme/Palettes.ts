// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {Chroma, Hue, HueChromaToneCoordinates, TonalPalette} from "../color_space/hct";
import {CorePalettesSourceColors} from "./CorePalettesSourceColors";
import {PaletteChoice} from "./PaletteChoice";
import {FiniteNumber} from "../number";
import {Variant} from "./Variant";

export class Palettes
{
	readonly #primary: NonNullable<TonalPalette>
	readonly #secondary: NonNullable<TonalPalette>
	readonly #tertiary: NonNullable<TonalPalette>
	readonly #neutral: NonNullable<TonalPalette>
	readonly #neutral_variant: NonNullable<TonalPalette>
	readonly #error: NonNullable<TonalPalette>
	
	public constructor(primary: NonNullable<TonalPalette>, secondary: NonNullable<TonalPalette>, tertiary: NonNullable<TonalPalette>, neutral: NonNullable<TonalPalette>, neutral_variant: NonNullable<TonalPalette>, error: NonNullable<TonalPalette>)
	{
		this.#primary = primary
		this.#secondary = secondary
		this.#tertiary = tertiary
		this.#neutral = neutral
		this.#neutral_variant = neutral_variant
		this.#error = error
	}
	
	/**
	 * Useful only for legacy static schemes used in Android 12.
	 * @param source_color
	 * @param is_content
	 * @param source_colors
	 */
	public static from_source_colors(source_color: NonNullable<TonalPalette>, is_content: boolean, source_colors: CorePalettesSourceColors): [NonNullable<Palettes>, Variant.Ordinary | Variant.Fidelity]
	{
		return [
			new Palettes
			(
				source_color.primary(is_content),
				(source_colors.secondary === undefined ? source_color.secondary(is_content) : source_colors.secondary.primary(is_content)),
				(source_colors.tertiary === undefined ? source_color.tertiary(is_content) : source_colors.tertiary.primary(is_content)),
				(source_colors.neutral === undefined ? source_color.neutral(is_content) : source_colors.neutral.neutral(is_content)),
				(source_colors.neutral_variant === undefined ? source_color.neutral_variant(is_content) : source_colors.neutral_variant.neutral_variant(is_content)),
				(source_colors.error === undefined ? TonalPalette.Error : source_colors.error.primary(is_content))
			),
			is_content ? Variant.Fidelity : Variant.Ordinary
		]
	}
	
	static #with_default_error_palette(primary: NonNullable<TonalPalette>, secondary: NonNullable<TonalPalette>, tertiary: NonNullable<TonalPalette>, neutral: NonNullable<TonalPalette>, neutral_variant: NonNullable<TonalPalette>): NonNullable<Palettes>
	{
		return new Palettes(primary, secondary, tertiary, neutral, neutral_variant, TonalPalette.Error)
	}
	
	static #with_default_error_palette_ordinary(primary: NonNullable<TonalPalette>, secondary: NonNullable<TonalPalette>, tertiary: NonNullable<TonalPalette>, neutral: NonNullable<TonalPalette>, neutral_variant: NonNullable<TonalPalette>): [NonNullable<Palettes>, Variant.Ordinary]
	{
		return [Palettes.#with_default_error_palette(primary, secondary, tertiary, neutral, neutral_variant), Variant.Ordinary]
	}
	
	static #with_default_error_palette_monochrome(primary: NonNullable<TonalPalette>, secondary: NonNullable<TonalPalette>, tertiary: NonNullable<TonalPalette>, neutral: NonNullable<TonalPalette>, neutral_variant: NonNullable<TonalPalette>): [NonNullable<Palettes>, Variant.Monochrome]
	{
		return [Palettes.#with_default_error_palette(primary, secondary, tertiary, neutral, neutral_variant), Variant.Monochrome]
	}
	
	static #with_default_error_palette_fidelity(primary: NonNullable<TonalPalette>, secondary: NonNullable<TonalPalette>, tertiary: NonNullable<TonalPalette>, neutral: NonNullable<TonalPalette>, neutral_variant: NonNullable<TonalPalette>): [NonNullable<Palettes>, Variant.Fidelity]
	{
		return [Palettes.#with_default_error_palette(primary, secondary, tertiary, neutral, neutral_variant), Variant.Fidelity]
	}
	
	static #with_hue_rotations(source_hue: NonNullable<Hue>, primary: NonNullable<TonalPalette>, secondary_rotations: NonEmptyArray<HueAndRotation>, tertiary_rotations: NonEmptyArray<HueAndRotation>, neutral: NonNullable<TonalPalette>, neutral_variant: NonNullable<TonalPalette>): [NonNullable<Palettes>, Variant.Ordinary]
	{
		const secondary = Palettes.#get_rotated_hue(source_hue, secondary_rotations).with_chroma(Chroma.TwentyFour)
		const tertiary = Palettes.#get_rotated_hue(source_hue, tertiary_rotations).with_chroma(Chroma.ThirtyTwo)
		
		return [Palettes.#with_default_error_palette(primary, secondary, tertiary, neutral, neutral_variant), Variant.Ordinary]
	}
	
	static #scheme_content_or_fidelity(source_color: NonNullable<HueChromaToneCoordinates>, tertiary_source_color: NonNullable<HueChromaToneCoordinates>): [NonNullable<Palettes>, Variant.Fidelity]
	{
		const source_tonal_palette = source_color.tonal_palette
		const source_hue = source_tonal_palette.hue
		const chroma = source_color.chroma
		
		const chroma_neutral = chroma.divide(FiniteNumber.Eight)
		
		const secondary = source_hue.with_chroma(chroma.subtract(FiniteNumber.ThirtyTwo).max(chroma.divide(FiniteNumber.Two)))
		const neutral = source_hue.with_chroma(chroma_neutral)
		const neutral_variant = source_hue.with_chroma(chroma_neutral.add(FiniteNumber.Four))
		
		return Palettes.#with_default_error_palette_fidelity
		(
			source_tonal_palette,
			secondary,
			tertiary_source_color.if_disliked_corrected().tonal_palette,
			neutral,
			neutral_variant
		)
	}
	
	/**
	 * @internal
	 * @param source_color
	 */
	static scheme_palettes(source_color: NonNullable<TonalPalette>): [NonNullable<Palettes>, Variant.Ordinary]
	{
		// @ts-ignore
		return Palettes.from_source_colors(source_color, false, {})
	}
	
	/**
	 * @internal
	 * @param source_color
	 */
	static scheme_palettes_content(source_color: NonNullable<TonalPalette>): [NonNullable<Palettes>, Variant.Fidelity]
	{
		// @ts-ignore
		return Palettes.from_source_colors(source_color, true, {})
	}
	
	/**
	 * @internal
	 * @param source_color
	 */
	static scheme_content(source_color: NonNullable<HueChromaToneCoordinates>): [NonNullable<Palettes>, Variant.Fidelity]
	{
		return Palettes.#scheme_content_or_fidelity(source_color, source_color.analogous_by_temperature_last(3, 6))
	}
	
	/**
	 * @internal
	 * @param source_color
	 */
	static scheme_fidelity(source_color: NonNullable<HueChromaToneCoordinates>): [NonNullable<Palettes>, Variant.Fidelity]
	{
		return Palettes.#scheme_content_or_fidelity(source_color, source_color.complement_by_temperature())
	}
	
	/**
	 * @internal
	 * @param source_color
	 */
	static scheme_monochrome(source_color: NonNullable<TonalPalette>): [NonNullable<Palettes>, Variant.Monochrome]
	{
		const source_hue = source_color.hue
		const all_palettes = source_hue.with_chroma(Chroma.Zero)
		
		return Palettes.#with_default_error_palette_monochrome
		(
			all_palettes,
			all_palettes,
			all_palettes,
			all_palettes,
			all_palettes
		)
	}
	
	/**
	 * @internal
	 * @param source_color
	 */
	static scheme_fruit_salad(source_color: NonNullable<TonalPalette>): [NonNullable<Palettes>, Variant.Ordinary]
	{
		const source_hue = source_color.hue
		const rotated_hue = source_hue.rotate(FiniteNumber.NegativeFifty)
		
		return Palettes.#with_default_error_palette_ordinary
		(
			rotated_hue.with_chroma(Chroma.FortyEight),
			rotated_hue.with_chroma(Chroma.ThirtySix),
			source_hue.with_chroma(Chroma.ThirtySix),
			source_hue.with_chroma(Chroma.Ten),
			source_hue.with_chroma(Chroma.Sixteen),
		)
	}
	
	/**
	 * @internal
	 * @param source_color
	 */
	static scheme_neutral(source_color: NonNullable<TonalPalette>): [NonNullable<Palettes>, Variant.Ordinary]
	{
		const source_hue = source_color.hue
		
		return Palettes.#with_default_error_palette_ordinary
		(
			source_hue.with_chroma(Chroma.Twelve),
			source_hue.with_chroma(Chroma.Eight),
			source_hue.with_chroma(Chroma.Sixteen),
			source_hue.with_chroma(Chroma.Two),
			source_hue.with_chroma(Chroma.Two),
		)
	}
	
	/**
	 * @internal
	 * @param source_color
	 */
	static scheme_rainbow(source_color: NonNullable<TonalPalette>): [NonNullable<Palettes>, Variant.Ordinary]
	{
		const source_hue = source_color.hue
		
		return Palettes.#with_default_error_palette_ordinary
		(
			source_hue.with_chroma(Chroma.FortyEight),
			source_hue.with_chroma(Chroma.Sixteen),
			source_hue.rotate(FiniteNumber.Sixty).with_chroma(Chroma.TwentyFour),
			source_hue.with_chroma(Chroma.Zero),
			source_hue.with_chroma(Chroma.Zero),
		)
	}
	
	/**
	 * @internal
	 * @param source_color
	 */
	static scheme_tonal_spot(source_color: NonNullable<TonalPalette>): [NonNullable<Palettes>, Variant.Ordinary]
	{
		const source_hue = source_color.hue
		
		return Palettes.#with_default_error_palette_ordinary
		(
			source_hue.with_chroma(Chroma.ThirtySix),
			source_hue.with_chroma(Chroma.Sixteen),
			source_hue.rotate(FiniteNumber.Sixty).with_chroma(Chroma.TwentyFour),
			source_hue.with_chroma(Chroma.Six),
			source_hue.with_chroma(Chroma.Eight),
		)
	}
	
	/**
	 * @internal
	 * @param source_color
	 */
	static scheme_vibrant(source_color: NonNullable<TonalPalette>): [NonNullable<Palettes>, Variant.Ordinary]
	{
		const source_hue = source_color.hue
		
		return Palettes.#with_hue_rotations
		(
			source_hue,
			source_hue.with_chroma(Chroma.TwoHundred),
			Palettes.#VibrantHueSecondaryRotations,
			Palettes.#VibrantHueTertiaryRotations,
			source_hue.with_chroma(Chroma.Ten),
			source_hue.with_chroma(Chroma.Twelve),
		)
	}
	
	/**
	 * @internal
	 * @param source_color
	 */
	static scheme_expressive(source_color: NonNullable<TonalPalette>): [NonNullable<Palettes>, Variant.Ordinary]
	{
		const source_hue = source_color.hue
		
		return Palettes.#with_hue_rotations
		(
			source_hue,
			source_hue.rotate(FiniteNumber.TwoHundredAndForty).with_chroma(Chroma.Forty),
			Palettes.#ExpressiveHueSecondaryRotations,
			Palettes.#ExpressiveHueTertiaryRotations,
			source_hue.rotate(FiniteNumber.Fifteen).with_chroma(Chroma.Eight),
			source_hue.rotate(FiniteNumber.Fifteen).with_chroma(Chroma.Twelve),
		)
	}
	
	public choose_palette(this: NonNullable<this>, palette_choice: PaletteChoice): NonNullable<TonalPalette>
	{
		switch (palette_choice)
		{
			case PaletteChoice.Primary:
				return this.primary
			
			case PaletteChoice.Secondary:
				return this.secondary
			
			case PaletteChoice.Tertiary:
				return this.tertiary
			
			case PaletteChoice.Neutral:
				return this.neutral
			
			case PaletteChoice.NeutralVariant:
				return this.slightly_more_colorful_than_neutral
			
			case PaletteChoice.Error:
				return this.error
			
			default:
				throw new RangeError("Invalid value of palette_choice")
		}
	}
	
	/// A colourful palette.
	public get primary(): NonNullable<TonalPalette>
	{
		return this.#primary
	}
	
	/// A less colourful palette than the colourful palette, but with the same hue.
	public get secondary(): NonNullable<TonalPalette>
	{
		return this.#secondary
	}
	
	/// A colourful palette but with a hue typically rotated clockwise by 60° to the colourful palette.
	public get tertiary(): NonNullable<TonalPalette>
	{
		return this.#tertiary
	}
	
	/// Usually not colorful at all, intended for background & surface colors.
	public get neutral(): NonNullable<TonalPalette>
	{
		return this.#neutral
	}
	
	/// Usually not colorful, but slightly more colorful than neutral; intended for backgrounds & surfaces.
	public get slightly_more_colorful_than_neutral(): NonNullable<TonalPalette>
	{
		return this.#neutral_variant
	}
	
	public get error(): NonNullable<TonalPalette>
	{
		return this.#error
	}
	
	static #ExpressiveHueRotations: NonEmptyArray<HueAndSecondaryRotationAndTertiaryRotation> =
	[
		[Hue.try_from(0),   FiniteNumber.FourtyFive, FiniteNumber.OneHundredAndTwenty],
		[Hue.try_from(21),  FiniteNumber.NinetyFive, FiniteNumber.OneHundredAndTwenty],
		[Hue.try_from(51),  FiniteNumber.FourtyFive, FiniteNumber.Twenty             ],
		[Hue.try_from(121), FiniteNumber.Twenty,     FiniteNumber.FourtyFive         ],
		[Hue.try_from(151), FiniteNumber.FourtyFive, FiniteNumber.Twenty             ],
		[Hue.try_from(191), FiniteNumber.Ninety,     FiniteNumber.Fifteen            ],
		[Hue.try_from(271), FiniteNumber.FourtyFive, FiniteNumber.Twelve             ],
		[Hue.try_from(321), FiniteNumber.FourtyFive, FiniteNumber.OneHundredAndTwenty],
		[Hue.try_from(0),   FiniteNumber.FourtyFive, FiniteNumber.OneHundredAndTwenty],
	]
	static #ExpressiveHueSecondaryRotations: NonEmptyArray<HueAndRotation> = Palettes.#get_hue_and_rotations(Palettes.#ExpressiveHueRotations, true)
	static #ExpressiveHueTertiaryRotations: NonEmptyArray<HueAndRotation> = Palettes.#get_hue_and_rotations(Palettes.#ExpressiveHueRotations, false)
	
	static #VibrantHueRotations: NonEmptyArray<HueAndSecondaryRotationAndTertiaryRotation> =
	[
		[Hue.try_from(0),   FiniteNumber.Eighteen, FiniteNumber.ThirtyFive],
		[Hue.try_from(41),  FiniteNumber.Fifteen,  FiniteNumber.Thirty    ],
		[Hue.try_from(61),  FiniteNumber.Ten,      FiniteNumber.Twenty    ],
		[Hue.try_from(101), FiniteNumber.Twelve,   FiniteNumber.TwentyFive],
		[Hue.try_from(131), FiniteNumber.Fifteen,  FiniteNumber.Thirty    ],
		[Hue.try_from(181), FiniteNumber.Eighteen, FiniteNumber.ThirtyFive],
		[Hue.try_from(251), FiniteNumber.Fifteen,  FiniteNumber.Thirty    ],
		[Hue.try_from(301), FiniteNumber.Twelve,   FiniteNumber.TwentyFive],
		[Hue.try_from(0),   FiniteNumber.Twelve,   FiniteNumber.TwentyFive],
	]
	static #VibrantHueSecondaryRotations: NonEmptyArray<HueAndRotation> = Palettes.#get_hue_and_rotations(Palettes.#VibrantHueRotations, true)
	static #VibrantHueTertiaryRotations: NonEmptyArray<HueAndRotation> = Palettes.#get_hue_and_rotations(Palettes.#VibrantHueRotations, false)
	
	/**
	 * Support design spec'ing Dynamic Color by schemes that specify hue rotations that should be applied at certain breakpoints.
	 * @param source_hue the source color of the theme, in HCT.
	 * @param hue_and_rotations hues The "breakpoints", ie the hues at which a rotation should be applied.
	 * @param hue_and_rotations rotations The rotation that should be applied when source color's hue is >= the same index in hues array, and <= the hue at the next index in hues array.
	 */
	static #get_rotated_hue(source_hue: NonNullable<Hue>, hue_and_rotations: NonEmptyArray<HueAndRotation>)
	{
		if (hue_and_rotations.length === 0)
		{
			throw new RangeError("both must have at least one element")
		}
		
		if (hue_and_rotations.length === 1)
		{
			const [_, rotation] = hue_and_rotations[0]
			return source_hue.rotate(rotation)
		}
		
		const size = hue_and_rotations.length
		for (let index = 0; index <= size - 2; index++)
		{
			const [this_hue, this_rotation] = safe_array_access(hue_and_rotations, index)
			
			const [next_hue, _] = safe_array_access(hue_and_rotations, index + 1)
			
			// Problem: does not work with rotation of 360deg
			if (this_hue < source_hue && source_hue < next_hue)
			{
				return source_hue.rotate(this_rotation)
			}
		}
		
		// If this statement executes, something is wrong, there should have been a rotation found.
		return source_hue
	}
	
	static #get_hue_and_rotations(hue_and_secondary_rotations_and_primary_rotations: NonEmptyArray<HueAndSecondaryRotationAndTertiaryRotation>, pick_secondary_rotation: boolean): NonEmptyArray<HueAndRotation>
	{
		const hue_and_rotations: HueAndRotation[] = []
		
		const size = hue_and_secondary_rotations_and_primary_rotations.length
		for (let index = 0; index <= size; index++)
		{
			const [hue, secondary_rotation, tertiary_rotation] = safe_array_access(hue_and_secondary_rotations_and_primary_rotations, index)
			const element: HueAndRotation = [hue, pick_secondary_rotation ? secondary_rotation : tertiary_rotation]
			hue_and_rotations.push(element)
		}
		
		// @ts-ignore
		return hue_and_rotations
	}
}

function safe_array_access<T>(values: NonEmptyArray<T>, index: number): T
{
	const value = values[index]
	if (value === undefined)
	{
		throw new RangeError(`invalid array index ${index}`)
	}
	return value
}

type NonEmptyArray<T> = [T, ...T[]]

type HueAndRotation = readonly [NonNullable<Hue>, NonNullable<FiniteNumber>]

type HueAndSecondaryRotationAndTertiaryRotation = readonly [NonNullable<Hue>, NonNullable<FiniteNumber>, NonNullable<FiniteNumber>]
