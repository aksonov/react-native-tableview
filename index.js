import PropTypes from 'prop-types';
import React from 'react';
import {
    ReactNativeViewAttributes,
    NativeModules,
    StyleSheet,
    View,
    requireNativeComponent,
    EdgeInsetsPropType,
    PointPropType,
    findNodeHandle,
} from 'react-native';
var resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');

var RNTableViewConsts = NativeModules.RNTableViewManager.Constants;

function extend(el, map) {
    for (var i in map)
        if (typeof(map[i])!='object')
            el[i] = map[i];
    return el;
}
class TableView extends React.Component {
    static propTypes = {
        onPress: PropTypes.func,
        onAccessoryPress: PropTypes.func,
        onWillDisplayCell: PropTypes.func,
        onEndDisplayingCell: PropTypes.func,
        selectedValue: PropTypes.any, // string or integer basically
        autoFocus: PropTypes.bool,
        autoFocusAnimate: PropTypes.bool,
        alwaysBounceVertical: PropTypes.bool,
        moveWithinSectionOnly: PropTypes.bool,
        json: PropTypes.string,
        textColor: PropTypes.string,
        detailTextColor: PropTypes.string,
        tintColor: PropTypes.string,
        footerLabel: PropTypes.string,
        headerFont: PropTypes.number,
        headerTextColor: PropTypes.string,
        footerTextColor: PropTypes.string,
        separatorColor: PropTypes.string,
        scrollEnabled: PropTypes.bool,
        sectionIndexTitlesEnabled: PropTypes.bool,
        showsHorizontalScrollIndicator: PropTypes.bool,
        showsVerticalScrollIndicator: PropTypes.bool,
        onScroll: PropTypes.func,


        /**
         * The amount by which the content is inset from the edges
         * of the TableView. Defaults to `{0, 0, 0, 0}`.
         * @platform ios
         */
        contentInset: EdgeInsetsPropType,
        /**
         * Used to manually set the starting scroll offset.
         * The default value is `{x: 0, y: 0}`.
         * @platform ios
         */
        contentOffset: PointPropType,
        /**
         * The amount by which the scroll view indicators are inset from the
         * edges of the TableView. This should normally be set to the same
         * value as the `contentInset`. Defaults to `contentInset` or
         * `{0, 0, 0, 0}`.
         * @platform ios
         */
        scrollIndicatorInsets: EdgeInsetsPropType,
        tableViewCellEditingStyle: PropTypes.number,
    };

    static defaultProps = {
        tableViewCellEditingStyle: RNTableViewConsts.CellEditingStyle.Delete,
        autoFocusAnimate: true,
        alwaysBounceVertical: true,
        scrollEnabled: true,
        sectionIndexTitlesEnabled: false,
        showsHorizontalScrollIndicator: true,
        showsVerticalScrollIndicator: true,
    };

    constructor(props) {
        super(props);

        this.state = this._stateFromProps(props);
    }

    componentWillReceiveProps(nextProps) {
        var state = this._stateFromProps(nextProps);
        this.setState(state);
    }

    // Translate TableView prop and children into stuff that RNTableView understands.
    _stateFromProps(props) {
        var sections = [];
        var additionalItems = [];
        var children = [];
        var json = props.json;

        // iterate over sections
        React.Children.forEach(props.children, function (section, index) {
            var items=[];
            var count = 0;
            if (section && section.type==TableViewSection) {
                let customCells = false;
                React.Children.forEach(section.props.children, function (child, itemIndex) {
                    var el = {};
                    extend(el, section.props);
                    extend(el, child.props);
                    if (el.children) {
                        el.label = el.children;
                    }

                    if (el.image && typeof el.image === 'number') {
                        el.image = resolveAssetSource(el.image);
                    }

                    count++;
                    items.push(el);

                    if (child.type==TableViewCell){
                        customCells = true;
                        count++;
                        var element = React.cloneElement(child, {key: index+" "+itemIndex, section: index, row: itemIndex});
                        children.push(element);
                    }

                });
                sections.push({
                    customCells,
                    label: section.props.label,
                    footerLabel: section.props.footerLabel,
                    footerHeight: section.props.footerHeight,
                    headerHeight: section.props.headerHeight,
                    items: items,
                    count: count
                });
            } else if (section && section.type==TableViewItem){
                var el = extend({},section.props);
                if (!el.label){
                    el.label = el.children;
                }
                additionalItems.push(el);
            } else if (section){
                children.push(section);
            }
        });
        this.sections = sections;
        return {sections, additionalItems, children, json};
    }

    scrollTo(x, y, animated) {
      NativeModules.RNTableViewManager.scrollTo(
        findNodeHandle(this.tableView),
        x,
        y,
        animated
      );
    }

