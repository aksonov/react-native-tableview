/* eslint-disable no-alert */
import React from 'react';
import TableView from 'react-native-tableview';

const { Item, Section } = TableView;

const Example5 = () => (
  // list spanish provinces and add 'All states' item at the beginning

  <TableView
    reactModuleForCell="TableViewExampleCell"
    style={{ flex: 1 }}
    allowsToggle
    allowsMultipleSelection
    tableViewStyle={TableView.Consts.Style.Grouped}
    onPress={event => alert(JSON.stringify(event))}
  >
    <Section label="Section 1" arrow>
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
      <Item backgroundColor="gray" height={44}>
        Item 4
      </Item>
      <Item>Item 5</Item>
      <Item>Item 6</Item>
      <Item>Item 7</Item>
      <Item>Item 8</Item>
      <Item>Item 9</Item>
      <Item backgroundColor="red" height={200}>
        Item 10
      </Item>
      <Item>Item 11</Item>
      <Item>Item 12</Item>
      <Item>Item 13</Item>
      <Item>Item 14</Item>
      <Item>Item 15</Item>
      <Item>Item 16</Item>
    </Section>
    <Section label="Section 2" arrow={false}>
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </Section>
    <Section label="Section 3" arrow>
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </Section>
  </TableView>
);

export default Example5;
