// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module 'sketch/dom'
{
	namespace dom
	{
		export interface PageProperties
		{
			/**
			 * The name of the Page
			 */
			name?: string
			
			/**
			 * The document the page is in.
			 */
			parent?: Document
			
			/**
			 * The layers that this page has
			 */
			layers?: LayersPropertyType
			
			/**
			 * The frame of the page
			 */
			frame?: Rectangle
		}
		
		export type LayerPropertyType = Layer | (GroupProperties & { type: Types.Group }) | (ImageProperties & { type: Types.Image }) | (ShapeProperties & { type: Types.Shape }) | (ShapeProperties & { type: Types.ShapePath }) | (TextProperties & { type: Types.Text }) | (SymbolInstanceProperties & { type: Types.SymbolInstance }) | (HotSpotProperties & { type: Types.HotSpot })
		
		export type LayersPropertyType = LayerPropertyType[]
		
		export interface GroupProperties
		{
			/**
			 * The name of the Group
			 */
			name?: string
			
			/**
			 * The group the Group is in.
			 */
			parent?: Group
			
			/**
			 * The frame of the Group. This is given in coordinates that are local to the parent of the layer.
			 */
			frame?: Rectangle
			
			/**
			 * The prototyping action associated with the Group.
			 */
			flow?: FlowProperty
			
			/**
			 * The style of the Group.
			 */
			style?: Style | IStyle
			
			/**
			 * The layers that this Group has
			 */
			layers?: LayersPropertyType
		}
	}
}
