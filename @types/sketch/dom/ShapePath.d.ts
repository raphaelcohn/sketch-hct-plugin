// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		import MSShapePathLayer = sketchInternal.MSShapePathLayer
		
		/**
		 * A shape path layer.
		 * It is an instance of Layer so all the methods defined there are available.
		 */
		export class ShapePath extends StyledLayer<MSShapePathLayer>
		{
			/**
			 * You can only set the shapeType when creating a new one. Once it is created, the shapeType is read-only
			 * If it is not specified and you do not specify any points, it will default to ShapePath.ShapeType.Rectangle (if you do specify some points, it will default to ShapePath.ShapeType.Custom).
			 */
			constructor(properties?: ShapePathConstructorProperties)
			
			type: Types.ShapePath
			
			/**
			 * The group the Shape is in.
			 */
			parent: Group
			
			/**
			 * The ID of the SharedStyle or null, identical to sharedStyle.id.
			 */
			sharedStyleId: string | null
			
			/**
			 * The associated shared style.
			 */
			sharedStyle: SharedStyle | null
			
			/**
			 * create a new ShapePath from an SVG path (the string that goes in the `d` attribute of a path tag in an SVG).
			 * @param d eg 'M10 10 H 90 V 90 H 10 L 10 10'.
			 */
			static fromSVGPath(d: string): ShapePath
			
			/**
			 * Returns a string representing the SVG path of the ShapePath.
			 */
			getSVGPath(): string
			
			/**
			 * The points defining the Shape Path.
			 */
			points: CurvePoint[]
			
			/**
			 * If the Path is closed.
			 */
			closed: boolean
			
			/**
			 * The type of the Shape Path.
			 * It can only be set when creating a new ShapePath.
			 */
			readonly shapeType: ShapePath.ShapeType
		}
	}
}
