// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare namespace cocoascript
{
	/**
	 * An abstract class that defines the interface for macOS documents.
	 * https://developer.apple.com/documentation/appkit/nsdocument
	 */
	interface NSDocument extends NSObject
	{
		alloc(): NSDocument
		
		init(): NSDocument
		
		// https://developer.apple.com/documentation/appkit/nsdocument/1515181-init
		init(): NSDocument

		// https://developer.apple.com/documentation/appkit/nsdocument/1515097-initwithcontentsofurl
		initWithContentsOfURL_ofType_error(url: NSURL, typeName: string | NSString, outError: NSError): NSDocument

		// https://developer.apple.com/documentation/appkit/nsdocument/1515041-initforurl
		initForURL_withContentsOfURL_ofType_error(urlOrNil: NSURL, contentsURL: NSURL, typeName: string | NSString, outError: NSError): NSDocument

		// https://developer.apple.com/documentation/appkit/nsdocument/1515159-initwithtype
		initWithType_error(typeName: string | NSString, outError: NSError): NSDocument

		// https://developer.apple.com/documentation/appkit/nsdocument/1515216-canconcurrentlyreaddocumentsofty
		canConcurrentlyReadDocumentsOfType(typeName: string | NSString): boolean

		// https://developer.apple.com/documentation/appkit/nsdocument/1515144-readfromurl
		readFromURL_ofType_error(url: NSURL, typeName: string | NSString, outError: NSError): boolean

		// // https://developer.apple.com/documentation/appkit/nsdocument/1515044-readfromfilewrapper
		// readFromFileWrapper_ofType_error(fileWrapper: NSFileWrapper, typeName: string | NSString, outError: NSError): boolean

		// https://developer.apple.com/documentation/appkit/nsdocument/1515198-readfromdata
		readFromData_ofType_error(data: NSData, typeName: string | NSString, outError: NSError): boolean

		// // https://developer.apple.com/documentation/appkit/nsdocument/1515177-canasynchronouslywritetourl
		// canAsynchronouslyWriteToURL_ofType_forSaveOperation(url: NSURL, typeName: string | NSString, saveOperation: NSSaveOperationType): boolean

		// https://developer.apple.com/documentation/appkit/nsdocument/1515238-unblockuserinteraction
		unblockUserInteraction(): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515076-writetourl
		writeToURL_ofType_error(url: NSURL, typeName: string | NSString, outError: NSError): boolean

		// // https://developer.apple.com/documentation/appkit/nsdocument/1515150-writesafelytourl
		// writeSafelyToURL_ofType_forSaveOperation_error(url: NSURL, typeName: string | NSString, saveOperation: NSSaveOperationType, outError: NSError): boolean
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/1515089-filewrapperoftype
		// fileWrapperOfType_error(typeName: string | NSString, outError: NSError): NSFileWrapper

		// https://developer.apple.com/documentation/appkit/nsdocument/1515205-dataoftype
		dataOfType_error(typeName: string | NSString, outError: NSError): NSData

		// // https://developer.apple.com/documentation/appkit/nsdocument/1515203-writetourl
		// writeToURL_ofType_forSaveOperation_originalContentsURL_error(url: NSURL, typeName: string | NSString, saveOperation: NSSaveOperationType, absoluteOriginalContentsURL: NSURL, outError: NSError): boolean
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/1515148-savetourl
		// saveToURL_ofType_forSaveOperation_delegate_didSaveSelector_contextInfo(url: NSURL, typeName: string | NSString, saveOperation: NSSaveOperationType, delegate: NSDocument, didSaveSelector: SEL, contextInfo: void): void
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/1515178-savetourl
		// saveToURL_ofType_forSaveOperation_completionHandler(url: NSURL, typeName: string | NSString, saveOperation: NSSaveOperationType, completionHandler: NSError): void
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/1515062-fileattributestowritetourl
		// fileAttributesToWriteToURL_ofType_forSaveOperation_originalContentsURL_error(url: NSURL, typeName: string | NSString, saveOperation: NSSaveOperationType, absoluteOriginalContentsURL: NSURL, outError: NSError): NSDocument

		// https://developer.apple.com/documentation/appkit/nsdocument/1515038-fileurl
		fileURL(): NSURL
		setFileURL(value: NSURL): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515053-entirefileloaded
		entireFileLoaded(): boolean
		setEntireFileLoaded(value: boolean): void

		// // https://developer.apple.com/documentation/appkit/nsdocument/1515039-filemodificationdate
		// fileModificationDate(): NSDate
		// setFileModificationDate(value: NSDate): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515060-keepbackupfile
		keepBackupFile(): boolean
		setKeepBackupFile(value: boolean): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515065-draft
		draft(): boolean
		setDraft(value: boolean): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515121-filetype
		fileType(): string | NSString
		setFileType(value: string | NSString): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515091-documentedited
		documentEdited(): boolean
		setDocumentEdited(value: boolean): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515086-inviewingmode
		inViewingMode(): boolean
		setInViewingMode(value: boolean): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515104-readabletypes
		readableTypes(): string | NSString
		setReadableTypes(value: string | NSString): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515236-writabletypes
		writableTypes(): string | NSString
		setWritableTypes(value: string | NSString): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515072-isnativetype
		isNativeType(type: string | NSString): boolean

		// // https://developer.apple.com/documentation/appkit/nsdocument/1515186-writabletypesforsaveoperation
		// writableTypesForSaveOperation(saveOperation: NSSaveOperationType): NSString
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/1515074-filenameextensionfortype
		// fileNameExtensionForType_saveOperation(typeName: string | NSString, saveOperation: NSSaveOperationType): NSString

		// https://developer.apple.com/documentation/appkit/nsdocument/1515220-makewindowcontrollers
		makeWindowControllers(): void

		// // https://developer.apple.com/documentation/appkit/nsdocument/1515179-addwindowcontroller
		// addWindowController(windowController: NSWindowController): void
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/1515242-removewindowcontroller
		// removeWindowController(windowController: NSWindowController): void
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/1515156-windowcontrollers
		// windowControllers(): NSWindowController
		// setWindowControllers(value: NSWindowController): void
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/1515174-windownibname
		// windowNibName(): NSNibName
		// setWindowNibName(value: NSNibName): void

		// // https://developer.apple.com/documentation/appkit/nsdocument/1515221-windowcontrollerdidloadnib
		// windowControllerDidLoadNib(windowController: NSWindowController): void
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/1515116-windowcontrollerwillloadnib
		// windowControllerWillLoadNib(windowController: NSWindowController): void
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/1515247-shouldclosewindowcontroller
		// shouldCloseWindowController_delegate_shouldCloseSelector_contextInfo(windowController: NSWindowController, delegate: NSDocument, shouldCloseSelector: SEL, contextInfo: void): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515049-showwindows
		showWindows(): void

		// // https://developer.apple.com/documentation/appkit/nsdocument/1515217-setwindow
		// setWindow(window: NSWindow): void
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/1515064-windowforsheet
		// windowForSheet(): NSWindow
		// setWindowForSheet(value: NSWindow): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515077-displayname
		displayName(): string | NSString
		setDisplayName(value: string | NSString): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515143-setdisplayname
		setDisplayName(displayNameOrNil: string | NSString): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515245-defaultdraftname
		defaultDraftName(): NSString

		// // https://developer.apple.com/documentation/appkit/nsdocument/2876345-encoderestorablestatewithcoder
		// encodeRestorableStateWithCoder_backgroundQueue(coder: NSCoder, queue: NSOperationQueue): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515106-autosavesinplace
		autosavesInPlace(): boolean
		setAutosavesInPlace(value: boolean): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515109-autosavesdrafts
		autosavesDrafts(): boolean
		setAutosavesDrafts(value: boolean): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515114-preservesversions
		preservesVersions(): boolean
		setPreservesVersions(value: boolean): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515232-autosavedcontentsfileurl
		autosavedContentsFileURL(): NSURL
		setAutosavedContentsFileURL(value: NSURL): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515136-autosavingfiletype
		autosavingFileType(): string | NSString
		setAutosavingFileType(value: string | NSString): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515149-autosavingisimplicitlycancellabl
		autosavingIsImplicitlyCancellable(): boolean
		setAutosavingIsImplicitlyCancellable(value: boolean): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515061-checkautosavingsafetyandreturner
		checkAutosavingSafetyAndReturnError(outError: NSError): boolean

		// https://developer.apple.com/documentation/appkit/nsdocument/1515079-hasunautosavedchanges
		hasUnautosavedChanges(): boolean
		setHasUnautosavedChanges(value: boolean): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515119-scheduleautosaving
		scheduleAutosaving(): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515225-autosavedocumentwithdelegate
		autosaveDocumentWithDelegate_didAutosaveSelector_contextInfo(delegate: NSDocument, didAutosaveSelector: SEL, contextInfo: unknown): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515096-autosavewithimplicitcancellabili
		autosaveWithImplicitCancellability_completionHandler(autosavingIsImplicitlyCancellable: boolean, completionHandler: NSError): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515200-backupfileurl
		backupFileURL(): NSURL
		setBackupFileURL(value: NSURL): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515193-browsedocumentversions
		browseDocumentVersions(sender: NSDocument): void

		// https://developer.apple.com/documentation/appkit/nsdocument/2177310-browsingversions
		browsingVersions(): boolean
		setBrowsingVersions(value: boolean): void

		// https://developer.apple.com/documentation/appkit/nsdocument/2177312-stopbrowsingversionswithcompleti
		stopBrowsingVersionsWithCompletionHandler(completionHandler: unknown): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515210-movedocumenttoubiquitycontainer
		moveDocumentToUbiquityContainer(sender: NSDocument): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515085-usesubiquitousstorage
		usesUbiquitousStorage(): boolean
		setUsesUbiquitousStorage(value: boolean): void

		// // https://developer.apple.com/documentation/appkit/nsdocument/1515166-undomanager
		// undoManager(): NSUndoManager
		// setUndoManager(value: NSUndoManager): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515103-hasundomanager
		hasUndoManager(): boolean
		setHasUndoManager(value: boolean): void

		// // https://developer.apple.com/documentation/appkit/nsdocument/1515083-updatechangecountwithtoken
		// updateChangeCountWithToken_forSaveOperation(changeCountToken: NSDocument, saveOperation: NSSaveOperationType): void
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/1515223-updatechangecount
		// updateChangeCount(change: NSDocumentChangeType): void
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/1515129-changecounttokenforsaveoperation
		// changeCountTokenForSaveOperation(saveOperation: NSSaveOperationType): NSDocument

		// https://developer.apple.com/documentation/appkit/nsdocument/3762522-allowedclassesforrestorablestate
		allowedClassesForRestorableStateKeyPath(keyPath: string | NSString): Class

		// // https://developer.apple.com/documentation/appkit/nsdocument/1526257-encoderestorablestatewithcoder
		// encodeRestorableStateWithCoder(coder: NSCoder): void
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/1526237-restorestatewithcoder
		// restoreStateWithCoder(coder: NSCoder): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1526232-restorablestatekeypaths
		restorableStateKeyPaths(): string | NSString
		setRestorableStateKeyPaths(value: string | NSString): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1526250-invalidaterestorablestate
		invalidateRestorableState(): void

		// // https://developer.apple.com/documentation/appkit/nsdocument/1524586-restoredocumentwindowwithidentif
		// restoreDocumentWindowWithIdentifier_state_completionHandler(identifier: NSUserInterfaceItemIdentifier, state: NSCoder, completionHandler: NSError): void
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/1515180-runmodalsavepanelforsaveoperatio
		// runModalSavePanelForSaveOperation_delegate_didSaveSelector_contextInfo(saveOperation: NSSaveOperationType, delegate: NSDocument, didSaveSelector: SEL, contextInfo: void): void
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/1515094-preparesavepanel
		// prepareSavePanel(savePanel: NSSavePanel): boolean

		// https://developer.apple.com/documentation/appkit/nsdocument/1515183-shouldrunsavepanelwithaccessoryv
		shouldRunSavePanelWithAccessoryView(): boolean
		setShouldRunSavePanelWithAccessoryView(value: boolean): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515240-filetypefromlastrunsavepanel
		fileTypeFromLastRunSavePanel(): string | NSString
		setFileTypeFromLastRunSavePanel(value: string | NSString): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515092-filenameextensionwashiddeninlast
		fileNameExtensionWasHiddenInLastRunSavePanel(): boolean
		setFileNameExtensionWasHiddenInLastRunSavePanel(value: boolean): void

		// // https://developer.apple.com/documentation/appkit/nsdocument/1526106-useractivity
		// userActivity(): NSUserActivity
		// setUserActivity(value: NSUserActivity): void
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/1529014-updateuseractivitystate
		// updateUserActivityState(activity: NSUserActivity): void
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/1515190-validateuserinterfaceitem
		// validateUserInterfaceItem(item: NSValidatedUserInterfaceItem): boolean

		// https://developer.apple.com/documentation/appkit/nsdocument/1515227-performsynchronousfileaccessusin
		performSynchronousFileAccessUsingBlock(block: unknown): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515124-performasynchronousfileaccessusi
		performAsynchronousFileAccessUsingBlock(block: unknown): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515066-performactivitywithsynchronouswa
		performActivityWithSynchronousWaiting_usingBlock(waitSynchronously: boolean, block: unknown): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515151-continueactivityusingblock
		continueActivityUsingBlock(block: unknown): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515069-continueasynchronousworkonmainth
		continueAsynchronousWorkOnMainThreadUsingBlock(block: unknown): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515154-printdocument
		printDocument(sender: NSDocument): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515140-runpagelayout
		runPageLayout(sender: NSDocument): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515059-revertdocumenttosaved
		revertDocumentToSaved(sender: NSDocument): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515147-savedocument
		saveDocument(sender: NSDocument): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515171-savedocumentas
		saveDocumentAs(sender: NSDocument): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515208-savedocumentto
		saveDocumentTo(sender: NSDocument): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515048-savedocumentwithdelegate
		saveDocumentWithDelegate_didSaveSelector_contextInfo(delegate: NSDocument, didSaveSelector: SEL, contextInfo: unknown): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515206-canclosedocumentwithdelegate
		canCloseDocumentWithDelegate_shouldCloseSelector_contextInfo(delegate: NSDocument, shouldCloseSelector: SEL, contextInfo: unknown): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515237-close
		close(): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515122-reverttocontentsofurl
		revertToContentsOfURL_ofType_error(url: NSURL, typeName: string | NSString, outError: NSError): boolean

		// https://developer.apple.com/documentation/appkit/nsdocument/1515201-duplicateandreturnerror
		duplicateAndReturnError(outError: NSError): NSDocument

		// https://developer.apple.com/documentation/appkit/nsdocument/1515226-duplicatedocument
		duplicateDocument(sender: NSDocument): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515133-duplicatedocumentwithdelegate
		duplicateDocumentWithDelegate_didDuplicateSelector_contextInfo(delegate: NSDocument, didDuplicateSelector: SEL, contextInfo: unknown): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515231-renamedocument
		renameDocument(sender: NSDocument): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515118-movedocument
		moveDocument(sender: NSDocument): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515043-movedocumentwithcompletionhandle
		moveDocumentWithCompletionHandler(completionHandler: boolean): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515057-movetourl
		moveToURL_completionHandler(url: NSURL, completionHandler: NSError): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515218-lockdocument
		lockDocument(sender: NSDocument): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515068-unlockdocument
		unlockDocument(sender: NSDocument): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515233-lockdocumentwithcompletionhandle
		lockDocumentWithCompletionHandler(completionHandler: boolean): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515189-lockwithcompletionhandler
		lockWithCompletionHandler(completionHandler: NSError): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515248-unlockdocumentwithcompletionhand
		unlockDocumentWithCompletionHandler(completionHandler: boolean): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515131-unlockwithcompletionhandler
		unlockWithCompletionHandler(completionHandler: NSError): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515212-locked
		locked(): boolean
		setLocked(value: boolean): void

		// // https://developer.apple.com/documentation/appkit/nsdocument/1515163-printinfo
		// printInfo(): NSPrintInfo
		// setPrintInfo(value: NSPrintInfo): void
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/1515169-preparepagelayout
		// preparePageLayout(pageLayout: NSPageLayout): boolean
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/1515100-runmodalpagelayoutwithprintinfo
		// runModalPageLayoutWithPrintInfo_delegate_didRunSelector_contextInfo(printInfo: NSPrintInfo, delegate: NSDocument, didRunSelector: SEL, contextInfo: void): void
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/1515234-runmodalprintoperation
		// runModalPrintOperation_delegate_didRunSelector_contextInfo(printOperation: NSPrintOperation, delegate: NSDocument, didRunSelector: SEL, contextInfo: void): void
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/1515243-shouldchangeprintinfo
		// shouldChangePrintInfo(newPrintInfo: NSPrintInfo): boolean

		// https://developer.apple.com/documentation/appkit/nsdocument/1515058-printdocumentwithsettings
		printDocumentWithSettings_showPrintPanel_delegate_didPrintSelector_contextInfo(printSettings: NSDocument, showPrintPanel: boolean, delegate: NSDocument, didPrintSelector: SEL, contextInfo: unknown): void

		// // https://developer.apple.com/documentation/appkit/nsdocument/1515070-printoperationwithsettings
		// printOperationWithSettings_error(printSettings: NSDocument, outError: NSError): NSPrintOperation
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/1515246-pdfprintoperation
		// PDFPrintOperation(): NSPrintOperation
		// setPDFPrintOperation(value: NSPrintOperation): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515176-savedocumenttopdf
		saveDocumentToPDF(sender: NSDocument): void

		// https://developer.apple.com/documentation/appkit/nsdocument/2902303-allowsdocumentsharing
		allowsDocumentSharing(): boolean
		setAllowsDocumentSharing(value: boolean): void

		// // https://developer.apple.com/documentation/appkit/nsdocument/2902326-preparesharingservicepicker
		// prepareSharingServicePicker(sharingServicePicker: NSSharingServicePicker): void
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/2902309-sharedocumentwithsharingservice
		// shareDocumentWithSharingService_completionHandler(sharingService: NSSharingService, completionHandler: boolean): void
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/1500136-handleclosescriptcommand
		// handleCloseScriptCommand(command: NSCloseCommand): NSDocument
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/1500135-handleprintscriptcommand
		// handlePrintScriptCommand(command: NSScriptCommand): NSDocument
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/1500138-handlesavescriptcommand
		// handleSaveScriptCommand(command: NSScriptCommand): NSDocument
		//
		// // https://developer.apple.com/documentation/appkit/nsdocument/1500134-objectspecifier
		// objectSpecifier(): NSScriptObjectSpecifier
		// setObjectSpecifier(value: NSScriptObjectSpecifier): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1500132-lastcomponentoffilename
		lastComponentOfFileName(): string | NSString
		setLastComponentOfFileName(value: string | NSString): void

		// // https://developer.apple.com/documentation/appkit/nsdocument/1515051-presenterror
		// presentError_modalForWindow_delegate_didPresentSelector_contextInfo(error: NSError, window: NSWindow, delegate: NSDocument, didPresentSelector: SEL, contextInfo: void): void

		// https://developer.apple.com/documentation/appkit/nsdocument/1515184-presenterror
		presentError(error: NSError): boolean

		// https://developer.apple.com/documentation/appkit/nsdocument/1515229-willpresenterror
		willPresentError(error: NSError): NSError

		// https://developer.apple.com/documentation/appkit/nsdocument/1515188-willnotpresenterror
		willNotPresentError(error: NSError): void
	}
}
