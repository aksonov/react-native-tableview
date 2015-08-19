//
//  JSONCountryDataSource.m
//  TableViewDemo
//
//  Created by Pavlo Aksonov on 18.08.15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import "JSONDataSource.h"

@implementation JSONDataSource
-(id)initWithFilename:(NSString *)filename filter:(NSString *)filter args:(NSArray *)filterArgs {
    NSString *jsonPath = [[NSBundle mainBundle] pathForResource:filename
                                                         ofType:@"json"];
    
    NSAssert(jsonPath, @"Filename %@ doesn't exist within app bundle", filename);
    NSData *data = [NSData dataWithContentsOfFile:jsonPath];
    NSError *error = nil;
    NSArray *json = (NSArray *)[NSJSONSerialization JSONObjectWithData:data
                                                               options:NSJSONReadingMutableContainers
                                                                 error:&error];
    
    NSAssert(error==nil, @"JSON Error %@", [error description]);
    NSAssert([json isKindOfClass:[NSArray class]], @"JSON should be NSArray type");
    
    if (filter){
        for (NSMutableDictionary *sections in json){
            sections[@"items"] = [sections[@"items"] filteredArrayUsingPredicate:[NSPredicate predicateWithFormat:filter argumentArray:filterArgs]];
        }
    }
    
    _sections = json;
    return self;
}

-(id)initWithDictionary:(NSDictionary *)params {
  NSString *filename = params[@"filename"];
  NSAssert(filename, @"Filename should be defined");
    return [self initWithFilename:filename filter:params[@"filter"] args:params[@"args"]];
}


@end
