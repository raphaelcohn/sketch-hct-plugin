// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare namespace cocoascript
{
	/**
	 * A high-level interface for manipulating image data.
	 * https://developer.apple.com/documentation/appkit/nsimage
	 */
	interface NSImage extends NSObject
	{
		alloc(): NSImage
		
		init(): NSImage
		
		// https://developer.apple.com/documentation/appkit/nsimage/1520015-imagenamed
		imageNamed(name: NSImageName): NSImage

		// https://developer.apple.com/documentation/appkit/nsimage/3622472-imagewithsystemsymbolname
		imageWithSystemSymbolName_accessibilityDescription(symbolName: string | NSString, description: string | NSString): NSImage

		// https://developer.apple.com/documentation/appkit/nsimage/1520025-setname
		setName(string: NSImageName): boolean

		// https://developer.apple.com/documentation/appkit/nsimage/1519884-name
		name(): NSImageName

		// https://developer.apple.com/documentation/appkit/nsimage/1519860-imagewithsize
		imageWithSize_flipped_drawingHandler(size: NSSize, drawingHandlerShouldBeCalledWithFlippedContext: boolean, drawingHandler: NSRect): NSImage

		// https://developer.apple.com/documentation/appkit/nsimage/1519955-initbyreferencingfile
		initByReferencingFile(fileName: string | NSString): NSImage

		// https://developer.apple.com/documentation/appkit/nsimage/1519990-initbyreferencingurl
		initByReferencingURL(url: NSURL): NSImage

		// https://developer.apple.com/documentation/appkit/nsimage/1519918-initwithcontentsoffile
		initWithContentsOfFile(fileName: string | NSString): NSImage

		// https://developer.apple.com/documentation/appkit/nsimage/1519907-initwithcontentsofurl
		initWithContentsOfURL(url: NSURL): NSImage

		// https://developer.apple.com/documentation/appkit/nsimage/1519941-initwithdata
		initWithData(data: NSData): NSImage

		// https://developer.apple.com/documentation/appkit/nsimage/1519915-initwithdataignoringorientation
		initWithDataIgnoringOrientation(data: NSData): NSImage

		// https://developer.apple.com/documentation/appkit/nsimage/1519939-initwithcgimage
		initWithCGImage_size(cgImage: CGImageRef, size: NSSize): NSImage

		// // https://developer.apple.com/documentation/appkit/nsimage/1519952-initwithpasteboard
		// initWithPasteboard(pasteboard: NSPasteboard): NSImage
		//
		// // https://developer.apple.com/documentation/appkit/nsimage/2177315-initwithcoder
		// initWithCoder(coder: NSCoder): NSImage
		//
		// // https://developer.apple.com/documentation/appkit/nsimage/1519930-initwithiconref
		// initWithIconRef(iconRef: IconRef): NSImage

		// https://developer.apple.com/documentation/appkit/nsimage/1520033-initwithsize
		initWithSize(size: NSSize): NSImage

		// // https://developer.apple.com/documentation/appkit/nsimagesymbolconfiguration/3852560-configurationbyapplyingconfigura
		// configurationByApplyingConfiguration(configuration: NSImageSymbolConfiguration): NSImage
		//
		// // https://developer.apple.com/documentation/appkit/nsimage/3656508-imagewithsymbolconfiguration
		// imageWithSymbolConfiguration(configuration: NSImageSymbolConfiguration): NSImage
		//
		// // https://developer.apple.com/documentation/appkit/nsimage/3852559-symbolconfiguration
		// symbolConfiguration(): NSImageSymbolConfiguration
		// setSymbolConfiguration(value: NSImageSymbolConfiguration): void
		//
		// // https://developer.apple.com/documentation/appkit/nsimage/1519926-delegate
		// delegate(): NSImageDelegate
		// setDelegate(value: NSImageDelegate): void

		// https://developer.apple.com/documentation/appkit/nsimage/1519987-size
		size(): NSSize
		setSize(value: NSSize): void

		// https://developer.apple.com/documentation/appkit/nsimage/1520017-template
		template(): boolean
		setTemplate(value: boolean): void

		// https://developer.apple.com/documentation/appkit/nsimage/1807274-istemplate
		(): void

		// // https://developer.apple.com/documentation/appkit/nsimage/1520039-caninitwithpasteboard
		// canInitWithPasteboard(pasteboard: NSPasteboard): boolean

		// https://developer.apple.com/documentation/appkit/nsimage/1519988-imagetypes
		imageTypes(): string | NSString
		setImageTypes(value: string | NSString): void

		// https://developer.apple.com/documentation/appkit/nsimage/1519899-imageunfilteredtypes
		imageUnfilteredTypes(): string | NSString
		setImageUnfilteredTypes(value: string | NSString): void

		// // https://developer.apple.com/documentation/appkit/nsimage/1519911-addrepresentation
		// addRepresentation(imageRep: NSImageRep): void
		//
		// // https://developer.apple.com/documentation/appkit/nsimage/1519964-addrepresentations
		// addRepresentations(imageReps: NSImageRep): void
		//
		// // https://developer.apple.com/documentation/appkit/nsimage/1519858-representations
		// representations(): NSImageRep
		// setRepresentations(value: NSImageRep): void
		//
		// // https://developer.apple.com/documentation/appkit/nsimage/1519995-removerepresentation
		// removeRepresentation(imageRep: NSImageRep): void
		//
		// // https://developer.apple.com/documentation/appkit/nsimage/1519961-bestrepresentationforrect
		// bestRepresentationForRect_context_hints(rect: NSRect, referenceContext: NSGraphicsContext, hints: NSImage): NSImageRep

		// https://developer.apple.com/documentation/appkit/nsimage/1520010-preferscolormatch
		prefersColorMatch(): boolean
		setPrefersColorMatch(value: boolean): void

		// https://developer.apple.com/documentation/appkit/nsimage/1519868-usesepsonresolutionmismatch
		usesEPSOnResolutionMismatch(): boolean
		setUsesEPSOnResolutionMismatch(value: boolean): void

		// https://developer.apple.com/documentation/appkit/nsimage/1519963-matchesonmultipleresolution
		matchesOnMultipleResolution(): boolean
		setMatchesOnMultipleResolution(value: boolean): void

		// https://developer.apple.com/documentation/appkit/nsimage/1519863-drawinrect
		drawInRect(rect: NSRect): void

		// // https://developer.apple.com/documentation/appkit/nsimage/1519981-drawatpoint
		// drawAtPoint_fromRect_operation_fraction(point: NSPoint, fromRect: NSRect, op: NSCompositingOperation, delta: CGFloat): void
		//
		// // https://developer.apple.com/documentation/appkit/nsimage/1520067-drawinrect
		// drawInRect_fromRect_operation_fraction(rect: NSRect, fromRect: NSRect, op: NSCompositingOperation, delta: CGFloat): void
		//
		// // https://developer.apple.com/documentation/appkit/nsimage/1520043-drawinrect
		// drawInRect_fromRect_operation_fraction_respectFlipped_hints(dstSpacePortionRect: NSRect, srcSpacePortionRect: NSRect, op: NSCompositingOperation, requestedAlpha: CGFloat, respectContextIsFlipped: boolean, hints: NSImage): void
		//
		// // https://developer.apple.com/documentation/appkit/nsimage/1519904-drawrepresentation
		// drawRepresentation_inRect(imageRep: NSImageRep, rect: NSRect): boolean

		// https://developer.apple.com/documentation/appkit/nsimage/1519991-valid
		valid(): boolean
		setValid(value: boolean): void

		// // https://developer.apple.com/documentation/appkit/nsimage/1520059-backgroundcolor
		// backgroundColor(): NSColor
		// setBackgroundColor(value: NSColor): void

		// https://developer.apple.com/documentation/appkit/nsimage/1520012-capinsets
		capInsets(): NSEdgeInsets
		setCapInsets(value: NSEdgeInsets): void

		// https://developer.apple.com/documentation/appkit/nsimage/1520060-resizingmode
		resizingMode(): NSImageResizingMode
		setResizingMode(value: NSImageResizingMode): void

		// https://developer.apple.com/documentation/appkit/nsimage/1519891-lockfocus
		lockFocus(): void

		// https://developer.apple.com/documentation/appkit/nsimage/1519914-lockfocusflipped
		lockFocusFlipped(flipped: boolean): void

		// https://developer.apple.com/documentation/appkit/nsimage/1519853-unlockfocus
		unlockFocus(): void

		// https://developer.apple.com/documentation/appkit/nsimage/1519905-alignmentrect
		alignmentRect(): NSRect
		setAlignmentRect(value: NSRect): void

		// https://developer.apple.com/documentation/appkit/nsimage/1519850-cachemode
		cacheMode(): NSImageCacheMode
		setCacheMode(value: NSImageCacheMode): void

		// https://developer.apple.com/documentation/appkit/nsimage/1519890-recache
		recache(): void

		// https://developer.apple.com/documentation/appkit/nsimage/1519841-tiffrepresentation
		TIFFRepresentation(): NSData
		setTIFFRepresentation(value: NSData): void

		// https://developer.apple.com/documentation/appkit/nsimage/1519949-tiffrepresentationusingcompressi
		TIFFRepresentationUsingCompression_factor(comp: NSTIFFCompression, factor: number): NSData

		// // https://developer.apple.com/documentation/appkit/nsimage/1519861-cgimageforproposedrect
		// CGImageForProposedRect_context_hints(proposedDestRect: NSRect, referenceContext: NSGraphicsContext, hints: NSImage): CGImageRef

		// https://developer.apple.com/documentation/appkit/nsimage/1520041-cancelincrementalload
		cancelIncrementalLoad(): void

		// // https://developer.apple.com/documentation/appkit/nsimage/1519922-hittestrect
		// hitTestRect_withImageDestinationRect_context_hints_flipped(testRectDestSpace: NSRect, imageRectDestSpace: NSRect, context: NSGraphicsContext, hints: NSImage, flipped: boolean): boolean

		// https://developer.apple.com/documentation/appkit/nsimage/1519943-accessibilitydescription
		accessibilityDescription(): string | NSString
		setAccessibilityDescription(value: string | NSString): void

		// https://developer.apple.com/documentation/appkit/nsimage/1519851-layercontentsforcontentsscale
		layerContentsForContentsScale(layerContentsScale: CGFloat): NSImage

		// https://developer.apple.com/documentation/appkit/nsimage/1519878-recommendedlayercontentsscale
		recommendedLayerContentsScale(preferredContentsScale: CGFloat): CGFloat

		// https://developer.apple.com/documentation/appkit/nsimage/1519848-matchesonlyonbestfittingaxis
		matchesOnlyOnBestFittingAxis(): boolean
		setMatchesOnlyOnBestFittingAxis(value: boolean): void

		// https://developer.apple.com/documentation/appkit/nsimage/1519989-imagefiletypes
		imageFileTypes(): NSString

		// https://developer.apple.com/documentation/appkit/nsimage/1519973-imageunfilteredfiletypes
		imageUnfilteredFileTypes(): NSString

		// // https://developer.apple.com/documentation/appkit/nsimage/1519924-imagepasteboardtypes
		// imagePasteboardTypes(): NSPasteboardType
		//
		// // https://developer.apple.com/documentation/appkit/nsimage/1519872-imageunfilteredpasteboardtypes
		// imageUnfilteredPasteboardTypes(): NSPasteboardType
		//
		// // https://developer.apple.com/documentation/appkit/nsimage/1519950-lockfocusonrepresentation
		// lockFocusOnRepresentation(imageRepresentation: NSImageRep): void
		//
		// // https://developer.apple.com/documentation/appkit/nsimage/1519925-bestrepresentationfordevice
		// bestRepresentationForDevice(deviceDescription: NSDictionary): NSImageRep

		// https://developer.apple.com/documentation/appkit/nsimage/1519867-compositetopoint
		compositeToPoint_operation(point: NSPoint, op: NSCompositingOperation): void

		// https://developer.apple.com/documentation/appkit/nsimage/1520046-compositetopoint
		compositeToPoint_fromRect_operation(point: NSPoint, rect: NSRect, op: NSCompositingOperation): void

		// https://developer.apple.com/documentation/appkit/nsimage/1520026-compositetopoint
		compositeToPoint_fromRect_operation_fraction(point: NSPoint, rect: NSRect, op: NSCompositingOperation, delta: CGFloat): void

		// https://developer.apple.com/documentation/appkit/nsimage/1519932-compositetopoint
		compositeToPoint_operation_fraction(point: NSPoint, op: NSCompositingOperation, delta: CGFloat): void

		// https://developer.apple.com/documentation/appkit/nsimage/1519887-dissolvetopoint
		dissolveToPoint_fraction(point: NSPoint, fraction: CGFloat): void

		// https://developer.apple.com/documentation/appkit/nsimage/1519968-dissolvetopoint
		dissolveToPoint_fromRect_fraction(point: NSPoint, rect: NSRect, fraction: CGFloat): void

		// https://developer.apple.com/documentation/appkit/nsimage/1519970-setscaleswhenresized
		setScalesWhenResized(flag: boolean): void

		// https://developer.apple.com/documentation/appkit/nsimage/1519929-scaleswhenresized
		scalesWhenResized(): boolean

		// https://developer.apple.com/documentation/appkit/nsimage/1519999-setdataretained
		setDataRetained(flag: boolean): void

		// https://developer.apple.com/documentation/appkit/nsimage/1520005-isdataretained
		isDataRetained(): boolean

		// https://developer.apple.com/documentation/appkit/nsimage/1520009-setcachedseparately
		setCachedSeparately(flag: boolean): void

		// https://developer.apple.com/documentation/appkit/nsimage/1520021-iscachedseparately
		isCachedSeparately(): boolean

		// https://developer.apple.com/documentation/appkit/nsimage/1519895-setcachedepthmatchesimagedepth
		setCacheDepthMatchesImageDepth(flag: boolean): void

		// https://developer.apple.com/documentation/appkit/nsimage/1519992-cachedepthmatchesimagedepth
		cacheDepthMatchesImageDepth(): boolean

		// https://developer.apple.com/documentation/appkit/nsimage/1520044-setflipped
		setFlipped(flag: boolean): void

		// https://developer.apple.com/documentation/appkit/nsimage/1519846-isflipped
		isFlipped(): boolean
	}
}
