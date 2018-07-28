/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import RNTableViewConsts from './TableViewConsts'

const TableViewItem = () => null

TableViewItem.propTypes = {
  value: PropTypes.any, // string or integer basically
  label: PropTypes.string,
  selected: PropTypes.bool,
  detail: PropTypes.string,
  accessoryType: PropTypes.number,
  cellStyle: PropTypes.number,
  cellEditingStyle: PropTypes.number
}

export default TableViewItem
