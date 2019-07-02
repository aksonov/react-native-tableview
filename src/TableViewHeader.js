import React from 'react';
import { requireNativeComponent } from 'react-native';

const RNHeaderView = requireNativeComponent('RNTableHeaderView', null);

export default class TableViewHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = { width: 0, height: 0 };
  }

  render() {
    return (
      <RNHeaderView
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
