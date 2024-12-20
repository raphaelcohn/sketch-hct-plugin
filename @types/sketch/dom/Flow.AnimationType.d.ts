// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		export namespace Flow
		{
			/**
			 * Enumeration of the animation types.
			 */
			export enum AnimationType
			{
				/**
				 * No animation.
				 */
				none = 'none',
				
				/**
				 * Slide from the left.
				 */
				slideFromLeft = 'slideFromLeft',
				
				/**
				 * Slide from the right.
				 */
				slideFromRight = 'slideFromRight',
				
				/**
				 * Slide from the bottom.
				 */
				slideFromBottom = 'slideFromBottom',
				
				/**
				 * Slide from the top.
				 */
				slideFromTop = 'slideFromTop',
			}
		}
	}
}
