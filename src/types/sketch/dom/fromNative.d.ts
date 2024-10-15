// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		import MSArtboardGroup = sketchInternal.MSArtboardGroup
		import MSAssetLibrary = sketchInternal.MSAssetLibrary
		import MSAvailableOverride = sketchInternal.MSAvailableOverride
		import MSBitmapLayer = sketchInternal.MSBitmapLayer
		import MSCurvePoint = sketchInternal.MSCurvePoint
		import MSDocument = sketchInternal.MSDocument
		import MSHotspotLayer = sketchInternal.MSHotspotLayer
		import MSImageData = sketchInternal.MSImageData
		import MSLayerGroup = sketchInternal.MSLayerGroup
		import MSPage = sketchInternal.MSPage
		import MSShapeGroup = sketchInternal.MSShapeGroup
		import MSShapePathLayer = sketchInternal.MSShapePathLayer
		import MSSharedStyle = sketchInternal.MSSharedStyle
		import MSSliceLayer = sketchInternal.MSSliceLayer
		import MSStyle = sketchInternal.MSStyle
		import MSSymbolInstance = sketchInternal.MSSymbolInstance
		import MSSymbolMaster = sketchInternal.MSSymbolMaster
		import MSTextLayer = sketchInternal.MSTextLayer
		
		export function fromNative(nativeObject: ImportableNative): ImportableObject
		export function fromNative(nativeObject: MSArtboardGroup): Artboard
		export function fromNative(nativeObject: MSAssetLibrary): Library
		export function fromNative(nativeObject: MSAvailableOverride): SymbolOverride
		export function fromNative(nativeObject: MSBitmapLayer): Image
		export function fromNative(nativeObject: MSCurvePoint): CurvePoint
		export function fromNative(nativeObject: MSDocument): Document
		export function fromNative(nativeObject: MSHotspotLayer): HotSpot
		export function fromNative(nativeObject: MSImageData): ImageData
		export function fromNative(nativeObject: MSLayerGroup): Group
		export function fromNative(nativeObject: MSPage): Page
		export function fromNative(nativeObject: MSShapeGroup): Shape
		export function fromNative(nativeObject: MSShapePathLayer): ShapePath
		export function fromNative(nativeObject: MSSharedStyle): SharedStyle
		export function fromNative(nativeObject: MSSliceLayer): Slice
		export function fromNative(nativeObject: MSStyle): Style
		export function fromNative(nativeObject: MSSymbolInstance): SymbolInstance
		export function fromNative(nativeObject: MSSymbolMaster): SymbolMaster
		export function fromNative(nativeObject: MSTextLayer): Text
		
		/**
		 * A utility function to get a wrapped object from a native Sketch model object.
		 * @param nativeObject The native Sketch model object to wrap.
		 * @return The wrapped object of the right type (you can check is type with wrappedObject.type), eg. a native document will be wrapped as a Document while a native text layer will be wrapped as a Text.
		 */
		export function fromNative<NativeType>(nativeObject: NativeType): Component<NativeType>
	}
}
