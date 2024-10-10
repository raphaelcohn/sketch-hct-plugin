// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module 'sketch'
{
	import {dom} from 'sketch/dom'
	import {ui} from 'sketch/ui'
	import {settings} from 'sketch/settings'
	import {async} from 'sketch/async'
	import {data} from 'sketch/data-supplier'
	
	export class sketch
	{
		static export: typeof dom.export
	}
	
	export namespace sketch
	{
		export const version:
		{
			readonly api: string
			readonly sketch: string
		}
		
		export import UI = ui
		export import Settings = settings
		export import Async = async
		export import DataSupplier = data
		export import Types = dom.Types
		export import getSelectedDocument = dom.getSelectedDocument
		export import getDocuments = dom.getDocuments
		export import Document = dom.Document
		export import Layer = dom.Layer
		export import LayerPropertyType = dom.LayerPropertyType
		export import LayersPropertyType = dom.LayersPropertyType
		export import GroupProperties = dom.GroupProperties
		export import Group = dom.Group
		export import PageProperties = dom.PageProperties
		export import Page = dom.Page
		export import ArtboardProperties = dom.ArtboardProperties
		export import Artboard = dom.Artboard
		export import ImageProperties = dom.ImageProperties
		export import Image = dom.Image
		export import ImageData = dom.ImageData
		export import ShapeProperties = dom.ShapeProperties
		export import Shape = dom.Shape
		export import ShapePath = dom.ShapePath
		export import TextProperties = dom.TextProperties
		export import Text = dom.Text
		export import TextFragment = dom.TextFragment
		export import SymbolMasterProperties = dom.SymbolMasterProperties
		export import SymbolMaster = dom.SymbolMaster
		export import SymbolInstanceProperties = dom.SymbolInstanceProperties
		export import SymbolInstance = dom.SymbolInstance
		export import Override = dom.Override
		export import FlowProperty = dom.FlowProperty
		export import Flow = dom.Flow
		export import HotSpotProperties = dom.HotSpotProperties
		export import HotSpot = dom.HotSpot
		export import Library = dom.Library
		export import ImportableObject = dom.ImportableObject
		export import Selection = dom.Selection
		export import Rectangle = dom.Rectangle
		export import IStyle = dom.IStyle
		export import Blur = dom.Blur
		export import Fill = dom.Fill
		export import Border = dom.Border
		export import BorderOptions = dom.BorderOptions
		export import Shadow = dom.Shadow
		export import Gradient = dom.Gradient
		export import GradientStop = dom.GradientStop
		export import Style = dom.Style
		export import SharedStyle = dom.SharedStyle
		export import fromNative = dom.fromNative
		export import ExportOptions = dom.ExportOptions
	}
}
