//
//  SVGUse.m
//  SVGReact
//
//  Created by Pavlo Aksonov on 07.08.15.
//  Copyright (c) 2015 Pavlo Aksonov. All rights reserved.
//

#import "RNTableView.h"
#import "RCTConvert.h"
#import "RCTEventDispatcher.h"
#import "RCTUtils.h"
#import "UIView+React.h"
#import "JSONDataSource.h"
#import "RNCellView.h"
#import "RNTableFooterView.h"
#import "RNTableHeaderView.h"

@interface RNTableView()<UITableViewDataSource, UITableViewDelegate> {
    id<RNTableViewDatasource> datasource;
}
@property (strong, nonatomic) NSMutableArray *selectedIndexes;
@property (strong, nonatomic) UITableView *tableView;

@end

@implementation RNTableView {
    RCTEventDispatcher *_eventDispatcher;
    NSArray *_items;
    NSMutableArray *_cells;
}

-(void)setEditing:(BOOL)editing {
    [self.tableView setEditing:editing animated:YES];
}

- (void)insertReactSubview:(UIView *)subview atIndex:(NSInteger)atIndex
{
    // will not insert because we don't need to draw them
    //   [super insertSubview:subview atIndex:atIndex];
    
    // just add them to registry
    if ([subview isKindOfClass:[RNCellView class]]){
        RNCellView *cellView = (RNCellView *)subview;
        cellView.tableView = self.tableView;
        while (cellView.section >= [_cells count]){
            [_cells addObject:[NSMutableArray array]];
        }
        [_cells[cellView.section] addObject:subview];
        if (cellView.section == [_sections count]-1 && cellView.row == [_sections[cellView.section][@"count"] integerValue]-1){
            [self.tableView reloadData];
        }
    } else if ([subview isKindOfClass:[RNTableFooterView class]]){
        RNTableFooterView *footerView = (RNTableFooterView *)subview;
        footerView.tableView = self.tableView;
    } else if ([subview isKindOfClass:[RNTableHeaderView class]]){
        RNTableHeaderView *headerView = (RNTableHeaderView *)subview;
        headerView.tableView = self.tableView;
    }
}

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher
{
    RCTAssertParam(eventDispatcher);
    
    if ((self = [super initWithFrame:CGRectZero])) {
        _eventDispatcher = eventDispatcher;
        _cellHeight = 44;
        _cells = [NSMutableArray array];
        _autoFocus = YES;
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
    
    // find first section with selection
    NSInteger selectedSection = -1;
    for (int i=0;i<[_selectedIndexes count];i++){
        if ([_selectedIndexes[i] intValue] != -1){
            selectedSection = i;
            break;
        }
    }
    // focus of first selected value
    if (_autoFocus && selectedSection>=0 && [self numberOfSectionsInTableView:self.tableView] && [self tableView:self.tableView numberOfRowsInSection:selectedSection]){
        dispatch_async(dispatch_get_main_queue(), ^{
            NSIndexPath *indexPath = [NSIndexPath indexPathForItem:[_selectedIndexes[selectedSection] intValue ]inSection:selectedSection];
            [self.tableView scrollToRowAtIndexPath:indexPath atScrollPosition:UITableViewScrollPositionMiddle animated:YES];
        });
    }
}

#pragma mark - Private APIs

- (void)createTableView {
    _tableView = [[UITableView alloc] initWithFrame:CGRectZero style:_tableViewStyle];
    _tableView.dataSource = self;
    _tableView.delegate = self;
    _tableView.tableFooterView = [[UIView alloc] initWithFrame:CGRectZero];
    _tableView.allowsMultipleSelectionDuringEditing = NO;
    _tableView.contentInset = self.contentInset;
    _tableView.contentOffset = self.contentOffset;
    _tableView.scrollIndicatorInsets = self.scrollIndicatorInsets;
    _tableView.backgroundColor = [UIColor clearColor];
    UIView *view = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, 0.001, 0.001)];
    _tableView.tableHeaderView = view;
    _tableView.tableFooterView = view;
    [self addSubview:_tableView];
}
- (void)tableView:(UITableView *)tableView willDisplayFooterView:(nonnull UIView *)view forSection:(NSInteger)section {
    UITableViewHeaderFooterView *footer = (UITableViewHeaderFooterView *)view;
    
    if (self.footerTextColor){
        footer.textLabel.textColor = self.footerTextColor;
    }
    if (self.footerFont){
        footer.textLabel.font = self.footerFont;
    }
}


-(void)setHeaderHeight:(float)headerHeight {
    _headerHeight = headerHeight;
}
- (CGFloat)tableView:(UITableView *)tableView heightForHeaderInSection:(NSInteger)section{
    if (_sections[section][@"headerHeight"]){
        return [_sections[section][@"headerHeight"] floatValue] ? [_sections[section][@"headerHeight"] floatValue] : 0.000001;
    } else {
        if (self.headerHeight){
            return self.headerHeight;
        }
        return -1;
    }
}

