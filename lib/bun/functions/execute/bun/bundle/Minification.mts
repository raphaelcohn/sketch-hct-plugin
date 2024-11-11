// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import MinificationWhitespace from "./MinificationWhitespace.mjs"
import assert from "../../../common/assert.mjs"
import SourceMap from "./SourceMap.mjs"

export default class Minification
{
	public static readonly Development: Minification = new Minification(SourceMap.inline, false, MinificationWhitespace.Off, false, false, true, false)
	
	public static readonly Production: Minification = new Minification(SourceMap.none, true, MinificationWhitespace.On, true, true, true, true)
	
	public static readonly NodePackageManagerPublication: Minification = new Minification(SourceMap.external, true, MinificationWhitespace.Off, false, false, false, false)
	
	readonly #source_map: SourceMap
	readonly #split_out_common_code_shared_by_entry_points: boolean
	readonly #whitespace: MinificationWhitespace
	readonly #syntax: boolean
	readonly #identifiers: boolean
	readonly #ignore_library_pure_annotations: boolean
	readonly #drop_development_code_extensions: boolean
	
	public constructor(source_map: SourceMap, split_out_common_code_shared_by_entry_points: boolean, whitespace: MinificationWhitespace, syntax: boolean, identifiers: boolean, ignore_library_pure_annotations: boolean, drop_development_code_extensions: boolean)
	{
		this.#source_map = source_map
		this.#split_out_common_code_shared_by_entry_points = split_out_common_code_shared_by_entry_points
		this.#whitespace = whitespace
		this.#syntax = syntax
		this.#identifiers = identifiers
		this.#ignore_library_pure_annotations = ignore_library_pure_annotations
		this.#drop_development_code_extensions = drop_development_code_extensions
	}
	
	/**
	 * @internal
	 * @returns {string}
	 */
	get source_map(): SourceMap
	{
		assert.is_instance_of(this, Minification)
		
		return this.#source_map
	}
	
	/**
	 * @internal
	 * @returns {boolean}
	 */
	get splitting(): boolean
	{
		assert.is_instance_of(this, Minification)
		
		return this.#split_out_common_code_shared_by_entry_points
	}
	
	/**
	 * @internal
	 * @returns {{whitespace: boolean, syntax: boolean, identifiers: boolean}}
	 */
	get minify(): {whitespace: boolean, syntax: boolean, identifiers: boolean}
	{
		assert.is_instance_of(this, Minification)
		
		return {
			whitespace: this.#whitespace !== MinificationWhitespace.Off,
			syntax: this.#syntax,
			identifiers: this.#identifiers,
		}
	}
	
	/**
	 * @internal
	 * @returns {boolean}
	 */
	get ignoreDCEAnnotations(): boolean
	{
		assert.is_instance_of(this, Minification)
		
		return this.#ignore_library_pure_annotations
	}
	
	/**
	 * @internal
	 * @returns {boolean}
	 */
	get emitDCEAnnotations(): boolean
	{
		assert.is_instance_of(this, Minification)
		
		return this.#whitespace === MinificationWhitespace.OnForceEmittingPureAnnotations
	}
	
	get drop(): string[]
	{
		assert.is_instance_of(this, Minification)
		
		if (this.#drop_development_code_extensions)
		{
			return [
				"console",
				"debugger"
			]
		}
		else
		{
			return []
		}
	}
}
