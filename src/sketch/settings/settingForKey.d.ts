// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module 'sketch/settings'
{
	/**
	 * A set of functions to handle user settings.
	 * The settings are persisted when the user closes Sketch.
	 */
	export namespace settings
	{
		/**
		 * Return the value of a setting scoped to your plugin for a given key.
		 * @param key The setting to look up.
		 * @return The setting that was stored for the given key. undefined if there was nothing
		 */
		export function settingForKey(key: string): any
	}
}
