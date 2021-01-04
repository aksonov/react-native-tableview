/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {
  ViewStyle,
  Insets,
  PointPropType,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

export type FontWeight =
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 'bold'
  | 'normal';

export type FontStyle = 'italic' | 'normal' | 'oblique';

export interface CallBack {
  cancelBubble: boolean;
  target: number;
}

export interface AccessoryCallBack extends CallBack {
  accessoryIndex: number;
  accessorySection: number;
  accessoryType: number;
  children: string;
  footerLabel?: string;
  label?: string;
}

export interface DisplayCallBack extends CallBack {
  row: number;
  section: number;
}

export interface OnPressCallBack extends CallBack {
  children: string;
  selectedIndex: number;
  selectedSection: number;
  selectedOrigin: PointPropType;
  footerLabel?: string;
  label?: string;
}

export interface OnChangeCallBack extends CallBack {
  sourceIndex: number;
  sourceSection: number;
  destinationIndex?: number;
  destinationSection?: number;
  mode: 'move' | 'delete';
  canMove?: boolean;
  canEdit?: boolean;
  children?: string;
  label?: string;
}

export interface Constants {
  Style: {
    Plain: number;
    Grouped: number;
  };
  CellStyle: {
    Default: number;
    Value1: number;
    Value2: number;
    Subtitle: number;
  };
  CellEditingStyle: {
    None: number;
    Delete: number;
    Insert: number;
  };
  CellSelectionStyle: {
    None: number;
    Blue: number;
    Gray: number;
    Default: number;
  };
  SeparatorStyle: {
    None: number;
    Line: number;
  };
  AccessoryType: {
    None: number;
    DisclosureIndicator: number;
    DisclosureButton: number;
    Checkmark: number;
    DetailButton: number;
  };
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

export enum CellSelectionStyle {
  None = 0,
  Blue,
  Gray,
  Default,
}

export interface SectionProps {
  /**
   * Show the DisclosureIndicator accessory type
   */
  arrow?: boolean;

  /**
   * If cell is allowed to be dragged in editing mode
   */
  canMove?: boolean;

  /**
   * If cell can be deleted in editing mode
   */
  canEdit?: boolean;

  /**
   * Title for header
   */
  label?: string;

  /**
   * Title for header
   */
  footerLabel?: string;

  /**
   * Height of header
   */
  headerHeight?: number;

  /**
   * Height of footer
   */
  footerHeight?: number;
}

export interface ItemProps {
  /**
   * This value will be returned on event callbacks
   */
  value?: string | number;

  /**
   * Show the Checkmark accessory type
   */
  selected?: boolean;

  /**
   * Detail text to show
   */
  detail?: string;

  /**
   * Accessory type
   */
  accessoryType?: AccessoryType;

  /**
   * If cell is allowed to be dragged in editing mode
   */
  canMove?: boolean;

  /**
   * If cell can be deleted in editing mode
   */
  canEdit?: boolean;

  /**
   * Cell selection style
   */
  selectionStyle?: CellSelectionStyle;

  /**
   * Allow transparent cell background
   */
  transparent?: boolean;

  /**
   * Callback fired on pressing an accessory
   */
  onAccessoryPress?(event: AccessoryCallBack): void;

  /**
   * Callback fired on pressing an item
   */
  onPress?(event: OnPressCallBack): void;
}

export interface TableViewProps {
  style?: ViewStyle;
  tableViewStyle?: TableViewStyle;
  tableViewCellStyle?: TableViewCellStyle;
  tableViewCellEditingStyle?: CellEditingStyle;
  separatorStyle?: SeparatorStyle;
  editing?: boolean;
  allowsSelectionDuringEditing?: boolean;
  autoFocusAnimate?: boolean;
  autoFocus?: boolean;
  alwaysBounceVertical?: boolean;
  scrollEnabled?: boolean;
  allowsToggle?: boolean;
  allowsMultipleSelection?: boolean;
  sectionIndexTitlesEnabled?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  moveWithinSectionOnly?: boolean;
  reactModuleForCell?: string;
  /**
   * If the tableview can pull to refresh
   */
  canRefresh?: boolean;

  /**
   * Current refreshing status.
   *
   * Used to hide or show the loading indicator while refreshing
   */
  refreshing?: boolean;
  selectedValue?: string | number;
  json?: string;
  filter?: string;
  contentInset?: Insets;
  contentOffset?: PointPropType;
  scrollIndicatorInsets?: Insets;
  textColor?: string;
  detailTextColor?: string;
  tintColor?: string;
  headerTextColor?: string;
  headerBackgroundColor?: string;
  footerTextColor?: string;
  separatorColor?: string;
  fontSize?: number;
  fontWeight?: FontWeight;
  fontStyle?: FontStyle;
  fontFamily?: string;
  detailFontSize?: number;
  detailFontWeight?: FontWeight;
  detailFontStyle?: FontStyle;
  detailFontFamily?: string;
  headerFontSize?: number;
  headerFontWeight?: FontWeight;
  headerFontStyle?: FontStyle;
  headerFontFamily?: string;
  footerFontSize?: number;
  footerFontWeight?: FontWeight;
  footerFontStyle?: FontStyle;
  footerFontFamily?: string;
  onScroll?(event: NativeSyntheticEvent<NativeScrollEvent>): void;
  onPress?(event: OnPressCallBack): void;
  onChange?(event: OnChangeCallBack): void;
  /**
   * Fired when pull to refresh is active
   */
  onRefresh?(): void;
  onAccessoryPress?(event: AccessoryCallBack): void;
  onWillDisplayCell?(event: DisplayCallBack): void;
  onEndDisplayingCell?(event: DisplayCallBack): void;
  cellSeparatorInset?: Insets;
  cellLayoutMargins?: Insets;
}

declare class TableView extends React.Component<TableViewProps> {
  /**
   * Scroll to coordinates
   *
   * @param x Horizontal pixels to scroll
   * @param y Vertical pixels to scroll
   * @param animated With animation or not
   */
  scrollTo(x: number, y: number, animated: boolean): void;

  /**
   * Scroll to an index
   *
   * @param params scroll params
   * @param params.index index of the cell
   * @param params.section index of the section @default 0
   * @param params.animated scroll with animation @default true
   */
  scrollToIndex(params: {
    index: number;
    section?: number;
    animated?: boolean;
  }): void;
}

declare namespace TableView {
  const Consts: Constants;
  class Section extends React.Component<SectionProps> {}
  class Item extends React.Component<ItemProps> {}
  class Cell extends React.Component<ItemProps> {}
}

export default TableView;
