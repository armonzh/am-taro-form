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
