// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/settings"
{
	import {dom} from "sketch/dom"
	
	export namespace settings
	{
		/**
		 * Return the value of a setting for a given key on a specific document
		 * @param document The document on which a setting is stored.
		 * @param key The setting to look up.
		 * @return The setting that was stored for the given key. undefined if there was nothing
		 */
		export function documentSettingForKey(document: dom.Document, key: string): any
	}
}
