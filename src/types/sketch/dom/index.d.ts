// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

/// <reference path="./AllLayers.d.ts" />
/// <reference path="./Artboard.d.ts" />
/// <reference path="./ArtboardBackground.d.ts" />
/// <reference path="./ArtboardProperties.d.ts" />
/// <reference path="./BaseArtboard.d.ts" />
/// <reference path="./BaseGroup.d.ts" />
/// <reference path="./BasicLayer.d.ts" />
/// <reference path="./Blur.d.ts" />
/// <reference path="./Border.d.ts" />
/// <reference path="./BorderOptions.d.ts" />
/// <reference path="./ChildLayer.d.ts" />
/// <reference path="./ColorAsset.d.ts" />
/// <reference path="./Component.d.ts" />
/// <reference path="./CurvePoint.d.ts" />
/// <reference path="./Document.ColorSpace.d.ts" />
/// <reference path="./Document.SaveMode.d.ts" />
/// <reference path="./Document.d.ts" />
/// <reference path="./ExportFileFormat.d.ts" />
/// <reference path="./ExportFormat.d.ts" />
/// <reference path="./ExportOptions.d.ts" />
/// <reference path="./ExportResult.d.ts" />
/// <reference path="./Fill.d.ts" />
/// <reference path="./Flow.AnimationType.d.ts" />
/// <reference path="./Flow.BackTarget.d.ts" />
/// <reference path="./Flow.d.ts" />
/// <reference path="./FlowProperty.d.ts" />
/// <reference path="./Gradient.d.ts" />
/// <reference path="./Group.d.ts" />
/// <reference path="./GroupChildLayer.d.ts" />
/// <reference path="./GroupProperties.d.ts" />
/// <reference path="./GroupTypeLayer.d.ts" />
/// <reference path="./HotSpot.d.ts" />
/// <reference path="./HotSpotProperties.d.ts" />
/// <reference path="./IColorAsset.d.ts" />
/// <reference path="./ICurvePoint.d.ts" />
/// <reference path="./IPoint.d.ts" />
/// <reference path="./IStyle.d.ts" />
/// <reference path="./ISwatch.d.ts" />
/// <reference path="./Image.d.ts" />
/// <reference path="./ImageData.d.ts" />
/// <reference path="./ImageProperties.d.ts" />
/// <reference path="./ImportableNative.d.ts" />
/// <reference path="./ImportableObject.d.ts" />
/// <reference path="./Layer.d.ts" />
/// <reference path="./Layer.d.ts" />
/// <reference path="./LayerPropertyType.d.ts" />
/// <reference path="./LayerTransform.d.ts" />
/// <reference path="./LayersPropertyType.d.ts"/>
/// <reference path="./Library.ImportableObjectType.d.ts" />
/// <reference path="./Library.LibraryType.d.ts" />
/// <reference path="./Library.d.ts" />
/// <reference path="./Override.d.ts" />
/// <reference path="./Page.d.ts" />
/// <reference path="./PageProperties.d.ts" />
/// <reference path="./ParentType.d.ts" />
/// <reference path="./Pattern.d.ts" />
/// <reference path="./Point.d.ts" />
/// <reference path="./Rectangle.d.ts" />
/// <reference path="./Selection.ts" />
/// <reference path="./Shape.d.ts" />
/// <reference path="./ShapePath.PointType.d.ts" />
/// <reference path="./ShapePath.ShapeType.d.ts" />
/// <reference path="./ShapePath.d.ts" />
/// <reference path="./ShapePathProperties.d.ts" />
/// <reference path="./ShapeProperties.d.ts" />
/// <reference path="./ShapeType.d.ts" />
/// <reference path="./SharedStyle.StyleType.d.ts" />
/// <reference path="./SharedStyle.d.ts" />
/// <reference path="./Slice.d.ts" />
/// <reference path="./SliceProperties.d.ts" />
/// <reference path="./Style.Arrowhead.d.ts" />
/// <reference path="./Style.BlendingMode.d.ts" />
/// <reference path="./Style.BlurType.d.ts" />
/// <reference path="./Style.BorderPosition.d.ts" />
/// <reference path="./Style.FillType.d.ts" />
/// <reference path="./Style.GradientType.d.ts" />
/// <reference path="./Style.LineEnd.d.ts" />
/// <reference path="./Style.LineJoin.d.ts" />
/// <reference path="./Style.PatternFillType.d.ts" />
/// <reference path="./Style.d.ts" />
/// <reference path="./StyledLayer.d.ts" />
/// <reference path="./Swatch.d.ts" />
/// <reference path="./SymbolInstance.d.ts" />
/// <reference path="./SymbolInstanceProperties.d.ts" />
/// <reference path="./SymbolMaster.d.ts" />
/// <reference path="./SymbolMasterBackground.d.ts" />
/// <reference path="./SymbolMasterProperties.d.ts" />
/// <reference path="./Text.Alignment.d.ts" />
/// <reference path="./Text.LineSpacing.d.ts" />
/// <reference path="./Text.VerticalAlignment.d.ts" />
/// <reference path="./Text.d.ts" />
/// <reference path="./TextFragment.d.ts" />
/// <reference path="./TextProperties.d.ts" />
/// <reference path="./ToExportLayerTypes.d.ts" />
/// <reference path="./Types.d.ts" />
/// <reference path="./export.d.ts" />
/// <reference path="./fromNative.d.ts" />
/// <reference path="./getDocuments.d.ts" />
/// <reference path="./getSelectedDocument.d.ts" />

declare module 'sketch/dom'
{
	// @ts-ignore
	export = dom
}