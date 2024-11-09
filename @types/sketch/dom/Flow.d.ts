// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		/**
		 * Enumeration of the animation types.
		 */
		export namespace Flow
		{
		}
		
		/**
		 * The prototyping action associated with a layer.
		 */
		export interface Flow
		{
			/**
			 * The target artboard of the action or Flow.BackTarget if the action is a back action.
			 */
			target?: Artboard | typeof Flow.BackTarget
			
			/**
			 * The ID of target artboard of the action or Flow.BackTarget if the action is a back action.
			 *
			 * eg the id of an artboard.
			 */
			targetId?: string | typeof Flow.BackTarget
			
			/**
			 * The type of the animation.
			 */
			animationType?: Flow.AnimationType
			
			/**
			 * Check if the action is a Back action.
			 *
			 * Returns whether the prototyping action is a back action or not, eg. whether layer.flow.target === Flow.BackTarget.
			 *
			 * Is only valid on flow properties retrieved from layers.
			 */
			readonly isBackAction?: () => boolean
			
			/**
			 * Check if the target is valid.
			 *
			 * In some cases, the target of the action can be invalid, for example when the target has been removed from the document.
			 * The methods returns whether the target is valid or not.
			 *
			 * Is only valid on flow properties retrieved from layers.
			 */
			readonly isValidConnection?: () => boolean
		}
	}
}
