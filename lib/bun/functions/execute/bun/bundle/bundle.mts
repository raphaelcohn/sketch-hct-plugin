// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import type PackageJson from "../../../json/package/PackageJson.mts"
import type PackageType from "../../../json/package/PackageType.d.ts"
import type AbsoluteFolderPath from "../../../file_system/AbsoluteFolderPath.mjs"
import type Options from "./Options.d.ts"
import type Minification from "./Minification.mjs"
import type UniformResourceLocator from "../../../json/package/UniformResourceLocator"
import type { BuildConfig, BuildOutput, Loader } from "bun"
import { createWorker } from "await-sync"
import { TextDecoder } from "node:util"

const await_synchronously = createWorker()
const synchronous_bundle: (options: Readonly<Options>, package_json: PackageJson, out_parent_folder_path: AbsoluteFolderPath, minification: Minification, base_url_to_make_imports_absolute: UniformResourceLocator | null, relative_file_paths: string[][]) => BuildOutput = await_synchronously(bundle_worker, bundle_worker_result_deserializer)
export default synchronous_bundle

// NOTE: ***This functions receives COPIES of the arguments, so any mutations to them are lost***.
// NOTE: ***This function must not reference any variables, functions or imports not declared within the function body***.
// This is because it is run in a separate worker thread with no access to any variables, functions or imports; the function is transferred to the worker thread by transmitting its source representation in javascript!
// See <https://github.com/jimmywarting/await-sync> where it is also called `toSync(fn, formatter?)` and `await_sync`.
// To import dependencies, use `await import(…)` in the function body.
async function bundle_worker(entry_point_relative_file_paths: string[], options: Readonly<Options>, package_json: PackageJson, out_parent_folder_path: AbsoluteFolderPath, minification: Minification, base_url_to_make_imports_absolute: UniformResourceLocator | null)
{
	const { TextEncoder } = await import("node:util")
	
	const build_configuration: BuildConfig =
	{
		entrypoints: entry_point_relative_file_paths,
		
		outdir: out_parent_folder_path.sub_folder_path(package_json.package_name).absolute_folder_path,
		
		target: options.target,
		
		format: format(package_json.type),
		
		/*
			Generated file name naming
		 */
		naming:
		{
			entry: '[dir]/[name].[ext]',
			chunk: '[name]-[hash].[ext]',
			asset: '[name]-[hash].[ext]',
		},
		
		root: ".",
		
		splitting: minification.splitting,
		
		// could use this to do an eslint on files.
		plugins:
		[
		],
		
		external: options.import_paths_to_resolve_at_runtime,
		
		packages: options.bundle_external_packages ? "bundle" : "external",
		
		sourcemap: minification.source_map,
		
		minify: minification.minify,
		
		ignoreDCEAnnotations: minification.ignoreDCEAnnotations,
		
		emitDCEAnnotations: minification.emitDCEAnnotations,
		
		drop: minification.drop,
		
		// Only for commonjs and target bun.
		bytecode: false,
		
		experimentalCss: false,
		
		//define: Record<string, string>
		
		loader: options.loaders,
		
		//#conditions:
		
		//banner: "use client",
		
		//footer: "// made with index!",
	}
	
	if (base_url_to_make_imports_absolute !== null)
	{
		build_configuration.publicPath = base_url_to_make_imports_absolute
	}
	
	const build_output = await Bun.build(build_configuration)
	
	return new TextEncoder().encode(JSON.stringify(build_output))
}

function format(package_json_type: PackageType): "iife" | "esm" | "cjs"
{
	switch (package_json_type)
	{
		case "script":
			return "iife"
		
		case "module":
			return "esm"
		
		case "commonjs":
			return "cjs"
	}
}

const BundleWorkerResultTextDecoderOptions =
{
	fatal: true,
	ignoreBOM: false
}
function bundle_worker_result_deserializer(result: Uint8Array): BuildOutput
{
	return JSON.parse(new TextDecoder("utf-8", BundleWorkerResultTextDecoderOptions).decode(result))
}
