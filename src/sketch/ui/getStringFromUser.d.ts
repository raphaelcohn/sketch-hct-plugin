// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module 'sketch/ui'
{
	export namespace ui
	{
		/**
		 * @deprecated
		 * Shows a simple input sheet which displays a message, and asks for a single string input.
		 * @param message The prompt message to show.
		 * @param initialValue The initial value of the input string.
		 * @return The string that the user input, or "null" (String) if the user clicked 'Cancel'.
		 */
		export function getStringFromUser(message: string, initialValue?: string): string
	}
}
