// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {FiniteNumber} from "../FiniteNumber.mjs";
import type {InclusiveOrExclusive} from "./InclusiveOrExclusive.mts";

export interface Range
{
	readonly MinimumDescription: InclusiveOrExclusive
	
	readonly MaximumDescription: InclusiveOrExclusive
	
	validate_minimum(this: NonNullable<this>, value: NonNullable<FiniteNumber>): boolean
	
	validate_maximum(this: NonNullable<this>, value: NonNullable<FiniteNumber>): boolean
	
	is_in_range(this: NonNullable<this>, value: NonNullable<FiniteNumber>): boolean
	
	is_out_of_range(this: NonNullable<this>, value: NonNullable<FiniteNumber>): boolean
}
