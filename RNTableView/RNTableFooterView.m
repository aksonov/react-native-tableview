//
//  RNTableFooterView.m
//  RNTableView
//
//  Created by Pavlo Aksonov on 09.11.15.
//  Copyright © 2015 Pavlo Aksonov. All rights reserved.
//

#import "RNTableFooterView.h"

@implementation RNTableFooterView


-(void)setComponentHeight:(float)componentHeight {
    _componentHeight = componentHeight;
    if (componentHeight){
        _tableView.tableFooterView = self;
    }
}

-(void)setComponentWidth:(float)componentWidth {
    _componentWidth = componentWidth;
    if (componentWidth){
        _tableView.tableFooterView = self;
    }
}


@end
