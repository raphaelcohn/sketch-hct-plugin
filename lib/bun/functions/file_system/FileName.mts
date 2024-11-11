// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import assert from "../common/assert.mjs"
import type AbsoluteFilePath from "./AbsoluteFilePath.mjs"
import AbsoluteFolderPath from "./AbsoluteFolderPath.mjs"

export default class FileName
{
	public static readonly package_json: FileName = new FileName("package.json")
	
	public static readonly tsconfig_json: FileName = new FileName("tsconfig.json")
	
	public static readonly eslint_config: FileName = new FileName("eslint.config.mjs")
	
	public static readonly manifest_json: FileName = new FileName("manifest.json")
	
	public constructor(readonly file_name: string)
	{
		assert.is_non_empty_string(file_name)
	}
	
	public toString(this: this, _radix?: number): string
	{
		return this.file_name
	}
	
	public absolute_file_path(this: this, parent_folder_path: AbsoluteFolderPath): AbsoluteFilePath
	{
		return parent_folder_path.sub_file_path(this.file_name)
	}
	
	public execute(this: this, working_directory: AbsoluteFolderPath, ...binary_arguments: string[]): string
	{
		let file_path = this.which_binary_executable_on_path()
		if (file_path === null)
		{
			throw new Error(`${this.file_name} is not on the PATH`)
		}
		return file_path.execute(working_directory, ...binary_arguments)
	}
	
	public which_binary_executable_on_path(this: this): AbsoluteFilePath | null
	{
		const paths = AbsoluteFolderPath.PATH();
		for (let path of paths)
		{
			const file_path = path.sub_file_path(this.file_name)
			if (file_path.is_file_or_symlink_and_is_readable_and_executable())
			{
				return file_path
			}
		}
		
		return null
	}
}
