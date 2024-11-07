// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		import MSShapeGroup = sketchInternal.MSShapeGroup
		
		/**
		 * A shape layer.
		 * It is an instance of Layer so all the methods defined there are available.
		 * It is shaped by its layers which have boolean operations between them.
		 */
		export class Shape extends BaseGroup<MSShapeGroup>
		{
			constructor(properties?: ShapeProperties)
			
			type: Types.Shape
			
			/**
			 * The group the Shape is in.
			 */
			parent: Group
			
			/**
			 * The associated shared style.
			 */
			sharedStyle: SharedStyle | null
			
			/**
			 * The ID of the SharedStyle or null, identical to sharedStyle.id.
			 */
			sharedStyleId: string | null
		}
	}
}