    render() {
        return (
            <View style={[{flex:1},this.props.style]}>
                <RNTableView
                    ref={(ref) => { this.tableView = ref; }}
                    style={this.props.style}
                    sections={this.state.sections}
                    additionalItems={this.state.additionalItems}
                    tableViewStyle={RNTableViewConsts.Style.Plain}
                    tableViewCellStyle={RNTableViewConsts.CellStyle.Subtitle}
                    tableViewCellEditingStyle={this.props.tableViewCellEditingStyle}
                    separatorStyle={RNTableViewConsts.SeparatorStyle.Line}
                    scrollIndicatorInsets={this.props.contentInset}
                    alwaysBounceVertical={this.props.alwaysBounceVertical}
                    {...this.props}
                    json={this.state.json}
                    onScroll={(...args) => this._onScroll(...args)}
                    onPress={(...args) => this._onPress(...args)}
                    onAccessoryPress={(...args) => this._onAccessoryPress(...args)}
                    onChange={(...args) => this._onChange(...args)}
                    onWillDisplayCell={(...args) => this._onWillDisplayCell(...args)}
                    onEndDisplayingCell={(...args) => this._onEndDisplayingCell(...args)}>
                    {this.state.children}
                </RNTableView>
            </View>
        );
    }

    _onScroll(event) {
        if (this.props.onScroll) {
            this.props.onScroll(event);
        }
    }
    _onPress(event) {
        var data = event.nativeEvent;
        if (this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.selectedIndex] &&
            this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.selectedIndex].onPress){
            this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.selectedIndex].onPress(data);
        }
        if (this.props.onPress) {
            this.props.onPress(data);
        }
        event.stopPropagation();
    }
    _onAccessoryPress(event) {
        console.log('_onAccessoryPress', event);
        var data = event.nativeEvent;
        if (this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.accessoryIndex] &&
            this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.accessoryIndex].onAccessoryPress){
            this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.accessoryIndex].onAccessoryPress(data);
        }
        if (this.props.onAccessoryPress) {
            this.props.onAccessoryPress(data);
        }
        event.stopPropagation();
    }
    _onChange(event) {
        var data = event.nativeEvent;
        if (this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.selectedIndex] &&
            this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.selectedIndex].onChange){
            this.sections[data.selectedSection] && this.sections[data.selectedSection].items[data.selectedIndex].onChange(data);
        }
        if (this.props.onChange) {
            this.props.onChange(data);
        }
        event.stopPropagation();
    }
    _onWillDisplayCell(event) {
        var data = event.nativeEvent;
        if (this.sections[data.section] && this.sections[data.section].items[data.row] && this.sections[data.section].items[data.row].onWillDisplayCell) {
            this.sections[data.section].items[data.row].onWillDisplayCell(data);
        }
        if (this.props.onWillDisplayCell) {
            this.props.onWillDisplayCell(data);
        }
        event.stopPropagation();
    }
    _onEndDisplayingCell(event) {
        var data = event.nativeEvent;
        if (this.sections[data.section] && this.sections[data.section].items[data.row] && this.sections[data.section].items[data.row].onEndDisplayingCell) {
            this.sections[data.section].items[data.row].onEndDisplayingCell(data);
        }
        if (this.props.onEndDisplayingCell) {
            this.props.onEndDisplayingCell(data);
        }
        event.stopPropagation();
    }
}

class TableViewItem extends React.Component {
    static propTypes = {
        value: PropTypes.any, // string or integer basically
        label: PropTypes.string,
    }

    render() {
        // These items don't get rendered directly.
        return null;
    }
}

TableView.Item = TableViewItem;

class TableViewFooter extends React.Component {
    constructor(props){
        super(props);
        this.state = {width:0, height:0};
    }
    render() {
        return <RNFooterView onLayout={(event)=>{this.setState(event.nativeEvent.layout)}} {...this.props} componentWidth={this.state.width} componentHeight={this.state.height}/>
    }
}
var RNFooterView = requireNativeComponent('RNTableFooterView', null);
TableView.Footer = TableViewFooter;

class TableViewHeader extends React.Component {
    constructor(props){
        super(props);

        this.state = {width:0, height:0};
    }

    render() {
        return <RNHeaderView onLayout={(event)=>{this.setState(event.nativeEvent.layout)}} {...this.props} componentWidth={this.state.width} componentHeight={this.state.height}/>
    }
};
var RNHeaderView = requireNativeComponent('RNTableHeaderView', null);
TableView.Header = TableViewHeader;

class TableViewCell extends React.Component {
    constructor(props){
        super(props);

        this.state = {width:0, height:0};
    }
    render() {
        return <RNCellView onLayout={(event)=>{this.setState(event.nativeEvent.layout)}} {...this.props} componentWidth={this.state.width} componentHeight={this.state.height}/>
    }
};
var RNCellView = requireNativeComponent('RNCellView', null);
TableView.Cell = TableViewCell;

class TableViewSection extends React.Component {
    static propTypes = {
        label: PropTypes.string,
        footerLabel: PropTypes.string,
        arrow: PropTypes.bool,
        footerHeight: PropTypes.number,
        headerHeight: PropTypes.number,

    }

    render() {
        // These items don't get rendered directly.
        return null;
    }
};
TableView.Section = TableViewSection;

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

export default TableView;
