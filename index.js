'use strict';
var React = require('react-native');
var {NativeMethodsMixin, ReactNativeViewAttributes, NativeModules, StyleSheet, View,requireNativeComponent} = React;
var RCTTableViewConsts = NativeModules.UIManager.RCTTableView.Constants;

var TABLEVIEW = 'tableview';

function clone(map){
    var el = {};
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
    },

    getInitialState: function() {
        return this._stateFromProps(this.props);
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState(this._stateFromProps(nextProps));
    },

    // Translate TableView prop and children into stuff that RCTTableView understands.
    _stateFromProps: function(props) {
        var sections = [];
        var additionalItems = [];
        var children = [];
        var customCells = false;

        // iterate over sections
        React.Children.forEach(props.children, function (section, index) {
            var items=[];
            var count = 0;
            if (section.type==TableView.Section) {
                React.Children.forEach(section.props.children, function (child, itemIndex) {
                    var el = clone(child.props);

                    if (section.props.arrow) {
                        el.arrow = section.props.arrow;
                    }
                    if (!el.label) {
                        el.label = el.children;
                    }
                    count++;
                    items.push(el);

                    if (child.type==TableView.Cell){
                        customCells = true;
                        count++;
                        var el = React.cloneElement(child, {section: index, row: itemIndex});
                        children.push(el);
                    }

                });
                sections.push({label:section.props.label, items: items, count: count});
            }
            if (section.type==TableView.Item){
                var el = clone(section.props);
                if (!el.label){
                    el.label = el.children;
                }
                additionalItems.push(el);
            }
        });
        return {sections, additionalItems, children, customCells};
    },

    render: function() {
        return (
                <RCTTableView
                    customCells={this.state.customCells}
                    ref={TABLEVIEW}
                    style={this.props.style}
                    sections={this.state.sections}
                    additionalItems={this.state.additionalItems}
                    tableViewStyle={TableView.Consts.Style.Plain}
                    tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
                    {...this.props}
                    onPress={this._onChange}>
                    {this.state.children}
                </RCTTableView>
        );
    },

    _onChange: function(event) {
        if (this.props.onPress) {
            this.props.onPress(event.nativeEvent);
        }
        //if (this.props.onValueChange) {
        //    this.props.onValueChange(event.nativeEvent.newValue);
        //}
        //
        //if (this.state.selectedIndex !== event.nativeEvent.newIndex) {
        //    this.refs[TABLEVIEW].setNativeProps({
        //        selectedIndex: this.state.selectedIndex
        //    });
        //}
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
        return <RCTCellView onLayout={(event)=>{this.setState(event.nativeEvent.layout)}} {...this.props} componentWidth={this.state.width} componentHeight={this.state.height}/>
    },
});
var RCTCellView = requireNativeComponent('RCTCellView', null);

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
        //height: RCTTableViewConsts.ComponentHeight,
    },
});
TableView.Consts = RCTTableViewConsts;

var RCTTableView = requireNativeComponent('RCTTableView', null);

module.exports = TableView;
