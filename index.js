'use strict';
var NativeMethodsMixin = require('NativeMethodsMixin');
var React = require('React');
var ReactChildren = require('ReactChildren');
var ReactNativeViewAttributes = require('ReactNativeViewAttributes');
var RCTTableViewConsts = require('NativeModules').UIManager.RCTTableView.Constants;
var StyleSheet = require('StyleSheet');
var View = require('View');

var requireNativeComponent = require('requireNativeComponent');
var merge = require('merge');

var TABLEVIEW = 'tableview';

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
        var selectedSection = props.selectedSection || 0;

        // iterate over sections
        ReactChildren.forEach(props.children, function (section, index) {
            var items=[];
            ReactChildren.forEach(section.props.children, function(child, itemIndex){
                if (child.props.selected) {
                    console.log("SELCTED "+itemIndex+" "+index);
                    selectedIndex = itemIndex;
                    selectedSection = index;
                }
                items.push({value: child.props.value, label: child.props.children, detail:child.props.detail,
                    selected: child.props.selected, arrow:section.props.arrow | child.props.arrow});
            });
            sections.push({label:section.props.label, items: items});
        });
        return {selectedIndex, selectedSection, sections};
    },

    render: function() {
        return (
                <RCTTableView
                    ref={TABLEVIEW}
                    style={this.props.style}
                    sections={this.state.sections}
                    selectedIndex={this.state.selectedIndex}
                    selectedSection={this.state.selectedSection}
                    onPress={this._onChange}
                    tableViewStyle={this.props.tableViewStyle || TableView.Consts.Style.Plain}
                    tableViewCellStyle={this.props.tableViewCellStyle || TableView.Consts.CellStyle.Subtitle}
                    />
        );
    },

    _onChange: function(event) {
        console.log("onPress!");
        if (this.props.onPress) {
            this.props.onPress(event);
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
