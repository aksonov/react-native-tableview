/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { StatusBar } from 'react-native';
import TableView from 'react-native-tableview';

const { Section, Item } = TableView;

const App = ({ navigation }) => {
  const { navigate } = navigation;

  return (
    <>
      <StatusBar barStyle="light-content" />

      <TableView
        style={{ flex: 1 }}
        tableViewStyle={TableView.Consts.Style.Grouped}
        tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
      >
        <Section arrow>
          <Item onPress={() => navigate('sections')}>Multiple sections</Item>
          <Item onPress={() => navigate('accessories')}>Accessory Types</Item>
          <Item onPress={() => navigate('json')}>App bundled JSON data</Item>
          <Item onPress={() => navigate('network')}>
            Large Network Loaded List
          </Item>
          <Item onPress={() => navigate('custom')}>Custom Cells</Item>
          <Item onPress={() => navigate('edit', { editing: true })}>
            Editing mode
          </Item>
          <Item onPress={() => navigate('refresh')}>Pull to Refresh</Item>
          <Item onPress={() => navigate('index')}>Scroll To Index</Item>
        </Section>
      </TableView>
    </>
  );
};

export default App;
