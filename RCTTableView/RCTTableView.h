//
//  SVGUse.h
//  SVGReact
//
//  Created by Pavlo Aksonov on 07.08.15.
//  Copyright (c) 2015 Pavlo Aksonov. All rights reserved.
//

#import <UIKit/UIKit.h>
@class RCTEventDispatcher;

@protocol RCTTableViewDatasource <NSObject>

// create method with params dictionary
-(id)initWithDictionary:(NSDictionary *)params ;

// array of NSDictionary objects (sections) passed to RCTTableViewDatasource (each section should contain "items" value as NSArray of inner items (NSDictionary)
-(NSArray *)sections;

@end

@interface RCTTableView : UIView

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher NS_DESIGNATED_INITIALIZER;

@property (nonatomic, copy) NSMutableArray *sections;
@property (nonatomic, strong) NSString *json;
@property (nonatomic, strong) NSString *filter;
@property (nonatomic, strong) NSArray *filterArgs;
@property (nonatomic, strong) NSString *selectedValue;
@property (nonatomic, assign) NSInteger selectedIndex;
@property (nonatomic, assign) NSInteger selectedSection;
@property (nonatomic, assign) UITableViewStyle tableViewStyle;
@property (nonatomic, assign) UITableViewCellStyle tableViewCellStyle;

@end
