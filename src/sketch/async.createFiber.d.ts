// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module 'sketch/async'
{
	export namespace async
	{
		/**
		 * By default, Sketch cleans up your script as soon as its callstack is empty. So if you schedule an asynchronous task, chances are that when the task returns, your script will be cleaned up and it will crash Sketch.
		 * A fiber is a way to keep track of a asynchronous task. The script will stay alive as long as at least one fiber is running.
		 */
		export function createFiber(): Fiber
	}
}
