//
//  RCTCell.m
//  RCTTableView
//
//  Created by Pavlo Aksonov on 24.08.15.
//  Copyright (c) 2015 Pavlo Aksonov. All rights reserved.
//

#import "RNCellView.h"

@implementation RNCellView


-(void)setTableView:(UITableView *)tableView {
    _tableView = tableView;
    _tableViewCell = [[RNTableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:@"CustomCell"];
    _tableViewCell.cellView = self;
}

-(void)setComponentHeight:(float)componentHeight {
    _componentHeight = componentHeight;
    if (componentHeight){
        [_tableView reloadData];
    }
}

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

@end
