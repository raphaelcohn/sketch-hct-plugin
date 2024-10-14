// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module 'sketch/dom'
{
	namespace dom
	{
		// import MSShapePathLayer = sketchInternal.MSShapePathLayer
		// export class ShapePath extends StyledLayer<MSShapePathLayer>
		export class ShapePath extends StyledLayer<any>
		{
			constructor(properties?: ShapePathProperties)
			
			type: Types.ShapePath
			
			/**
			 * The group the Shape is in.
			 */
			parent: Group
			
			/**
			 * The points defining the Shape Path.
			 */
			points: CurvePoint[]
			
			/**
			 * The type of the Shape Path. It can only be set when creating a new ShapePath.
			 */
			readonly shapeType: ShapePath.ShapeType
			
			/**
			 * If the Path is closed.
			 */
			closed: boolean
			
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
			 */
			static fromSVGPath(svg: string): ShapePath
			
			/**
			 * Returns a string representing the SVG path of the ShapePath.
			 */
			getSVGPath(): string
		}
	}
}
