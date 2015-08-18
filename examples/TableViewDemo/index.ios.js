'use strict';

var React = require('react-native');
var { AppRegistry } = React;
var TableView = require('react-native-tableview');
var Section = TableView.Section;
var Item = TableView.Item;

class TableViewExample extends React.Component {
    render(){
        return (
            <TableView selectedValue="ES" style={{flex:1}} json="countries"
                       tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
                       onPress={(event) => console.log(event.nativeEvent)}/>
        );
    }
    render2(){
        return (
            <TableView style={{flex:1}}
                       tableViewStyle={TableView.Consts.Style.Grouped}
                       tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
                       onPress={(event) => console.log(event.nativeEvent)}>
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
                    <Item>Item 20</Item>
                    <Item>Item 21</Item>
                    <Item>Item 22</Item>
                    <Item>Item 23</Item>
                    <Item>Item 24</Item>
                    <Item>Item 25</Item>
                    <Item>Item 26</Item>
                    <Item>Item 27</Item>
                    <Item>Item 28</Item>
                    <Item>Item 29</Item>
                    <Item>Item 30</Item>
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
