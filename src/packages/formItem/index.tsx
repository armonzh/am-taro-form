import React, { useState, useContext, useMemo } from 'react';
import { Field } from 'rc-field-form';

import type { FieldProps } from 'rc-field-form/es/Field';
import type {
  FieldInputProps,
  FieldSelectProps,
  FieldDatePickerProps,
  FieldCascaderPickerProps,
} from '../field';
import type { ModeType } from '../utils';

import FieldWrap from '../fieldWrap';
import {
  FieldInput,
  inputPropsKeyList,
  FieldSelect,
  selectPropsKeyList,
  FieldDatePicker,
  datePickerKeyList,
  FieldCascaderPicker,
  cascaderPickerKeyList,
} from '../field';
import {
  ListItemStyleProps,
  propsKeyList as ListItemStylePropsKeyList,
} from '../listItemStyle';

import {
  genEmptyMeta,
  FormContext,
  pick,
  FIELD_FORM_PROPS_KEYS,
} from '../utils';

export interface BaseFormItemProps<T> extends FieldProps<T> {
  /** 表单模式，edit：编辑模式，readOnly：只读模式 */
  mode?: ModeType;
}

/** Input 组件独有属性 */
export interface InputFormItemProps extends FieldInputProps {
  /** 表单类型，select 表单为输入框 */
  valueType?: 'input';
}

/** datePicer 组件独有属性 */
export interface DatePickerFormItemProps extends FieldDatePickerProps {
  /** 表单类型，select 表单为日期选择框 */
  valueType: 'date';
}

/** Select 组件独有属性 */
export type SelectFormItemProps = FieldSelectProps & {
  /** 表单类型，select 表单为选择框 */
  valueType: 'select';
};

/** cascaderPicker 组件独有属性 */
export interface CascaderPickerFormItemProps extends FieldCascaderPickerProps {
  /** 表单类型，cascader 表单为级联选择框 */
  valueType: 'cascader';
}

type FormItemProps<Values> = BaseFormItemProps<Values> &
  (
    | InputFormItemProps
    | DatePickerFormItemProps
    | SelectFormItemProps
    | CascaderPickerFormItemProps
  );

function FormItem<T extends any>(props: FormItemProps<T>) {
  const { children, valueType, mode } = props;
  let TextInputNode;
  const [meta, setMeta] = useState(genEmptyMeta());
  const config = useContext(FormContext);

  const configValue = useMemo(() => {
    return Object.assign({}, config, typeof mode === 'boolean' ? { mode } : {});
  }, [config, mode]);

  /** 是否展示必填校验样式, requiredStyle: 统一设置是否展示必填样式 */
  const isRequired = !configValue.requiredStyle
    ? false
    : (props.rules || []).some((rule: any) => rule?.required);

  /** listItemStyle 组件配置项 */
  const extraProps = {
    required: isRequired,
    /** errorStyle 表单样式是否展示底部错误提示 */
    errorText: configValue.errorStyle ? meta.errors?.[0] : '',
  };
  /** 表单Meta信息更新 */
  const onMetaChange: FieldProps['onMetaChange'] = (nextMeta) => {
    props?.onMetaChange?.(nextMeta);
    // 校验中Meta信息不更新状态
    if (!nextMeta.validating) {
      setMeta(nextMeta.destroy ? genEmptyMeta() : nextMeta);
    }
  };
  /** Field 组件属性 */
  const formFieldProps = {
    validateTrigger: 'onChange',
    ...pick(props, FIELD_FORM_PROPS_KEYS),
    onMetaChange,
    noStyle: true,
  };

  if (children) {
    TextInputNode = children;
  } else if (valueType === 'date') {
    /** DatePicker 组件 */
    TextInputNode = (
      <FieldDatePicker {...extraProps} {...pick(props, datePickerKeyList)} />
    );
    /** 日期选择 */
  } else if (valueType === 'select') {
    /** Select 组件 */
    TextInputNode = (
      <FieldSelect
        {...extraProps}
        {...(pick(props, selectPropsKeyList) as any)}
      />
    );
  } else if (valueType === 'cascader') {
    /** cascaderPicker 组件 */
    TextInputNode = (
      <FieldCascaderPicker
        {...extraProps}
        {...(pick(props, cascaderPickerKeyList) as any)}
      />
    );
  } else {
    /** 默认使用Input输入框 */
    TextInputNode = (
      <FieldInput {...extraProps} {...pick(props, inputPropsKeyList)} />
    );
  }

  if (typeof TextInputNode !== 'function') {
    TextInputNode = (
      <FieldWrap
        _name={props.name}
        trigger={props.trigger}
        extraProps={extraProps}
      >
        {TextInputNode}
      </FieldWrap>
    );
  }

  return (
    <FormContext.Provider value={configValue}>
      <Field {...formFieldProps}>{TextInputNode}</Field>
    </FormContext.Provider>
  );
}

export default FormItem;

/** FormItem构造函数配置类型 */
type FieldConfigType<T> = Record<string, [T, string[]]>;
/** 根据FormItem构造函数配置获取Field组件的props */
type GetFieldConfigProps<T> =
  T extends FieldConfigType<infer P> ? GetReactProps<P> : ListItemStyleProps;
/** 获取React函数组件的props */
type GetReactProps<T> = T extends React.FC<infer P> ? P : never;

export const createFormItem = <
  V extends any = any,
  T extends React.FC = any,
  F extends FieldConfigType<T> = any,
>(
  fieldConfig: F,
): React.FC<
  FormItemProps<V> | (GetFieldConfigProps<F> & BaseFormItemProps<V>)
> => {
  return (props: any) => {
    if (props.valueType in fieldConfig) {
      const [Comp, propsKeyList = ListItemStylePropsKeyList] =
        fieldConfig[props.valueType];
      return (
        <FormItem {...props}>
          {React.createElement(Comp, pick(props, propsKeyList))}
        </FormItem>
      );
    }
    return <FormItem {...props} />;
  };
};
