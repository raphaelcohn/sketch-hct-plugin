// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare namespace cocoascript
{
	/**
	 * Information about an error condition including a domain, a domain-specific error code, and application-specific information.
	 * https://developer.apple.com/documentation/foundation/nserror
	 */
	interface NSError extends NSObject
	{
		alloc(): NSError
		
		init(): NSError
		
		// https://developer.apple.com/documentation/foundation/nserror/1522782-errorwithdomain
		errorWithDomain_code_userInfo(domain: NSErrorDomain, code: NSInteger, dict: NSError): NSError

		// https://developer.apple.com/documentation/foundation/nserror/1417063-initwithdomain
		initWithDomain_code_userInfo(domain: NSErrorDomain, code: NSInteger, dict: NSError): NSError

		// https://developer.apple.com/documentation/foundation/nserror/1409165-code
		code(): NSInteger
		setCode(value: NSInteger): void

		// https://developer.apple.com/documentation/foundation/nserror/1413924-domain
		domain(): NSErrorDomain
		setDomain(value: NSErrorDomain): void

		// https://developer.apple.com/documentation/foundation/nserror/1411580-userinfo
		userInfo(): id
		setUserInfo(value: id): void

		// https://developer.apple.com/documentation/foundation/nserror/1414418-localizeddescription
		localizedDescription(): string | NSString
		setLocalizedDescription(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nserror/1415950-localizedrecoveryoptions
		localizedRecoveryOptions(): string | NSString
		setLocalizedRecoveryOptions(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nserror/1407500-localizedrecoverysuggestion
		localizedRecoverySuggestion(): string | NSString
		setLocalizedRecoverySuggestion(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nserror/1412752-localizedfailurereason
		localizedFailureReason(): string | NSString
		setLocalizedFailureReason(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nserror/1408064-setuserinfovalueproviderfordomai
		setUserInfoValueProviderForDomain_provider(errorDomain: NSErrorDomain, provider: NSErrorUserInfoKey): void

		// // https://developer.apple.com/documentation/foundation/nserror/1413427-userinfovalueproviderfordomain
		// userInfoValueProviderForDomain(errorDomain: NSErrorDomain): _Nonnull

		// https://developer.apple.com/documentation/foundation/nserror/1408864-recoveryattempter
		recoveryAttempter(): id
		setRecoveryAttempter(value: id): void

		// https://developer.apple.com/documentation/foundation/nserror/1414718-helpanchor
		helpAnchor(): string | NSString
		setHelpAnchor(value: string | NSString): void

		// https://developer.apple.com/documentation/foundation/nserror/3738169-underlyingerrors
		underlyingErrors(): NSError
		setUnderlyingErrors(value: NSError): void

		// // https://developer.apple.com/documentation/foundation/nserror/2882067-fileprovidererrorforcollisionwit
		// fileProviderErrorForCollisionWithItem(existingItem: NSFileProviderItem): NSError
		//
		// // https://developer.apple.com/documentation/foundation/nserror/2915899-fileprovidererrorfornonexistenti
		// fileProviderErrorForNonExistentItemWithIdentifier(itemIdentifier: NSFileProviderItemIdentifier): NSError
		//
		// // https://developer.apple.com/documentation/foundation/nserror/3603574-fileprovidererrorforrejecteddele
		// fileProviderErrorForRejectedDeletionOfItem(updatedVersion: NSFileProviderItem): NSError
	}
}
