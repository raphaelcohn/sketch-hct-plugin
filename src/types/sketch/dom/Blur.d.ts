// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		/**
		 * An object that represent the blur of the layer.
		 */
		export interface Blur
		{
			/**
			 * The type of the blur.
			 */
			blurType: Style.BlurType
			
			/**
			 * The radius of the blur.
			 */
			radius: number
			
			/**
			 * The angle of the blur (only used when the blur type is Motion).
			 */
			motionAngle?: number
			
			/**
			 * The center of the blur (only used when the blur type is Zoom.
			 */
			center?:
				{
					x: number
					
					y: number
				}
			
			/**
			 * Whether the fill is active or not.
			 */
			enabled?: boolean
		}
	}
}
