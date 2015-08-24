//
//  SVGUse.m
//  SVGReact
//
//  Created by Pavlo Aksonov on 07.08.15.
//  Copyright (c) 2015 Pavlo Aksonov. All rights reserved.
//

#import "RCTTableView.h"
#import "RCTConvert.h"
#import "RCTEventDispatcher.h"
#import "RCTUtils.h"
#import "UIView+React.h"
#import "JSONDataSource.h"
#import "RCTCellView.h"

@interface RCTTableView()<UITableViewDataSource, UITableViewDelegate> {
    id<RCTTableViewDatasource> datasource;
}

@property (strong, nonatomic) UITableView *tableView;

@end

@implementation RCTTableView {
    RCTEventDispatcher *_eventDispatcher;
    NSArray *_items;
    NSInteger _selectedIndex;
    NSMutableArray *_cells;
}

- (void)insertReactSubview:(UIView *)subview atIndex:(NSInteger)atIndex
{
    // will not insert because we don't need to draw them
 //   [super insertSubview:subview atIndex:atIndex];
    
    // just add them to registry
    if ([subview isKindOfClass:[RCTCellView class]]){
        RCTCellView *cellView = (RCTCellView *)subview;
        cellView.tableView = self.tableView;
        while (cellView.section >= [_cells count]){
            [_cells addObject:[NSMutableArray array]];
        }
        [_cells[cellView.section] addObject:subview];
        if (cellView.section == [_sections count]-1 && cellView.row == [_sections[cellView.section][@"count"] integerValue]-1){
            [self.tableView reloadData];
        }
    }
    
}

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher
{
    RCTAssertParam(eventDispatcher);
    
    if ((self = [super initWithFrame:CGRectZero])) {
        _eventDispatcher = eventDispatcher;
        _selectedIndex = -1;
        _selectedSection = 0;
        _cellHeight = 44;
        _cells = [NSMutableArray array];
    }
    return self;
}

RCT_NOT_IMPLEMENTED(-initWithFrame:(CGRect)frame)
RCT_NOT_IMPLEMENTED(-initWithCoder:(NSCoder *)aDecoder)
- (void)setTableViewStyle:(UITableViewStyle)tableViewStyle {
    _tableViewStyle = tableViewStyle;
    
    [self createTableView];
}

#pragma mark -

- (void)layoutSubviews {
    [self.tableView setFrame:self.frame];
    
    // if sections are not define, try to load JSON
    if (![_sections count] && _json){
        datasource = [[JSONDataSource alloc] initWithFilename:_json filter:_filter args:_filterArgs];
        self.sections = [NSMutableArray arrayWithArray:[datasource sections]];
    }
}

#pragma mark - Private APIs

- (void)createTableView {
    _tableView = [[UITableView alloc] initWithFrame:CGRectZero style:_tableViewStyle];
    _tableView.dataSource = self;
    _tableView.delegate = self;
    _tableView.tableFooterView = [[UIView alloc] initWithFrame:CGRectZero];
    [self addSubview:_tableView];
}



- (void)setSections:(NSArray *)sections
{
    _sections = [NSMutableArray arrayWithCapacity:[sections count]];
    BOOL found = NO;
    for (NSDictionary *section in sections){
        NSMutableDictionary *sectionData = [NSMutableDictionary dictionaryWithDictionary:section];
        NSMutableArray *allItems = [NSMutableArray array];
        if (self.additionalItems){
            [allItems addObjectsFromArray:self.additionalItems];
        }
        [allItems addObjectsFromArray:sectionData[@"items"]];
        
        NSMutableArray *items = [NSMutableArray arrayWithCapacity:[allItems count]];
        for (NSDictionary *item in allItems){
            NSMutableDictionary *itemData = [NSMutableDictionary dictionaryWithDictionary:item];
            if (itemData[@"selected"] || (self.selectedValue && [self.selectedValue isEqualToString:item[@"value"]])){
                _selectedSection = [_sections count];
                _selectedIndex = [items count];
                itemData[@"selected"] = @YES;
                found = YES;
            }
            [items addObject:itemData];
        }
        sectionData[@"items"] = items;
        [_sections addObject:sectionData];
    }
//  check first element if no match
//    if (!found && self.selectedValue && [_sections count] && [_sections[0][@"items"] count]){
//        _selectedSection = 0;
//        _selectedIndex = 0;
//        _sections[0][@"items"][0][@"selected"] = @YES;
//    }
}

