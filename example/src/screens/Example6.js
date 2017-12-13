/* eslint-disable react/forbid-prop-types */

import React from 'react'
import PropTypes from 'prop-types'
import { View, Button } from 'react-native'
import TableView from 'react-native-tableview'

const { Item, Section } = TableView

class Example6 extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <Button
        title={navigation.state.params.editing ? 'Cancel' : 'Edit'}
        color="white"
        onPress={() =>
          navigation.setParams({ editing: !navigation.state.params.editing })
        }
      />
    ),
  })

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TableView
          style={{ flex: 1 }}
          editing={this.props.navigation.state.params.editing}
          onPress={event => alert(JSON.stringify(event))}
          onChange={event => alert(`CHANGED:${JSON.stringify(event)}`)}
        >
          <Section canMove canEdit>
            <Item canEdit={false}>Item 1</Item>
            <Item>Item 2</Item>
            <Item>Item 3</Item>
            <Item>Item 4</Item>
            <Item>Item 5</Item>
            <Item>Item 6</Item>
            <Item>Item 7</Item>
            <Item>Item 8</Item>
          </Section>
        </TableView>
      </View>
    )
  }
}

Example6.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default Example6
