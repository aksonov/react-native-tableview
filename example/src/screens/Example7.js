import React, { useReducer, useEffect } from 'react';
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

function reducer(state, action) {
  switch (action.type) {
    case 'getUsers':
      return { ...state, loading: false, users: action.payload };
    case 'startRefresh':
      return { ...state, refreshing: true };
    case 'endRefresh':
      return {
        ...state,
        refreshing: false,
        amount: state.amount + 10,
        users: [...state.users, ...action.payload],
      };
    default:
      return state;
  }
}

const Example7 = () => {
  const [{ loading, amount, refreshing, users }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      users: [],
      refreshing: false,
      amount: 10,
    }
  );

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers();
      dispatch({ type: 'getUsers', payload: data });
    };

    getUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('https://randomuser.me/api/?results=10');
    const data = await response.json();

    return data.results.map(a => ({
      name: `${a.name.first} ${a.name.last}`,
      id: a.login.uuid,
    }));
  };

  const fetchMore = async () => {
    dispatch({ type: 'startRefresh' });
    const data = await fetchUsers();
    dispatch({ type: 'endRefresh', payload: data });
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>
        {loading ? 'Fetching' : 'Fetched'} {amount} users
      </Text>

      {loading && <ActivityIndicator />}

      <TableView
        style={{ flex: 1 }}
        tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
        canRefresh
        refreshing={refreshing}
        onRefresh={fetchMore}
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

export default Example7;
