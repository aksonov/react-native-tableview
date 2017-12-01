/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import TableView from 'react-native-tableview'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
})

export default class App extends Component<{}> {
  navigate = ({ label }) => {
    switch (label) {
      case 'Multiple sections': {
        this.props.navigation.navigate('example1')
      }
    }
  }

  render() {
    return (
      <TableView
        style={{ flex: 1 }}
        tableViewStyle={TableView.Consts.Style.Grouped}
        tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
        onPress={this.navigate}
      >
        <TableView.Section arrow>
          <TableView.Item>Multiple sections</TableView.Item>
          <TableView.Item>Custom Cells</TableView.Item>
          <TableView.Item>App bundled JSON data</TableView.Item>
        </TableView.Section>
      </TableView>
    )
  }
}
