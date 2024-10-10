// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module 'sketch/dom'
{
	namespace dom
	{
		// import CGPoint = cocoascript.CGPoint
		// import CGPoint = cocoascript.NSPoint
		
		export interface IPoint
		{
			x: number
			
			y: number
		}
		
		/**
		 * A utility class to represent a point.
		 */
		export class Point implements IPoint
		{
			/**
			 * The x coordinate of the point.
			 */
			x: number
			
			/**
			 * The y coordinate of the point.
			 */
			y: number
			
			// /**
			//  * Return the Point as a CGPoint.
			//  */
			// asCGPoint(): CGPoint
			//
			// /**
			//  * Return the Point as a NSPoint.
			//  */
			// asNSPoint(): NSPoint
		}
	}
}
