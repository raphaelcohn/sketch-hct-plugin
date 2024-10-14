// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		/**
		 * A utility class to represent a curve point (with handles to control the curve in a path).
		 */
		import MSCurvePoint = sketchInternal.MSCurvePoint
		
		class CurvePoint extends Component<MSCurvePoint>
		{
			/**
			 * The position of the point.
			 */
			point: Point
			
			/**
			 * The position of the handle control point for the incoming path.
			 */
			curveFrom: Point
			
			/**
			 * The position of the handle control point for the outgoing path.
			 */
			curveTo: Point
			
			/**
			 * The corner radius of the point.
			 */
			cornerRadius: number
			
			/**
			 * The type of the point.
			 */
			pointType: CurvePoint.PointType
		}
		
		namespace CurvePoint
		{
			type PointType = ShapePath.PointType
		}
	}
}
