//
//  RNGlobals.m
//  RNTableView
//
//  Created by Anna Berman on 2/10/16.
//  Copyright © 2016 Pavlo Aksonov. All rights reserved.
//

#import "RNAppGlobals.h"

@implementation RNAppGlobals

@synthesize appBridge;

+ (id)sharedInstance {
    NSLog(@"RNAppGlobals is deprecated/no longer needed and will be removed soon");
    
    static RNAppGlobals *instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[self alloc] init];
    });
    return instance;
}

@end