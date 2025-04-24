/**
 * 解决Field组件如果不设置name属性，将会替换整个values的值；
 */
import React, { useCallback } from 'react';

const FieldWrap = (props: any) => {
  const { children, _name, trigger = 'onChange', extraProps = {}, ...restProps } = props;

  const onChangeParent = props[trigger];
  const onChangeChild = children?.props?.[trigger];

  const onChange = useCallback(
    (...rest: any[]) => {
      // 如果没有设置name值，不触发Field组件值的更新函数；
      if (_name && typeof onChangeParent === 'function') onChangeParent(...rest);
      if (typeof onChangeChild === 'function') onChangeChild(...rest);
    },
    [onChangeParent, onChangeChild, _name],
  );

  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...extraProps,
      ...restProps,
      ...(children.props || {}),
      [trigger]: onChange,
    });
  }
  return children;
};

export default FieldWrap;
