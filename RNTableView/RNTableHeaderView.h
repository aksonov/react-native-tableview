//
//  RNTableHeaderView.h
//  RNTableView
//
//  Created by Pavlo Aksonov on 09.11.15.
//  Copyright © 2015 Pavlo Aksonov. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface RNTableHeaderView : UIView

@property (nonatomic) float componentHeight;
@property (nonatomic) float componentWidth;
@property (nonatomic, weak) UITableView *tableView;

@end
