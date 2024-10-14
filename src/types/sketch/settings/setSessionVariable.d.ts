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
	}
}

declare module 'sketch/settings'
{
	export namespace settings
	{
		/**
		 * Store a value of a variable which is persisted when the plugin finishes to run but is not persisted when Sketch closes
		 * It is useful when you want to keep a value between plugin's runs.
		 * @param key The variable to set
		 * @param value The value to set it to
		 */
		export function setSessionVariable(key: string, value: any): void
	}
}
