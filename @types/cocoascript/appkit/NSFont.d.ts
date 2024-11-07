// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare namespace cocoascript
{
	/**
	 * The representation of a font in an app.
	 * https://developer.apple.com/documentation/appkit/nsfont
	 */
	interface NSFont extends NSObject
	{
		alloc(): NSFont
		
		init(): NSFont

		// https://developer.apple.com/documentation/appkit/nsfont/1525977-fontwithname
		fontWithName_size(fontName: string | NSString, fontSize: CGFloat): NSFont

		// // https://developer.apple.com/documentation/appkit/nsfont/1525386-fontwithdescriptor
		// fontWithDescriptor_size(fontDescriptor: NSFontDescriptor, fontSize: CGFloat): NSFont
		//
		// // https://developer.apple.com/documentation/appkit/nsfont/1525775-fontwithdescriptor
		// fontWithDescriptor_textTransform(fontDescriptor: NSFontDescriptor, textTransform: NSAffineTransform): NSFont

		// https://developer.apple.com/documentation/appkit/nsfont/1530751-fontwithname
		fontWithName_matrix(fontName: string | NSString, fontMatrix: CGFloat): NSFont

		// https://developer.apple.com/documentation/appkit/nsfont/1524559-userfontofsize
		userFontOfSize(fontSize: CGFloat): NSFont

		// https://developer.apple.com/documentation/appkit/nsfont/1531381-userfixedpitchfontofsize
		userFixedPitchFontOfSize(fontSize: CGFloat): NSFont

		// https://developer.apple.com/documentation/appkit/nsfont/3553195-preferredfontfortextstyle
		preferredFontForTextStyle_options(style: NSFontTextStyle, options: NSFont): NSFont

		// https://developer.apple.com/documentation/appkit/nsfont/1530094-systemfontofsize
		systemFontOfSize(fontSize: CGFloat): NSFont

		// https://developer.apple.com/documentation/appkit/nsfont/1524930-systemfontofsize
		systemFontOfSize_weight(fontSize: CGFloat, weight: NSFontWeight): NSFont

		// https://developer.apple.com/documentation/appkit/nsfont/1533549-boldsystemfontofsize
		boldSystemFontOfSize(fontSize: CGFloat): NSFont

		// https://developer.apple.com/documentation/appkit/nsfont/3042659-monospacedsystemfontofsize
		monospacedSystemFontOfSize_weight(fontSize: CGFloat, weight: NSFontWeight): NSFont

		// https://developer.apple.com/documentation/appkit/nsfont/1528205-monospaceddigitsystemfontofsize
		monospacedDigitSystemFontOfSize_weight(fontSize: CGFloat, weight: NSFontWeight): NSFont

		// https://developer.apple.com/documentation/appkit/nsfont/1531931-systemfontsize
		systemFontSize(): CGFloat
		setSystemFontSize(value: CGFloat): void

		// https://developer.apple.com/documentation/appkit/nsfont/1535612-smallsystemfontsize
		smallSystemFontSize(): CGFloat
		setSmallSystemFontSize(value: CGFloat): void

		// https://developer.apple.com/documentation/appkit/nsfont/1528213-labelfontofsize
		labelFontOfSize(fontSize: CGFloat): NSFont

		// https://developer.apple.com/documentation/appkit/nsfont/1525777-messagefontofsize
		messageFontOfSize(fontSize: CGFloat): NSFont

		// https://developer.apple.com/documentation/appkit/nsfont/1534194-menubarfontofsize
		menuBarFontOfSize(fontSize: CGFloat): NSFont

		// https://developer.apple.com/documentation/appkit/nsfont/1533068-menufontofsize
		menuFontOfSize(fontSize: CGFloat): NSFont

		// https://developer.apple.com/documentation/appkit/nsfont/1527070-controlcontentfontofsize
		controlContentFontOfSize(fontSize: CGFloat): NSFont

		// https://developer.apple.com/documentation/appkit/nsfont/1530200-titlebarfontofsize
		titleBarFontOfSize(fontSize: CGFloat): NSFont

		// https://developer.apple.com/documentation/appkit/nsfont/1535462-palettefontofsize
		paletteFontOfSize(fontSize: CGFloat): NSFont

		// https://developer.apple.com/documentation/appkit/nsfont/1527704-tooltipsfontofsize
		toolTipsFontOfSize(fontSize: CGFloat): NSFont

		// https://developer.apple.com/documentation/appkit/nsfont/1534629-labelfontsize
		labelFontSize(): CGFloat
		setLabelFontSize(value: CGFloat): void

		// // https://developer.apple.com/documentation/appkit/nsfont/1529747-systemfontsizeforcontrolsize
		// systemFontSizeForControlSize(controlSize: NSControlSize): CGFloat

		// https://developer.apple.com/documentation/appkit/nsfont/1531373-set
		set(): void

		// // https://developer.apple.com/documentation/appkit/nsfont/1534538-setincontext
		// setInContext(graphicsContext: NSGraphicsContext): void

		// https://developer.apple.com/documentation/appkit/nsfont/1524511-pointsize
		pointSize(): CGFloat
		setPointSize(value: CGFloat): void

		// https://developer.apple.com/documentation/appkit/nsfont/1535912-coveredcharacterset
		coveredCharacterSet(): NSCharacterSet
		setCoveredCharacterSet(value: NSCharacterSet): void

		// // https://developer.apple.com/documentation/appkit/nsfont/1530476-fontdescriptor
		// fontDescriptor(): NSFontDescriptor
		// setFontDescriptor(value: NSFontDescriptor): void

		// https://developer.apple.com/documentation/appkit/nsfont/1529210-fixedpitch
		fixedPitch(): boolean
		setFixedPitch(value: boolean): void

		// https://developer.apple.com/documentation/appkit/nsfont/1527635-mostcompatiblestringencoding
		mostCompatibleStringEncoding(): NSStringEncoding
		setMostCompatibleStringEncoding(value: NSStringEncoding): void

		// https://developer.apple.com/documentation/appkit/nsfont/1533968-numberofglyphs
		numberOfGlyphs(): NSUInteger
		setNumberOfGlyphs(value: NSUInteger): void

		// https://developer.apple.com/documentation/appkit/nsfont/1531660-displayname
		displayName(): string | NSString
		setDisplayName(value: string | NSString): void

		// https://developer.apple.com/documentation/appkit/nsfont/1529585-familyname
		familyName(): string | NSString
		setFamilyName(value: string | NSString): void

		// https://developer.apple.com/documentation/appkit/nsfont/1526183-fontname
		fontName(): string | NSString
		setFontName(value: string | NSString): void

		// https://developer.apple.com/documentation/appkit/nsfont/1526068-setuserfont
		setUserFont(font: NSFont): void

		// https://developer.apple.com/documentation/appkit/nsfont/1529050-setuserfixedpitchfont
		setUserFixedPitchFont(font: NSFont): void

		// https://developer.apple.com/documentation/appkit/nsfont/1534644-vertical
		vertical(): boolean
		setVertical(value: boolean): void

		// https://developer.apple.com/documentation/appkit/nsfont/1535152-verticalfont
		verticalFont(): NSFont
		setVerticalFont(value: NSFont): void

		// https://developer.apple.com/documentation/appkit/nsfont/3667454-fontwithsize
		fontWithSize(fontSize: CGFloat): NSFont
	}
}
