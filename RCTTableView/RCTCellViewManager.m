//
//  RCTCellViewManager.m
//  RCTTableView
//
//  Created by Pavlo Aksonov on 24.08.15.
//  Copyright (c) 2015 Pavlo Aksonov. All rights reserved.
//

#import "RCTCellViewManager.h"
#import "RCTCellView.h"

@implementation RCTCellViewManager
RCT_EXPORT_MODULE()
- (UIView *)view
{
    return [[RCTCellView alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(row, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(section, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(componentHeight, float)
RCT_EXPORT_VIEW_PROPERTY(componentWidth, float)

@end
