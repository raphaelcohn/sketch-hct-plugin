// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare namespace cocoascript
{
	/**
	 * An object that manages metrics for drawing attributed strings.
	 * https://developer.apple.com/documentation/uikit/nsstringdrawingcontext
	 */
	interface NSStringDrawingContext extends NSObject
	{
		alloc(): NSStringDrawingContext
		
		init(): NSStringDrawingContext
		
		// https://developer.apple.com/documentation/uikit/nsstringdrawingcontext/1534020-minimumscalefactor
		minimumScaleFactor(): CGFloat
		setMinimumScaleFactor(value: CGFloat): void
		
		// https://developer.apple.com/documentation/uikit/nsstringdrawingcontext/1531498-actualscalefactor
		actualScaleFactor(): CGFloat
		setActualScaleFactor(value: CGFloat): void
		
		// https://developer.apple.com/documentation/uikit/nsstringdrawingcontext/1530525-totalbounds
		totalBounds(): CGRect
		setTotalBounds(value: CGRect): void
		
		// https://developer.apple.com/documentation/uikit/nsstringdrawingcontext/1624043-minimumtrackingadjustment
		minimumTrackingAdjustment(): CGFloat
		setMinimumTrackingAdjustment(value: CGFloat): void
		
		// https://developer.apple.com/documentation/uikit/nsstringdrawingcontext/1624042-actualtrackingadjustment
		actualTrackingAdjustment(): CGFloat
		setActualTrackingAdjustment(value: CGFloat): void
	}
}
