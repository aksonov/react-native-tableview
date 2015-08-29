//
//  RCTTableViewManager.m
//  RCTTableView
//
//  Created by Pavlo Aksonov on 18.08.15.
//  Copyright (c) 2015 Pavlo Aksonov. All rights reserved.
//

#import "RCTTableViewManager.h"
#import "RCTTableView.h"
#import "RCTBridge.h"
#import "RCTConvert.h"

@implementation RCTTableViewManager

RCT_EXPORT_MODULE()
- (UIView *)view
{
    return [[RCTTableView alloc] initWithEventDispatcher:self.bridge.eventDispatcher];
}

RCT_EXPORT_VIEW_PROPERTY(sections, NSArray)
RCT_EXPORT_VIEW_PROPERTY(json, NSString)
RCT_EXPORT_VIEW_PROPERTY(customCells, BOOL)
RCT_EXPORT_VIEW_PROPERTY(filter, NSString)
RCT_EXPORT_VIEW_PROPERTY(selectedValue, NSString)
RCT_EXPORT_VIEW_PROPERTY(filterArgs, NSArray)
RCT_EXPORT_VIEW_PROPERTY(additionalItems, NSArray)
RCT_EXPORT_VIEW_PROPERTY(selectedIndex, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(selectedSection, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(cellHeight, float)
RCT_EXPORT_VIEW_PROPERTY(textColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(tintColor, UIColor)
RCT_EXPORT_VIEW_PROPERTY(selectedTextColor, UIColor)

RCT_CUSTOM_VIEW_PROPERTY(tableViewStyle, UITableViewStyle, RCTTableView) {
    [view setTableViewStyle:[RCTConvert NSInteger:json]];
}
RCT_EXPORT_VIEW_PROPERTY(cellForRowAtIndexPath, NSArray)

RCT_CUSTOM_VIEW_PROPERTY(tableViewCellStyle, UITableViewStyle, RCTTableView) {
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

RCT_CUSTOM_VIEW_PROPERTY(fontSize, CGFloat, RCTTableView)
{
    view.font = [RCTConvert UIFont:view.font withSize:json ?: @(defaultView.font.pointSize)];
}
RCT_CUSTOM_VIEW_PROPERTY(fontWeight, NSString, RCTTableView)
{
    view.font = [RCTConvert UIFont:view.font withWeight:json]; // defaults to normal
}
RCT_CUSTOM_VIEW_PROPERTY(fontStyle, NSString, RCTTableView)
{
    view.font = [RCTConvert UIFont:view.font withStyle:json]; // defaults to normal
}
RCT_CUSTOM_VIEW_PROPERTY(fontFamily, NSString, RCTTableView)
{
    view.font = [RCTConvert UIFont:view.font withFamily:json ?: defaultView.font.familyName];
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
