# react-native-tableview
Native iOS UITableView for React Native with JSON support.

## Why I need to use it?
- Look and feel native iOS TableView (with group/plain tableview type, sections headers, etc)
- To display long lists of data (like country list) - built-in list view has performance issues for long lists
- To use built-in accessory types (checkmark or disclosure indicator)
- Automatic scroll to initial selected value during component initialization (autoFocus property)
- Automatic item selection with "checkmark" with old item de-selection (optionally), see demo, useful to select country/state/etc.
- Native JSON support for datasource. If you need to display large dataset, generated Javascript will became very large and impact js loading time. To solve this problem the component could read JSON directly from app bundle without JS!
- Filter JSON datasources using NSPredicate syntax. For example you could select states for given country only (check demo)
- Create custom UITableView cells with flexible height using React Native syntax (TableView.Cell tag)
- Use tableview as menu to navigate to other app screen (check included demo, it uses flux router https://github.com/aksonov/react-native-router-flux)
- Native editing mode for table - move/delete option is supported by using attributes canMove, canEdit for items/sections

## Supports UITableView styles
- UITableViewStylePlain (TableView.Consts.Style.Plain)
- UITableViewStyleGrouped (TableView.Consts.Style.Grouped)

## Supports UITableViewCell styles
- UITableViewCellStyleDefault (TableView.Consts.CellStyle.Default)
- UITableViewCellStyleValue1 (TableView.Consts.CellStyle.Value1)
- UITableViewCellStyleValue2 (TableView.Consts.CellStyle.Value2)
- UITableViewCellStyleSubtitle (TableView.Consts.CellStyle.Subtitle)

## Supports accessory types
- UITableViewCellAccessoryDisclosureIndicator ("arrow" attribute for TableView.Item or TableView.Section)
- UITableViewCellAccessoryCheckmark ("selected" attribute for TableView.Item)

## Example 1
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
## Example 2 (JSON source support), reads country list JSON from app bundle and display UITableView with selected value checkmarked
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

## Getting started
1. `npm install react-native-tableview --save`
2. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
3. add `./node_modules/react-native-tableview/RNTableView.xcodeproj`
4. In the XCode project navigator, select your project, select the `Build Phases` tab and in the `Link Binary With Libraries` section add **libRNTableView.a**
5. (optional) If you will use JSON file, add it to iOS application bundle
6. `var TableView = require('react-native-tableview')`
