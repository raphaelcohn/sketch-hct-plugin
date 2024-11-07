// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/async"
{
	export namespace async
	{
		export abstract class Fiber
		{
			/**
			 * To end a fiber, call fiber.cleanup(). This will tell Sketch that it can garbage collect the script if no other fiber is running.
			 */
			cleanup(): void
			
			/**
			 * You can run a function when the fiber is about to be cleaned up by setting a callback.
			 */
			onCleanup(cb: () => void): void
		}
	}
}
