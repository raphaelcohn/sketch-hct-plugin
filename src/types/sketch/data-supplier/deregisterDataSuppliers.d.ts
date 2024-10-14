// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/data-supplier"
{
	export namespace data
	{
		/**
		 * When registering something, it is good practice to clean up after it.
		 * This is especially useful if when your plugin will be updated: the Shutdown Action will be called before the Startup will.
		 * It gives you the opportunity to update your handler cleanly.
		 */
		export function deregisterDataSuppliers(): void
	}
}
