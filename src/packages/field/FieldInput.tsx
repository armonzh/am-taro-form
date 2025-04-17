import { Input, Text, InputProps, BaseEventOrig } from '@tarojs/components';
import ListItemStyle, { propsKeyList as ListItemStylePropsKeyList } from '../listItemStyle';
import { useMode, pick } from '../utils';

import type { ArrayValueType, ArrayMergeType } from '../utils';
import type { ListItemStyleProps } from '../listItemStyle';

interface BaseInputProps extends ListItemStyleProps {
  fieldProps?: InputProps;
  onChange?: (v: string) => void;
  value?: string;
}

export type FieldInputProps = BaseInputProps & Pick<InputProps, ArrayValueType<typeof transferPropsKeyList>>;

/** Input 通过组件透传属性列表，其他属性可通过fieldProps属性进行透传 */
const transferPropsKeyList: ('disabled' | 'value' | 'placeholder' | 'onBlur' | 'onFocus')[] = ['disabled', 'value', 'placeholder', 'onBlur', 'onFocus'];

/** 组件属性列表 */
export const propsKeyList: (ArrayMergeType<keyof FieldInputProps, typeof transferPropsKeyList> | keyof FieldInputProps)[] = [
  /** ListItemStyle组件属性 */
  ...ListItemStylePropsKeyList,
  /** 透传属性 */
  ...transferPropsKeyList,
  /** 当前组件属性 */
  'onChange',
  'fieldProps',
];

const FieldInput: React.FC<FieldInputProps> = (props) => {
  const isEdit = useMode('edit');
  const inputProps: InputProps = Object.assign({}, pick(props, transferPropsKeyList), props.fieldProps);

  const handleChange = (e: BaseEventOrig<InputProps.inputEventDetail>) => {
    props.onChange?.(e.detail.value);
  };

  return (
    <ListItemStyle {...pick(props, ListItemStylePropsKeyList)}>
      {isEdit ? (
        <Input
          {...inputProps}
          style={{ textAlign: 'right', width: '100%' }}
          onInput={handleChange}
          placeholderClass="input-placeholder"
        />
      ) : (
        <Text className="fx" style={{ textAlign: 'right' }}>
          {props.value}
        </Text>
      )}
    </ListItemStyle>
  );
};

export default FieldInput;
