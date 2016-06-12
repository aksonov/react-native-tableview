# react-native-tableview
Native iOS UITableView for React Native with JSON support.

- [Features](#features)
- [Installation](#installation)
- [Styles](#supported-styles)
- [Examples](#examples)
- [Customization](#customization)

## Features
- Look and feel native iOS TableView (with group/plain tableview type, sections headers, etc)
- Display long lists of data (like country list) - built-in list view has performance issues for long lists
- Use built-in accessory types (checkmark or disclosure indicator)
- Automatic scroll to initial selected value during component initialization (autoFocus property)
- Automatic item selection with "checkmark" with old item de-selection (optionally), see demo, useful to select country/state/etc.
- Native JSON support for datasource. If you need to display large dataset, generated Javascript will became very large and impact js loading time. To solve this problem the component could read JSON directly from app bundle without JS!
- Filter JSON datasources using NSPredicate syntax. For example you could select states for given country only (check demo)
- Create custom UITableView cells with flexible height using React Native syntax (TableView.Cell tag)
- Use tableview as menu to navigate to other app screen (check included demo, it uses flux router https://github.com/aksonov/react-native-router-flux)
- Native editing mode for table - move/delete option is supported by using attributes canMove, canEdit for items/sections

--

## Installation
1. `npm install react-native-tableview --save`
2. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
3. add `./node_modules/react-native-tableview/RNTableView.xcodeproj`
4. In the XCode project navigator, select your project, select the `Build Phases` tab and in the `Link Binary With Libraries` section add **libRNTableView.a**
4. And in the `Build Settings` tab in the `Search Paths/Header Search Paths` section add `$(SRCROOT)/../node_modules/react-native-tableview` (make sure it's recursive).
5. (optional) If you will use JSON file, add it to iOS application bundle
6. `import TableView from 'react-native-tableview'`

--

## Supported Styles
### UITableView styles
- UITableViewStylePlain (TableView.Consts.Style.Plain)
- UITableViewStyleGrouped (TableView.Consts.Style.Grouped)

### UITableViewCell styles
- UITableViewCellStyleDefault (TableView.Consts.CellStyle.Default)
- UITableViewCellStyleValue1 (TableView.Consts.CellStyle.Value1)
- UITableViewCellStyleValue2 (TableView.Consts.CellStyle.Value2)
- UITableViewCellStyleSubtitle (TableView.Consts.CellStyle.Subtitle)

### Accessory types
- UITableViewCellAccessoryNone (TableView.Consts.AccessoryType.None)
- UITableViewCellAccessoryDisclosureIndicator (TableView.Consts.AccessoryType.DisclosureIndicator or `arrow` attribute for TableView.Item or TableView.Section)
- UITableViewCellAccessoryDetailDisclosureButton (TableView.Consts.AccessoryType.DisclosureButton)
- UITableViewCellAccessoryCheckmark (TableView.Consts.AccessoryType.Checkmark or `selected` attribute for TableView.Item)
- UITableViewCellAccessoryDetailButton (TableView.Consts.AccessoryType.DetailButton)

### List item format
Items in the list can be either `TableView.Item` or `TableView.Cell`. An `Item` is simply text. A `Cell` can be any complex component. However, only `Item`s can be edited or moved. There are also issues with `Cell`s re-rendering on data changes (#19) that can be avoided by using `Item`s. If you want to be able to re-render, edit or move a complex component, use `reactModuleForCell`, described in [Editable Complex Components](#editable-complex-components).

--

## Examples

### Example 1
![demo-3](https://cloud.githubusercontent.com/assets/1321329/10022633/2bcad30e-614e-11e5-987d-28dbbb9d2739.gif)

```
'use strict';

var React = require('react-native');
var { AppRegistry } = React;
var TableView = require('react-native-tableview');
var Section = TableView.Section;
var Item = TableView.Item;

class TableViewExample extends React.Component {
    render(){
        return (
            <TableView style={{flex:1}}
                       allowsToggle={true}
                       allowsMultipleSelection={true}
                       tableViewStyle={TableView.Consts.Style.Grouped}
                       tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
                       onPress={(event) => console.log(event)}>
                <Section label="Section 1" arrow={true}>
                    <Item value="1" detail="Detail1" >Item 1</Item>
                    <Item value="2">Item 2</Item>
                    <Item>Item 3</Item>
                    <Item>Item 4</Item>
                    <Item>Item 5</Item>
                    <Item>Item 6</Item>
                    <Item>Item 7</Item>
                    <Item>Item 8</Item>
                    <Item>Item 9</Item>
                    <Item>Item 10</Item>
                    <Item>Item 11</Item>
                    <Item>Item 12</Item>
                    <Item>Item 13</Item>
                    <Item>Item 14</Item>
                    <Item>Item 15</Item>
                    <Item>Item 16</Item>
                    <Item>Item 17</Item>
                    <Item>Item 18</Item>
                    <Item>Item 19</Item>
                </Section>
                <Section label="Section 2" arrow={false}>
                    <Item selected={true}>Item 1</Item>
                    <Item>Item 2</Item>
                    <Item>Item 3</Item>
                </Section>
            </TableView>
        );
    }
}

AppRegistry.registerComponent('TableViewExample', () => TableViewExample);
```
### Example 2 (JSON source support), reads country list JSON from app bundle and display UITableView with selected value checkmarked
![demo2](https://cloud.githubusercontent.com/assets/1321329/9335801/7a4d42ca-45d6-11e5-860c-969db80413ca.gif)

```
    render(){
        return (
            <TableView selectedValue="ES" style={{flex:1}} json="countries"
                       tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
                       onPress={(event) => console.log(event)}/>
        );
    }
```

### Example 3 (JSON filter and optional items at the beginning)
```
    // list spanish provinces and add 'All states' item at the beginning
    render(){
        var country = "ES";
        return (
            <TableView selectedValue="" style={{flex:1}} json="states" filter={`country=='${country}'`}
                       tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
                       onPress={(event) => console.log(event)}>
                <Item value="">All states</Item>
            </TableView>
        );
    }
```

--

## Customization

The following style props are supported:
- `tableViewCellStyle`
- `tableViewCellEditingStyle`
- `separatorStyle`
- `contentInset`
- `contentOffset`
- `scrollIndicatorInsets`

Colors:
- `textColor`
- `tintColor`
- `selectedTextColor`
- `detailTextColor`
- `separatorColor`
- `headerTextColor`
- `footerTextColor`

Base font:
- `fontSize`
- `fontWeight`
- `fontStyle`
- `fontFamily`

"Subtitle" font:
- `detailFontSize`
- `detailFontWeight`
- `detailFontStyle`
- `detailFontFamily`

Header font:
- `headerFontSize`
- `headerFontWeight`
- `headerFontStyle`
- `headerFontFamily`

Footer font:
- `footerFontSize`
- `footerFontWeight`
- `footerFontStyle`
- `footerFontFamily`

## Images / Icons
An `Item` component takes an `image` and an optional `imageWidth` prop.

An `image` prop can be a string pointing to the name of an asset in your "Asset Catalog". In this case an `imageWidth` prop is recommended.
```
<Item image="icon-success.png" imageWidth={40} />
```

Alernatively, you can `require` the image from your local app code. In this case an `imageWidth` is unnecessary.

```
<Item image={require('../images/icon-success.png')} />
```

### Editable Complex Components
Only `Item`s can be edited or moved. However you can create a complex component that is referenced by an Item using `reactModuleForCell`. You will need to do several things to set this up.

1. Add some lines to `AppDelegate.m`
2. Write your view component.
3. Pass the name of your view component as a prop in your `<TableView>` component.
4. Create a list of `<Item>`s in your TableView, passing props intended for your view component.
5. Register your view component as an `App` root view.

#### Modifying `AppDelegate.m`
Add the following import statement with the other imports at the top of the file:

```
#import <RNTableView/RNAppGlobals.h>
```
Add the following two lines

```
  //Save main bridge so that RNTableView could access our bridge to create its RNReactModuleCells
  [[RNAppGlobals sharedInstance] setAppBridge:rootView.bridge];
```
just before the `self.window =` line near the bottom of the file. If you have not already done so, add the header search path as shown in [Getting Started](#getting-started).

### Write your cell view component.

For example,

```
//Should be pure... setState on top-level component doesn't seem to work
class TableViewExampleCell extends React.Component {
    render(){
        var style = {borderColor:"#aaaaaa", borderWidth:1, borderRadius:3};
        // Fill the full native table cell height.
        style.flex = 1;
        
        // All Item props get passed to this cell inside this.props.data. Use them to control the rendering, for example background color:
        if (this.props.data.backgroundColor !== undefined) {
            style.backgroundColor = this.props.data.backgroundColor;
        }
        
        return (
           <View style={style}>
           <Text>section:{this.props.section},row:{this.props.row},label:{this.props.data.label}</Text>
               <Text> message:{this.props.data.message}</Text>
           </View>
       );
    }
    }
```
For more examples, see examples/TableViewDemo.

#### Pass component as prop.

```
<TableView reactModuleForCell="TableViewExampleCell" >
```

#### Create list of items, passing props
```
          <Section canEdit={true}>
              { this.props.items.map(function(item) {
                return (<Item key={"i" + item.data.date}
                              label={item.label}
                              message={item.message}
                              />);
               }) }
          </Section>

```

Note that the props you pass must be primitive types: they cannot be objects. Also, note that the props
become properties of the `data` prop in your `reactModuleForCell` component. That is, you pass `label="foo"`
and in your component you pick it up as `this.props.data.label`.

#### Register your component.
Each cell you render becomes a reuseable root view or `App`.
```
var { AppRegistry } = React;

...

AppRegistry.registerComponent('TableViewExample', () => TableViewExample);
```
When debugging, you will see the message:
```
Running application "TableViewExample" with appParams: { /* params */ }. __DEV__ === true, development-level warning are ON, performance optimizations are OFF

```
multiple times. While slightly annoying, this does not seem to affect performance.
You may also see message [Unbalanced calls start/end for tag 5](https://github.com/facebook/react-native/issues/4163).

