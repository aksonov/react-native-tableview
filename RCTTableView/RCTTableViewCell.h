//
//  RCTTableViewCell.h
//  RCTTableView
//
//  Created by Pavlo Aksonov on 24.08.15.
//  Copyright (c) 2015 Pavlo Aksonov. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "RCTCellView.h"
@class RCTCellView;

@interface RCTTableViewCell : UITableViewCell

@property (nonatomic, weak) RCTCellView *cellView;

@end
