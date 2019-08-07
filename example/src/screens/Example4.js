import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import TableView from 'react-native-tableview';

const { Section, Item } = TableView;

const styles = StyleSheet.create({
  title: {
    margin: 20,
    color: '#5FA0D2',
    fontSize: 20,
    textAlign: 'center',
  },
});

const Example4 = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch('https://randomuser.me/api/?results=5000');
      const data = await response.json();

      setLoading(false);
      setUsers(
        data.results.map(a => ({
          name: `${a.name.first} ${a.name.last}`,
          id: a.registered,
        }))
      );
    };

    getUsers();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>
        {loading ? 'Fetching' : 'Fetched'} 5000 users
      </Text>

      {loading && <ActivityIndicator />}

      <TableView
        style={{ flex: 1 }}
        tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
      >
        <Section>
          {users.map(a => (
            <Item key={a.id}>{a.name}</Item>
          ))}
        </Section>
      </TableView>
    </View>
  );
};

export default Example4;
