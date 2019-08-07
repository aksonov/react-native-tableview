/* eslint-disable no-alert */
import React from 'react';
import PropTypes from 'prop-types';
import { View, Button } from 'react-native';
import TableView from 'react-native-tableview';

const { Item, Section, Consts } = TableView;

const Example6 = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <TableView
        style={{ flex: 1 }}
        editing={navigation.getParam('editing')}
        onPress={event => alert(JSON.stringify(event))}
        onChange={event => alert(`CHANGED:${JSON.stringify(event)}`)}
      >
        <Section canMove canEdit>
          <Item canEdit={false}>Item 1</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
          <Item>Item 4</Item>
        </Section>
      </TableView>
      <TableView
        style={{ flex: 1 }}
        editing={navigation.getParam('editing')}
        tableViewCellEditingStyle={Consts.CellEditingStyle.Insert}
        onPress={event => alert(JSON.stringify(event))}
        onChange={event => alert(`CHANGED:${JSON.stringify(event)}`)}
      >
        <Section canMove canEdit>
          <Item canEdit={false}>Item 1</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
          <Item>Item 4</Item>
        </Section>
      </TableView>
    </View>
  );
};

Example6.navigationOptions = ({ navigation }) => {
  const editing = navigation.getParam('editing');

  return {
    headerRight: (
      <Button
        title={editing ? 'Cancel' : 'Edit'}
        color="white"
        onPress={() => navigation.setParams({ editing: !editing })}
      />
    ),
  };
};

Example6.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Example6;
