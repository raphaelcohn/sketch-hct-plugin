// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare namespace cocoascript
{
	/**
	 * An object that represents the location of a resource, such as an item on a remote server or the path to a local file.
	 * https://developer.apple.com/documentation/foundation/nsurl
	 */
	interface NSURL
	{
		alloc(): NSURL
		
		init(): NSURL

		// https://developer.apple.com/documentation/foundation/nsurl/1572047-urlwithstring
		URLWithString(URLString: string | NSString): NSURL

		// https://developer.apple.com/documentation/foundation/nsurl/1413146-initwithstring
		initWithString(URLString: string | NSString): NSURL

		// https://developer.apple.com/documentation/foundation/nsurl/1572049-urlwithstring
		URLWithString_relativeToURL(URLString: string | NSString, baseURL: NSURL): NSURL

		// https://developer.apple.com/documentation/foundation/nsurl/1417949-initwithstring
		initWithString_relativeToURL(URLString: string | NSString, baseURL: NSURL): NSURL

		// https://developer.apple.com/documentation/foundation/nsurl/1414650-fileurlwithpath
		fileURLWithPath_isDirectory(path: string | NSString, isDir: boolean): NSURL

		// https://developer.apple.com/documentation/foundation/nsurl/1417505-initfileurlwithpath
		initFileURLWithPath_isDirectory(path: string | NSString, isDir: boolean): NSURL

		// https://developer.apple.com/documentation/foundation/nsurl/1413201-fileurlwithpath
		fileURLWithPath_relativeToURL(path: string | NSString, baseURL: NSURL): NSURL

		// https://developer.apple.com/documentation/foundation/nsurl/1415077-initfileurlwithpath
		initFileURLWithPath_relativeToURL(path: string | NSString, baseURL: NSURL): NSURL

		// https://developer.apple.com/documentation/foundation/nsurl/1413020-fileurlwithpath
		fileURLWithPath_isDirectory_relativeToURL(path: string | NSString, isDir: boolean, baseURL: NSURL): NSURL

		// https://developer.apple.com/documentation/foundation/nsurl/1417932-initfileurlwithpath
		initFileURLWithPath_isDirectory_relativeToURL(path: string | NSString, isDir: boolean, baseURL: NSURL): NSURL

		// https://developer.apple.com/documentation/foundation/nsurl/1410828-fileurlwithpath
		fileURLWithPath(path: string | NSString): NSURL

		// https://developer.apple.com/documentation/foundation/nsurl/1410301-initfileurlwithpath
		initFileURLWithPath(path: string | NSString): NSURL

		// https://developer.apple.com/documentation/foundation/nsurl/1414206-fileurlwithpathcomponents
		fileURLWithPathComponents(components: string | NSString): NSURL

		// // https://developer.apple.com/documentation/foundation/nsurl/1416404-urlbyresolvingaliasfileaturl
		// URLByResolvingAliasFileAtURL_options_error(url: NSURL, options: NSURLBookmarkResolutionOptions, error: NSError): NSURL
		//
		// // https://developer.apple.com/documentation/foundation/nsurl/1572035-urlbyresolvingbookmarkdata
		// URLByResolvingBookmarkData_options_relativeToURL_bookmarkDataIsStale_error(bookmarkData: NSData, options: NSURLBookmarkResolutionOptions, relativeURL: NSURL, isStale: boolean, error: NSError): NSURL
		//
		// // https://developer.apple.com/documentation/foundation/nsurl/1413475-initbyresolvingbookmarkdata
		// initByResolvingBookmarkData_options_relativeToURL_bookmarkDataIsStale_error(bookmarkData: NSData, options: NSURLBookmarkResolutionOptions, relativeURL: NSURL, isStale: boolean, error: NSError): NSURL

		// https://developer.apple.com/documentation/foundation/nsurl/1411492-fileurlwithfilesystemrepresentat
		fileURLWithFileSystemRepresentation_isDirectory_relativeToURL(path: string, isDir: boolean, baseURL: NSURL): NSURL

		// https://developer.apple.com/documentation/foundation/nsurl/1415117-getfilesystemrepresentation
		getFileSystemRepresentation_maxLength(buffer: string, maxBufferLength: NSUInteger): boolean

		// https://developer.apple.com/documentation/foundation/nsurl/1411210-initfileurlwithfilesystemreprese
		initFileURLWithFileSystemRepresentation_isDirectory_relativeToURL(path: string, isDir: boolean, baseURL: NSURL): NSURL

		// https://developer.apple.com/documentation/foundation/nsurl/1412404-absoluteurlwithdatarepresentatio
		absoluteURLWithDataRepresentation_relativeToURL(data: NSData, baseURL: NSURL): NSURL

		// https://developer.apple.com/documentation/foundation/nsurl/1410750-initabsoluteurlwithdatarepresent
		initAbsoluteURLWithDataRepresentation_relativeToURL(data: NSData, baseURL: NSURL): NSURL

		// https://developer.apple.com/documentation/foundation/nsurl/1572042-urlwithdatarepresentation
		URLWithDataRepresentation_relativeToURL(data: NSData, baseURL: NSURL): NSURL

		// https://developer.apple.com/documentation/foundation/nsurl/1416851-initwithdatarepresentation
		initWithDataRepresentation_relativeToURL(data: NSData, baseURL: NSURL): NSURL

		// https://developer.apple.com/documentation/foundation/nsurl/1407656-datarepresentation
		dataRepresentation(): NSData
		setDataRepresentation(value: NSData): void

		// https://developer.apple.com/documentation/foundation/nsurl/1410597-checkresourceisreachableandretur
		checkResourceIsReachableAndReturnError(error: NSError): boolean

		// https://developer.apple.com/documentation/foundation/nsurl/1408507-isfilereferenceurl
		isFileReferenceURL(): boolean

		// https://developer.apple.com/documentation/foundation/nsurl/1408782-fileurl
		fileURL(): boolean
		setFileURL(value: boolean): void

		// https://developer.apple.com/documentation/foundation/nsurl/1409868-absolutestring
		absoluteString(): string | NSString
		setAbsoluteString(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsurl/1414266-absoluteurl
		absoluteURL(): NSURL
		setAbsoluteURL(value: NSURL): void

		// https://developer.apple.com/documentation/foundation/nsurl/1412311-baseurl
		baseURL(): NSURL
		setBaseURL(value: NSURL): void

		// https://developer.apple.com/documentation/foundation/nsurl/1412925-filesystemrepresentation
		fileSystemRepresentation(): string
		setFileSystemRepresentation(value: string): void

		// https://developer.apple.com/documentation/foundation/nsurl/1413775-fragment
		fragment(): string | NSString
		setFragment(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsurl/1413640-host
		host(): string | NSString
		setHost(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsurl/1417444-lastpathcomponent
		lastPathComponent(): string | NSString
		setLastPathComponent(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsurl/1412797-parameterstring
		parameterString(): string | NSString
		setParameterString(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsurl/1412096-password
		password(): string | NSString
		setPassword(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsurl/1408809-path
		path(): string | NSString
		setPath(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsurl/1407365-pathcomponents
		pathComponents(): string | NSString
		setPathComponents(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsurl/1410208-pathextension
		pathExtension(): string | NSString
		setPathExtension(value: string | NSString): void

		// // https://developer.apple.com/documentation/foundation/nsurl/1413455-port
		// port(): NSNumber
		// setPort(value: NSNumber): void

		// https://developer.apple.com/documentation/foundation/nsurl/1407543-query
		query(): string | NSString
		setQuery(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsurl/1410263-relativepath
		relativePath(): string | NSString
		setRelativePath(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsurl/1411417-relativestring
		relativeString(): string | NSString
		setRelativeString(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsurl/1415309-resourcespecifier
		resourceSpecifier(): string | NSString
		setResourceSpecifier(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsurl/1413437-scheme
		scheme(): string | NSString
		setScheme(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsurl/1411073-standardizedurl
		standardizedURL(): NSURL
		setStandardizedURL(value: NSURL): void

		// https://developer.apple.com/documentation/foundation/nsurl/1418335-user
		user(): string | NSString
		setUser(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nsurl/1417657-resourcevaluesforkeys
		resourceValuesForKeys_error(keys: NSURLResourceKey, error: NSError): NSURL

		// https://developer.apple.com/documentation/foundation/nsurl/1408874-getresourcevalue
		getResourceValue_forKey_error(value: NSURL, key: NSURLResourceKey, error: NSError): boolean

		// https://developer.apple.com/documentation/foundation/nsurl/1413819-setresourcevalue
		setResourceValue_forKey_error(value: NSURL, key: NSURLResourceKey, error: NSError): boolean

		// https://developer.apple.com/documentation/foundation/nsurl/1408208-setresourcevalues
		setResourceValues_error(keyedValues: NSURL, error: NSError): boolean

		// https://developer.apple.com/documentation/foundation/nsurl/1417078-removeallcachedresourcevalues
		removeAllCachedResourceValues(): void

		// https://developer.apple.com/documentation/foundation/nsurl/1410758-removecachedresourcevalueforkey
		removeCachedResourceValueForKey(key: NSURLResourceKey): void

		// https://developer.apple.com/documentation/foundation/nsurl/1411094-settemporaryresourcevalue
		setTemporaryResourceValue_forKey(value: NSURL, key: NSURLResourceKey): void

		// https://developer.apple.com/documentation/foundation/nsurl/1408442-filepathurl
		filePathURL(): NSURL
		setFilePathURL(value: NSURL): void

		// https://developer.apple.com/documentation/foundation/nsurl/1408631-filereferenceurl
		fileReferenceURL(): NSURL

		// https://developer.apple.com/documentation/foundation/nsurl/1410614-urlbyappendingpathcomponent
		URLByAppendingPathComponent(pathComponent: string | NSString): NSURL

		// https://developer.apple.com/documentation/foundation/nsurl/1413953-urlbyappendingpathcomponent
		URLByAppendingPathComponent_isDirectory(pathComponent: string | NSString, isDirectory: boolean): NSURL

		// https://developer.apple.com/documentation/foundation/nsurl/1417082-urlbyappendingpathextension
		URLByAppendingPathExtension(pathExtension: string | NSString): NSURL

		// https://developer.apple.com/documentation/foundation/nsurl/1411592-urlbydeletinglastpathcomponent
		URLByDeletingLastPathComponent(): NSURL
		setURLByDeletingLastPathComponent(value: NSURL): void

		// https://developer.apple.com/documentation/foundation/nsurl/1412357-urlbydeletingpathextension
		URLByDeletingPathExtension(): NSURL
		setURLByDeletingPathExtension(value: NSURL): void

		// https://developer.apple.com/documentation/foundation/nsurl/1415965-urlbyresolvingsymlinksinpath
		URLByResolvingSymlinksInPath(): NSURL
		setURLByResolvingSymlinksInPath(value: NSURL): void

		// https://developer.apple.com/documentation/foundation/nsurl/1414302-urlbystandardizingpath
		URLByStandardizingPath(): NSURL
		setURLByStandardizingPath(value: NSURL): void

		// https://developer.apple.com/documentation/foundation/nsurl/1411475-hasdirectorypath
		hasDirectoryPath(): boolean
		setHasDirectoryPath(value: boolean): void

		// https://developer.apple.com/documentation/foundation/nsurl/1408344-bookmarkdatawithcontentsofurl
		bookmarkDataWithContentsOfURL_error(bookmarkFileURL: NSURL, error: NSError): NSData

		// // https://developer.apple.com/documentation/foundation/nsurl/1417795-bookmarkdatawithoptions
		// bookmarkDataWithOptions_includingResourceValuesForKeys_relativeToURL_error(options: NSURLBookmarkCreationOptions, keys: NSURLResourceKey, relativeURL: NSURL, error: NSError): NSData

		// https://developer.apple.com/documentation/foundation/nsurl/1418097-resourcevaluesforkeys
		resourceValuesForKeys_fromBookmarkData(keys: NSURLResourceKey, bookmarkData: NSData): NSURL

		// // https://developer.apple.com/documentation/foundation/nsurl/1408532-writebookmarkdata
		// writeBookmarkData_toURL_options_error(bookmarkData: NSData, bookmarkFileURL: NSURL, options: NSURLBookmarkFileCreationOptions, error: NSError): boolean

		// https://developer.apple.com/documentation/foundation/nsurl/1417051-startaccessingsecurityscopedreso
		startAccessingSecurityScopedResource(): boolean

		// https://developer.apple.com/documentation/foundation/nsurl/1413736-stopaccessingsecurityscopedresou
		stopAccessingSecurityScopedResource(): void

		// https://developer.apple.com/documentation/foundation/nsurl/1410411-checkpromiseditemisreachableandr
		checkPromisedItemIsReachableAndReturnError(error: NSError): boolean

		// https://developer.apple.com/documentation/foundation/nsurl/1414238-getpromiseditemresourcevalue
		getPromisedItemResourceValue_forKey_error(value: NSURL, key: NSURLResourceKey, error: NSError): boolean

		// https://developer.apple.com/documentation/foundation/nsurl/1407746-promiseditemresourcevaluesforkey
		promisedItemResourceValuesForKeys_error(keys: NSURLResourceKey, error: NSError): NSURL

		// // https://developer.apple.com/documentation/foundation/nsurl/1525106-urlfrompasteboard
		// URLFromPasteboard(pasteBoard: NSPasteboard): NSURL
		//
		// // https://developer.apple.com/documentation/foundation/nsurl/1532980-writetopasteboard
		// writeToPasteboard(pasteBoard: NSPasteboard): void

		// https://developer.apple.com/documentation/foundation/nsurl/1414181-initwithscheme
		initWithScheme_host_path(scheme: string | NSString, host: string | NSString, path: string | NSString): NSURL

		// // https://developer.apple.com/documentation/foundation/nsurl/1572051-urlhandleusingcache
		// URLHandleUsingCache(shouldUseCache: boolean): NSURLHandle

		// https://developer.apple.com/documentation/foundation/nsurl/1572043-loadresourcedatanotifyingclient
		loadResourceDataNotifyingClient_usingCache(client: NSURL, shouldUseCache: boolean): void

		// https://developer.apple.com/documentation/foundation/nsurl/1572037-resourcedatausingcache
		resourceDataUsingCache(shouldUseCache: boolean): NSData

		// https://developer.apple.com/documentation/foundation/nsurl/1572038-setresourcedata
		setResourceData(data: NSData): boolean

		// https://developer.apple.com/documentation/foundation/nsurl/1572044-propertyforkey
		propertyForKey(propertyKey: string | NSString): NSURL

		// https://developer.apple.com/documentation/foundation/nsurl/1572041-setproperty
		setProperty_forKey(property: NSURL, propertyKey: string | NSString): boolean

		// // https://developer.apple.com/documentation/foundation/nsurl/3564810-urlbyappendingpathcomponent
		// URLByAppendingPathComponent_conformingToType(partialName: string | NSString, contentType: UTType): NSURL
		//
		// // https://developer.apple.com/documentation/foundation/nsurl/3584837-urlbyappendingpathextensionforty
		// URLByAppendingPathExtensionForType(contentType: UTType): NSURL
	}
}
