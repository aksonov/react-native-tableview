//
//  SVGUse.h
//  SVGReact
//
//  Created by Pavlo Aksonov on 07.08.15.
//  Copyright (c) 2015 Pavlo Aksonov. All rights reserved.
//

#import <UIKit/UIKit.h>
@class RCTBridge;

@protocol RNTableViewDatasource <NSObject>

// create method with params dictionary
-(id)initWithDictionary:(NSDictionary *)params ;

// array of NSDictionary objects (sections) passed to RCTTableViewDatasource (each section should contain "items" value as NSArray of inner items (NSDictionary)
-(NSArray *)sections;

@end

@interface RNTableView : UIView

- (instancetype)initWithBridge:(RCTBridge *)bridge NS_DESIGNATED_INITIALIZER;

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
@property (nonatomic, assign) BOOL showsHorizontalScrollIndicator;
@property (nonatomic, assign) BOOL showsVerticalScrollIndicator;

@property (nonatomic, assign) UITableViewStyle tableViewStyle;
@property (nonatomic, assign) UITableViewCellStyle tableViewCellStyle;
@property (nonatomic, assign) UITableViewCellEditingStyle tableViewCellEditingStyle;
@property (nonatomic, assign) UITableViewCellSeparatorStyle separatorStyle;
@property (nonatomic, assign) UITableViewCellAccessoryType accessoryType;
@property (nonatomic, assign) UITableViewCellAccessoryType selectedAccessoryType;
@property (nonatomic, strong) UIFont *font;
@property (nonatomic, strong) UIFont *detailFont;
@property (nonatomic, strong) UIFont *headerFont;
@property (nonatomic, strong) UIColor *headerTextColor;
@property (nonatomic, strong) UIFont *footerFont;
@property (nonatomic, strong) UIColor *footerTextColor;

@property (nonatomic, strong) UIColor *textColor;
@property (nonatomic, strong) UIColor *tintColor;
@property (nonatomic, strong) UIColor *selectedTextColor;
@property (nonatomic, strong) UIColor *selectedBackgroundColor;
@property (nonatomic, strong) UIColor *detailTextColor;
@property (nonatomic, strong) UIColor *separatorColor;
@property (nonatomic) BOOL autoFocus;
@property (nonatomic) BOOL autoFocusAnimate;
@property (nonatomic) BOOL allowsToggle;
@property (nonatomic) BOOL allowsMultipleSelection;
@property (nonatomic) BOOL alwaysBounceVertical;
@property (nonatomic) NSString *reactModuleForCell;

@property (nonatomic, assign) BOOL scrollEnabled;

- (void) scrollToOffsetX:(CGFloat)x offsetY:(CGFloat)y animated:(BOOL)animated;

@end
