
#import <Foundation/Foundation.h>
@class RCTBridge;

@interface RNAppGlobals : NSObject {
    RCTBridge *appBridge;
}

@property (nonatomic, retain) RCTBridge *appBridge;

+ (id)sharedInstance;

@end