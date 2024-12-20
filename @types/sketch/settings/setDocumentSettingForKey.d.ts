// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/settings"
{
	import {dom} from "sketch/dom"
	
	export namespace settings
	{
		/**
		 * Store a value of a setting for a given key on a specific document.
		 * @param document The document on which the setting is set.
		 * @param key The setting to set.
		 * @param value The value to set it to.
		 */
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		export function setDocumentSettingForKey(document: dom.Document, key: string, value: any): void
	}
}
