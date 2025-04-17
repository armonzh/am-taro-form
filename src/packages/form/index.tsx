import { useContext, useMemo } from 'react';

import FormComp, { useForm, List, FormProps as FMProps, useWatch, FormProvider, FormInstance } from 'rc-field-form';
import { View } from '@tarojs/components';
import FormItem from '../formItem';
import { FormContext, ModeType } from '../utils';

const Form = <V extends any>(props: FormProps<V>) => {
  const defaultConfig = useContext(FormContext);
  const {
    mode = defaultConfig.mode,
    errorStyle = defaultConfig.errorStyle,
    requiredStyle = defaultConfig.requiredStyle,
    ...restProps
  } = props;

  const config = useMemo(() => {
    return Object.assign({}, defaultConfig, { mode, requiredStyle, errorStyle });
  }, [mode, requiredStyle, errorStyle, defaultConfig]);

  return (
    <FormContext.Provider value={config}>
      <View className="nut-cell-group-wrap" style={{ display: 'block' }}>
        <FormComp {...restProps} component={false} />
      </View>
    </FormContext.Provider>
  );
};


export interface FormProps<Values> extends FMProps<Values> {
  mode?: ModeType;
  /** 是否展示错误文案样式 */
  errorStyle?: boolean;
  /** 是否展示必选项样式，true 只有有必选属性时展示，false 所有情况都不展示 */
  requiredStyle?: boolean;
}

export type FormRef<Values = any> = FormInstance<Values> & {
    nativeElement?: HTMLElement;
};

declare const InternalForm: <Values = any>(props: FormProps<Values> & {
  ref?: React.Ref<FormRef<Values>>;
}) => React.ReactElement;

type InternalFormType = typeof InternalForm;

interface RefFormType extends InternalFormType {
  FormProvider: typeof FormProvider;
  List: typeof List;
  useForm: typeof useForm;
  useWatch: typeof useWatch;
  Item: typeof FormItem;
}

Form.useForm = useForm;
Form.List = List;
Form.useWatch = useWatch;
Form.FormProvider = FormProvider;
Form.Item = FormItem;

export { useForm, List, useWatch } from 'rc-field-form';
export { default as FormItem } from '../formItem';
export default Form as RefFormType;