-(NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return [_sections count];
}

-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    NSInteger count = [_sections[section][@"items"] count];
    // if we have custom cells, additional processing is necessary
    if (self.customCells){
        if ([_cells count]<=section){
            return 0;
        }
        // don't display cells until their's height is not calculated (TODO: maybe it is possible to optimize??)
        for (RCTCellView *view in _cells[section]){
            if (!view.componentHeight){
                return 0;
            }
        }
        count = [_cells[section] count];
    }
    if (count && _selectedIndex>=0){
        dispatch_async(dispatch_get_main_queue(), ^{
            NSIndexPath *indexPath = [NSIndexPath indexPathForItem:_selectedIndex inSection:_selectedSection];
            [self.tableView selectRowAtIndexPath:indexPath animated:YES scrollPosition:UITableViewScrollPositionMiddle];
            [self.tableView deselectRowAtIndexPath:indexPath animated:NO];
        });
    }
    return count;
}
-(UITableViewCell* )tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"Cell"];
    NSDictionary *item = [self dataForRow:indexPath.item section:indexPath.section];
    
    // check if it is standard cell or user-defined UI
    if (![_cells count]){
        if (cell == nil) {
            cell = [[UITableViewCell alloc] initWithStyle:self.tableViewCellStyle reuseIdentifier:@"Cell"];
        }
        cell.textLabel.text = item[@"label"];
        cell.detailTextLabel.text = item[@"detail"];
    } else {
        cell = ((RCTCellView *)_cells[indexPath.section][indexPath.row]).tableViewCell;
    }
    if ([item[@"selected"] intValue]){
        cell.accessoryType = UITableViewCellAccessoryCheckmark;
    } else if ([item[@"arrow"] intValue]) {
        cell.accessoryType = UITableViewCellAccessoryDisclosureIndicator;
    } else {
        cell.accessoryType = UITableViewCellAccessoryNone;
    }
    return cell;
}

-(NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section {
    return _sections[section][@"label"];
}

-(NSMutableDictionary *)dataForRow:(NSInteger)row section:(NSInteger)section {
    return (NSMutableDictionary *)_sections[section][@"items"][row];
}

-(CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    if (![_cells count]){
        return _cellHeight;
    } else {
        RCTCellView *cell = (RCTCellView *)_cells[indexPath.section][indexPath.row];
        CGFloat height =  cell.componentHeight;
        return height;
    }
    
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    [tableView deselectRowAtIndexPath:indexPath animated:NO];
    NSMutableDictionary *oldValue = self.selectedIndex>=0 ?[self dataForRow:self.selectedIndex section:self.selectedSection] : [NSMutableDictionary dictionaryWithDictionary:@{}];
    NSMutableDictionary *newValue = [self dataForRow:indexPath.item section:indexPath.section];
    newValue[@"target"] = self.reactTag;
    newValue[@"selectedIndex"] = [NSNumber numberWithInteger:indexPath.item];
    newValue[@"selectedSection"] = [NSNumber numberWithInteger:indexPath.section];
    
    
    [_eventDispatcher sendInputEventWithName:@"topTap" body:newValue];
    if (oldValue[@"selected"]){
        [oldValue removeObjectForKey:@"selected"];
        [newValue setObject:@1 forKey:@"selected"];
        [self.tableView reloadData];
    }
    self.selectedIndex = indexPath.item;
    self.selectedSection = indexPath.section;
}





@end
