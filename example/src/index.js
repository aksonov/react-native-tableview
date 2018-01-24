import { AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Home from './screens/Home'
import Example1 from './screens/Example1'
import Example2 from './screens/Example2'
import Example3 from './screens/Example3'
import Example4 from './screens/Example4'
import Example5 from './screens/Example5'
import Example6 from './screens/Example6'
import Example7 from './screens/Example7'

import TableViewExampleCell from './cells/TableViewExampleCell'

const Stack = StackNavigator(
  {
    home: {
      screen: Home,
      navigationOptions: {
        title: 'TableView Examples',
      },
    },
    sections: {
      screen: Example1,
      navigationOptions: {
        title: 'Multiple Sections',
      },
    },
    accessories: {
      screen: Example2,
      navigationOptions: {
        title: 'Accessory Types',
      },
    },
    json: {
      screen: Example3,
      navigationOptions: {
        title: 'Bundled JSON',
      },
    },
    network: {
      screen: Example4,
      navigationOptions: {
        title: 'Large Network Loaded List',
      },
    },
    custom: {
      screen: Example5,
      navigationOptions: {
        title: 'Custom Cells',
      },
    },
    edit: {
      screen: Example6,
      navigationOptions: {
        title: 'Editing Mode',
      },
    },
    refresh: {
      screen: Example7,
      navigationOptions: {
        title: 'Pull to Refresh',
      },
    },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#47A1D7',
      },
      headerTintColor: '#fff',
    },
    initialRouteName: 'home',
  },
)

AppRegistry.registerComponent('TableViewDemo', () => Stack)
AppRegistry.registerComponent('TableViewExampleCell', () => TableViewExampleCell)
