// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare namespace cocoascript
{
	/**
	 * A static byte buffer in memory.
	 * https://developer.apple.com/documentation/foundation/nsdata
	 */
	interface NSData extends NSObject
	{
		alloc(): NSData
		
		init(): NSData
		
		// https://developer.apple.com/documentation/foundation/nsdata/1547234-data
		data(): NSData
		
		// https://developer.apple.com/documentation/foundation/nsdata/1547231-datawithbytes
		dataWithBytes_length(bytes: void, length: NSUInteger): NSData

		// https://developer.apple.com/documentation/foundation/nsdata/1547229-datawithbytesnocopy
		dataWithBytesNoCopy_length(bytes: void, length: NSUInteger): NSData

		// https://developer.apple.com/documentation/foundation/nsdata/1547240-datawithbytesnocopy
		dataWithBytesNoCopy_length_freeWhenDone(bytes: void, length: NSUInteger, b: boolean): NSData
		
		// https://developer.apple.com/documentation/foundation/nsdata/1547230-datawithdata
		dataWithData(data: NSData): NSData

		// https://developer.apple.com/documentation/foundation/nsdata/1412793-initwithbytes
		initWithBytes_length(bytes: void, length: NSUInteger): NSData

		// https://developer.apple.com/documentation/foundation/nsdata/1409454-initwithbytesnocopy
		initWithBytesNoCopy_length(bytes: void, length: NSUInteger): NSData

		// https://developer.apple.com/documentation/foundation/nsdata/1417337-initwithbytesnocopy
		initWithBytesNoCopy_length_deallocator(bytes: void, length: NSUInteger, deallocator: NSUInteger): NSData

		// https://developer.apple.com/documentation/foundation/nsdata/1416020-initwithbytesnocopy
		initWithBytesNoCopy_length_freeWhenDone(bytes: void, length: NSUInteger, b: boolean): NSData
		
		// https://developer.apple.com/documentation/foundation/nsdata/1417055-initwithdata
		initWithData(data: NSData): NSData
		
		// https://developer.apple.com/documentation/foundation/nsdata/1547226-datawithcontentsoffile
		dataWithContentsOfFile(path: string | NSString): NSData
		
		// // https://developer.apple.com/documentation/foundation/nsdata/1547244-datawithcontentsoffile
		// dataWithContentsOfFile_options_error(path: string | NSString, readOptionsMask: NSDataReadingOptions, errorPtr: NSError): NSData
		
		// https://developer.apple.com/documentation/foundation/nsdata/1547245-datawithcontentsofurl
		dataWithContentsOfURL(url: NSURL): NSData
		
		// // https://developer.apple.com/documentation/foundation/nsdata/1547238-datawithcontentsofurl
		// dataWithContentsOfURL_options_error(url: NSURL, readOptionsMask: NSDataReadingOptions, errorPtr: NSError): NSData
		
		// https://developer.apple.com/documentation/foundation/nsdata/1408672-initwithcontentsoffile
		initWithContentsOfFile(path: string | NSString): NSData
		
		// // https://developer.apple.com/documentation/foundation/nsdata/1411145-initwithcontentsoffile
		// initWithContentsOfFile_options_error(path: string | NSString, readOptionsMask: NSDataReadingOptions, errorPtr: NSError): NSData
		
		// https://developer.apple.com/documentation/foundation/nsdata/1413892-initwithcontentsofurl
		initWithContentsOfURL(url: NSURL): NSData
		
		// // https://developer.apple.com/documentation/foundation/nsdata/1407864-initwithcontentsofurl
		// initWithContentsOfURL_options_error(url: NSURL, readOptionsMask: NSDataReadingOptions, errorPtr: NSError): NSData
		
		// https://developer.apple.com/documentation/foundation/nsdata/1413302-initwithcontentsofmappedfile
		initWithContentsOfMappedFile(path: string | NSString): NSData
		
		// https://developer.apple.com/documentation/foundation/nsdata/1409012-datawithcontentsofmappedfile
		dataWithContentsOfMappedFile(path: string | NSString): NSData
		
		// https://developer.apple.com/documentation/foundation/nsdata/1408033-writetofile
		writeToFile_atomically(path: string | NSString, useAuxiliaryFile: boolean): boolean
		
		// // https://developer.apple.com/documentation/foundation/nsdata/1414800-writetofile
		// writeToFile_options_error(path: string | NSString, writeOptionsMask: NSDataWritingOptions, errorPtr: NSError): boolean
		
		// https://developer.apple.com/documentation/foundation/nsdata/1415134-writetourl
		writeToURL_atomically(url: NSURL, atomically: boolean): boolean
		
		// // https://developer.apple.com/documentation/foundation/nsdata/1410595-writetourl
		// writeToURL_options_error(url: NSURL, writeOptionsMask: NSDataWritingOptions, errorPtr: NSError): boolean
		//
		// // https://developer.apple.com/documentation/foundation/nsdata/1417833-initwithbase64encodeddata
		// initWithBase64EncodedData_options(base64Data: NSData, options: NSDataBase64DecodingOptions): NSData
		
		// https://developer.apple.com/documentation/foundation/nsdata/1547237-initwithbase64encoding
		initWithBase64Encoding(base64String: string | NSString): NSData
		
		// // https://developer.apple.com/documentation/foundation/nsdata/1410081-initwithbase64encodedstring
		// initWithBase64EncodedString_options(base64String: string | NSString, options: NSDataBase64DecodingOptions): NSData
		//
		// // https://developer.apple.com/documentation/foundation/nsdata/1412739-base64encodeddatawithoptions
		// base64EncodedDataWithOptions(options: NSDataBase64EncodingOptions): NSData
		//
		// // https://developer.apple.com/documentation/foundation/nsdata/1413546-base64encodedstringwithoptions
		// base64EncodedStringWithOptions(options: NSDataBase64EncodingOptions): NSString
		
		// https://developer.apple.com/documentation/foundation/nsdata/1547242-base64encoding
		base64Encoding(): NSString
		
		// https://developer.apple.com/documentation/foundation/nsdata/1410616-bytes
		bytes(): void
		
		setBytes(value: void): void
		
		// https://developer.apple.com/documentation/foundation/nsdata/1408400-enumeratebyterangesusingblock
		enumerateByteRangesUsingBlock(block: boolean): void
		
		// https://developer.apple.com/documentation/foundation/nsdata/1416532-getbytes
		getBytes(buffer: void): void
		
		// https://developer.apple.com/documentation/foundation/nsdata/1411450-getbytes
		getBytes_length(buffer: void, length: NSUInteger): void
		
		// https://developer.apple.com/documentation/foundation/nsdata/1407224-getbytes
		getBytes_range(buffer: void, range: NSRange): void
		
		// https://developer.apple.com/documentation/foundation/nsdata/1410128-subdatawithrange
		subdataWithRange(range: NSRange): NSData
		
		// // https://developer.apple.com/documentation/foundation/nsdata/1410391-rangeofdata
		// rangeOfData_options_range(dataToFind: NSData, mask: NSDataSearchOptions, searchRange: NSRange): NSRange
		
		// https://developer.apple.com/documentation/foundation/nsdata/1409330-isequaltodata
		isEqualToData(other: NSData): boolean
		
		// https://developer.apple.com/documentation/foundation/nsdata/1416769-length
		length(): NSUInteger
		setLength(value: NSUInteger): void
		
		// https://developer.apple.com/documentation/foundation/nsdata/1412579-description
		description(): string | NSString
		setDescription(value: string | NSString): void
		
		// // https://developer.apple.com/documentation/foundation/nsdata/3174960-compresseddatausingalgorithm
		// compressedDataUsingAlgorithm_error(algorithm: NSDataCompressionAlgorithm, error: NSError): NSData
		
		// // https://developer.apple.com/documentation/foundation/nsdata/3174961-decompresseddatausingalgorithm
		// decompressedDataUsingAlgorithm_error(algorithm: NSDataCompressionAlgorithm, error: NSError): NSData
	}
}
