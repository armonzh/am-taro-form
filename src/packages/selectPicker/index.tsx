import { Picker, PickerProps } from '@nutui/nutui-react-taro';
import { useCallback, useRef, useImperativeHandle } from 'react';

export interface OptionType {
  /** 选项值 */
  value: string | number;
  /** 选项文本 */
  label: string | number;
}

export interface ActionType<V> {
  getLabelByValue: (val?: V) => string | number;
}

export interface BaseSelectPickerProps<V> extends Pick<PickerProps, 'title' | 'onCancel' | 'visible' | 'onClose'> {
  /** 选择项列表 */
  options: OptionType[];
  /** 选择的值 */
  value?: V;
  /** 选择值改变的回调 */
  onChange?: (val: V) => void;
  /** 工具函数 */
  actionRef?: React.RefObject<ActionType<V> | undefined>;
}

export type SelectPickerProps = (BaseSelectPickerProps<OptionType> & {
  /** 设置value值类型， true 表示value 值为对象 */
  labelInValue: true;
}) | (BaseSelectPickerProps<string | number> & {
  /** 设置value值类型， false 表示value 值为string或者number */
  labelInValue?: false;
});

const SelectPicker = (props: SelectPickerProps) => {
  const {
    options,
    value,
    onChange,
    labelInValue = false,
    actionRef,
    ...restProps
  } = props;
  const cacheRef = useRef({ labelInValue, options });

  cacheRef.current = { labelInValue, options };

  const list = options?.map((item) => {
    /** 兼容@nutui/nutui-react-taro 组件库2和3，2使用的是text，3用的是label */
    return {
      text: item?.label,
      ...item,
    } as any;
  });

  const handleChange = (opts: any[], vals: any[]) => {
    if (labelInValue) {
      const val = options.find(item => item.value === vals[0]);
      onChange?.(val as any);
    } else {
      onChange?.(vals?.[0]);
    }
  };

  const getLabelByValue = useCallback((val: any) => {
    const { options: opts, labelInValue: LIV } = cacheRef.current;
    if (LIV && Object.prototype.toString.call(val) !== '[object Object]') return val;
    if (LIV) return val?.label;
    const opt = opts.find(item => item.value === val);
    return opt?.label;
  }, []);

  useImperativeHandle(actionRef as any, () => {
    return {
      getLabelByValue,
    };
  }, [getLabelByValue]);

  const isObjValue = (v: string | number | OptionType): v is OptionType => {
    return labelInValue || Object.prototype.toString.call(v) === '[object Object]';
  };

  const getPickerValue = () => {
    if (!value && value !== 0) return [];

    if (isObjValue(value)) return [value?.value];
    return [value];
  };

  return <Picker
    {...restProps}
    value={getPickerValue()}
    onConfirm={handleChange}
    options={[list]}
  />;
};

export default SelectPicker;
