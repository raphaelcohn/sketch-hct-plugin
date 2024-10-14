// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module 'sketch/dom'
{
	namespace dom
	{
		export interface ShapeProperties
		{
			/**
			 * The name of the Shape
			 */
			name?: string
			
			/**
			 * The group the Shape is in.
			 */
			parent?: Group
			
			/**
			 * The frame of the Shape. This is given in coordinates that are local to the parent of the layer.
			 */
			frame?: Rectangle
			
			/**
			 * The prototyping action associated with the Shape.
			 */
			flow?: FlowProperty
			
			/**
			 * The style of the Shape.
			 */
			style?: Style | IStyle
		}
	}
}
