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

class Example7 extends React.Component {
  state = {
    loading: true,
    users: [],
    refreshing: false,
    amount: 10,
  }

  async componentWillMount() {
    const users = await this.fetchUsers()

    this.setState({
      loading: false,
      users,
    })
  }

  fetchUsers = async () => {
    const response = await fetch('https://randomuser.me/api/?results=10')
    const data = await response.json()

    return data.results.map(a => ({
      name: `${a.name.first} ${a.name.last}`,
      id: a.registered,
    }))
  }

  fetchMore = () => {
    this.setState({ refreshing: true }, async () => {
      const users = await this.fetchUsers()
      this.setState({ users: [...users, ...this.state.users], refreshing: false, amount: this.state.amount + 10 })
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>
          {this.state.loading ? 'Fetching' : 'Fetched'} {this.state.amount} users
        </Text>

        {this.state.loading && <ActivityIndicator />}

        <TableView
          style={{ flex: 1 }}
          tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
          canRefresh
          refreshing={this.state.refreshing}
          onRefresh={this.fetchMore}
        >
          <Section>{this.state.users.map(a => <Item key={a.id}>{a.name}</Item>)}</Section>
        </TableView>
      </View>
    )
  }
}

export default Example7
