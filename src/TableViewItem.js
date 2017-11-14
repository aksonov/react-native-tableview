import PropTypes from 'prop-types'

const TableViewItem = () =>
  // These items don't get rendered directly.
  null

TableViewItem.propTypes = {
  value: PropTypes.any, // string or integer basically
  label: PropTypes.string,
}
