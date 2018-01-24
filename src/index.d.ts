// Type definitions for react-native-tableview
// Project: https://github.com/aksonov/react-native-tableview
// Definitions by: Kyle Roach <https://github.com/iRoachie>
// TypeScript Version: 2.6

import * as React from 'react'
import { ViewStyle, EdgeInsetsPropType, PointPropType, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'

type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'bold' | 'normal'

type FontStyle = 'italic' | 'normal' | 'oblique'

interface CallBack {
  cancelBubble: boolean
  target: number
}

interface AccessoryCallBack extends CallBack {
  accessoryIndex: number
  accessorySection: number
  accessoryType: number
  children: string
  footerLabel?: string
  label?: string
}

interface DisplayCallBack extends CallBack {
  row: number
  section: number
}

interface OnPressCallBack extends CallBack {
  children: string
  selectedIndex: number
  selectedSection: number
  footerLabel?: string
  label?: string
}

interface OnChangeCallBack extends CallBack {
  sourceIndex: number
  sourceSection: number
  destinationIndex?: number
  destinationSection?: number
  mode: 'move' | 'delete'
  canMove?: boolean
  canEdit?: boolean
  children?: string
  label?: string
}

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

export enum AccessoryType {
  None = 0,
  DisclosureIndicator,
  DisclosureButton,
  Checkmark,
  DetailButton,
}

export enum TableViewStyle {
  Plain = 0,
  Grouped,
}

export enum TableViewCellStyle {
  Default = 0,
  Value1,
  Value2,
  Subtitle,
}

export enum CellEditingStyle {
  None = 0,
  Delete,
  Insert,
}

export enum SeparatorStyle {
  None = 0,
  Line,
}

interface SectionProps {
  /**
   * Show the DisclosureIndicator accessory type
   */
  arrow?: boolean

  /**
   * If cell is allowed to be dragged in editing mode
   */
  canMove?: boolean

  /**
   * If cell can be deleted in editing mode
   */
  canEdit?: boolean

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

interface ItemProps {
  /**
   * This value will be returned on event callbacks
   */
  value?: string | number

  /**
   * Show the Checkmark accessory type
   */
  selected?: boolean

  /**
   * Detail text to show
   */
  detail?: string

  /**
   * Accessory type
   */
  accessoryType?: AccessoryType

  /**
   * If cell is allowed to be dragged in editing mode
   */
  canMove?: boolean

  /**
   * If cell can be deleted in editing mode
   */
  canEdit?: boolean

  /**
   * Callback fired on pressing an accessory
   */
  onAccessoryPress?(event: AccessoryCallBack): void

  /**
   * Callback fired on pressing an item
   */
  onPress?(event: OnPressCallBack): void
}

interface TableViewProps {
  style?: ViewStyle
  tableViewStyle?: TableViewStyle
  tableViewCellStyle?: TableViewCellStyle
  tableViewCellEditingStyle?: CellEditingStyle
  separatorStyle?: SeparatorStyle
  editing?: boolean
  autoFocusAnimate?: boolean
  autoFocus?: boolean
  alwaysBounceVertical?: boolean
  scrollEnabled?: boolean
  allowsToggle?: boolean
  allowsMultipleSelection?: boolean
  sectionIndexTitlesEnabled?: boolean
  showsHorizontalScrollIndicator?: boolean
  showsVerticalScrollIndicator?: boolean
  moveWithinSectionOnly?: boolean
  /**
   * If the tableview can pull to refresh
   */
  canRefresh?: boolean

  /**
   * Current refreshing status.
   *
   * Used to hide or show the loading indicator while refreshing
   */
  refreshing?: boolean
  selectedValue?: string | number
  json?: string
  filter?: string
  contentInset?: EdgeInsetsPropType
  contentOffset?: PointPropType
  scrollIndicatorInsets?: EdgeInsetsPropType
  textColor?: string
  detailTextColor?: string
  tintColor?: string
  headerTextColor?: string
  footerTextColor?: string
  separatorColor?: string
  fontSize?: number
  fontWeight?: FontWeight
  fontStyle?: FontStyle
  fontFamily?: string
  detailFontSize?: number
  detailFontWeight?: FontWeight
  detailFontStyle?: FontStyle
  detailFontFamily?: string
  headerFontSize?: number
  headerFontWeight?: FontWeight
  headerFontStyle?: FontStyle
  headerFontFamily?: string
  footerFontSize?: number
  footerFontWeight?: FontWeight
  footerFontStyle?: FontStyle
  footerFontFamily?: string
  onScroll?(event: NativeSyntheticEvent<NativeScrollEvent>): void
  onPress?(event: OnPressCallBack): void
  onChange?(event: OnChangeCallBack): void
  /**
   * Fired when pull to refresh is active
   */
  onRefresh?(): void
  onAccessoryPress?(event: AccessoryCallBack): void
  onWillDisplayCell?(event: DisplayCallBack): void
  onEndDisplayingCell?(event: DisplayCallBack): void
}

declare class TableView extends React.Component<TableViewProps> {}

declare namespace TableView {
  const Consts: Constants
  class Section extends React.Component<SectionProps> {}
  class Item extends React.Component<ItemProps> {}
  class Cell extends React.Component<ItemProps> {}
}

export default TableView
