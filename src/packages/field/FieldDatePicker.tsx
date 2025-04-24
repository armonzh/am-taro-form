import {Text } from '@tarojs/components';
import { useCallback, useState } from 'react';
import { DatePicker, DatePickerProps } from '@nutui/nutui-react-taro';
import ListItemStyle, { propsKeyList as ListItemStylePropsKeyList } from '../listItemStyle';
import { useMode, pick } from '../utils';

import type { ArrayValueType, ArrayMergeType } from '../utils';
import type { ListItemStyleProps } from '../listItemStyle';

interface BaseDatePickerProps extends ListItemStyleProps {
  /** DatePicker 组件透传属性 */
  fieldProps?: Omit<DatePickerProps, 'value' | 'onChange' | 'onConfirm' | 'onClose' | 'onCancel' | 'visible'>;
  /** 日期选择时的回调 */
  onChange?: (v: string) => void;
  /** 选中日期 */
  value?: string;
  /** 提示文本 */
  placeholder?: string;
}

export type FieldDatePickerProps = BaseDatePickerProps & Partial<Pick<DatePickerProps, ArrayValueType<typeof transferPropsKeyList>>>;

/** DatePicker 通过组件透传属性列表，其他属性可通过fieldProps属性进行透传 */
const transferPropsKeyList: ('startDate' | 'endDate' | 'type' | 'title')[] = ['startDate', 'endDate', 'type', 'title'];

/** 组件属性列表 */
export const propsKeyList: (ArrayMergeType<keyof FieldDatePickerProps, typeof transferPropsKeyList> | keyof FieldDatePickerProps)[] = [
  /** ListItemStyle组件属性 */
  ...ListItemStylePropsKeyList,
  /** 透传属性 */
  ...transferPropsKeyList,
  /** 当前组件属性 */
  'onChange',
  'fieldProps',
];

const FieldDatePicker: React.FC<FieldDatePickerProps> = (props) => {
  const { placeholder = `请选择${props.label || ''}`, fieldProps = {}, value, onChange, type = 'date' } = props;
  const isEdit = useMode('edit');
  const [visible, setVisible] = useState(false);

  const open = useCallback(() => setVisible(true), [setVisible]);

  const getDateStr = (val: (string | number)[]) => {
    if (!val?.length) return '';
    if (type === 'date') {
      return val.slice(0, 3).join('-');
    }
     if (type === 'time') {
      return val.slice(0, 3).join(':');
    }
    if (type === 'year-month' || type === 'month-day') {
      return val.slice(0, 2).join('-');
    }
    if (type === 'hour-minutes') {
      return val.slice(0, 2).join(':');
    }
    if (type === 'datehour') {
      return `${val.slice(0, 3).join('-')} ${val[3]}`;
    }
    if (type === 'datetime') {
      return `${val.slice(0, 3).join('-')} ${val.slice(3, 5).join(':')}`;
    }
    return '';
  };
  const getDateValue = () => {
    const date = new Date();
    if (!value?.length) return date;
    if (type === 'date' || type === 'datetime') {
      return new Date(value);
    }
     if (type === 'time') {
      return new Date(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${value}`);
    }
    if (type === 'year-month') {
      return new Date(`${value}-${date.getDate()}`);
    }
    if (type === 'month-day') {
      return new Date(`${date.getFullYear()}-${value}`);;
    }
    if (type === 'hour-minutes') {
      return new Date(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${value}:${date.getSeconds()}`);
    }
    if (type === 'datehour') {
      return new Date(`${value}:${date.getMinutes()}:${date.getSeconds()}`);
    }
    return undefined;
  };

  return (
    <>
      <ListItemStyle {...pick(props, ListItemStylePropsKeyList)} onClick={isEdit ? open : undefined}>
        <Text className="fx" style={{ textAlign: 'right', color: value ? undefined : 'rgba(15, 26, 40, 0.45)' }}>
          {value || placeholder}
        </Text>
      </ListItemStyle>
      {visible ? <DatePicker
        title={placeholder}
        defaultValue={new Date()}
        {...pick(props, transferPropsKeyList)}
        {...fieldProps}
        visible
        value={getDateValue()}
        onClose={() => setVisible(false)}
        onConfirm={(_, vals) => {
          onChange?.(getDateStr(vals));
        }}
      /> : null}
    </>
  );
};

export default FieldDatePicker;
