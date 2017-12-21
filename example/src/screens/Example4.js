import React from 'react'
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native'
import TableView from 'react-native-tableview'

const { Section, Item } = TableView

const styles = StyleSheet.create({
  title: {
    margin: 20,
    color: '#5FA0D2',
    fontSize: 20,
    textAlign: 'center',
  },
})

class Example4 extends React.Component {
  state = {
    loading: true,
    users: [],
  }

  async componentWillMount() {
    const response = await fetch('https://randomuser.me/api/?results=5000')
    const data = await response.json()

    this.setState({
      loading: false,
      users: data.results.map(a => ({
        name: `${a.name.first} ${a.name.last}`,
        id: a.registered,
      })),
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>
          {this.state.loading ? 'Fetching' : 'Fetched'} 5000 users
        </Text>

        {this.state.loading && <ActivityIndicator />}

        <TableView
          style={{ flex: 1 }}
          tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
        >
          <Section>
            {this.state.users.map(a => <Item key={a.id}>{a.name}</Item>)}
          </Section>
        </TableView>
      </View>
    )
  }
}

export default Example4
