import { createContext, useContext } from 'react';

import type { MetaEvent } from 'rc-field-form/es/Field';

export type ModeType = 'edit' | 'readOnly';

export type ArrayValueType<T> = T extends (infer U)[] ? U : never;
export type ArrayMergeType<T, A> = ArrayValueType<T> | ArrayValueType<A>;
export type CommonPropsKey = 'disabled' | 'value' | 'onChange' | 'placeholder' | 'mode';


/**
 * Form组件配置项
 * @param {string} mode 表单模式，edit readOnly
 * @param {boolean} errorStyle 是否显示底部错误文案，false 不展示
 * @param {boolean} requiredStyle 必填项是否展示前面必填标识（*）false 不展示
 */
export const FormContext = createContext({ mode: 'edit', errorStyle: true, requiredStyle: true });

/**
 * 获取表单模式
 * @param {*} m 要判断的模式,可选择值，有值将判断是不是和这个模式相同，返回一个boolean；没值将直接返回mode
 * @returns mode | boolean;
 */
export const useMode = (m: ModeType) => {
  const { mode } = useContext(FormContext);
  if (m) return mode === m;
  return mode;
};

export const genEmptyMeta = (): MetaEvent => {
  return {
    errors: [],
    warnings: [],
    touched: false,
    validating: false,
    name: [],
    validated: false,
  };
};

export const pick = <T extends object, K extends keyof T>(obj: T, keys: K[] = []): Pick<T, K> => {
  const newObj: any = {};
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    keys?.forEach?.(key => {
      if (obj[key] !== undefined) {
        newObj[key] = obj[key];
      }
    });
  }
  return newObj;
};
