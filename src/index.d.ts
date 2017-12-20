// Type definitions for react-native-tableview
// Project: https://github.com/aksonov/react-native-tableview
// Definitions by: Kyle Roach <https://github.com/iRoachie>
// TypeScript Version: 2.6

import * as React from 'react'

declare module 'react-native-tableview' {
  export interface ConstsModel {
    Style: {
      Plain: number
      Grouped: number
    }
    CellStyle: {
      Default: number
      Value1: number
      Value2: number
      Subtitle: number
    }
    CellEditingStyle: {
      None: number
      Delete: number
      Insert: number
    }
    CellSelectionStyle: {
      None: number
      Blue: number
      Gray: number
      Default: number
    }
    SeparatorStyle: {
      None: number
      Line: number
    }
    AccessoryType: {
      None: number
      DisclosureIndicator: number
      DisclosureButton: number
      Checkmark: number
      DetailButton: number
    }
  }

  class TableView extends React.Component<{}> {}

  namespace TableView {
    const Consts: ConstsModel
  }

  export default TableView
}
