/* eslint-disable no-alert */
import React from 'react';
import TableView from 'react-native-tableview';

const { Section, Item } = TableView;
const {
  DisclosureIndicator,
  DisclosureButton,
  Checkmark,
  DetailButton,
} = TableView.Consts.AccessoryType;

const Example2 = () => (
  <TableView
    style={{ flex: 1 }}
    tableViewStyle={TableView.Consts.Style.Plain}
    onPress={({ label }) => alert(label)}
    onAccessoryPress={() => {}}
  >
    <Section>
      <Item>No accessory</Item>
      <Item accessoryType={DisclosureIndicator}>I have an arrow</Item>
      <Item
        accessoryType={DisclosureButton}
        onAccessoryPress={() => alert('You Pressed my button')}
      >
        I have an arrow and a button
      </Item>
      <Item accessoryType={Checkmark}>I have a checkmark</Item>
      <Item
        accessoryType={DetailButton}
        onAccessoryPress={() => alert('You Pressed my button')}
      >
        I have a button
      </Item>
    </Section>
  </TableView>
);

export default Example2;
