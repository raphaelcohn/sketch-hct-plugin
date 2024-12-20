// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/ui"
{
	export namespace ui
	{
		/**
		 * Show an alert with a custom title and message.
		 * The alert is modal, so it will stay around until the user dismisses it by pressing the OK button.
		 * @param title The title of the alert.
		 * @param text The text of the message.
		 */
		export function alert(title: string, text: string): void
	}
}
