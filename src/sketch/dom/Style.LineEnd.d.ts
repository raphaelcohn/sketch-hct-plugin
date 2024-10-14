// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module 'sketch/dom'
{
	namespace dom
	{
		export namespace Style
		{
			export enum LineEnd
			{
				/**
				 * This is the default option that’ll draw the border right to the vector point.
				 */
				Butt = 'Butt',
				
				/**
				 * Creates a rounded, semicircular end to a path that extends past the vector point.
				 */
				Round = 'Round',
				
				/**
				 * Similar to the rounded cap, but with a straight edges.
				 */
				Projecting = 'Projecting',
			}
		}
	}
}
