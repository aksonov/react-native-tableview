import React from 'react';
import { Button, View } from 'react-native';
import TableView from 'react-native-tableview';

const { Section, Item } = TableView;

const Example8 = () => {
  const tableView = React.createRef();

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Scroll To Section 2"
        onPress={() =>
          tableView.current.scrollToIndex({ index: 2, section: 1 })
        }
      />

      <TableView
        style={{ flex: 1 }}
        allowsToggle
        ref={tableView}
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
          <Item>Item 4</Item>
          <Item>Item 5</Item>
          <Item>Item 6</Item>
          <Item>Item 7</Item>
          <Item>Item 8</Item>
          <Item>Item 9</Item>
          <Item>Item 10</Item>
        </Section>
      </TableView>
    </View>
  );
};

export default Example8;
