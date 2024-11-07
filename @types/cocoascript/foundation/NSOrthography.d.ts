// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare namespace cocoascript
{
	/**
	 * A description of the linguistic content of natural language text, typically used for spelling and grammar checking.
	 * https://developer.apple.com/documentation/foundation/nsorthography
	 */
	interface NSOrthography extends NSObject
	{
		alloc(): NSOrthography
		
		init(): NSOrthography
		
		// https://developer.apple.com/documentation/foundation/nsorthography/2875843-defaultorthographyforlanguage
		defaultOrthographyForLanguage(language: string | NSString): NSOrthography
		
		// https://developer.apple.com/documentation/foundation/nsorthography/1408708-initwithdominantscript
		initWithDominantScript_languageMap(script: string | NSString, map: string | NSString): NSOrthography
		
		// https://developer.apple.com/documentation/foundation/nsorthography/1585529-orthographywithdominantscript
		orthographyWithDominantScript_languageMap(script: string | NSString, map: string | NSString): NSOrthography
		
		// https://developer.apple.com/documentation/foundation/nsorthography/1409533-languagemap
		languageMap(): string | NSString
		setLanguageMap(value: string | NSString): void
		
		// https://developer.apple.com/documentation/foundation/nsorthography/1415229-dominantlanguage
		dominantLanguage(): string | NSString
		setDominantLanguage(value: string | NSString): void
		
		// https://developer.apple.com/documentation/foundation/nsorthography/1407965-dominantscript
		dominantScript(): string | NSString
		setDominantScript(value: string | NSString): void
		
		// https://developer.apple.com/documentation/foundation/nsorthography/1407326-dominantlanguageforscript
		dominantLanguageForScript(script: string | NSString): NSString
		
		// https://developer.apple.com/documentation/foundation/nsorthography/1412606-languagesforscript
		languagesForScript(script: string | NSString): NSString
		
		// https://developer.apple.com/documentation/foundation/nsorthography/1410722-allscripts
		allScripts(): string | NSString
		setAllScripts(value: string | NSString): void
		
		// https://developer.apple.com/documentation/foundation/nsorthography/1416205-alllanguages
		allLanguages(): string | NSString
		setAllLanguages(value: string | NSString): void
		
		// // https://developer.apple.com/documentation/foundation/nsorthography/1408410-initwithcoder
		// initWithCoder(coder: NSCoder): NSOrthography
	}
}
