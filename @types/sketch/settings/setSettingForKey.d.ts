// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/settings"
{
	export namespace settings
	{
		/**
		 * Store a value of a setting scoped to your plugin for a given key.
		 * @param key The setting to set.
		 * @param value The value to set it to.
		 */
		export function setSettingForKey(key: string, value: any): void
	}
}
