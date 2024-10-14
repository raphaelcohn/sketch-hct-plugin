// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare namespace cocoascript
{
	/**
	 * An abstract class that forms the basis of event and command processing in AppKit.
	 * https://developer.apple.com/documentation/appkit/nsresponder
	 */
	interface NSResponder extends NSObject
	{
		// https://developer.apple.com/documentation/appkit/nsresponder/1528708-acceptsfirstresponder
		acceptsFirstResponder(): boolean
		setAcceptsFirstResponder(value: boolean): void

		// https://developer.apple.com/documentation/appkit/nsresponder/1526750-becomefirstresponder
		becomeFirstResponder(): boolean

		// https://developer.apple.com/documentation/appkit/nsresponder/1532115-resignfirstresponder
		resignFirstResponder(): boolean

		// // https://developer.apple.com/documentation/appkit/nsresponder/1527066-validateproposedfirstresponder
		// validateProposedFirstResponder_forEvent(responder: NSResponder, event: NSEvent): boolean

		// https://developer.apple.com/documentation/appkit/nsresponder/1528245-nextresponder
		nextResponder(): NSResponder
		setNextResponder(value: NSResponder): void

		// // https://developer.apple.com/documentation/appkit/nsresponder/1524634-mousedown
		// mouseDown(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1527420-mousedragged
		// mouseDragged(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1535349-mouseup
		// mouseUp(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1525114-mousemoved
		// mouseMoved(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1529306-mouseentered
		// mouseEntered(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1527561-mouseexited
		// mouseExited(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1524727-rightmousedown
		// rightMouseDown(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1529135-rightmousedragged
		// rightMouseDragged(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1526309-rightmouseup
		// rightMouseUp(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1525719-othermousedown
		// otherMouseDown(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1529804-othermousedragged
		// otherMouseDragged(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1531343-othermouseup
		// otherMouseUp(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1525805-keydown
		// keyDown(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1527436-keyup
		// keyUp(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1531599-interpretkeyevents
		// interpretKeyEvents(eventArray: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1524690-performkeyequivalent
		// performKeyEquivalent(event: NSEvent): boolean

		// https://developer.apple.com/documentation/appkit/nsresponder/1584388-performmnemonic
		performMnemonic(string: string | NSString): boolean

		// https://developer.apple.com/documentation/appkit/nsresponder/1527264-flushbufferedkeyevents
		flushBufferedKeyEvents(): void

		// // https://developer.apple.com/documentation/appkit/nsresponder/1534071-pressurechangewithevent
		// pressureChangeWithEvent(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1525066-cursorupdate
		// cursorUpdate(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1527647-flagschanged
		// flagsChanged(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1530905-tabletpoint
		// tabletPoint(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1527018-tabletproximity
		// tabletProximity(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1525123-helprequested
		// helpRequested(eventPtr: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1534192-scrollwheel
		// scrollWheel(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1535080-quicklookwithevent
		// quickLookWithEvent(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/3237219-changemodewithevent
		// changeModeWithEvent(event: NSEvent): void

		// https://developer.apple.com/documentation/appkit/nsresponder/1535269-supplementaltargetforaction
		supplementalTargetForAction_sender(action: SEL, sender: NSResponder): NSResponder

		// https://developer.apple.com/documentation/appkit/nsresponder/3762523-allowedclassesforrestorablestate
		allowedClassesForRestorableStateKeyPath(keyPath: string | NSString): Class

		// // https://developer.apple.com/documentation/appkit/nsresponder/1526236-encoderestorablestatewithcoder
		// encodeRestorableStateWithCoder(coder: NSCoder): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/2876293-encoderestorablestatewithcoder
		// encodeRestorableStateWithCoder_backgroundQueue(coder: NSCoder, queue: NSOperationQueue): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1526253-restorestatewithcoder
		// restoreStateWithCoder(coder: NSCoder): void

		// https://developer.apple.com/documentation/appkit/nsresponder/1526242-restorablestatekeypaths
		restorableStateKeyPaths(): string | NSString
		setRestorableStateKeyPaths(value: string | NSString): void

		// https://developer.apple.com/documentation/appkit/nsresponder/1526243-invalidaterestorablestate
		invalidateRestorableState(): void

		// // https://developer.apple.com/documentation/appkit/nsresponder/1534108-useractivity
		// userActivity(): NSUserActivity
		// setUserActivity(value: NSUserActivity): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1534884-updateuseractivitystate
		// updateUserActivityState(userActivity: NSUserActivity): void

		// https://developer.apple.com/documentation/appkit/nsresponder/1531294-presenterror
		presentError(error: NSError): boolean

		// // https://developer.apple.com/documentation/appkit/nsresponder/1534705-presenterror
		// presentError_modalForWindow_delegate_didPresentSelector_contextInfo(error: NSError, window: NSWindow, delegate: NSResponder, didPresentSelector: SEL, contextInfo: void): void

		// https://developer.apple.com/documentation/appkit/nsresponder/1525188-willpresenterror
		willPresentError(error: NSError): NSError

		// https://developer.apple.com/documentation/appkit/nsresponder/1524516-trytoperform
		tryToPerform_with(action: SEL, object: NSResponder): boolean

		// // https://developer.apple.com/documentation/appkit/nsresponder/1533094-menu
		// menu(): NSMenu
		// setMenu(value: NSMenu): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1524638-validrequestorforsendtype
		// validRequestorForSendType_returnType(sendType: NSPasteboardType, returnType: NSPasteboardType): NSResponder
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1535376-undomanager
		// undoManager(): NSUndoManager
		// setUndoManager(value: NSUndoManager): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1534105-shouldbetreatedasinkevent
		// shouldBeTreatedAsInkEvent(event: NSEvent): boolean
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1534197-noresponderfor
		// noResponderFor(eventSelector: SEL): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1555072-setinterfacestyle
		// setInterfaceStyle(interfaceStyle: NSInterfaceStyle): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1555071-interfacestyle
		// interfaceStyle(): NSInterfaceStyle
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1526368-begingesturewithevent
		// beginGestureWithEvent(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1531251-endgesturewithevent
		// endGestureWithEvent(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1525862-magnifywithevent
		// magnifyWithEvent(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1525572-rotatewithevent
		// rotateWithEvent(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1524275-swipewithevent
		// swipeWithEvent(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1531151-touchesbeganwithevent
		// touchesBeganWithEvent(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1524501-touchesmovedwithevent
		// touchesMovedWithEvent(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1530614-touchescancelledwithevent
		// touchesCancelledWithEvent(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1525779-touchesendedwithevent
		// touchesEndedWithEvent(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1534209-wantsforwardedscrolleventsforaxi
		// wantsForwardedScrollEventsForAxis(axis: NSEventGestureAxis): boolean
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1532984-smartmagnifywithevent
		// smartMagnifyWithEvent(event: NSEvent): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/1527456-wantsscrolleventsforswipetrackin
		// wantsScrollEventsForSwipeTrackingOnAxis(axis: NSEventGestureAxis): boolean
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/2544731-touchbar
		// touchBar(): NSTouchBar
		// setTouchBar(value: NSTouchBar): void
		//
		// // https://developer.apple.com/documentation/appkit/nsresponder/2544690-maketouchbar
		// makeTouchBar(): NSTouchBar

		// https://developer.apple.com/documentation/appkit/nsresponder/1525967-performtextfinderaction
		performTextFinderAction(sender: NSResponder): void

		// https://developer.apple.com/documentation/appkit/nsresponder/1644675-newwindowfortab
		newWindowForTab(sender: NSResponder): void

		// https://developer.apple.com/documentation/appkit/nsresponder/1525437-init
		init(): NSResponder

		// // https://developer.apple.com/documentation/appkit/nsresponder/1535389-initwithcoder
		// initWithCoder(coder: NSCoder): NSResponder

		alloc(): NSResponder

		init(): NSResponder
	}
}
