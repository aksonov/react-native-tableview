'use strict';
var React = require('react-native');
var {NativeMethodsMixin, ReactNativeViewAttributes, NativeModules, StyleSheet, View,requireNativeComponent} = React;
var RNTableViewConsts = NativeModules.UIManager.RNTableView.Constants;

var TABLEVIEW = 'tableview';

function extend(el, map) {
    for (var i in map)
        if (typeof(map[i])!='object')
            el[i] = map[i];
    return el;
}
var TableView = React.createClass({
    mixins: [NativeMethodsMixin],

    propTypes: {
        onPress: React.PropTypes.func,
        selectedValue: React.PropTypes.any, // string or integer basically
        autoFocus: React.PropTypes.bool,
        json: React.PropTypes.string,
        textColor: React.PropTypes.string,
        tintColor: React.PropTypes.string
    },

    getInitialState: function() {
        return this._stateFromProps(this.props);
    },

    componentWillReceiveProps: function(nextProps) {
        var state = this._stateFromProps(nextProps);
        this.setState(state);
    },

    // Translate TableView prop and children into stuff that RNTableView understands.
    _stateFromProps: function(props) {
        var sections = [];
        var additionalItems = [];
        var children = [];
        var customCells = false;
        var json = props.json;

        // iterate over sections
        React.Children.forEach(props.children, function (section, index) {
            var items=[];
            var count = 0;
            if (section && section.type==TableView.Section) {
                React.Children.forEach(section.props.children, function (child, itemIndex) {
                    var el = {};
                    extend(el, section.props);
                    extend(el, child.props);
                    if (el.children) {
                        el.label = el.children;
                    }
                    count++;
                    items.push(el);

                    if (child.type==TableView.Cell){
                        customCells = true;
                        count++;
                        var element = React.cloneElement(child, {key: index+" "+itemIndex, section: index, row: itemIndex});
                        children.push(element);
                    }

                });
                sections.push({
                    label: section.props.label,
                    footerLabel: section.props.footerLabel,
                    items: items,
                    count: count
                });
            }
            if (section && section.type==TableView.Item){
                var el = extend({},section.props);
                if (!el.label){
                    el.label = el.children;
                }
                additionalItems.push(el);
            }
        });
        this.sections = sections;
        return {sections, additionalItems, children, customCells, json};
    },

    render: function() {
        return (
            <View style={[{flex:1},this.props.style]}>
                <RNTableView
                    customCells={this.state.customCells}
                    ref={TABLEVIEW}
                    style={this.props.style}
                    sections={this.state.sections}
                    additionalItems={this.state.additionalItems}
                    tableViewStyle={TableView.Consts.Style.Plain}
                    tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
                    {...this.props}
                    json={this.state.json}
                    onPress={this._onPress}
                    onChange={this._onChange}>

                    {this.state.children}
                </RNTableView>
            </View>
        );
    },

    _onPress: function(event) {
        var data = event.nativeEvent;
        if (this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.selectedIndex] &&
            this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.selectedIndex].onPress){
            this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.selectedIndex].onPress(data);
        }
        if (this.props.onPress) {
            this.props.onPress(data);
        }
    },
    _onChange: function(event) {
        var data = event.nativeEvent;
        if (this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.selectedIndex] &&
            this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.selectedIndex].onChange){
            this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.selectedIndex].onChange(data);
        }
        if (this.props.onChange) {
            this.props.onChange(data);
        }
    },
});

TableView.Item = React.createClass({
    propTypes: {
        value: React.PropTypes.any, // string or integer basically
        label: React.PropTypes.string,
    },

    render: function() {
        // These items don't get rendered directly.
        return null;
    },
});

TableView.Cell = React.createClass({
    getInitialState(){
        return {width:0, height:0}
    },
    render: function() {
        return <RNCellView onLayout={(event)=>{this.setState(event.nativeEvent.layout)}} {...this.props} componentWidth={this.state.width} componentHeight={this.state.height}/>
    },
});
var RNCellView = requireNativeComponent('RNCellView', null);

TableView.Section = React.createClass({
    propTypes: {
        label: React.PropTypes.string,
    },

    render: function() {
        // These items don't get rendered directly.
        return null;
    },
});

var styles = StyleSheet.create({
    tableView: {
        // The picker will conform to whatever width is given, but we do
        // have to set the component's height explicitly on the
        // surrounding view to ensure it gets rendered.
        //height: RNTableViewConsts.ComponentHeight,
    },
});
TableView.Consts = RNTableViewConsts;

var RNTableView = requireNativeComponent('RNTableView', null);

module.exports = TableView;
