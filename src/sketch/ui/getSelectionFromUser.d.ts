// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module 'sketch/ui'
{
	export namespace ui
	{
		/**
		 * @deprecated
		 * Shows an input sheet which displays a popup with a series of options, from which the user is asked to choose.
		 * @param message The prompt message to show.
		 * @param options An array of option items.
		 * @param selectedIndex The index of the item to select initially.
		 * @return An array with a response code, the selected index and ok. The code will be one of NSAlertFirstButtonReturn or NSAlertSecondButtonReturn. The selection will be the integer index of the selected item. ok is the boolean code === NSAlertFirstButtonReturn.
		 */
		export function getSelectionFromUser(message: string, options: string[], selectedIndex?: number): [number, number, boolean]
	}
}
