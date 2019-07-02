import React from 'react';
import { requireNativeComponent } from 'react-native';

const RNCellView = requireNativeComponent('RNCellView', null);

export default class TableViewCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = { width: 0, height: 0 };
  }
  render() {
    return (
      <RNCellView
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
