import React from 'react';
import { requireNativeComponent } from 'react-native';

const RNFooterView = requireNativeComponent('RNTableFooterView', null);

export default class TableViewFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
  }

  render() {
    return (
      <RNFooterView
        onLayout={event => {
          this.setState(event.nativeEvent.layout);
        }}
        {...this.props}
        componentWidth={this.state.width}
        componentHeight={this.state.height}
      />
    );
  }
}
