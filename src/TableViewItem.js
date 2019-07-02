import React from 'react';
import PropTypes from 'prop-types';

class TableViewItem extends React.Component {
  render() {
    // These items don't get rendered directly.
    return null;
  }
}

TableViewItem.propTypes = {
  value: PropTypes.any, // string or integer basically
  label: PropTypes.string,
  selected: PropTypes.bool,
  detail: PropTypes.string,
  accessoryType: PropTypes.number,
};

export default TableViewItem;
