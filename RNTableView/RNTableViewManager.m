//
//  RCTTableViewManager.m
//  RCTTableView
//
//  Created by Pavlo Aksonov on 18.08.15.
//  Copyright (c) 2015 Pavlo Aksonov. All rights reserved.
//

#import "RNTableViewManager.h"
#import "RNTableView.h"
#import "RCTBridge.h"
#import "RCTConvert.h"

@implementation RNTableViewManager

RCT_EXPORT_MODULE()
- (UIView *)view
{
    return [[RNTableView alloc] initWithEventDispatcher:self.bridge.eventDispatcher];
}

RCT_EXPORT_VIEW_PROPERTY(sections, NSArray)
RCT_EXPORT_VIEW_PROPERTY(json, NSString)
RCT_EXPORT_VIEW_PROPERTY(editing, BOOL)
RCT_EXPORT_VIEW_PROPERTY(autoFocus, BOOL)
RCT_EXPORT_VIEW_PROPERTY(emptyInsets, BOOL)
RCT_EXPORT_VIEW_PROPERTY(filter, NSString)
RCT_EXPORT_VIEW_PROPERTY(selectedValue, id)
RCT_EXPORT_VIEW_PROPERTY(filterArgs, NSArray)
RCT_EXPORT_VIEW_PROPERTY(additionalItems, NSArray)
RCT_EXPORT_VIEW_PROPERTY(selectedIndex, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(selectedSection, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(cellHeight, float)
RCT_EXPORT_VIEW_PROPERTY(footerHeight, float)
RCT_EXPORT_VIEW_PROPERTY(headerHeight, float)
RCT_EXPORT_VIEW_PROPERTY(textColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(tintColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(selectedTextColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(detailTextColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(contentInset, UIEdgeInsets)
RCT_EXPORT_VIEW_PROPERTY(contentOffset, CGPoint)
RCT_EXPORT_VIEW_PROPERTY(scrollIndicatorInsets, UIEdgeInsets)
RCT_EXPORT_VIEW_PROPERTY(moveWithinSectionOnly, BOOL)

RCT_CUSTOM_VIEW_PROPERTY(tableViewStyle, UITableViewStyle, RNTableView) {
    [view setTableViewStyle:[RCTConvert NSInteger:json]];
}
RCT_EXPORT_VIEW_PROPERTY(cellForRowAtIndexPath, NSArray)

RCT_CUSTOM_VIEW_PROPERTY(tableViewCellStyle, UITableViewStyle, RNTableView) {
    [view setTableViewCellStyle:[RCTConvert NSInteger:json]];
}

- (NSDictionary *)constantsToExport {
    return @{
             @"Style": @{
                     @"Plain": @(UITableViewStylePlain),
                     @"Grouped": @(UITableViewStyleGrouped)
                     },
             @"CellStyle": @{
                     @"Default": @(UITableViewCellStyleDefault),
                     @"Value1": @(UITableViewCellStyleValue1),
                     @"Value2": @(UITableViewCellStyleValue2),
                     @"Subtitle": @(UITableViewCellStyleSubtitle)
                     }
             };
}

RCT_CUSTOM_VIEW_PROPERTY(fontSize, CGFloat, RNTableView)
{
    view.font = [RCTConvert UIFont:view.font withSize:json ?: @(defaultView.font.pointSize)];
}
RCT_CUSTOM_VIEW_PROPERTY(fontWeight, NSString, RNTableView)
{
    view.font = [RCTConvert UIFont:view.font withWeight:json]; // defaults to normal
}
RCT_CUSTOM_VIEW_PROPERTY(fontStyle, NSString, RNTableView)
{
    view.font = [RCTConvert UIFont:view.font withStyle:json]; // defaults to normal
}
RCT_CUSTOM_VIEW_PROPERTY(fontFamily, NSString, RNTableView)
{
    view.font = [RCTConvert UIFont:view.font withFamily:json ?: defaultView.font.familyName];
}

RCT_CUSTOM_VIEW_PROPERTY(headerFontSize, CGFloat, RNTableView)
{
    view.headerFont = [RCTConvert UIFont:view.headerFont withSize:json ?: @(defaultView.font.pointSize)];
}
RCT_CUSTOM_VIEW_PROPERTY(headerFontWeight, NSString, RNTableView)
{
    view.headerFont = [RCTConvert UIFont:view.headerFont withWeight:json]; // defaults to normal
}
RCT_CUSTOM_VIEW_PROPERTY(headerFontStyle, NSString, RNTableView)
{
    view.headerFont = [RCTConvert UIFont:view.headerFont withStyle:json]; // defaults to normal
}
RCT_CUSTOM_VIEW_PROPERTY(headerFontFamily, NSString, RNTableView)
{
    view.headerFont = [RCTConvert UIFont:view.headerFont withFamily:json ?: defaultView.font.familyName];
}


RCT_CUSTOM_VIEW_PROPERTY(footerFontSize, CGFloat, RNTableView)
{
    view.footerFont = [RCTConvert UIFont:view.footerFont withSize:json ?: @(defaultView.font.pointSize)];
}
RCT_CUSTOM_VIEW_PROPERTY(footerFontWeight, NSString, RNTableView)
{
    view.footerFont = [RCTConvert UIFont:view.footerFont withWeight:json]; // defaults to normal
}
RCT_CUSTOM_VIEW_PROPERTY(footerFontStyle, NSString, RNTableView)
{
    view.footerFont = [RCTConvert UIFont:view.footerFont withStyle:json]; // defaults to normal
}
RCT_CUSTOM_VIEW_PROPERTY(footerFontFamily, NSString, RNTableView)
{
    view.footerFont = [RCTConvert UIFont:view.footerFont withFamily:json ?: defaultView.font.familyName];
}

//
//- (NSDictionary *)constantsToExport
//{
//    UIPickerView *view = [[UIPickerView alloc] init];
//    return @{
//             @"ComponentHeight": @(view.intrinsicContentSize.height),
//             @"ComponentWidth": @(view.intrinsicContentSize.width)
//             };
//}

@end
