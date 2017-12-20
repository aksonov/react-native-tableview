// Type definitions for react-native-tableview
// Project: https://github.com/aksonov/react-native-tableview
// Definitions by: Kyle Roach <https://github.com/iRoachie>
// TypeScript Version: 2.6

import * as React from 'react'

declare module 'react-native-tableview' {
  export interface Constants {
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

  interface SectionProps {
    /**
     * Show the DisclosureIndicator accessory type
     */
    arrow?: boolean

    /**
     * Title for header
     */
    label?: string

    /**
     * Title for header
     */
    footerLabel?: string

    /**
     * Height of header
     */
    headerHeight?: number

    /**
     * Height of footer
     */
    footerHeight?: number
  }

  class TableView extends React.Component<{}> {}

  namespace TableView {
    const Consts: Constants
    class Section extends React.Component<SectionProps> {}
  }

  export default TableView
}
