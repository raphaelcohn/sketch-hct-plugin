// This file is part of sketch-hct-plugin. It is subject to the license terms in the LICENSE file found in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE. No part of sketch-hct-plugin, including this file, may be copied, modified, propagated, or distributed except according to the terms contained in the LICENSE file.
// Copyright © 2024 The developers of sketch-hct-plugin. See the LICENSE file in the top-level directory of this distribution and at https://raw.githubusercontent.com/raphaelcohn/sketch-hct-plugin/master/LICENSE.

declare namespace cocoascript
{
	/**
	 * A simple container for a single C or Objective-C data item.
	 * https://developer.apple.com/documentation/foundation/nsvalue
	 */
	interface NSValue extends NSObject
	{
		alloc(): NSValue
	
		init(): NSValue

		// https://developer.apple.com/documentation/foundation/nsvalue/1411621-initwithbytes
		initWithBytes_objCType(value: void, type: string): NSValue

		// https://developer.apple.com/documentation/foundation/nsvalue/1551466-valuewithbytes
		valueWithBytes_objCType(value: void, type: string): NSValue

		// https://developer.apple.com/documentation/foundation/nsvalue/1417400-value
		value_withObjCType(value: void, type: string): NSValue

		// https://developer.apple.com/documentation/foundation/nsvalue/1415141-getvalue
		getValue(value: void):void

		// https://developer.apple.com/documentation/foundation/nsvalue/1412365-objctype
		objCType(): string
		setObjCType(value: string): void

		// https://developer.apple.com/documentation/foundation/nsvalue/1415975-valuewithpointer
		valueWithPointer(pointer: void): NSValue

		// https://developer.apple.com/documentation/foundation/nsvalue/1408098-valuewithnonretainedobject
		valueWithNonretainedObject(anObject: NSValue): NSValue

		// https://developer.apple.com/documentation/foundation/nsvalue/1410668-pointervalue
		pointerValue(): void
		setPointerValue(value: void): void

		// https://developer.apple.com/documentation/foundation/nsvalue/1412287-nonretainedobjectvalue
		nonretainedObjectValue(): id
		setNonretainedObjectValue(value: id): void

		// https://developer.apple.com/documentation/foundation/nsvalue/1410315-valuewithrange
		valueWithRange(range: NSRange): NSValue

		// https://developer.apple.com/documentation/foundation/nsvalue/1413902-rangevalue
		rangeValue(): NSRange
		setRangeValue(value: NSRange): void

		// https://developer.apple.com/documentation/foundation/nsvalue/1391106-valuewithpoint
		valueWithPoint(point: NSPoint): NSValue

		// https://developer.apple.com/documentation/foundation/nsvalue/1391199-valuewithsize
		valueWithSize(size: NSSize): NSValue

		// https://developer.apple.com/documentation/foundation/nsvalue/1391281-valuewithrect
		valueWithRect(rect: NSRect): NSValue

		// https://developer.apple.com/documentation/foundation/nsvalue/1391255-pointvalue
		pointValue(): NSPoint
		setPointValue(value: NSPoint): void

		// https://developer.apple.com/documentation/foundation/nsvalue/1391301-sizevalue
		sizeValue(): NSSize
		setSizeValue(value: NSSize): void

		// https://developer.apple.com/documentation/foundation/nsvalue/1391171-rectvalue
		rectValue(): NSRect
		setRectValue(value: NSRect): void

		// https://developer.apple.com/documentation/foundation/nsvalue/1624531-valuewithcgpoint
		valueWithCGPoint(point: CGPoint): NSValue

		// // https://developer.apple.com/documentation/foundation/nsvalue/1624493-valuewithcgvector
		// valueWithCGVector(vector: CGVector): NSValue

		// https://developer.apple.com/documentation/foundation/nsvalue/1624511-valuewithcgsize
		valueWithCGSize(size: CGSize): NSValue

		// https://developer.apple.com/documentation/foundation/nsvalue/1624529-valuewithcgrect
		valueWithCGRect(rect: CGRect): NSValue

		// // https://developer.apple.com/documentation/foundation/nsvalue/1624503-valuewithcgaffinetransform
		// valueWithCGAffineTransform(transform: CGAffineTransform): NSValue

		// https://developer.apple.com/documentation/foundation/nsvalue/1624534-cgpointvalue
		CGPointValue(): CGPoint
		setCGPointValue(value: CGPoint): void

		// // https://developer.apple.com/documentation/foundation/nsvalue/1624486-cgvectorvalue
		// CGVectorValue(): CGVector
		// setCGVectorValue(value: CGVector): void

		// https://developer.apple.com/documentation/foundation/nsvalue/1624489-cgsizevalue
		CGSizeValue(): CGSize
		setCGSizeValue(value: CGSize): void

		// https://developer.apple.com/documentation/foundation/nsvalue/1624506-cgrectvalue
		CGRectValue(): CGRect
		setCGRectValue(value: CGRect): void

