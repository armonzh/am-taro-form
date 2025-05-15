import React from 'react';
import { Cell } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';
import { ArrowRight } from '@nutui/icons-react-taro';
import DividerStyle from './dividerStyle';
import LabelStyle from './labelStyle';

import './index.scss';

const isEmpty = (val: any) => !val && val !== 0;

export interface ListItemStyleProps {
  /**
   * 左边标题文本
   * */
  label?: React.ReactNode;
  /** 是否显示必填表示（*） */
  required?: boolean;
  /** 当前行点击回调 */
  onClick?: () => void;
  /** 是否显示点击反馈样式 */
  clickable?: boolean;
  /** 是否展示右侧箭头，如果没有配置onClick是函数的时候展示 */
  showArrowRight?: boolean;
  /** 帮助文案，如果有错误文案将不展示 */
  help?: React.ReactNode;
  /** 错误文案，默认红色字体 */
  errorText?: React.ReactNode;
  /** 组件class */
  className?: string;
  /**
   * 是否展示底部分割线
   * @default true
   * */
  divider?: boolean;
  /** 末尾额外的文案，在右侧箭头之前 */
  suffix?: React.ReactNode;
}

/** 组件属性列表 */
export const propsKeyList: (keyof ListItemStyleProps)[] = [
  'label',
  'required',
  'onClick',
  'clickable',
  'showArrowRight',
  'help',
  'errorText',
  'className',
  'divider',
  'suffix',
];

const ListItemStyle: React.FC<React.PropsWithChildren<ListItemStyleProps>> = (
  props,
) => {
  const {
    label,
    required = false,
    onClick,
    clickable,
    children,
    showArrowRight,
    help,
    errorText,
    className,
    divider = true,
    suffix,
  } = props;

  const hasClick = typeof onClick === 'function';
  const isShowArrow = 'showArrowRight' in props ? showArrowRight : hasClick;

  const cellProps: any = {};

  if (hasClick) cellProps.onClick = onClick;

  return (
    <View className="list-item-style">
      <Cell
        {...cellProps}
        title={<LabelStyle text={label} required={required} />}
        align="center"
        className={className ? `${className}` : 'list-item-style'}
        extra={
          <View className="list-item-style-content">
            {children}
            {suffix || suffix === 0 ? (
              <View className="list-item-style-suffix">{suffix}</View>
            ) : null}
            {isShowArrow ? <ArrowRight color="#2020204C" size={16} /> : null}
          </View>
        }
        clickable={'clickable' in props ? clickable : hasClick}
      />
      {divider ? (
        <DividerStyle
          text={isEmpty(errorText) ? help : errorText}
          type={isEmpty(errorText) ? 'help' : 'error'}
        />
      ) : null}
    </View>
  );
};

export default ListItemStyle;
