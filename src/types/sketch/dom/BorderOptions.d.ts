// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		/**
		 * An object that represents the options that the Borders of the Layer share.
		 */
		export interface BorderOptions
		{
			/**
			 * The type of the arrow head for the start of the path.
			 */
			startArrowhead?: Style.Arrowhead
			
			/**
			 * The type of the arrow head for the start of the path.
			 */
			endArrowhead?: Style.Arrowhead
			
			/**
			 * The dash pattern of the borders. For example, a dash pattern of 4-2 will draw the stroke for four pixels, put a two pixel gap, draw four more pixels and then so on. A dashed pattern of 5-4-3-2 will draw a stroke of 5 px, a gap of 4 px, then a stroke of 3 px, a gap of 2 px, and then repeat.
			 */
			dashPattern?: number[]
			
			/**
			 * The type of the border ends (if visible).
			 */
			lineEnd?: Style.LineEnd
			
			/**
			 * The type of the border joins (if any).
			 */
			lineJoin?: Style.LineJoin.Bevel | Style.LineJoin.Round | 'Miter'
		}
	}
}
