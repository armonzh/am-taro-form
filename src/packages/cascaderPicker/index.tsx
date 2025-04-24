import { Cascader, CascaderProps } from "@nutui/nutui-react-taro";
import { useMemo, useRef, useCallback, useImperativeHandle } from "react";
import { pick } from "../utils";

export interface CascaderOption extends Record<string, any> {
  /** 选项提示文本 */
  text?: string;
  /** 选项唯一标识 */
  value?: number | string;
  paneKey?: string;
  /** 是否禁用当前选项 */
  disabled?: boolean;
  /** 子选项列表 */
  children?: CascaderOption[];
  /** 是不是叶子节点 */
  leaf?: boolean;
  /** j节点层级 */
  level?: number;
  /** 节点子选项是否加载中 */
  loading?: boolean;
  root?: boolean;
}

export interface BaseCascaderPickerProps
  extends Partial<Omit<CascaderProps, "options" | 'value' | 'onChange' | 'defaultValue'>> {
  options: CascaderOption[];
}

interface ValueTypeObj {
  value: ValueType;
  label: string;
}
type ValueType = string | number;

export interface ActionType<T> {
  getSelectOptions: (value?: T) => ValueTypeObj[];
}

export interface ExtraProps<T> {
  value?: T;
  onChange?: (val?: T) => void;
  actionRef?: React.RefObject<ActionType<T>>;
}

export type CascaderPickerProps = BaseCascaderPickerProps &
  (
    | {
        labelInValue?: false;
        valueToList?: true;
      } & ExtraProps<ValueType[]>
    | {
        labelInValue: true;
        valueToList?: true;
      } & ExtraProps<ValueTypeObj[]>
    | {
        labelInValue?: false;
        valueToList: false;
      } & ExtraProps<ValueType>
    | {
        labelInValue: true;
        valueToList: false;
      } & ExtraProps<ValueTypeObj>
  );

const CascaderPicker: React.FC<CascaderPickerProps> = (props) => {
  const { options, value, onChange, labelInValue, valueToList, actionRef, ...restProps } = props;
  const cacheRef = useRef<any>({});

  const {
    valueKey = "value",
    textKey = "text",
    childrenKey = "children",
  } = props.optionKey || {};

  const flatOptions = useMemo(() => {
    const flatList = (
      list: CascaderOption[],
      init: any[] = [],
      parentKey: string | number = ""
    ): any[] => {
      return list.reduce((pre: any[], curr) => {
        const arr = [...pre];
        if (curr) {
          arr.push({
            value: curr?.[valueKey],
            label: curr?.[textKey],
            parentKey,
          });
        }
        if (curr?.[childrenKey]?.length) {
          return flatList(curr?.[childrenKey], arr, curr?.[valueKey]);
        }
        return arr;
      }, init);
    };
    return flatList(options);
  }, [options, valueKey, textKey, childrenKey]);

  cacheRef.current = {
    flatOptions,
    labelInValue,
    valueToList,
    value,
  };

  const getSelectOptions = useCallback((p?: any): ValueTypeObj[] => {
    const {
      flatOptions: list,
      labelInValue: LIV,
      valueToList: VTL,
    } = cacheRef.current;
    const V = p || cacheRef.current.value;
    if (!V && V !== 0) return [];

    /** labelInValue: true  valueToList: true */
    if (LIV && VTL) return V;

    /** labelInValue: false  valueToList: true */
    if (!LIV && VTL && Array.isArray(V)) {
      return V.map((v: ValueType) => list.find((item: any) => item.value === v));
    };

     /** valueToList: false */
    if (!VTL) {
      const val = LIV ? V?.value : V;
      const getOpts = (v: ValueType, init: any[] = []): any[] => {
        const arr = [...init];
        const curr = list.find((item: any) => item.value === v);
        if (curr) arr.unshift(curr);
        if (curr?.parentKey) return getOpts(curr.parentKey, arr);
        return arr;
      };
      return getOpts(val);
    }
    return [];
  }, []);

  const handleChange = (vals: ValueType[], list: any[]) => {
    if (!labelInValue) {
      onChange?.(valueToList ? vals : vals.pop() as any);
      return;
    }
    const opts = list.map(item => {
      return {
        value: item?.[valueKey],
        label: item?.[textKey],
      };
    });
    onChange?.(valueToList ? opts : opts.pop() as any);
  };

  const selectOptions = getSelectOptions();

  useImperativeHandle(actionRef as any, () => {
    return { getSelectOptions };
  }, [getSelectOptions]);

  return <Cascader
    {...restProps}
    defaultValue={selectOptions.map((item) => item.value)}
    onChange={handleChange}
    options={options}
  />;
};

export default CascaderPicker;
