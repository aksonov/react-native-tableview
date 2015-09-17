//
//  RCTTableViewCell.h
//  RCTTableView
//
//  Created by Pavlo Aksonov on 24.08.15.
//  Copyright (c) 2015 Pavlo Aksonov. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "RNCellView.h"
@class RNCellView;

@interface RNTableViewCell : UITableViewCell

@property (nonatomic, weak) RNCellView *cellView;

@end
