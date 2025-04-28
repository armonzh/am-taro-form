# am-taro-form

基于taro的跨平台Form表单库

## 开始使用

npm 安装,

```bash
$ npm i am-taro-form --save
```

yarn 安装,

```bash
$ yarn add am-taro-form --save
```

# Demo

## 基础使用
```tsx
import { Form } from 'am-taro-form';
import { View } from '@tarojs/components';

const Demo = () => {
  const [form] = Form.useForm();
  return (
    <Form form={form} onFinish={console.log} onValuesChange={console.log}>
      <Form.Item label="姓名" name="name" />
      <Form.Item label="手机" name="phone" suffix="cm" />
      <FormItem label="身高" name="name1" suffix="cm" />
      <FormItem label="生日" name="birthday" valueType="date" />
      <View style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
        <Button block onClick={() => form.submit()}>
          提交
        </Button>
      </View>
    </Form>
  );
};
```

## 自定义扩展表单类型

```tsx
/** 扩展组件定义 formItem.tsx */
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
 * 扩展FieldSelect组件的类型简单写法，value值无法根据labelInValue值识别，可以参考性别组件类型定义，提示会更友好
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

```


```tsx
/** 扩展组件使用 */
import { View } from '@tarojs/components';
import { Form } from 'am-taro-form';
import { Button } from '@nutui/nutui-react-taro';
import FormItem from './formItem';

export default function Index() {
  const [form] = Form.useForm();

  return (
    <View>
      <Form form={form} onFinish={console.log} onValuesChange={console.log}>
        <View>
          <Form.Item
            label="姓名"
            name="name"
            valueType="input"
            rules={[{ required: true, message: '请填写姓名' }]}
          />
          <Form.Item label="身高" name="name1" valueType="input" suffix="cm" />
          <Form.Item label="姓名" name="name2" valueType="input" />
          <FormItem label="身高" name="name1" valueType="input" suffix="cm" />
          <FormItem label="性别" name="gender" valueType="gender" labelInValue={false} />
          <FormItem label="是否汉族" name="isHan" valueType="bool" labelInValue={false} />
        </View>
        <View
          style={{ display: 'flex', justifyContent: 'center', padding: 20 }}
        >
          <Button block onClick={() => form.submit()}>
            提交
          </Button>
        </View>
      </Form>
    </View>
  );
}

```

## 预览查看项目

```bash
git clone https://github.com/yigexiaoairen/am-taro-form.git

# 进入项目目录
cd am-taro-form
# 安装依赖
npm install
# 在h5环境启动项目
npm run dev:h5
```