- (CGFloat)tableView:(UITableView *)tableView heightForFooterInSection:(NSInteger)section{
    if (_sections[section][@"footerHeight"]){
        return [_sections[section][@"footerHeight"] floatValue] ? [_sections[section][@"footerHeight"] floatValue] : 0.000001;

    } else {
        if (self.footerHeight){
            return self.footerHeight;
        }
        return -1;
    }
}

- (void)tableView:(UITableView *)tableView willDisplayHeaderView:(UIView *)view forSection:(NSInteger)section {
    UITableViewHeaderFooterView *header = (UITableViewHeaderFooterView *)view;
    
    if (self.headerTextColor){
        header.textLabel.textColor = self.headerTextColor;
    }
    if (self.headerFont){
        header.textLabel.font = self.headerFont;
    }
}

-(void)tableView:(UITableView *)tableView willDisplayCell:(UITableViewCell *)cell forRowAtIndexPath:(NSIndexPath *)indexPath
{
    if (self.emptyInsets){
        // Remove separator inset
        if ([cell respondsToSelector:@selector(setSeparatorInset:)]) {
            [cell setSeparatorInset:UIEdgeInsetsZero];
        }
        
        // Prevent the cell from inheriting the Table View's margin settings
        if ([cell respondsToSelector:@selector(setPreservesSuperviewLayoutMargins:)]) {
            [cell setPreservesSuperviewLayoutMargins:NO];
        }
        
        // Explictly set your cell's layout margins
        if ([cell respondsToSelector:@selector(setLayoutMargins:)]) {
            [cell setLayoutMargins:UIEdgeInsetsZero];
        }
    }
    if (self.font){
        cell.detailTextLabel.font = self.font;
        cell.textLabel.font = self.font;
    }
    if (self.tintColor){
        cell.tintColor = self.tintColor;
    }
    NSDictionary *item = [self dataForRow:indexPath.item section:indexPath.section];
    if (self.selectedTextColor && [item[@"selected"] intValue]){
        cell.textLabel.textColor = self.selectedTextColor;
        cell.detailTextLabel.textColor = self.selectedTextColor;
    } else {
        if (self.textColor){
            cell.textLabel.textColor = self.textColor;
            cell.detailTextLabel.textColor = self.textColor;
        }
        if (self.detailTextColor){
            cell.detailTextLabel.textColor = self.detailTextColor;
        }
        
    }
}



- (void)setSections:(NSArray *)sections
{
    _sections = [NSMutableArray arrayWithCapacity:[sections count]];
    
    // create selected indexes
    _selectedIndexes = [NSMutableArray arrayWithCapacity:[sections count]];
    
    BOOL found = NO;
    for (NSDictionary *section in sections){
        NSMutableDictionary *sectionData = [NSMutableDictionary dictionaryWithDictionary:section];
        NSMutableArray *allItems = [NSMutableArray array];
        if (self.additionalItems){
            [allItems addObjectsFromArray:self.additionalItems];
        }
        [allItems addObjectsFromArray:sectionData[@"items"]];
        
        NSMutableArray *items = [NSMutableArray arrayWithCapacity:[allItems count]];
        NSInteger selectedIndex = -1;
        for (NSDictionary *item in allItems){
            NSMutableDictionary *itemData = [NSMutableDictionary dictionaryWithDictionary:item];
            if ((itemData[@"selected"] && [itemData[@"selected"] intValue]) || (self.selectedValue && [self.selectedValue isEqual:item[@"value"]])){
                if(selectedIndex == -1)
                    selectedIndex = [items count];
                itemData[@"selected"] = @YES;
                found = YES;
            }
            [items addObject:itemData];
        }
        [_selectedIndexes addObject:[NSNumber numberWithUnsignedInteger:selectedIndex]];
        
        sectionData[@"items"] = items;
        [_sections addObject:sectionData];
    }
    [self.tableView reloadData];
}

-(NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return [_sections count];
}

