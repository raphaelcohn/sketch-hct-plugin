// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

/// <reference path="./alert.d.ts" />
/// <reference path="./getInputFromUser.d.ts" />
/// <reference path="./getSelectionFromUser.d.ts" />
/// <reference path="./getTheme.d.ts" />
/// <reference path="./INPUT_TYPE.d.ts" />
/// <reference path="./message.d.ts" />
/// <reference path="./SelectionInputOptions.d.ts" />
/// <reference path="./StringInputOptions.d.ts" />
/// <reference path="./getStringFromUser.d.ts" />

declare module "sketch/ui"
{
	/**
	 * A set of functions to show some user interfaces.
	 * The set is small on purpose.
	 * Any more complex UI should be provided by third party libraries and doesn’t need to be in the core.
	 */
	export namespace ui
	{
	}
}
