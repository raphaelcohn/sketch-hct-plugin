// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare module "sketch/dom"
{
	namespace dom
	{
		/**
		 * Basic Component class.
		 */
		class Component<NativeType = any>
		{
			static fromNative<NativeType>(nativeObject: NativeType): Component<NativeType>
			
			toJSON(): any
			
			/**
			 * The native Sketch model object.
			 */
			readonly sketchObject: NativeType
			
			/**
			 * A string that represent the type of the component.
			 * If it’s undefined, it means that we couldn’t match the native object and that we returned a really lightweight wrapper.
			 */
			readonly type: Types | undefined
			
			/**
			 * Returns the object ID of the wrapped Sketch model object.
			 */
			readonly id: string
			
			/**
			 * returns if the component is wrapping an immutable version of a native Sketch model object. If that is the case, you won't be able to mutable the object (setting any property will be a no-op).
			 */
			isImmutable(): boolean
			
			/**
			 * Because the API objects are thin wrappers, they are created on demand and are thrown away regularly.
			 *
			 * No attempt is made to have a one-to-one correspondence between wrapper and model object: many wrapper instances may exist which point to the same model object.
			 *
			 * This is not the most efficient solution in some respects, but it's pragmatic and works well for simple cases.
			 * Because multiple wrappers might exist for a given model object, if you're testing two for equality, you should test the things that they wrap, rather than the wrapper objects themselves.
			 */
			isEqual(wrappedObject: Component): boolean
		}
	}
}