-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    NSInteger count = [_sections[section][@"items"] count];
    // if we have custom cells, additional processing is necessary
    if ([self hasCustomCells:section]){
        if ([_cells count]<=section){
            return 0;
        }
        // don't display cells until their's height is not calculated (TODO: maybe it is possible to optimize??)
        for (RNCellView *view in _cells[section]){
            if (!view.componentHeight){
                return 0;
            }
        }
        count = [_cells[section] count];
    }
    return count;
}
-(UITableViewCell* )tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"Cell"];
    NSDictionary *item = [self dataForRow:indexPath.item section:indexPath.section];
    
    // check if it is standard cell or user-defined UI
    if (![self hasCustomCells:indexPath.section]){
        if (cell == nil) {
            cell = [[UITableViewCell alloc] initWithStyle:self.tableViewCellStyle reuseIdentifier:@"Cell"];
        }
        cell.textLabel.text = item[@"label"];
        cell.detailTextLabel.text = item[@"detail"];
    } else {
        cell = ((RNCellView *)_cells[indexPath.section][indexPath.row]).tableViewCell;
    }
    if (item[@"selected"] && [item[@"selected"] intValue]){
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

-(NSString *)tableView:(UITableView *)tableView titleForFooterInSection:(NSInteger)section {
    return _sections[section][@"footerLabel"];
}

-(NSMutableDictionary *)dataForRow:(NSInteger)row section:(NSInteger)section {
    return (NSMutableDictionary *)_sections[section][@"items"][row];
}

-(CGFloat)tableView:(UITableView *)tableView heightForRowAtIndexPath:(NSIndexPath *)indexPath {
    if (![self hasCustomCells:indexPath.section]){
        return _cellHeight;
    } else {
        RNCellView *cell = (RNCellView *)_cells[indexPath.section][indexPath.row];
        CGFloat height =  cell.componentHeight;
        return height;
    }
    
}

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    [tableView deselectRowAtIndexPath:indexPath animated:NO];
    
    NSInteger selectedIndex = [self.selectedIndexes[indexPath.section] integerValue];
    NSMutableDictionary *oldValue = selectedIndex>=0 ?[self dataForRow:selectedIndex section:indexPath.section] : [NSMutableDictionary dictionaryWithDictionary:@{}];
    
    NSMutableDictionary *newValue = [self dataForRow:indexPath.item section:indexPath.section];
    newValue[@"target"] = self.reactTag;
    newValue[@"selectedIndex"] = [NSNumber numberWithInteger:indexPath.item];
    newValue[@"selectedSection"] = [NSNumber numberWithInteger:indexPath.section];
    
    
    [_eventDispatcher sendInputEventWithName:@"press" body:newValue];
    
    // unselect old, select new
    if ((oldValue[@"selected"] && [oldValue[@"selected"] intValue]) || self.selectedValue){
        [oldValue removeObjectForKey:@"selected"];
        [newValue setObject:@1 forKey:@"selected"];
        [self.tableView reloadData];
    }
    self.selectedIndexes[indexPath.section] = [NSNumber numberWithInteger:indexPath.item];
}


- (BOOL)tableView:(UITableView *)tableView canEditRowAtIndexPath:(NSIndexPath *)indexPath {
    NSMutableDictionary *value = [self dataForRow:indexPath.item section:indexPath.section];
    return [value[@"canEdit"] boolValue];
}

- (BOOL)tableView:(UITableView *)tableView canMoveRowAtIndexPath:(NSIndexPath *)indexPath {
    NSMutableDictionary *value = [self dataForRow:indexPath.item section:indexPath.section];
    return [value[@"canMove"] boolValue];
}

- (void)tableView:(UITableView *)tableView moveRowAtIndexPath:(NSIndexPath *)sourceIndexPath toIndexPath:(NSIndexPath *)destinationIndexPath {
    [_eventDispatcher sendInputEventWithName:@"change" body:@{@"target":self.reactTag, @"sourceIndex":@(sourceIndexPath.row), @"sourceSection": @(sourceIndexPath.section), @"destinationIndex":@(destinationIndexPath.row), @"destinationSection":@(destinationIndexPath.section), @"mode": @"move"}];
}

- (NSIndexPath *)tableView:(UITableView *)tableView targetIndexPathForMoveFromRowAtIndexPath:(NSIndexPath *)sourceIndexPath toProposedIndexPath:(NSIndexPath *)proposedDestinationIndexPath {
    if (self.moveWithinSectionOnly && sourceIndexPath.section != proposedDestinationIndexPath.section) {
        return sourceIndexPath;
    }
    return proposedDestinationIndexPath;
}

- (void)tableView:(UITableView *)tableView commitEditingStyle:(UITableViewCellEditingStyle)editingStyle forRowAtIndexPath:(NSIndexPath *)indexPath { //implement the delegate method
    
    if (editingStyle == UITableViewCellEditingStyleDelete) {
        NSMutableDictionary *newValue = [self dataForRow:indexPath.item section:indexPath.section];
        newValue[@"target"] = self.reactTag;
        newValue[@"selectedIndex"] = [NSNumber numberWithInteger:indexPath.item];
        newValue[@"selectedSection"] = [NSNumber numberWithInteger:indexPath.section];
        newValue[@"mode"] = @"delete";
        
        [_eventDispatcher sendInputEventWithName:@"change" body:newValue];
        
        [_sections[indexPath.section][@"items"] removeObjectAtIndex:indexPath.row];
        [self.tableView reloadData];
    }
}

-(BOOL)hasCustomCells:(NSInteger)section {
    return [[_sections[section] valueForKey:@"customCells"] boolValue];
}
@end
