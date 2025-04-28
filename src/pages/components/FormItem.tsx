import {
  createFormItem,
  ListItemStyle,
  ListItemStylePropsKeyList,
  selectPropsKeyList,
  FieldSelect,
} from 'am-taro-form';

import type {
  ListItemStyleProps,
  BaseSelectPickerProps,
  SelectOptionType,
  SelectPickerProps,
  FieldSelectProps,
} from 'am-taro-form';

interface TextProps extends ListItemStyleProps {
  /** 文本展示 */
  valueType: 'text';
  /** 文本值 */
  value?: string;
}

interface BaseGenderSelectProps extends ListItemStyleProps {
  fieldProps?: SelectPickerProps;
  placeholder?: string;
  /** 性别选择 */
  valueType: 'gender';
}

export type FieldGenderSelectProps = BaseGenderSelectProps &
  (
    | (Pick<
        BaseSelectPickerProps<SelectOptionType>,
        'onChange' | 'value' | 'title'
      > & {
        /** 设置value值类型， true 表示value 值为对象 */
        labelInValue: true;
      })
    | (Pick<
        BaseSelectPickerProps<string | number>,
        'onChange' | 'value' | 'title'
      > & {
        /** 设置value值类型， false 表示value 值为string或者number */
        labelInValue?: false;
      })
  );

/**
 * 布尔值选择
 */
interface FieldBoolSelectProps extends Omit<FieldSelectProps, 'options'> {
  fieldProps?: SelectPickerProps;
  placeholder?: string;
  /** 布尔值选择 */
  valueType: 'bool';
}

const Text = (props: TextProps) => (
  <ListItemStyle {...props}>{props.value}</ListItemStyle>
);

const Gender = (props: FieldGenderSelectProps) => {
  return (
    <FieldSelect
      {...props}
      options={[
        { value: '1', label: '男' },
        { value: '2', label: '女' },
      ]}
    />
  );
};

const Boolean = (props: FieldBoolSelectProps) => {
  return (
    /* @ts-ignore */
    <FieldSelect
      {...props}
      options={[
        { value: 'Y', label: '是' },
        { value: 'N', label: '否' },
      ]}
    />
  );
};

const FormItem = createFormItem({
  text: [Text, [...ListItemStylePropsKeyList, 'value']],
  gender: [Gender, [...selectPropsKeyList.filter((key) => key !== 'options')]],
  bool: [Boolean, [...selectPropsKeyList.filter((key) => key !== 'options')]],
});

export default FormItem;
