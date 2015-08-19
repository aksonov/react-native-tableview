'use strict';
var React = require('react-native');
var {NativeMethodsMixin, ReactNativeViewAttributes, NativeModules, StyleSheet, View,requireNativeComponent} = React;
var RCTTableViewConsts = NativeModules.UIManager.RCTTableView.Constants;

var TABLEVIEW = 'tableview';

function clone(map){
    var el = {};
    for (var i in map)
        el[i] = map[i];
    return el;
}
var TableView = React.createClass({
    mixins: [NativeMethodsMixin],

    propTypes: {
        onValueChange: React.PropTypes.func,
        selectedValue: React.PropTypes.any, // string or integer basically
        selectedSection: React.PropTypes.number
    },

    getInitialState: function() {
        return this._stateFromProps(this.props);
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState(this._stateFromProps(nextProps));
    },

    // Translate TableView prop and children into stuff that RCTTableView understands.
    _stateFromProps: function(props) {
        var selectedIndex = -1;
        var sections = [];
        var additionalItems = [];
        var selectedSection = props.selectedSection || 0;

        // iterate over sections
        React.Children.forEach(props.children, function (section, index) {
            var items=[];
            if (section.type==TableView.Section) {
                React.Children.forEach(section.props.children, function (child, itemIndex) {
                    if (child.props.selected || props.selectedValue == child.props.value) {
                        selectedIndex = itemIndex;
                        selectedSection = index;
                    }
                    var el = clone(child.props);

                    if (section.props.arrow){
                        el.arrow = section.props.arrow;
                    }
                    if (!el.label){
                        el.label = el.children;
                    }
                    items.push(el);
                });
                sections.push({label:section.props.label, items: items});
            }
            if (section.type==TableView.Item){
                var el = clone(section.props);
                if (!el.label){
                    el.label = el.children;
                }
                additionalItems.push(el);
            }
        });
        return {selectedIndex, selectedSection, sections, additionalItems};
    },

    render: function() {
        return (
                <RCTTableView
                    ref={TABLEVIEW}
                    style={this.props.style}
                    sections={this.state.sections}
                    selectedIndex={this.state.selectedIndex}
                    selectedSection={this.state.selectedSection}
                    additionalItems={this.state.additionalItems}
                    tableViewStyle={TableView.Consts.Style.Plain}
                    tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
                    {...this.props}
                    onPress={this._onChange}
                    />
        );
    },

    _onChange: function(event) {
        console.log("_ONCHANGE:")
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
