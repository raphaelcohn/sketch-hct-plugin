// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare namespace cocoascript
{
	/**
	 * A static, plain-text Unicode string object.
	 * https://developer.apple.com/documentation/foundation/nsstring
	 */
	interface NSString
	{
		alloc(): NSString
		
		// https://developer.apple.com/documentation/foundation/nsstring/1409306-init
		init(): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1497312-string
		string(): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1407339-initwithbytes
		initWithBytes_length_encoding(bytes: void, len: NSUInteger, encoding: NSStringEncoding): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1413830-initwithbytesnocopy
		initWithBytesNoCopy_length_encoding_freeWhenDone(bytes: void, len: NSUInteger, encoding: NSStringEncoding, freeBuffer: boolean): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1410997-initwithcharacters
		initWithCharacters_length(characters: unichar, length: NSUInteger): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1412121-initwithcharactersnocopy
		initWithCharactersNoCopy_length_freeWhenDone(characters: unichar, length: NSUInteger, freeBuffer: boolean): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1411293-initwithstring
		initWithString(aString: string | NSString): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1411950-initwithcstring
		initWithCString_encoding(nullTerminatedCString: string, encoding: NSStringEncoding): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1412128-initwithutf8string
		initWithUTF8String(nullTerminatedCString: string): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1497402-initwithformat
		initWithFormat(...format: Array<string | NSString>): NSString

		// // https://developer.apple.com/documentation/foundation/nsstring/1407827-initwithformat
		// initWithFormat_arguments(format: string | NSString, argList: va_list): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1497317-initwithformat
		initWithFormat_locale(format: string | NSString, ...locale: Array<id>): NSString

		// // https://developer.apple.com/documentation/foundation/nsstring/1408503-initwithformat
		// initWithFormat_locale_arguments(format: string | NSString, locale: string | NSString, argList: va_list): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1416374-initwithdata
		initWithData_encoding(data: NSData, encoding: NSStringEncoding): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1497275-stringwithformat
		stringWithFormat(...format: Array<string | NSString>): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1497301-localizedstringwithformat
		localizedStringWithFormat(...format: Array<string | NSString>): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1649585-localizedusernotificationstringf
		localizedUserNotificationStringForKey_arguments(key: string | NSString, arguments: NSArray): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1497248-stringwithcharacters
		stringWithCharacters_length(characters: unichar, length: NSUInteger): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1497372-stringwithstring
		stringWithString(string: string | NSString): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1497310-stringwithcstring
		stringWithCString_encoding(cString: string, enc: NSStringEncoding): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1497379-stringwithutf8string
		stringWithUTF8String(nullTerminatedCString: string): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1497327-stringwithcontentsoffile
		stringWithContentsOfFile_encoding_error(path: string | NSString, enc: NSStringEncoding, error: NSError): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1412610-initwithcontentsoffile
		initWithContentsOfFile_encoding_error(path: string | NSString, enc: NSStringEncoding, error: NSError): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1497254-stringwithcontentsoffile
		stringWithContentsOfFile_usedEncoding_error(path: string | NSString, enc: NSStringEncoding, error: NSError): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1418227-initwithcontentsoffile
		initWithContentsOfFile_usedEncoding_error(path: string | NSString, enc: NSStringEncoding, error: NSError): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1497360-stringwithcontentsofurl
		stringWithContentsOfURL_encoding_error(url: NSURL, enc: NSStringEncoding, error: NSError): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1414463-initwithcontentsofurl
		initWithContentsOfURL_encoding_error(url: NSURL, enc: NSStringEncoding, error: NSError): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1497408-stringwithcontentsofurl
		stringWithContentsOfURL_usedEncoding_error(url: NSURL, enc: NSStringEncoding, error: NSError): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1414472-initwithcontentsofurl
		initWithContentsOfURL_usedEncoding_error(url: NSURL, enc: NSStringEncoding, error: NSError): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1414212-length
		length(): NSUInteger
		setLength(value: NSUInteger): void

		// https://developer.apple.com/documentation/foundation/nsstring/1410710-lengthofbytesusingencoding
		lengthOfBytesUsingEncoding(enc: NSStringEncoding): NSUInteger

		// https://developer.apple.com/documentation/foundation/nsstring/1411611-maximumlengthofbytesusingencodin
		maximumLengthOfBytesUsingEncoding(enc: NSStringEncoding): NSUInteger

		// https://developer.apple.com/documentation/foundation/nsstring/1414645-characteratindex
		characterAtIndex(index: NSUInteger): unichar

		// https://developer.apple.com/documentation/foundation/nsstring/1408720-getcharacters
		getCharacters_range(buffer: unichar, range: NSRange): void

		// https://developer.apple.com/documentation/foundation/nsstring/1413453-getbytes
		getBytes_maxLength_usedLength_encoding_options_range_remainingRange(buffer: void, maxBufferCount: NSUInteger, usedBufferCount: NSUInteger, encoding: NSStringEncoding, options: NSStringEncodingConversionOptions, range: NSRange, leftover: NSRangePointer): boolean

		// https://developer.apple.com/documentation/foundation/nsstring/1408489-cstringusingencoding
		cStringUsingEncoding(encoding: NSStringEncoding): string

		// https://developer.apple.com/documentation/foundation/nsstring/1415702-getcstring
		getCString_maxLength_encoding(buffer: string, maxBufferCount: NSUInteger, encoding: NSStringEncoding): boolean

		// https://developer.apple.com/documentation/foundation/nsstring/1411189-utf8string
		UTF8String(): string
		setUTF8String(value: string): void

		// https://developer.apple.com/documentation/foundation/nsstring/1414769-caseinsensitivecompare
		caseInsensitiveCompare(string: string | NSString): NSComparisonResult

		// https://developer.apple.com/documentation/foundation/nsstring/1417333-localizedcaseinsensitivecompare
		localizedCaseInsensitiveCompare(string: string | NSString): NSComparisonResult

		// https://developer.apple.com/documentation/foundation/nsstring/1414082-compare
		compare(string: string | NSString): NSComparisonResult

		// https://developer.apple.com/documentation/foundation/nsstring/1416999-localizedcompare
		localizedCompare(string: string | NSString): NSComparisonResult

		// https://developer.apple.com/documentation/foundation/nsstring/1410893-compare
		compare_options(string: string | NSString, mask: NSStringCompareOptions): NSComparisonResult

		// https://developer.apple.com/documentation/foundation/nsstring/1408732-compare
		compare_options_range(string: string | NSString, mask: NSStringCompareOptions, rangeOfReceiverToCompare: NSRange): NSComparisonResult

		// https://developer.apple.com/documentation/foundation/nsstring/1414561-compare
		compare_options_range_locale(string: string | NSString, mask: NSStringCompareOptions, rangeOfReceiverToCompare: NSRange, locale: string | NSString): NSComparisonResult

		// https://developer.apple.com/documentation/foundation/nsstring/1409742-localizedstandardcompare
		localizedStandardCompare(string: string | NSString): NSComparisonResult

		// https://developer.apple.com/documentation/foundation/nsstring/1410309-hasprefix
		hasPrefix(str: string | NSString): boolean

		// https://developer.apple.com/documentation/foundation/nsstring/1416529-hassuffix
		hasSuffix(str: string | NSString): boolean

		// https://developer.apple.com/documentation/foundation/nsstring/1407803-isequaltostring
		isEqualToString(aString: string | NSString): boolean

		// https://developer.apple.com/documentation/foundation/nsstring/1417245-hash
		hash(): NSUInteger
		setHash(value: NSUInteger): void

		// https://developer.apple.com/documentation/foundation/nsstring/1497272-stringbyappendingformat
		stringByAppendingFormat(...format: Array<string | NSString>): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1412307-stringbyappendingstring
		stringByAppendingString(aString: string | NSString): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1416395-stringbypaddingtolength
		stringByPaddingToLength_withString_startingAtIndex(newLength: NSUInteger, padString: string | NSString, padIndex: NSUInteger): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1408467-lowercasestring
		lowercaseString(): string | NSString
		setLowercaseString(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsstring/1414125-localizedlowercasestring
		localizedLowercaseString(): string | NSString
		setLocalizedLowercaseString(value: string | NSString): void

		// // https://developer.apple.com/documentation/foundation/nsstring/1417298-lowercasestringwithlocale
		// lowercaseStringWithLocale(locale: NSLocale): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1409855-uppercasestring
		uppercaseString(): string | NSString
		setUppercaseString(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsstring/1413331-localizeduppercasestring
		localizedUppercaseString(): string | NSString
		setLocalizedUppercaseString(value: string | NSString): void

		// // https://developer.apple.com/documentation/foundation/nsstring/1413316-uppercasestringwithlocale
		// uppercaseStringWithLocale(locale: NSLocale): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1416784-capitalizedstring
		capitalizedString(): string | NSString
		setCapitalizedString(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsstring/1414885-localizedcapitalizedstring
		localizedCapitalizedString(): string | NSString
		setLocalizedCapitalizedString(value: string | NSString): void

		// // https://developer.apple.com/documentation/foundation/nsstring/1414023-capitalizedstringwithlocale
		// capitalizedStringWithLocale(locale: NSLocale): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1413214-componentsseparatedbystring
		componentsSeparatedByString(separator: string | NSString): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1410120-componentsseparatedbycharactersi
		componentsSeparatedByCharactersInSet(separator: NSCharacterSet): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1415462-stringbytrimmingcharactersinset
		stringByTrimmingCharactersInSet(set: NSCharacterSet): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1414368-substringfromindex
		substringFromIndex(from: NSUInteger): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1418469-substringwithrange
		substringWithRange(range: NSRange): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1408017-substringtoindex
		substringToIndex(to: NSUInteger): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1409474-decomposedstringwithcanonicalmap
		decomposedStringWithCanonicalMapping(): string | NSString
		setDecomposedStringWithCanonicalMapping(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsstring/1415417-decomposedstringwithcompatibilit
		decomposedStringWithCompatibilityMapping(): string | NSString
		setDecomposedStringWithCompatibilityMapping(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsstring/1412645-precomposedstringwithcanonicalma
		precomposedStringWithCanonicalMapping(): string | NSString
		setPrecomposedStringWithCanonicalMapping(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsstring/1412625-precomposedstringwithcompatibili
		precomposedStringWithCompatibilityMapping(): string | NSString
		setPrecomposedStringWithCompatibilityMapping(value: string | NSString): void

		// // https://developer.apple.com/documentation/foundation/nsstring/1413779-stringbyfoldingwithoptions
		// stringByFoldingWithOptions_locale(options: NSStringCompareOptions, locale: NSLocale): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1407787-stringbyapplyingtransform
		stringByApplyingTransform_reverse(transform: NSStringTransform, reverse: boolean): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1414563-containsstring
		containsString(str: string | NSString): boolean

		// https://developer.apple.com/documentation/foundation/nsstring/1412098-localizedcaseinsensitivecontains
		localizedCaseInsensitiveContainsString(str: string | NSString): boolean

		// https://developer.apple.com/documentation/foundation/nsstring/1416328-localizedstandardcontainsstring
		localizedStandardContainsString(str: string | NSString): boolean

		// https://developer.apple.com/documentation/foundation/nsstring/1411930-rangeofcharacterfromset
		rangeOfCharacterFromSet(searchSet: NSCharacterSet): NSRange

		// https://developer.apple.com/documentation/foundation/nsstring/1416898-rangeofcharacterfromset
		rangeOfCharacterFromSet_options(searchSet: NSCharacterSet, mask: NSStringCompareOptions): NSRange

		// https://developer.apple.com/documentation/foundation/nsstring/1411461-rangeofcharacterfromset
		rangeOfCharacterFromSet_options_range(searchSet: NSCharacterSet, mask: NSStringCompareOptions, rangeOfReceiverToSearch: NSRange): NSRange

		// https://developer.apple.com/documentation/foundation/nsstring/1410144-rangeofstring
		rangeOfString(searchString: string | NSString): NSRange

		// https://developer.apple.com/documentation/foundation/nsstring/1416849-rangeofstring
		rangeOfString_options(searchString: string | NSString, mask: NSStringCompareOptions): NSRange

		// https://developer.apple.com/documentation/foundation/nsstring/1415073-rangeofstring
		rangeOfString_options_range(searchString: string | NSString, mask: NSStringCompareOptions, rangeOfReceiverToSearch: NSRange): NSRange

		// // https://developer.apple.com/documentation/foundation/nsstring/1417348-rangeofstring
		// rangeOfString_options_range_locale(searchString: string | NSString, mask: NSStringCompareOptions, rangeOfReceiverToSearch: NSRange, locale: NSLocale): NSRange

		// https://developer.apple.com/documentation/foundation/nsstring/1413574-localizedstandardrangeofstring
		localizedStandardRangeOfString(str: string | NSString): NSRange

		// https://developer.apple.com/documentation/foundation/nsstring/1408459-enumeratelinesusingblock
		enumerateLinesUsingBlock(block: boolean): void

		// https://developer.apple.com/documentation/foundation/nsstring/1416774-enumeratesubstringsinrange
		enumerateSubstringsInRange_options_usingBlock(range: NSRange, opts: NSStringEnumerationOptions, block: boolean): void

		// https://developer.apple.com/documentation/foundation/nsstring/1412937-stringbyreplacingoccurrencesofst
		stringByReplacingOccurrencesOfString_withString(target: string | NSString, replacement: string | NSString): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1416484-stringbyreplacingoccurrencesofst
		stringByReplacingOccurrencesOfString_withString_options_range(target: string | NSString, replacement: string | NSString, options: NSStringCompareOptions, searchRange: NSRange): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1410029-stringbyreplacingcharactersinran
		stringByReplacingCharactersInRange_withString(range: NSRange, replacement: string | NSString): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1408169-commonprefixwithstring
		commonPrefixWithString_options(str: string | NSString, mask: NSStringCompareOptions): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1412161-enumeratelinguistictagsinrange
		enumerateLinguisticTagsInRange_scheme_options_orthography_usingBlock(range: NSRange, scheme: NSLinguisticTagScheme, options: NSLinguisticTaggerOptions, orthography: NSOrthography, block: boolean): void

		// https://developer.apple.com/documentation/foundation/nsstring/1416530-linguistictagsinrange
		linguisticTagsInRange_scheme_options_orthography_tokenRanges(range: NSRange, scheme: NSLinguisticTagScheme, options: NSLinguisticTaggerOptions, orthography: NSOrthography, tokenRanges: NSValue): NSLinguisticTag

		// https://developer.apple.com/documentation/foundation/nsstring/1415111-getlinestart
		getLineStart_end_contentsEnd_forRange(startPtr: NSUInteger, lineEndPtr: NSUInteger, contentsEndPtr: NSUInteger, range: NSRange): void

		// https://developer.apple.com/documentation/foundation/nsstring/1407736-linerangeforrange
		lineRangeForRange(range: NSRange): NSRange

		// https://developer.apple.com/documentation/foundation/nsstring/1416407-getparagraphstart
		getParagraphStart_end_contentsEnd_forRange(startPtr: NSUInteger, parEndPtr: NSUInteger, contentsEndPtr: NSUInteger, range: NSRange): void

		// https://developer.apple.com/documentation/foundation/nsstring/1408548-paragraphrangeforrange
		paragraphRangeForRange(range: NSRange): NSRange

		// https://developer.apple.com/documentation/foundation/nsstring/1416036-rangeofcomposedcharactersequence
		rangeOfComposedCharacterSequenceAtIndex(index: NSUInteger): NSRange

		// https://developer.apple.com/documentation/foundation/nsstring/1410993-rangeofcomposedcharactersequence
		rangeOfComposedCharacterSequencesForRange(range: NSRange): NSRange

		// https://developer.apple.com/documentation/foundation/nsstring/1407654-writetofile
		writeToFile_atomically_encoding_error(path: string | NSString, useAuxiliaryFile: boolean, enc: NSStringEncoding, error: NSError): boolean

		// https://developer.apple.com/documentation/foundation/nsstring/1417341-writetourl
		writeToURL_atomically_encoding_error(url: NSURL, useAuxiliaryFile: boolean, enc: NSStringEncoding, error: NSError): boolean

		// https://developer.apple.com/documentation/foundation/nsstring/1413115-propertylist
		propertyList(): NSString

		// // https://developer.apple.com/documentation/foundation/nsstring/1407697-propertylistfromstringsfileforma
		// propertyListFromStringsFileFormat(): NSDictionary

		// https://developer.apple.com/documentation/foundation/nsstring/1533109-drawatpoint
		drawAtPoint_withAttributes(point: CGPoint, attrs: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsstring/1529855-drawinrect
		drawInRect_withAttributes(rect: CGRect, attrs: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsstring/1530195-drawwithrect
		drawWithRect_options_attributes_context(rect: CGRect, options: NSStringDrawingOptions, attributes: string | NSString, context: NSStringDrawingContext): void

		// https://developer.apple.com/documentation/foundation/nsstring/1524729-boundingrectwithsize
		boundingRectWithSize_options_attributes_context(size: CGSize, options: NSStringDrawingOptions, attributes: string | NSString, context: NSStringDrawingContext): CGRect

		// https://developer.apple.com/documentation/foundation/nsstring/1531844-sizewithattributes
		sizeWithAttributes(attrs: string | NSString): CGSize

		// https://developer.apple.com/documentation/foundation/nsstring/1413104-variantfittingpresentationwidth
		variantFittingPresentationWidth(width: NSInteger): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1414031-doublevalue
		doubleValue(): number
		setDoubleValue(value: number): void

		// https://developer.apple.com/documentation/foundation/nsstring/1412321-floatvalue
		floatValue(): number
		setFloatValue(value: number): void

		// https://developer.apple.com/documentation/foundation/nsstring/1414988-intvalue
		intValue(): number
		setIntValue(value: number): void

		// https://developer.apple.com/documentation/foundation/nsstring/1410267-integervalue
		integerValue(): NSInteger
		setIntegerValue(value: NSInteger): void

		// https://developer.apple.com/documentation/foundation/nsstring/1417731-longlongvalue
		longLongValue(): number
		setLongLongValue(value: number): void

		// https://developer.apple.com/documentation/foundation/nsstring/1409420-boolvalue
		boolValue(): boolean
		setBoolValue(value: boolean): void

		// https://developer.apple.com/documentation/foundation/nsstring/1417579-availablestringencodings
		availableStringEncodings(): NSStringEncoding
		setAvailableStringEncodings(value: NSStringEncoding): void

		// https://developer.apple.com/documentation/foundation/nsstring/1410091-defaultcstringencoding
		defaultCStringEncoding(): NSStringEncoding
		setDefaultCStringEncoding(value: NSStringEncoding): void

		// https://developer.apple.com/documentation/foundation/nsstring/1413576-stringencodingfordata
		stringEncodingForData_encodingOptions_convertedString_usedLossyConversion(data: NSData, opts: string | NSString, string: string | NSString, usedLossyConversion: boolean): NSStringEncoding

		// https://developer.apple.com/documentation/foundation/nsstring/1408318-localizednameofstringencoding
		localizedNameOfStringEncoding(encoding: NSStringEncoding): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1409496-canbeconvertedtoencoding
		canBeConvertedToEncoding(encoding: NSStringEncoding): boolean

		// https://developer.apple.com/documentation/foundation/nsstring/1416696-datausingencoding
		dataUsingEncoding(encoding: NSStringEncoding): NSData

		// https://developer.apple.com/documentation/foundation/nsstring/1413692-datausingencoding
		dataUsingEncoding_allowLossyConversion(encoding: NSStringEncoding, lossy: boolean): NSData

		// https://developer.apple.com/documentation/foundation/nsstring/1410889-description
		description(): string | NSString
		setDescription(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsstring/1409567-fastestencoding
		fastestEncoding(): NSStringEncoding
		setFastestEncoding(value: NSStringEncoding): void

		// https://developer.apple.com/documentation/foundation/nsstring/1418037-smallestencoding
		smallestEncoding(): NSStringEncoding
		setSmallestEncoding(value: NSStringEncoding): void

		// https://developer.apple.com/documentation/foundation/nsstring/1417198-pathwithcomponents
		pathWithComponents(components: string | NSString): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1414489-pathcomponents
		pathComponents(): string | NSString
		setPathComponents(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsstring/1411841-completepathintostring
		completePathIntoString_caseSensitive_matchesIntoArray_filterTypes(outputName: string | NSString, flag: boolean, outputArray: string | NSString, filterTypes: string | NSString): NSUInteger

		// https://developer.apple.com/documentation/foundation/nsstring/1414559-filesystemrepresentation
		fileSystemRepresentation(): string
		setFileSystemRepresentation(value: string): void

		// https://developer.apple.com/documentation/foundation/nsstring/1410269-getfilesystemrepresentation
		getFileSystemRepresentation_maxLength(cname: string, max: NSUInteger): boolean

		// https://developer.apple.com/documentation/foundation/nsstring/1409068-absolutepath
		absolutePath(): boolean
		setAbsolutePath(value: boolean): void

		// https://developer.apple.com/documentation/foundation/nsstring/1416528-lastpathcomponent
		lastPathComponent(): string | NSString
		setLastPathComponent(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsstring/1407801-pathextension
		pathExtension(): string | NSString
		setPathExtension(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsstring/1407943-stringbyabbreviatingwithtildeinp
		stringByAbbreviatingWithTildeInPath(): string | NSString
		setStringByAbbreviatingWithTildeInPath(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsstring/1417069-stringbyappendingpathcomponent
		stringByAppendingPathComponent(str: string | NSString): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1412501-stringbyappendingpathextension
		stringByAppendingPathExtension(str: string | NSString): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1411141-stringbydeletinglastpathcomponen
		stringByDeletingLastPathComponent(): string | NSString
		setStringByDeletingLastPathComponent(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsstring/1418214-stringbydeletingpathextension
		stringByDeletingPathExtension(): string | NSString
		setStringByDeletingPathExtension(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsstring/1407716-stringbyexpandingtildeinpath
		stringByExpandingTildeInPath(): string | NSString
		setStringByExpandingTildeInPath(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsstring/1417783-stringbyresolvingsymlinksinpath
		stringByResolvingSymlinksInPath(): string | NSString
		setStringByResolvingSymlinksInPath(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsstring/1407194-stringbystandardizingpath
		stringByStandardizingPath(): string | NSString
		setStringByStandardizingPath(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsstring/1415100-stringsbyappendingpaths
		stringsByAppendingPaths(paths: string | NSString): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1411946-stringbyaddingpercentencodingwit
		stringByAddingPercentEncodingWithAllowedCharacters(allowedCharacters: NSCharacterSet): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1409569-stringbyremovingpercentencoding
		stringByRemovingPercentEncoding(): string | NSString
		setStringByRemovingPercentEncoding(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsstring/1497289-stringwithcstring
		stringWithCString(bytes: string): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1497394-initwithcstring
		initWithCString(bytes: string): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1497290-stringwithcstring
		stringWithCString_length(bytes: string, length: NSUInteger): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1497403-initwithcstring
		initWithCString_length(bytes: string, length: NSUInteger): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1497281-initwithcstringnocopy
		initWithCStringNoCopy_length_freeWhenDone(bytes: string, length: NSUInteger, freeBuffer: boolean): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1497269-stringwithcontentsoffile
		stringWithContentsOfFile(path: string | NSString): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1497398-initwithcontentsoffile
		initWithContentsOfFile(path: string | NSString): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1497368-stringwithcontentsofurl
		stringWithContentsOfURL(url: NSURL): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1497390-initwithcontentsofurl
		initWithContentsOfURL(url: NSURL): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1497362-writetofile
		writeToFile_atomically(path: string | NSString, useAuxiliaryFile: boolean): boolean

		// https://developer.apple.com/documentation/foundation/nsstring/1497299-writetourl
		writeToURL_atomically(url: NSURL, atomically: boolean): boolean

		// https://developer.apple.com/documentation/foundation/nsstring/1415132-getcharacters
		getCharacters(buffer: unichar): void

		// https://developer.apple.com/documentation/foundation/nsstring/1497307-cstring
		cString(): string

		// https://developer.apple.com/documentation/foundation/nsstring/1497263-lossycstring
		lossyCString(): string

		// https://developer.apple.com/documentation/foundation/nsstring/1497303-cstringlength
		cStringLength(): NSUInteger

		// https://developer.apple.com/documentation/foundation/nsstring/1497249-getcstring
		getCString(bytes: string): void

		// https://developer.apple.com/documentation/foundation/nsstring/1497296-getcstring
		getCString_maxLength(bytes: string, maxLength: NSUInteger): void
		
		// https://developer.apple.com/documentation/foundation/nsstring/1497298-getcstring
		getCString_maxLength_range_remainingRange(bytes: string, maxLength: NSUInteger, aRange: NSRange, leftoverRange: NSRangePointer): void

		// https://developer.apple.com/documentation/foundation/nsstring/1415058-stringbyaddingpercentescapesusin
		stringByAddingPercentEscapesUsingEncoding(enc: NSStringEncoding): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/1407783-stringbyreplacingpercentescapesu
		stringByReplacingPercentEscapesUsingEncoding(enc: NSStringEncoding): NSString

		// // https://developer.apple.com/documentation/foundation/nsstring/1619917-sizewithfont
		// sizeWithFont(font: UIFont): CGSize
		//
		// // https://developer.apple.com/documentation/foundation/nsstring/1619914-sizewithfont
		// sizeWithFont_forWidth_lineBreakMode(font: UIFont, width: CGFloat, lineBreakMode: NSLineBreakMode): CGSize
		//
		// // https://developer.apple.com/documentation/foundation/nsstring/1619903-sizewithfont
		// sizeWithFont_minFontSize_actualFontSize_forWidth_lineBreakMode(font: UIFont, minFontSize: CGFloat, actualFontSize: CGFloat, width: CGFloat, lineBreakMode: NSLineBreakMode): CGSize
		//
		// // https://developer.apple.com/documentation/foundation/nsstring/1619910-sizewithfont
		// sizeWithFont_constrainedToSize(font: UIFont, size: CGSize): CGSize
		//
		// // https://developer.apple.com/documentation/foundation/nsstring/1619915-sizewithfont
		// sizeWithFont_constrainedToSize_lineBreakMode(font: UIFont, size: CGSize, lineBreakMode: NSLineBreakMode): CGSize
		//
		// // https://developer.apple.com/documentation/foundation/nsstring/1619898-drawatpoint
		// drawAtPoint_withFont(point: CGPoint, font: UIFont): CGSize
		//
		// // https://developer.apple.com/documentation/foundation/nsstring/1619896-drawatpoint
		// drawAtPoint_forWidth_withFont_lineBreakMode(point: CGPoint, width: CGFloat, font: UIFont, lineBreakMode: NSLineBreakMode): CGSize
		//
		// // https://developer.apple.com/documentation/foundation/nsstring/1619919-drawatpoint
		// drawAtPoint_forWidth_withFont_fontSize_lineBreakMode_baselineAdjustment(point: CGPoint, width: CGFloat, font: UIFont, fontSize: CGFloat, lineBreakMode: NSLineBreakMode, baselineAdjustment: UIBaselineAdjustment): CGSize
		//
		// // https://developer.apple.com/documentation/foundation/nsstring/1619894-drawatpoint
		// drawAtPoint_forWidth_withFont_minFontSize_actualFontSize_lineBreakMode_baselineAdjustment(point: CGPoint, width: CGFloat, font: UIFont, minFontSize: CGFloat, actualFontSize: CGFloat, lineBreakMode: NSLineBreakMode, baselineAdjustment: UIBaselineAdjustment): CGSize
		//
		// // https://developer.apple.com/documentation/foundation/nsstring/1619909-drawinrect
		// drawInRect_withFont(rect: CGRect, font: UIFont): CGSize
		//
		// // https://developer.apple.com/documentation/foundation/nsstring/1619908-drawinrect
		// drawInRect_withFont_lineBreakMode(rect: CGRect, font: UIFont, lineBreakMode: NSLineBreakMode): CGSize
		//
		// // https://developer.apple.com/documentation/foundation/nsstring/1619912-drawinrect
		// drawInRect_withFont_lineBreakMode_alignment(rect: CGRect, font: UIFont, lineBreakMode: NSLineBreakMode, alignment: NSTextAlignment): CGSize

		// https://developer.apple.com/documentation/foundation/nsstring/1527536-drawwithrect
		drawWithRect_options_attributes(rect: NSRect, options: NSStringDrawingOptions, attributes: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsstring/1535578-boundingrectwithsize
		boundingRectWithSize_options_attributes(size: NSSize, options: NSStringDrawingOptions, attributes: string | NSString): NSRect

		// https://developer.apple.com/documentation/foundation/nsstring/3547179-initwithbytesnocopy
		initWithBytesNoCopy_length_encoding_deallocator(bytes: void, len: NSUInteger, encoding: NSStringEncoding, deallocator: NSUInteger): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/3547180-initwithcharactersnocopy
		initWithCharactersNoCopy_length_deallocator(chars: unichar, len: NSUInteger, deallocator: NSUInteger): NSString

		// // https://developer.apple.com/documentation/foundation/nsstring/1407488-initwithcoder
		// initWithCoder(coder: NSCoder): NSString
		//
		// // https://developer.apple.com/documentation/foundation/nsstring/3564808-stringbyappendingpathcomponent
		// stringByAppendingPathComponent_conformingToType(partialName: string | NSString, contentType: UTType): NSString
		//
		// // https://developer.apple.com/documentation/foundation/nsstring/3564809-stringbyappendingpathextensionfo
		// stringByAppendingPathExtensionForType(contentType: UTType): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/2990401-deferredlocalizedintentsstringwi
		deferredLocalizedIntentsStringWithFormat(...format: Array<string | NSString>): NSString

		// https://developer.apple.com/documentation/foundation/nsstring/2990402-deferredlocalizedintentsstringwi
		deferredLocalizedIntentsStringWithFormat_fromTable(format: string | NSString, ...table: Array<string | NSString>): NSString

		// // https://developer.apple.com/documentation/foundation/nsstring/2990403-deferredlocalizedintentsstringwi
		// deferredLocalizedIntentsStringWithFormat_fromTable_arguments(format: string | NSString, table: string | NSString, arguments: va_list): NSString
	}
}
