import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

const TableViewExampleCell = props => {
  const style = {
    borderColor: '#aaaaaa',
    borderWidth: 1,
    borderRadius: 3,
    flex: 1,
  };

  if (props.data.backgroundColor !== undefined) {
    style.backgroundColor = props.data.backgroundColor;
  }

  return (
    <View style={style}>
      <Text>
        section:{props.section},row:{props.row},label:{props.data.label}
      </Text>
    </View>
  );
};

TableViewExampleCell.propTypes = {
  data: PropTypes.object,
  section: PropTypes.number,
  row: PropTypes.number,
};

TableViewExampleCell.defaultProps = {
  data: null,
  section: null,
  row: null,
};

export default TableViewExampleCell;
