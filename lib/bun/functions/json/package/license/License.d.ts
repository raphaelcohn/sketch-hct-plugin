// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import type { SpdxLicenseCode } from "./SpdxLicenseCode.d.ts"
import type { SpdxLicenseExpressionVersion2Point0 } from "./SpdxLicenseExpressionVersion2Point0.d.ts"
import type { CustomLicense } from "./CustomLicense.d.ts"

export type License = SpdxLicenseCode | SpdxLicenseExpressionVersion2Point0 | CustomLicense | "UNLICENSED"
export default License
