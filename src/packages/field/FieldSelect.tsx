import { Text } from '@tarojs/components';
import { useCallback, useRef, useState } from 'react';
import SelectPicker from '../selectPicker';
import ListItemStyle, { propsKeyList as ListItemStylePropsKeyList } from '../listItemStyle';
import { useMode, pick } from '../utils';

import type { ArrayMergeType } from '../utils';
import type { ListItemStyleProps } from '../listItemStyle';
import type  { SelectPickerProps, BaseSelectPickerProps, OptionType, ActionType } from '../selectPicker';

interface BaseSelectProps extends ListItemStyleProps {
  fieldProps?: SelectPickerProps;
  placeholder?: string;
}

export type FieldSelectProps = BaseSelectProps & ((Pick<BaseSelectPickerProps<OptionType>, 'options' | 'onChange' | 'value' | 'title'> & {
  /** 设置value值类型， true 表示value 值为对象 */
  labelInValue: true;
}) | (Pick<BaseSelectPickerProps<string | number>, 'options' | 'onChange' | 'value' | 'title'> & {
  /** 设置value值类型， false 表示value 值为string或者number */
  labelInValue?: false;
}));

/** Input 通过组件透传属性列表，其他属性可通过fieldProps属性进行透传 */
const transferPropsKeyList: ('options' | 'onChange' | 'value' | 'labelInValue' | 'title')[] = ['options', 'onChange', 'value', 'labelInValue', 'title'];

/** 组件属性列表 */
export const propsKeyList: (ArrayMergeType<keyof FieldSelectProps, typeof transferPropsKeyList> | keyof FieldSelectProps)[] = [
  /** ListItemStyle组件属性 */
  ...ListItemStylePropsKeyList,
  /** 透传属性 */
  ...transferPropsKeyList,
  /** 当前组件属性 */
  'fieldProps',
  'placeholder',
];

const FieldSelect = (props: FieldSelectProps) => {
  const { value, placeholder = `请选择${props.label || ''}`} = props;
  const isEdit = useMode('edit');
  const selectProps: SelectPickerProps = Object.assign({}, pick(props, transferPropsKeyList), props.fieldProps);
  const [visible, setVisible] = useState(false);
  const actionRef = useRef<ActionType<any>>();

  const open = useCallback(() => setVisible(true), [setVisible]);

  const hasValue = value || value === 0;

  return (
    <>
      <ListItemStyle
        {...pick(props, ListItemStylePropsKeyList)}
        onClick={isEdit ? open : undefined}
      >
        <Text className="fx" style={{ textAlign: 'right', color: hasValue ? undefined : 'rgba(15, 26, 40, 0.45)' }}>
          {hasValue ? actionRef.current?.getLabelByValue(value) : placeholder}
        </Text>
      </ListItemStyle>
      {visible ? <SelectPicker
        {...selectProps}
        actionRef={actionRef}
        visible
        onClose={() => setVisible(false)}
      /> : null}
    </>
  );
};

export default FieldSelect;
