import React from 'react';
import PropTypes from 'prop-types';

class TableViewSection extends React.Component {
  render() {
    // These items don't get rendered directly.
    return null;
  }
}

TableViewSection.propTypes = {
  label: PropTypes.string,
  footerLabel: PropTypes.string,
  arrow: PropTypes.bool,
  footerHeight: PropTypes.number,
  headerHeight: PropTypes.number,
};

export default TableViewSection;
