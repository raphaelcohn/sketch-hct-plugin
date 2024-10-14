// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module 'sketch/dom'
{
	namespace dom
	{
		/**
		 * Sketch Object Types.
		 */
		export enum Types
		{
			Artboard = 'Artboard',
			
			Blur = 'Blur',
			
			Border = 'Border',
			
			BorderOptions = 'BorderOptions',
			
			CurvePoint = 'CurvePoint',
			
			DataOverride = 'DataOverride',
			
			Document = 'Document',
			
			ExportFormat = 'ExportFormat',
			
			Fill = 'Fill',
			
			Flow = 'Flow',
			
			Gradient = 'Gradient',
			
			GradientStop = 'GradientStop',
			
			Group = 'Group',
			
			HotSpot = 'HotSpot',
			
			Image = 'Image',
			
			ImageData = 'ImageData',
			
			ImportableObject = 'ImportableObject',
			
			Library = 'Library',
			
			Override = 'Override',
			
			Page = 'Page',
			
			Shadow = 'Shadow',
			
			Shape = 'Shape',
			
			ShapePath = 'ShapePath',
			
			SharedStyle = 'SharedStyle',
			
			Slice = 'Slice',
			
			Style = 'Style',
			
			SymbolInstance = 'SymbolInstance',
			
			SymbolMaster = 'SymbolMaster',
			
			Text = 'Text',
			
			ColorAsset = 'ColorAsset',
		}
	}
}
