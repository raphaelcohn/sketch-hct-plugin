// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch"
{
	export namespace sketch
	{
		/**
		 * Import a file as a Layer.
		 * @param data The data for the file.
		 * @param type The type of the file being
		 * @return The method returns:–
		 *     a Group if the type is svg or if the type is pdf and the pdf has only one page
		 *     an Image if the type is bitmap
		 *     a Page if the type is pdf and the pdf has multiple pages or eps
		 */
		export function createLayerFromData(data: Buffer | string, type: 'svg' | 'pdf' | 'eps'| 'bitmap'): Group | Image | Page
	}
}
