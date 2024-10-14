// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module 'sketch/data-supplier'
{
	export namespace data
	{
		/**
		 * When the plugin providing the dynamic data has finished generating the data (could be an asynchronous operation), it will call this function with the data key and the data.
		 * @param key Should be equal to` context.data.key`.
		 * @param data The list of values to provide.
		 * In case of `public.image`, the string is the path to the image.
		 * It needs to have a length equal to the` context.data.count`.
		 */
		export function supplyData(key: string, data: string[]): void
	}
}
