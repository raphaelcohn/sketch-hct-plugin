// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module 'sketch/dom'
{
	namespace dom
	{
		/**
		 * The prototyping action associated with a layer.
		 */
		export interface FlowProperty
		{
			/**
			 * The target artboard of the action or Flow.BackTarget if the action is a back action.
			 */
			target?: Artboard | typeof Flow.BackTarget
			
			/**
			 * The ID of target artboard of the action or Flow.BackTarget if the action is a back action.
			 */
			targetId?: string | typeof Flow.BackTarget
			
			/**
			 * The type of the animation.
			 */
			animationType?: Flow.AnimationType
			
			/**
			 * Returns whether the prototyping action is a back action or not, eg. whether layer.flow.target === Flow.BackTarget.
			 * Is only valid on flow properties retrieved from layers
			 */
			readonly isBackAction?: () => boolean
			
			/**
			 * In some cases, the target of the action can be invalid, for example when the target has been removed from the document. The methods returns whether the target is valid or not.
			 * Is only valid on flow properties retrieved from layers.
			 */
			readonly isValidConnection?: () => boolean
		}
		
		/**
		 * Enumeration of the animation types.
		 */
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
			
			/**
			 * Flow.BackTarget is a constant that you can set the target to in order to always take you back to the last Artboard you were looking at.
			 * When a Target has been set to Flow.BackTarget, the transition leading into it will be reversed on return.
			 */
			export const BackTarget: unique symbol
		}
	}
}
