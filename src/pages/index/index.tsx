import { View } from '@tarojs/components';
import { Form, ListItemStyle } from 'am-taro-form';
import { Button } from '@nutui/nutui-react-taro';
import './index.scss'

export default function Index (props: any) {
  const [form] = Form.useForm();

  return (
    <View className="index">
      <Form form={form} onFinish={console.log} >
        <View>
          <Form.Item label="姓名" name="name" valueType="input" rules={[{ required: true, message: '请填写姓名' }]} />
          <Form.Item label="身高" name="name1" valueType="input" suffix="cm" />
          <Form.Item label="姓名" name="name2" valueType="input" />
          <ListItemStyle label="年龄" clickable>kj</ListItemStyle>
        </View>
        <View style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
          <Button block onClick={() => form.submit()}>提交</Button>
        </View>
      </Form>
    </View>
  )
}
