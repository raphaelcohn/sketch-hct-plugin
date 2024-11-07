// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		import CGRect = cocoascript.CGRect
		import NSRect = cocoascript.NSRect
		
		/**
		 * A utility class to represent a rectangle.
		 * Contains some methods to make interacting with a rectangle easier.
		 */
		export class Rectangle
		{
			constructor(x: number, y: number, width: number, height: number)
			
			constructor(rect: Rectangle)
			
			/**
			 * The x coordinate of the top-left corner of the rectangle.
			 */
			x: number
			
			/**
			 * The y coordinate of the top-left corner of the rectangle.
			 */
			y: number
			
			/**
			 * The width of the rectangle.
			 */
			width: number
			
			/**
			 * The height of the rectangle.
			 */
			height: number
			
			/**
			 * Adjust the rectangle by offsetting it.
			 */
			offset(x: number, y: number): this
			
			/**
			 * Adjust the rectangle by scaling it.
			 * The scaleHeight argument can be omitted to apply the same factor on both the width and the height.
			 * @return Return this rectangle (useful if you want to chain the calls).
			 */
			scale(scale: number, scaleHeight?: number): this
			
			/**
			 *
			 * Change the coordinates basis
			 * Each layer defines its own system of coordinates (with its origin at the top left of the layer).
			 * You can change that basis from one layer to the other with changeBasis.
			 * Both from and to can be omitted (but not at the same time) to change the basis from/to the Page coordinates.
			 *
			 * @param change.from The layer in which the rectangle’s coordinates are expressed.
			 * @param change.to The layer in which the rectangle’s coordinates will be expressed.
			 */
			changeBasis(change: { from?: Layer; to?: Layer }): Rectangle
			
			/**
			 * Return the Rectangle as a CGRect
			 */
			asCGRect(): CGRect
			
			/**
			 * Return the Rectangle as a NSRect
			 */
			asCGRect(): NSRect
		}
	}
}
