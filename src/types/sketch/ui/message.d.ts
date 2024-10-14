// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module 'sketch/ui'
{
	import {dom} from 'sketch/dom'
	
	export namespace ui
	{
		/**
		 * Show a small, temporary, message to the user.
		 * The message appears at the bottom of the selected document, and is visible for a short period of time.
		 * It should consist of a single line of text.
		 * @param text The message to show.
		 * @param document The document to show the message into.
		 */
		export function message(text: string, document?: dom.Document): void
	}
}
