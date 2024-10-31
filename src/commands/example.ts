// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

import {sketch} from "sketch"
import {ui} from "sketch/ui"
import ColorSpace = sketch.Document.ColorSpace;

export function example(context: SketchContext)
{
	// @ts-ignore
	const document: sketch.Document = sketch.fromNative(context.document)
	
	if (document.colorSpace != ColorSpace.sRGB)
	{
		ui.alert("Sketch HCT Plugin", "Document color space is not sRGB")
		return
	}
}
