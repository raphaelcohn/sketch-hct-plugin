// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch"
{
	import IColorAsset from "sketch/dom"
	import GradientAsset from "sketch/dom"
	
	export namespace sketch
	{
		export namespace globalAssets
		{
			// Get the Global Colors.
			/// @returns An array of ColorAsset objects.
			export const colors: Array<IColorAsset>
			
			// Get the Global Gradients.
			/// @returns An array of GradientAsset objects.
			export const gradients: Array<GradientAsset>
		}
	}
}