		// // https://developer.apple.com/documentation/foundation/nsvalue/1624512-cgaffinetransformvalue
		// CGAffineTransformValue(): CGAffineTransform
		// setCGAffineTransformValue(value: CGAffineTransform): void
		//
		// // https://developer.apple.com/documentation/foundation/nsvalue/1624485-valuewithuiedgeinsets
		// valueWithUIEdgeInsets(insets: UIEdgeInsets): NSValue
		//
		// // https://developer.apple.com/documentation/foundation/nsvalue/1624530-valuewithuioffset
		// valueWithUIOffset(insets: UIOffset): NSValue
		//
		// // https://developer.apple.com/documentation/foundation/nsvalue/1624517-uiedgeinsetsvalue
		// UIEdgeInsetsValue(): UIEdgeInsets
		// setUIEdgeInsetsValue(value: UIEdgeInsets): void
		//
		// // https://developer.apple.com/documentation/foundation/nsvalue/1624526-uioffsetvalue
		// UIOffsetValue(): UIOffset
		// setUIOffsetValue(value: UIOffset): void
		//
		// // https://developer.apple.com/documentation/foundation/nsvalue/1436556-valuewithcatransform3d
		// valueWithCATransform3D(t: CATransform3D): NSValue
		//
		// // https://developer.apple.com/documentation/foundation/nsvalue/1436572-catransform3dvalue
		// CATransform3DValue(): CATransform3D
		// setCATransform3DValue(value: CATransform3D): void
		//
		// // https://developer.apple.com/documentation/foundation/nsvalue/1388561-valuewithcmtime
		// valueWithCMTime(time: CMTime): NSValue
		//
		// // https://developer.apple.com/documentation/foundation/nsvalue/1386915-valuewithcmtimerange
		// valueWithCMTimeRange(timeRange: CMTimeRange): NSValue
		//
		// // https://developer.apple.com/documentation/foundation/nsvalue/1387556-valuewithcmtimemapping
		// valueWithCMTimeMapping(timeMapping: CMTimeMapping): NSValue
		//
		// // https://developer.apple.com/documentation/foundation/nsvalue/1388151-cmtimevalue
		// CMTimeValue(): CMTime
		// setCMTimeValue(value: CMTime): void
		//
		// // https://developer.apple.com/documentation/foundation/nsvalue/1385930-cmtimerangevalue
		// CMTimeRangeValue(): CMTimeRange
		// setCMTimeRangeValue(value: CMTimeRange): void
		//
		// // https://developer.apple.com/documentation/foundation/nsvalue/1387277-cmtimemappingvalue
		// CMTimeMappingValue(): CMTimeMapping
		// setCMTimeMappingValue(value: CMTimeMapping): void
		//
		// // https://developer.apple.com/documentation/foundation/nsvalue/1452193-valuewithmkcoordinate
		// valueWithMKCoordinate(coordinate: CLLocationCoordinate2D): NSValue
		//
		// // https://developer.apple.com/documentation/foundation/nsvalue/1452333-valuewithmkcoordinatespan
		// valueWithMKCoordinateSpan(span: MKCoordinateSpan): NSValue
		//
		// // https://developer.apple.com/documentation/foundation/nsvalue/1452495-mkcoordinatevalue
		// MKCoordinateValue(): CLLocationCoordinate2D
		// setMKCoordinateValue(value: CLLocationCoordinate2D): void
		//
		// // https://developer.apple.com/documentation/foundation/nsvalue/1452516-mkcoordinatespanvalue
		// MKCoordinateSpanValue(): MKCoordinateSpan
		// setMKCoordinateSpanValue(value: MKCoordinateSpan): void
		//
		// // https://developer.apple.com/documentation/foundation/nsvalue/1409671-valuewithscnvector3
		// valueWithSCNVector3(v: SCNVector3): NSValue
		//
		// // https://developer.apple.com/documentation/foundation/nsvalue/1409688-valuewithscnvector4
		// valueWithSCNVector4(v: SCNVector4): NSValue
		//
		// // https://developer.apple.com/documentation/foundation/nsvalue/1409680-valuewithscnmatrix4
		// valueWithSCNMatrix4(v: SCNMatrix4): NSValue
		//
		// // https://developer.apple.com/documentation/foundation/nsvalue/1409669-scnvector3value
		// SCNVector3Value(): SCNVector3
		// setSCNVector3Value(value: SCNVector3): void
		//
		// // https://developer.apple.com/documentation/foundation/nsvalue/1409725-scnvector4value
		// SCNVector4Value(): SCNVector4
		// setSCNVector4Value(value: SCNVector4): void
		//
		// // https://developer.apple.com/documentation/foundation/nsvalue/1409684-scnmatrix4value
		// SCNMatrix4Value(): SCNMatrix4
		// setSCNMatrix4Value(value: SCNMatrix4): void
		//
		// // https://developer.apple.com/documentation/foundation/nsvalue/1409038-isequaltovalue
		// isEqualToValue(value: NSValue):boolean
		//
		// // https://developer.apple.com/documentation/foundation/nsvalue/1417896-initwithcoder
		// initWithCoder(coder: NSCoder): NSValue
		//
		// // https://developer.apple.com/documentation/foundation/nsvalue/2865954-valuewithdirectionaledgeinsets
		// valueWithDirectionalEdgeInsets(insets: NSDirectionalEdgeInsets): NSValue

		// https://developer.apple.com/documentation/foundation/nsvalue/1391181-valuewithedgeinsets
		valueWithEdgeInsets(insets: NSEdgeInsets): NSValue

		// // https://developer.apple.com/documentation/foundation/nsvalue/2865836-directionaledgeinsetsvalue
		// directionalEdgeInsetsValue(): NSDirectionalEdgeInsets
		// setDirectionalEdgeInsetsValue(value: NSDirectionalEdgeInsets): void

		// https://developer.apple.com/documentation/foundation/nsvalue/1391123-edgeinsetsvalue
		edgeInsetsValue(): NSEdgeInsets
		setEdgeInsetsValue(value: NSEdgeInsets): void

		// https://developer.apple.com/documentation/foundation/nsvalue/2919632-getvalue
		getValue_size(value: void, size: NSUInteger):void
	}
}
