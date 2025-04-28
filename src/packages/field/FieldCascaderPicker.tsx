import { Text } from '@tarojs/components';
import { useCallback, useRef, useState } from 'react';
import ListItemStyle, {
  propsKeyList as ListItemStylePropsKeyList,
} from '../listItemStyle';
import CascaderPicker, { CascaderPickerProps } from '../cascaderPicker';
import { useMode, pick } from '../utils';

import type { ArrayValueType } from '../utils';
import type { ListItemStyleProps } from '../listItemStyle';

interface BaseCascaderPickerProps extends ListItemStyleProps {
  /** CascaderPicker 组件透传属性 */
  fieldProps?: Omit<
    CascaderPickerProps,
    | 'value'
    | 'onChange'
    | 'labelInValue'
    | 'valueToList'
    | 'onConfirm'
    | 'onClose'
    | 'onCancel'
    | 'visible'
    | 'options'
  >;
  /** 提示文本 */
  placeholder?: string;
}

export type FieldCascaderPickerProps = BaseCascaderPickerProps &
  Pick<CascaderPickerProps, ArrayValueType<typeof transferPropsKeyList>>;

/** CascaderPicker 通过组件透传属性列表，其他属性可通过fieldProps属性进行透传 */
const transferPropsKeyList: (
  | 'options'
  | 'value'
  | 'labelInValue'
  | 'valueToList'
  | 'onChange'
)[] = ['options', 'value', 'labelInValue', 'valueToList', 'onChange'];

/** 组件属性列表 */
export const propsKeyList: (keyof FieldCascaderPickerProps)[] = [
  /** ListItemStyle组件属性 */
  ...ListItemStylePropsKeyList,
  /** 透传属性 */
  ...transferPropsKeyList,
  /** 当前组件属性 */
  'onChange',
  'fieldProps',
];

const FieldCascaderPicker: React.FC<FieldCascaderPickerProps> = (props) => {
  const {
    placeholder = `请选择${props.label || ''}`,
    fieldProps = {},
    value,
    onChange,
  } = props;
  const isEdit = useMode('edit');
  const [visible, setVisible] = useState(false);
  const actionRef = useRef<any>(props.fieldProps?.actionRef);

  const open = useCallback(() => setVisible(true), [setVisible]);

  const valueStr = actionRef.current
    ?.getSelectOptions?.(value)
    ?.map((item: any) => item.label)
    ?.join('');

  return (
    <>
      <ListItemStyle
        {...pick(props, ListItemStylePropsKeyList)}
        onClick={isEdit ? open : undefined}
      >
        <Text
          className="fx"
          style={{
            textAlign: 'right',
            color: valueStr ? undefined : 'rgba(15, 26, 40, 0.45)',
          }}
        >
          {valueStr || placeholder}
        </Text>
      </ListItemStyle>
      <CascaderPicker
        title={placeholder}
        {...pick(props, transferPropsKeyList)}
        {...(fieldProps as any)}
        actionRef={actionRef}
        visible={visible}
        value={value}
        closeable
        onClose={() => {
          setVisible(false);
        }}
        onChange={onChange}
      />
    </>
  );
};

export default FieldCascaderPicker;
