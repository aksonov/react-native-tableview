//
//  SVGUse.h
//  SVGReact
//
//  Created by Pavlo Aksonov on 07.08.15.
//  Copyright (c) 2015 Pavlo Aksonov. All rights reserved.
//

#import <UIKit/UIKit.h>
@class RCTEventDispatcher;

@protocol RNTableViewDatasource <NSObject>

// create method with params dictionary
-(id)initWithDictionary:(NSDictionary *)params ;

// array of NSDictionary objects (sections) passed to RCTTableViewDatasource (each section should contain "items" value as NSArray of inner items (NSDictionary)
-(NSArray *)sections;

@end

@interface RNTableView : UIView

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher NS_DESIGNATED_INITIALIZER;

@property (nonatomic, copy) NSMutableArray *sections;
@property (nonatomic, copy) NSArray *additionalItems;
@property (nonatomic, strong) NSString *json;
@property (nonatomic, strong) NSString *filter;
@property (nonatomic, strong) NSArray *filterArgs;
@property (nonatomic, strong) id selectedValue;
@property (nonatomic) float cellHeight;
@property (nonatomic) float footerHeight;
@property (nonatomic) float headerHeight;
@property (nonatomic) BOOL customCells;
@property (nonatomic) BOOL editing;
@property (nonatomic) BOOL emptyInsets;
@property (nonatomic) BOOL moveWithinSectionOnly;
@property (nonatomic, assign) UIEdgeInsets contentInset;
@property (nonatomic, assign) CGPoint contentOffset;
@property (nonatomic, assign) UIEdgeInsets scrollIndicatorInsets;

@property (nonatomic, assign) UITableViewStyle tableViewStyle;
@property (nonatomic, assign) UITableViewCellStyle tableViewCellStyle;
@property (nonatomic, strong) UIFont *font;
@property (nonatomic, strong) UIFont *headerFont;
@property (nonatomic, strong) UIColor *headerTextColor;
@property (nonatomic, strong) UIFont *footerFont;
@property (nonatomic, strong) UIColor *footerTextColor;

@property (nonatomic, strong) UIColor *textColor;
@property (nonatomic, strong) UIColor *tintColor;
@property (nonatomic, strong) UIColor *selectedTextColor;
@property (nonatomic, strong) UIColor *detailTextColor;
@property (nonatomic) BOOL autoFocus;

@end
