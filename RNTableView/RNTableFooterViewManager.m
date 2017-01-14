//
//  RNTableFooterViewManager.m
//  RNTableView
//
//  Created by Pavlo Aksonov on 09.11.15.
//  Copyright © 2015 Pavlo Aksonov. All rights reserved.
//

#import "RNTableFooterViewManager.h"
#import "RNTableFooterView.h"
#import <React/RCTBridge.h>

@implementation RNTableFooterViewManager

RCT_EXPORT_MODULE()
- (UIView *)view
{
    return [[RNTableFooterView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(componentHeight, float)
RCT_EXPORT_VIEW_PROPERTY(componentWidth, float)
@end
