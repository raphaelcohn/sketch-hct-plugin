// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare namespace cocoascript
{
	/**
	 * A static ordered collection of objects.
	 * https://developer.apple.com/documentation/foundation/nsarray
	 */
	interface NSArray extends NSObject
	{
		alloc(): NSArray
		
		init(): NSArray
		
		// https://developer.apple.com/documentation/foundation/nsarray/1460120-array
		array(): NSArray
		
		// https://developer.apple.com/documentation/foundation/nsarray/1460122-arraywitharray
		arrayWithArray(array: unknown): NSArray
		
		// https://developer.apple.com/documentation/foundation/nsarray/1460099-arraywithcontentsoffile
		arrayWithContentsOfFile(path: string | NSString): NSArray
		
		// https://developer.apple.com/documentation/foundation/nsarray/1460060-arraywithcontentsofurl
		arrayWithContentsOfURL(url: NSURL): NSArray
		
		// https://developer.apple.com/documentation/foundation/nsarray/1411981-arraywithobject
		arrayWithObject(anObject: unknown): NSArray
		
		// https://developer.apple.com/documentation/foundation/nsarray/1460145-arraywithobjects
		arrayWithObjects(...firstObj: Array<unknown>): NSArray
		
		// https://developer.apple.com/documentation/foundation/nsarray/1460096-arraywithobjects
		arrayWithObjects_count(objects: unknown, cnt: NSUInteger): NSArray
		
		// https://developer.apple.com/documentation/foundation/nsarray/1414315-init
		init(): NSArray
		
		// https://developer.apple.com/documentation/foundation/nsarray/1412169-initwitharray
		initWithArray(array: unknown): NSArray
		
		// https://developer.apple.com/documentation/foundation/nsarray/1408557-initwitharray
		initWithArray_copyItems(array: unknown, flag: boolean): NSArray
		
		// https://developer.apple.com/documentation/foundation/nsarray/1413844-initwithcontentsoffile
		initWithContentsOfFile(path: string | NSString): NSArray
		
		// https://developer.apple.com/documentation/foundation/nsarray/1410518-initwithcontentsofurl
		initWithContentsOfURL(url: NSURL): NSArray
		
		// https://developer.apple.com/documentation/foundation/nsarray/1460068-initwithobjects
		initWithObjects(...firstObj: Array<unknown>): NSArray
		
		// https://developer.apple.com/documentation/foundation/nsarray/1415056-initwithobjects
		initWithObjects_count(objects: unknown, cnt: NSUInteger): NSArray
		
		// https://developer.apple.com/documentation/foundation/nsarray/1407477-containsobject
		containsObject(anObject: unknown): boolean
		
		// https://developer.apple.com/documentation/foundation/nsarray/1409982-count
		count(): NSUInteger
		setCount(value: NSUInteger): void
		
		// https://developer.apple.com/documentation/foundation/nsarray/1410317-getobjects
		getObjects(objects: unknown): void
		
		// https://developer.apple.com/documentation/foundation/nsarray/1414725-getobjects
		getObjects_range(objects: unknown, range: NSRange): void
		
		// https://developer.apple.com/documentation/foundation/nsarray/1412852-firstobject
		firstObject(): unknown
		setFirstObject(value: unknown): void
		
		// https://developer.apple.com/documentation/foundation/nsarray/1408316-lastobject
		lastObject(): unknown
		setLastObject(value: unknown): void
		
		// https://developer.apple.com/documentation/foundation/nsarray/1417555-objectatindex
		objectAtIndex(index: NSUInteger): void

		// https://developer.apple.com/documentation/foundation/nsarray/1414084-objectatindexedsubscript
		objectAtIndexedSubscript(idx: NSUInteger): void

		// // https://developer.apple.com/documentation/foundation/nsarray/1411296-objectsatindexes
		// objectsAtIndexes(indexes: NSIndexSet): NSArray
		//
		// // https://developer.apple.com/documentation/foundation/nsarray/1416048-objectenumerator
		// objectEnumerator(): NSEnumerator
		//
		// // https://developer.apple.com/documentation/foundation/nsarray/1415734-reverseobjectenumerator
		// reverseObjectEnumerator(): NSEnumerator

		// https://developer.apple.com/documentation/foundation/nsarray/1417076-indexofobject
		indexOfObject(anObject: unknown): NSUInteger

		// https://developer.apple.com/documentation/foundation/nsarray/1415248-indexofobject
		indexOfObject_inRange(anObject: unknown, range: NSRange): NSUInteger

		// https://developer.apple.com/documentation/foundation/nsarray/1410847-indexofobjectidenticalto
		indexOfObjectIdenticalTo(anObject: unknown): NSUInteger

		// https://developer.apple.com/documentation/foundation/nsarray/1415805-indexofobjectidenticalto
		indexOfObjectIdenticalTo_inRange(anObject: unknown, range: NSRange): NSUInteger

		// https://developer.apple.com/documentation/foundation/nsarray/1408043-indexofobjectpassingtest
		indexOfObjectPassingTest(predicate: boolean): NSUInteger

		// // https://developer.apple.com/documentation/foundation/nsarray/1417053-indexofobjectwithoptions
		// indexOfObjectWithOptions_passingTest(opts: NSEnumerationOptions, predicate: boolean): NSUInteger
		//
		// // https://developer.apple.com/documentation/foundation/nsarray/1407652-indexofobjectatindexes
		// indexOfObjectAtIndexes_options_passingTest(s: NSIndexSet, opts: NSEnumerationOptions, predicate: boolean): NSUInteger
		//
		// // https://developer.apple.com/documentation/foundation/nsarray/1417603-indexesofobjectspassingtest
		// indexesOfObjectsPassingTest(predicate: boolean): NSIndexSet
		//
		// // https://developer.apple.com/documentation/foundation/nsarray/1415087-indexesofobjectswithoptions
		// indexesOfObjectsWithOptions_passingTest(opts: NSEnumerationOptions, predicate: boolean): NSIndexSet
		//
		// // https://developer.apple.com/documentation/foundation/nsarray/1413512-indexesofobjectsatindexes
		// indexesOfObjectsAtIndexes_options_passingTest(s: NSIndexSet, opts: NSEnumerationOptions, predicate: boolean): NSIndexSet
		//
		// // https://developer.apple.com/documentation/foundation/nsarray/1412722-indexofobject
		// indexOfObject_inSortedRange_options_usingComparator(obj: unknown, r: NSRange, opts: NSBinarySearchingOptions, cmp: NSComparator): NSUInteger

		// https://developer.apple.com/documentation/foundation/nsarray/1460115-makeobjectsperformselector
		makeObjectsPerformSelector(aSelector: SEL): void

		// https://developer.apple.com/documentation/foundation/nsarray/1460107-makeobjectsperformselector
		makeObjectsPerformSelector_withObject(aSelector: SEL, argument: NSArray): void
		
		// https://developer.apple.com/documentation/foundation/nsarray/1415846-enumerateobjectsusingblock
		enumerateObjectsUsingBlock(block: boolean): void
		
		// // https://developer.apple.com/documentation/foundation/nsarray/1413010-enumerateobjectswithoptions
		// enumerateObjectsWithOptions_usingBlock(opts: NSEnumerationOptions, block: boolean): void
		//
		// // https://developer.apple.com/documentation/foundation/nsarray/1417577-enumerateobjectsatindexes
		// enumerateObjectsAtIndexes_options_usingBlock(s: NSIndexSet, opts: NSEnumerationOptions, block: boolean): void
		
		// https://developer.apple.com/documentation/foundation/nsarray/1408825-firstobjectcommonwitharray
		firstObjectCommonWithArray(otherArray: unknown): void
		
		// https://developer.apple.com/documentation/foundation/nsarray/1411770-isequaltoarray
		isEqualToArray(otherArray: unknown): boolean
		
		// https://developer.apple.com/documentation/foundation/nsarray/1408534-arraybyaddingobject
		arrayByAddingObject(anObject: unknown): NSArray
		
		// https://developer.apple.com/documentation/foundation/nsarray/1412087-arraybyaddingobjectsfromarray
		arrayByAddingObjectsFromArray(otherArray: unknown): NSArray
		
		// // https://developer.apple.com/documentation/foundation/nsarray/1411033-filteredarrayusingpredicate
		// filteredArrayUsingPredicate(predicate: NSPredicate): NSArray
		
		// https://developer.apple.com/documentation/foundation/nsarray/1415157-subarraywithrange
		subarrayWithRange(range: NSRange): NSArray
		
		// https://developer.apple.com/documentation/foundation/nsarray/1413063-sortedarrayhint
		sortedArrayHint(): NSData
		
		setSortedArrayHint(value: NSData): void
		
		// https://developer.apple.com/documentation/foundation/nsarray/1408213-sortedarrayusingfunction
		sortedArrayUsingFunction_context(comparator: unknown, context: unknown): NSArray
		
		// https://developer.apple.com/documentation/foundation/nsarray/1414839-sortedarrayusingfunction
		sortedArrayUsingFunction_context_hint(comparator: unknown, context: unknown, hint: NSData): NSArray
		
		// // https://developer.apple.com/documentation/foundation/nsarray/1415069-sortedarrayusingdescriptors
		// sortedArrayUsingDescriptors(sortDescriptors: NSSortDescriptor): NSArray

		// https://developer.apple.com/documentation/foundation/nsarray/1410025-sortedarrayusingselector
		sortedArrayUsingSelector(comparator: SEL): NSArray

		// // https://developer.apple.com/documentation/foundation/nsarray/1411195-sortedarrayusingcomparator
		// sortedArrayUsingComparator(cmptr: NSComparator): NSArray
		//
		// // https://developer.apple.com/documentation/foundation/nsarray/1417804-sortedarraywithoptions
		// sortedArrayWithOptions_usingComparator(opts: NSSortOptions, cmptr: NSComparator): NSArray
		
		// https://developer.apple.com/documentation/foundation/nsarray/1412075-componentsjoinedbystring
		componentsJoinedByString(separator: string | NSString): NSString
		
		// https://developer.apple.com/documentation/foundation/nsarray/1413042-description
		description(): string | NSString
		setDescription(value: string | NSString): void
		
		// https://developer.apple.com/documentation/foundation/nsarray/1412374-descriptionwithlocale
		descriptionWithLocale(locale: NSArray): NSString
		
		// https://developer.apple.com/documentation/foundation/nsarray/1416257-descriptionwithlocale
		descriptionWithLocale_indent(locale: NSArray, level: NSUInteger): NSString
		
		// https://developer.apple.com/documentation/foundation/nsarray/1414742-writetofile
		writeToFile_atomically(path: string | NSString, useAuxiliaryFile: boolean): boolean
		
		// https://developer.apple.com/documentation/foundation/nsarray/1411480-writetourl
		writeToURL_atomically(url: NSURL, atomically: boolean): boolean
		
		// https://developer.apple.com/documentation/foundation/nsarray/1418275-pathsmatchingextensions
		pathsMatchingExtensions(filterTypes: string | NSString): NSString
		
		// // https://developer.apple.com/documentation/foundation/nsarray/1409775-addobserver
		// addObserver_forKeyPath_options_context(observer: NSObject, keyPath: string | NSString, options: NSKeyValueObservingOptions, context: void): void
		
		// https://developer.apple.com/documentation/foundation/nsarray/1414976-removeobserver
		removeObserver_forKeyPath(observer: NSObject, keyPath: string | NSString): void
		
		// https://developer.apple.com/documentation/foundation/nsarray/1418441-removeobserver
		removeObserver_forKeyPath_context(observer: NSObject, keyPath: string | NSString, context: unknown): void
		
		// // https://developer.apple.com/documentation/foundation/nsarray/1408305-removeobserver
		// removeObserver_fromObjectsAtIndexes_forKeyPath_context(observer: NSObject, indexes: NSIndexSet, keyPath: string | NSString, context: void): void
		//
		// // https://developer.apple.com/documentation/foundation/nsarray/1411404-addobserver
		// addObserver_toObjectsAtIndexes_forKeyPath_options_context(observer: NSObject, indexes: NSIndexSet, keyPath: string | NSString, options: NSKeyValueObservingOptions, context: void): void
		//
		// // https://developer.apple.com/documentation/foundation/nsarray/1407434-removeobserver
		// removeObserver_fromObjectsAtIndexes_forKeyPath(observer: NSObject, indexes: NSIndexSet, keyPath: string | NSString): void
		
		// https://developer.apple.com/documentation/foundation/nsarray/1408301-setvalue
		setValue_forKey(value: NSArray, key: string | NSString): void
		
		// https://developer.apple.com/documentation/foundation/nsarray/1412219-valueforkey
		valueForKey(key: string | NSString): NSArray
		
		// https://developer.apple.com/documentation/foundation/nsarray/1640855-shuffledarray
		shuffledArray(): NSArray
		
		// // https://developer.apple.com/documentation/foundation/nsarray/1640687-shuffledarraywithrandomsource
		// shuffledArrayWithRandomSource(randomSource: GKRandomSource): NSArray
		//
		// // https://developer.apple.com/documentation/foundation/nsarray/3152166-differencefromarray
		// differenceFromArray(other: unknown): NSOrderedCollectionDifference
		//
		// // https://developer.apple.com/documentation/foundation/nsarray/3152167-differencefromarray
		// differenceFromArray_withOptions(other: unknown, options: NSOrderedCollectionDifferenceCalculationOptions): NSOrderedCollectionDifference
		//
		// // https://developer.apple.com/documentation/foundation/nsarray/3152168-differencefromarray
		// differenceFromArray_withOptions_usingEquivalenceTest(other: unknown, options: NSOrderedCollectionDifferenceCalculationOptions, block: unknown): NSOrderedCollectionDifference
		
		// // https://developer.apple.com/documentation/foundation/nsarray/1407810-initwithcoder
		// initWithCoder(coder: NSCoder): NSArray

		// https://developer.apple.com/documentation/foundation/nsarray/2879134-initwithcontentsofurl
		initWithContentsOfURL_error(url: NSURL, error: NSError): NSArray
		
		// https://developer.apple.com/documentation/foundation/nsarray/2879138-writetourl
		writeToURL_error(url: NSURL, error: NSError): boolean
		
		// https://developer.apple.com/documentation/foundation/nsarray/3152165-arraybyapplyingdifference
		arrayByApplyingDifference(difference: unknown): NSArray
		
		// https://developer.apple.com/documentation/foundation/nsarray/2879153-arraywithcontentsofurl
		arrayWithContentsOfURL_error(url: NSURL, error: NSError): NSArray
	}
}
