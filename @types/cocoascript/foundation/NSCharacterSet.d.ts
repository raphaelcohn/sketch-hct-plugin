// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare namespace cocoascript
{
	/**
	 * An object representing a fixed set of Unicode character values for use in search operations.
	 * https://developer.apple.com/documentation/foundation/nscharacterset
	 */
	interface NSCharacterSet extends NSObject
	{
		alloc(): NSCharacterSet
		
		init(): NSCharacterSet
		
		// https://developer.apple.com/documentation/foundation/nscharacterset/1407466-alphanumericcharacterset
		alphanumericCharacterSet(): NSCharacterSet
		setAlphanumericCharacterSet(value: NSCharacterSet): void

		// https://developer.apple.com/documentation/foundation/nscharacterset/1414409-capitalizedlettercharacterset
		capitalizedLetterCharacterSet(): NSCharacterSet
		setCapitalizedLetterCharacterSet(value: NSCharacterSet): void

		// https://developer.apple.com/documentation/foundation/nscharacterset/1416371-controlcharacterset
		controlCharacterSet(): NSCharacterSet
		setControlCharacterSet(value: NSCharacterSet): void

		// https://developer.apple.com/documentation/foundation/nscharacterset/1408239-decimaldigitcharacterset
		decimalDigitCharacterSet(): NSCharacterSet
		setDecimalDigitCharacterSet(value: NSCharacterSet): void

		// https://developer.apple.com/documentation/foundation/nscharacterset/1416868-decomposablecharacterset
		decomposableCharacterSet(): NSCharacterSet
		setDecomposableCharacterSet(value: NSCharacterSet): void

		// https://developer.apple.com/documentation/foundation/nscharacterset/1416321-illegalcharacterset
		illegalCharacterSet(): NSCharacterSet
		setIllegalCharacterSet(value: NSCharacterSet): void

		// https://developer.apple.com/documentation/foundation/nscharacterset/1408569-lettercharacterset
		letterCharacterSet(): NSCharacterSet
		setLetterCharacterSet(value: NSCharacterSet): void

		// https://developer.apple.com/documentation/foundation/nscharacterset/1417123-lowercaselettercharacterset
		lowercaseLetterCharacterSet(): NSCharacterSet
		setLowercaseLetterCharacterSet(value: NSCharacterSet): void

		// https://developer.apple.com/documentation/foundation/nscharacterset/1416730-newlinecharacterset
		newlineCharacterSet(): NSCharacterSet
		setNewlineCharacterSet(value: NSCharacterSet): void

		// https://developer.apple.com/documentation/foundation/nscharacterset/1407836-nonbasecharacterset
		nonBaseCharacterSet(): NSCharacterSet
		setNonBaseCharacterSet(value: NSCharacterSet): void

		// https://developer.apple.com/documentation/foundation/nscharacterset/1411415-punctuationcharacterset
		punctuationCharacterSet(): NSCharacterSet
		setPunctuationCharacterSet(value: NSCharacterSet): void

		// https://developer.apple.com/documentation/foundation/nscharacterset/1410965-symbolcharacterset
		symbolCharacterSet(): NSCharacterSet
		setSymbolCharacterSet(value: NSCharacterSet): void

		// https://developer.apple.com/documentation/foundation/nscharacterset/1417569-uppercaselettercharacterset
		uppercaseLetterCharacterSet(): NSCharacterSet
		setUppercaseLetterCharacterSet(value: NSCharacterSet): void

		// https://developer.apple.com/documentation/foundation/nscharacterset/1413732-whitespaceandnewlinecharacterset
		whitespaceAndNewlineCharacterSet(): NSCharacterSet
		setWhitespaceAndNewlineCharacterSet(value: NSCharacterSet): void

		// https://developer.apple.com/documentation/foundation/nscharacterset/1416393-whitespacecharacterset
		whitespaceCharacterSet(): NSCharacterSet
		setWhitespaceCharacterSet(value: NSCharacterSet): void

		// https://developer.apple.com/documentation/foundation/nscharacterset/1412537-urlfragmentallowedcharacterset
		URLFragmentAllowedCharacterSet(): NSCharacterSet
		setURLFragmentAllowedCharacterSet(value: NSCharacterSet): void

		// https://developer.apple.com/documentation/foundation/nscharacterset/1416426-urlhostallowedcharacterset
		URLHostAllowedCharacterSet(): NSCharacterSet
		setURLHostAllowedCharacterSet(value: NSCharacterSet): void

		// https://developer.apple.com/documentation/foundation/nscharacterset/1417313-urlpasswordallowedcharacterset
		URLPasswordAllowedCharacterSet(): NSCharacterSet
		setURLPasswordAllowedCharacterSet(value: NSCharacterSet): void

		// https://developer.apple.com/documentation/foundation/nscharacterset/1416804-urlpathallowedcharacterset
		URLPathAllowedCharacterSet(): NSCharacterSet
		setURLPathAllowedCharacterSet(value: NSCharacterSet): void

		// https://developer.apple.com/documentation/foundation/nscharacterset/1416698-urlqueryallowedcharacterset
		URLQueryAllowedCharacterSet(): NSCharacterSet
		setURLQueryAllowedCharacterSet(value: NSCharacterSet): void

		// https://developer.apple.com/documentation/foundation/nscharacterset/1411851-urluserallowedcharacterset
		URLUserAllowedCharacterSet(): NSCharacterSet
		setURLUserAllowedCharacterSet(value: NSCharacterSet): void

		// // https://developer.apple.com/documentation/foundation/nscharacterset/1408497-initwithcoder
		// initWithCoder(coder: NSCoder): NSCharacterSet

		// https://developer.apple.com/documentation/foundation/nscharacterset/1414061-charactersetwithcharactersinstri
		characterSetWithCharactersInString(aString: string | cocoascript.NSString): NSCharacterSet

		// https://developer.apple.com/documentation/foundation/nscharacterset/1414398-charactersetwithrange
		characterSetWithRange(aRange: NSRange): NSCharacterSet

		// https://developer.apple.com/documentation/foundation/nscharacterset/1415042-charactersetwithbitmaprepresenta
		characterSetWithBitmapRepresentation(data: NSData): NSCharacterSet

		// https://developer.apple.com/documentation/foundation/nscharacterset/1418269-charactersetwithcontentsoffile
		characterSetWithContentsOfFile(fName: string | cocoascript.NSString): NSCharacterSet

		// https://developer.apple.com/documentation/foundation/nscharacterset/1417719-bitmaprepresentation
		bitmapRepresentation(): NSData
		setBitmapRepresentation(value: NSData): void

		// https://developer.apple.com/documentation/foundation/nscharacterset/1414025-invertedset
		invertedSet(): NSCharacterSet
		setInvertedSet(value: NSCharacterSet): void

		// https://developer.apple.com/documentation/foundation/nscharacterset/1407659-characterismember
		characterIsMember(aCharacter: unichar): boolean

		// https://developer.apple.com/documentation/foundation/nscharacterset/1412406-hasmemberinplane
		hasMemberInPlane(thePlane: number): boolean

		// https://developer.apple.com/documentation/foundation/nscharacterset/1415606-issupersetofset
		isSupersetOfSet(theOtherSet: NSCharacterSet): boolean

		// // https://developer.apple.com/documentation/foundation/nscharacterset/1409757-longcharacterismember
		// longCharacterIsMember(theLongChar: UTF32Char): boolean
	}
}
