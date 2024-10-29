// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {UppercaseHexadecimalSixDigitRedGreenBlueColorString} from "./UppercaseHexadecimalSixDigitRedGreenBlueColorString";
import {ExtendedColor} from "./ExtendedColor";
import {MaterialDesignScheme} from "./MaterialDesignScheme";
import {MaterialDesignPalette} from "./MaterialDesignPalette";

export interface MaterialTheme
{
	description: string,
	
	seed: UppercaseHexadecimalSixDigitRedGreenBlueColorString,
	
	coreColors:
	{
		primary: UppercaseHexadecimalSixDigitRedGreenBlueColorString,
		
		secondary?: UppercaseHexadecimalSixDigitRedGreenBlueColorString,
		
		tertiary?: UppercaseHexadecimalSixDigitRedGreenBlueColorString,
		
		error?: UppercaseHexadecimalSixDigitRedGreenBlueColorString,
		
		neutral?: UppercaseHexadecimalSixDigitRedGreenBlueColorString,
		
		neutralVariant?: UppercaseHexadecimalSixDigitRedGreenBlueColorString,
	}
	
	extendedColors: ExtendedColor[]
	
	schemes:
	{
		light: MaterialDesignScheme,
		
		["light-medium-contrast"]: MaterialDesignScheme,
		
		["light-high-contrast"]: MaterialDesignScheme,
		
		dark: MaterialDesignScheme,
		
		["dark-medium-contrast"]: MaterialDesignScheme,
		
		["dark-high-contrast"]: MaterialDesignScheme,
	}
	
	palettes:
	{
		primary: MaterialDesignPalette,
		
		secondary: MaterialDesignPalette,
		
		tertiary: MaterialDesignPalette,
		
		neutral: MaterialDesignPalette,
		
		["neutral-variant"]: MaterialDesignPalette,
	}
}
