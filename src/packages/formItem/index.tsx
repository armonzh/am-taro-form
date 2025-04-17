import { useState, useContext, useMemo } from 'react';
import { Field } from 'rc-field-form';

import type { FieldProps } from 'rc-field-form/es/Field';
import type { FieldInputProps } from '../field';
import type { ModeType } from '../utils';

import FieldWrap from '../fieldWrap';
import {
  FieldInput,
  inputPropsKeyList,
} from '../field';

import {
  genEmptyMeta,
  FormContext,
  pick,
} from '../utils';

interface BaseFormItemProps<T> extends FieldProps<T> {
  mode?: ModeType;
}

/** Input 组件独有属性 */
export interface InputFormItemProps extends FieldInputProps {
  valueType?: 'input';
  /** 若使用字典选择请设置valueType为dict */
  dictKey?: null;
  /** 若使用列表选择器请设置valueType为select */
  options?: null;
  value?: string;
}

/** Input 组件独有属性 */
export interface DatePickerFormItemProps extends FieldInputProps {
  valueType?: 'date';
  /** 若使用字典选择请设置valueType为dict */
  dictKey?: null;
  /** 若使用列表选择器请设置valueType为select */
  options?: null;
  value?: string;
}

type FormItemProps<Values> = BaseFormItemProps<Values> &
  (
    | InputFormItemProps
    | DatePickerFormItemProps
  );

const FormItem = <T extends any>(props: FormItemProps<T>) => {
  const { children, valueType, mode, ...restProps } = props;
  let TextInputNode;
  const [meta, setMeta] = useState(genEmptyMeta());
  const config = useContext(FormContext);

  const configValue = useMemo(() => {
    return Object.assign({}, config, typeof mode === 'boolean' ? { mode } : {});
  }, [config, mode]);

  /** 是否展示必填校验样式, requiredStyle: 统一设置是否展示必填样式 */
  const isRequired = !configValue.requiredStyle ? false : (props.rules || []).some((rule: any) => rule?.required);

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
    ...restProps,
    onMetaChange,
    noStyle: true,
  };

  if (children) {
    TextInputNode = children;
  } else if (valueType === 'date') {
    /** 日期选择 */
  } else {
    /** 默认使用Input输入框 */
    TextInputNode = <FieldInput {...extraProps} {...pick(props, inputPropsKeyList)} />;
  }

  if (typeof TextInputNode !== 'function') {
    TextInputNode = (
      <FieldWrap _name={props.name} trigger={props.trigger}>
        {TextInputNode}
      </FieldWrap>
    );
  }

  return (
    <FormContext.Provider value={configValue}>
      <Field {...formFieldProps}>{TextInputNode}</Field>
    </FormContext.Provider>
  );
};

export default FormItem;
