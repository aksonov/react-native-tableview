import PropTypes from 'prop-types'

const TableViewSection = () =>
  // These items don't get rendered directly.
  null

TableViewSection.propTypes = {
  label: PropTypes.string,
  footerLabel: PropTypes.string,
  arrow: PropTypes.bool,
  footerHeight: PropTypes.number,
  headerHeight: PropTypes.number,
}

export default TableViewSection
