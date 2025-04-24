import { createFormItem, ListItemStyle, ListItemStylePropsKeyList } from 'am-taro-form';

import type { ListItemStyleProps } from 'am-taro-form';

interface TextProps extends ListItemStyleProps {
  /** 文本展示 */
  valueType: 'text';
  /** 文本值 */
  value?: string;
}

interface DictProps extends ListItemStyleProps {
  /** 字典选择 */
  valueType: 'dict';
  /** 文本值 */
  value?: string;
  dictKey: string;
}


const Text = (props: TextProps) => <ListItemStyle {...props}>{props.value}</ListItemStyle>;

const Dict = (props: DictProps) => <ListItemStyle {...props}>{props.value}</ListItemStyle>;

const FormItem = createFormItem({
  text: [Text, [...ListItemStylePropsKeyList, 'value']],
  Dict: [Dict, [...ListItemStylePropsKeyList, 'value']],
});

export default FormItem;


