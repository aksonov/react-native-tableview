/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import type { NavigationScreenConfigProps } from 'react-navigation'
import TableView from 'react-native-tableview'

const { Section, Item } = TableView

const App = ({ navigation }: NavigationScreenConfigProps) => {
  const { navigate } = navigation

  return (
    <TableView
      style={{ flex: 1 }}
      tableViewStyle={TableView.Consts.Style.Grouped}
      tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
    >
      <Section arrow>
        <Item onPress={() => navigate('sections')}>Multiple sections</Item>
        <Item onPress={() => navigate('accessories')}>Accessory Types</Item>
        <Item onPress={() => navigate('json')}>App bundled JSON data</Item>
        <Item onPress={() => navigate('network')}>Large Network Loaded List</Item>
        <Item onPress={() => navigate('custom')}>Custom Cells</Item>
        <Item onPress={() => navigate('edit', { editing: true })}>Editing mode</Item>
        <Item onPress={() => navigate('refresh')}>Pull to Refresh</Item>
      </Section>
    </TableView>
  )
}

export default App
