import { AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation'
import Home from './screens/Home'
import Example1 from './screens/Example1'
import Example2 from './screens/Example2'
import Example4 from './screens/Example4'

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
      screen: Example4,
      navigationOptions: {
        title: 'Bundled JSON',
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
