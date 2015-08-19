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

@interface RCTTableView()<UITableViewDataSource, UITableViewDelegate> {
    id<RCTTableViewDatasource> datasource;
}

@property (strong, nonatomic) UITableView *tableView;

@end

@implementation RCTTableView {
    RCTEventDispatcher *_eventDispatcher;
    NSArray *_items;
    NSInteger _selectedIndex;
}

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher
{
    RCTAssertParam(eventDispatcher);
    
    if ((self = [super initWithFrame:CGRectZero])) {
        _eventDispatcher = eventDispatcher;
        _selectedIndex = -1;
        _selectedSection = 0;
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
    if (_selectedIndex>=0){
        dispatch_async(dispatch_get_main_queue(), ^{
            NSIndexPath *indexPath = [NSIndexPath indexPathForItem:_selectedIndex inSection:_selectedSection];
            [self.tableView selectRowAtIndexPath:indexPath animated:YES scrollPosition:UITableViewScrollPositionMiddle];
            [self.tableView deselectRowAtIndexPath:indexPath animated:NO];
        });
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
            if (self.selectedValue && [self.selectedValue isEqualToString:item[@"value"]]){
                _selectedSection = [_sections count];
                _selectedIndex = [items count];
                itemData[@"selected"] = @YES;
            }
            [items addObject:itemData];
        }
        sectionData[@"items"] = items;
        [_sections addObject:sectionData];
        
    }
}

-(NSInteger)numberOfSectionsInTableView:(UITableView *)tableView {
    return [_sections count];
}

-(NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section {
    NSInteger count = [_sections[section][@"items"] count];
    return count;
}
-(UITableViewCell* )tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"Cell"];
    if (cell == nil) {
        cell = [[UITableViewCell alloc] initWithStyle:self.tableViewCellStyle reuseIdentifier:@"Cell"];
    }
    NSDictionary *item = [self dataForRow:indexPath.item section:indexPath.section];
    cell.textLabel.text = item[@"label"];
    cell.detailTextLabel.text = item[@"detail"];
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

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {
    [tableView deselectRowAtIndexPath:indexPath animated:NO];
    NSMutableDictionary *oldValue = self.selectedIndex>=0 ?[self dataForRow:self.selectedIndex section:self.selectedSection] : [NSMutableDictionary dictionaryWithDictionary:@{}];
    NSMutableDictionary *newValue = [self dataForRow:indexPath.item section:indexPath.section];
    NSDictionary *event = @{
                            @"target": self.reactTag,
                            @"oldValue": oldValue,
                            @"newValue": newValue,
                            @"indexPath": @{
                                    @"section": @([indexPath section]),
                                    @"row": @([indexPath row])
                                    }
                            };
    [_eventDispatcher sendInputEventWithName:@"topTap" body:event];
    if (oldValue[@"selected"]){
        [oldValue removeObjectForKey:@"selected"];
        [newValue setObject:@1 forKey:@"selected"];
        [self.tableView reloadData];
    }
    self.selectedIndex = indexPath.item;
    self.selectedSection = indexPath.section;
}





@end
