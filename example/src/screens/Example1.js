import React from 'react';
import TableView from 'react-native-tableview';

const { Section, Item } = TableView;

const Example1 = () => (
  <TableView
    style={{ flex: 1 }}
    allowsToggle
    allowsMultipleSelection
    tableViewStyle={TableView.Consts.Style.Grouped}
    tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
    onPress={event => console.log(event)}
  >
    <Section label="Section 1" arrow>
      <Item value="1" detail="Detail1">
        Item 1
      </Item>
      <Item value="2">Item 2</Item>
      <Item>Item 3</Item>
    </Section>

    <Section label="Section 2" arrow={false}>
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </Section>

    <Section label="Section 3" arrow={false}>
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </Section>
  </TableView>
);

export default Example1;
