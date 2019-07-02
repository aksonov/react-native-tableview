/* eslint-disable no-alert */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TableView from 'react-native-tableview';

const styles = StyleSheet.create({
  title: {
    margin: 20,
    color: '#5FA0D2',
    fontSize: 20,
    textAlign: 'center',
  },
});

const Example3 = () => {
  // list spanish provinces and add 'All states' item at the beginning

  const country = 'ES';

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Showing States in Spain</Text>
      <TableView
        style={{ flex: 1 }}
        json="states"
        selectedValue="ES53"
        filter={`country=='${country}'`}
        tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
        onPress={event => alert(JSON.stringify(event))}
      />
    </View>
  );
};

export default Example3;
