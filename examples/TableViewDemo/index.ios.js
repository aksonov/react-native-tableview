'use strict';

var React = require('react-native');
var { AppRegistry, Text, Dimensions,View } = React;
var TableView = require('react-native-tableview');
var Section = TableView.Section;
var Item = TableView.Item;
var Cell = TableView.Cell;
var {Actions, Router, Route, Schema} = require('react-native-router-flux');
var NavigationBar = require('react-native-navbar');

class NavBar extends React.Component {
    render(){
        return <NavigationBar style={{backgroundColor: '#0db0d9'}} titleColor='white' buttonsColor='white' statusBar='lightContent' {...this.props}/>
    }
}
class Example1 extends React.Component {
    render() {
        return (
            <TableView style={{flex:1}} onPress={(event) => alert(JSON.stringify(event))}>
                <Section label="section 1">
                    <Cell style={{backgroundColor:'gray'}} value="">
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1</Text>
                    </Cell>
                    <Cell style={{height:200, backgroundColor:'red'}}><Text>Cell 2</Text></Cell>
                    <Cell><Text>Cell 3</Text></Cell>
                    <Cell style={{height:100}}><Text>Cell 4</Text></Cell>
                    <Cell><Text>Cell 5</Text></Cell>
                </Section>
                <Section label="section 2">
                    <Cell style={{backgroundColor:'gray'}} value="1">
                        <Text style={{color:'white', textAlign:'right'}}>Cell 1.1</Text>
                        <Text style={{color:'white', textAlign:'left'}}>Cell 1.1</Text>
                    </Cell>
                    <Cell style={{height:200, backgroundColor:'red'}}><Text>Cell 1.2</Text></Cell>
                    <Cell><Text>Cell 3</Text></Cell>
                    <Cell style={{height:100}}><Text>Cell 4</Text></Cell>
                    <Cell><Text>Cell 5</Text></Cell>
                </Section>
            </TableView>
        );
    }
}

class Example2 extends React.Component {
    // list spanish provinces and add 'All states' item at the beginning
    render() {
        var country = "ES";
        return (
            <TableView selectedValue="" style={{flex:1}} json="states" filter={`country=='${country}'`}
                       tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
                       onPress={(event) => alert(JSON.stringify(event))}>
                <Item value="">All states</Item>
            </TableView>
        );
    }
}

class Example3 extends React.Component {
    render(){
        return (
            <TableView style={{flex:1}}
                       tableViewStyle={TableView.Consts.Style.Grouped}
                       tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
                       onPress={(event) => alert(JSON.stringify(event))}>
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
                </Section>
                <Section label="Section 2" arrow={false}>
                    <Item selected={true}>Item 1</Item>
                    <Item>Item 2</Item>
                    <Item>Item 3</Item>
                </Section>
                <Section label="Section 3" arrow={false}>
                    <Item>Item 1</Item>
                    <Item selected={true}>Item 2</Item>
                    <Item>Item 3</Item>
                </Section>
            </TableView>
        );
    }
}

class Launch extends React.Component {
    render(){
        return (
            <TableView style={{flex:1}}>
                <Section arrow={true}>
                    <Item onPress={Actions.example1}>Example with custom cells</Item>
                    <Item onPress={Actions.example2}>Example with app bundle JSON data</Item>
                    <Item onPress={Actions.example3}>Example with multiple sections</Item>
                </Section>
            </TableView>
        );
    }
}

class TableViewExample extends React.Component {
    render(){
        return (
            <Router>
                <Schema name="default" navBar={NavBar}/>
                <Route name="launch" component={Launch} title="TableView Demo"/>
                <Route name="example1" component={Example1} title="Example 1"/>
                <Route name="example2" component={Example2} title="Example 2"/>
                <Route name="example3" component={Example3} title="Example 3"/>
            </Router>

        );
    }
}

AppRegistry.registerComponent('TableViewExample', () => TableViewExample);
