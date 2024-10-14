// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/settings"
{
	export namespace settings
	{
		/**
		 * Return the value of a variable which is persisted when the plugin finishes to run but is not persisted when Sketch closes.
		 * It is useful when you want to keep a value between plugin's runs.
		 * @param key The variable to look up
		 * @return The variable that was saved.
		 */
		export function sessionVariable(key: string): any
	}
}
