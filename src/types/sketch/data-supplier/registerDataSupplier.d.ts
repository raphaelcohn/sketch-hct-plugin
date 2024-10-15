// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/data-supplier"
{
	export namespace data
	{
		/**
		 * Register some data with a name and a key.
		 * @param dataType The data type. Currently public.text or public.image are the only allowed values.
		 * @param dataName The data name, will be used as the menu item title for the data.
		 * @param action The name of the Action that will be dispatched when the user requests some data.
		 * See supplyData.
		 */
		export function registerDataSupplier(dataType: DataType, dataName: string, action: string): void
	}
}
