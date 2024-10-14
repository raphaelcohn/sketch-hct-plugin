// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module 'sketch/dom'
{
	namespace dom
	{
		// import MSArtboardGroup = sketchInternal.MSArtboardGroup
		// class BaseArtboard<NativeType extends MSArtboardGroup = MSArtboardGroup> extends BaseGroup<MSArtboardGroup>
		class BaseArtboard<NativeType = any> extends BaseGroup<NativeType>
		{
			/**
			 * The page the Artboard is in.
			 */
			parent: Page
			/**
			 * A Start Point allows you to choose where to start your prototype from.
			 */
			flowStartPoint: boolean
			/**
			 * The background of the Artboard
			 */
			background: ArtboardBackground
		}
	}
}
