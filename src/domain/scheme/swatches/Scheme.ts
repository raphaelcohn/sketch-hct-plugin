// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {Palettes} from "../palettes/Palettes";
import {Variant} from "../palettes/Variant";
import {HueChromaToneCoordinates, TonalPalette, Tone} from "../../color_space/hct";
import {SchemeGenerationRule} from "./SchemeGenerationRule";
import {ViewingConditions} from "../ViewingConditions";
import {Swatch} from "./index";
import {ContrastLevel} from "../../contrast";
import {ThemePair} from "../ThemePair";

/**
 * Conventionally, primary and tertiary colors are the most visually prominent in the scheme, with tertiary appearing complementary to primary by changing its hue.
 * Secondary, neutral variant, and neutral colors match primary in hue but are progressively less chromatic in that order.
 * Input your colors into the appropriate category to maintain similar relationships as designed by Material, and ensure expected and visually pleasing results when those colors are mapped to components.
 * If the colors provided back from your input color appear differently than expected, you can enable or disable color fidelity.
 */
export class Scheme
{
	/**
	 *
	 * @param source_color_tone Used for the fidelity variant of ContainerSwatch.Primary and ContainerSwatch.Tertiary.
	 * @param palettes
	 * @param variant
	 * @private
	 */
	private constructor(readonly source_color_tone: NonNullable<Tone>, readonly palettes: NonNullable<Palettes>, readonly variant: Variant)
	{
	}
	
	public swatch_color_pair(this: NonNullable<this>, swatch: NonNullable<Swatch>, contrast_level: NonNullable<ContrastLevel>): NonNullable<ThemePair<HueChromaToneCoordinates>>
	{
		const dark = this.swatch_color(swatch, ViewingConditions.dark(contrast_level))
		const light = this.swatch_color(swatch, ViewingConditions.light(contrast_level))
		return new ThemePair(dark, light)
	}
	
	public swatch_color(this: NonNullable<this>, swatch: NonNullable<Swatch>, viewing_conditions: NonNullable<ViewingConditions>): NonNullable<HueChromaToneCoordinates>
	{
		let color = swatch.choose_palette(this.palettes)
		let tone = swatch.tone(this, viewing_conditions);
		return color.with_tone(tone)
	}
	
	/**
	 * @internal
	 */
	as_fidelity(this: NonNullable<this>): NonNullable<Scheme>
	{
		return new Scheme(this.source_color_tone, this.palettes, Variant.Fidelity)
	}
	
	public static generate(scheme_generation_rule: SchemeGenerationRule, source_color: NonNullable<HueChromaToneCoordinates>): NonNullable<Scheme>
	{
		type palette_scheme_function_type = (source_color: any) => [NonNullable<Palettes>, Variant]
		let palettes_generator: (source_color: NonNullable<HueChromaToneCoordinates>, palette_scheme_function: palette_scheme_function_type) => [NonNullable<Palettes>, Variant]
		let palette_scheme_function: palette_scheme_function_type
		
		switch (scheme_generation_rule)
		{
			case SchemeGenerationRule.Content:
				palettes_generator = generate_temperature
				palette_scheme_function = Palettes.scheme_content
				break
			
			case SchemeGenerationRule.Fidelity:
				palettes_generator = generate_temperature
				palette_scheme_function = Palettes.scheme_fidelity
				break
			
			case SchemeGenerationRule.Monochrome:
				palettes_generator = generate_tonal_palette
				palette_scheme_function = Palettes.scheme_monochrome
				break
			
			case SchemeGenerationRule.FruitSalad:
				palettes_generator = generate_tonal_palette
				palette_scheme_function = Palettes.scheme_fruit_salad
				break
			
			case SchemeGenerationRule.Neutral:
				palettes_generator = generate_tonal_palette
				palette_scheme_function = Palettes.scheme_neutral
				break
			
			case SchemeGenerationRule.Rainbow:
				palettes_generator = generate_tonal_palette
				palette_scheme_function = Palettes.scheme_rainbow
				break
			
			case SchemeGenerationRule.TonalSpot:
				palettes_generator = generate_tonal_palette
				palette_scheme_function = Palettes.scheme_tonal_spot
				break
			
			case SchemeGenerationRule.Vibrant:
				palettes_generator = generate_tonal_palette
				palette_scheme_function = Palettes.scheme_vibrant
				break
			
			case SchemeGenerationRule.Expressive:
				palettes_generator = generate_tonal_palette
				palette_scheme_function = Palettes.scheme_expressive
				break
			
			default:
				throw new RangeError("scheme_generation_rule is out of range")
		}
		
		const [palettes, variant] = palettes_generator(source_color, palette_scheme_function)
		return new Scheme(source_color.tone, palettes, variant)
	}
}

function generate_tonal_palette(source_color: NonNullable<HueChromaToneCoordinates>, callback: (source_color: NonNullable<TonalPalette>) => [NonNullable<Palettes>, Variant]): [NonNullable<Palettes>, Variant]
{
	return callback(source_color.tonal_palette)
}

function generate_temperature(source_color: NonNullable<HueChromaToneCoordinates>, callback: (source_color: NonNullable<HueChromaToneCoordinates>) => [NonNullable<Palettes>, Variant]): [NonNullable<Palettes>, Variant]
{
	return callback(source_color)
}
