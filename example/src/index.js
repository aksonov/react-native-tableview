import { AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Home from './screens/Home'
import Example1 from './screens/Example1'

const Stack = StackNavigator(
  {
    home: {
      screen: Home,
      navigationOptions: {
        title: 'TableView Examples'
      }
    },
    example1: {
      screen: Example1,
      navigationOptions: {
        title: 'Multiple Sections'
      }
    }
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#47A1D7'
      },
      headerTintColor: '#fff'
    }
  }
)

AppRegistry.registerComponent('TableViewDemo', () => Stack)
