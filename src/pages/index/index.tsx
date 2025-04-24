import { View } from '@tarojs/components';
import { Form, ListItemStyle } from 'am-taro-form';
import { Button } from '@nutui/nutui-react-taro';
import FormItem from '../components/FormItem';
import './index.scss';

export default function Index(props: any) {
  const [form] = Form.useForm();

  return (
    <View className="index">
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
          <FormItem
            label="生日"
            name="birthday"
            valueType="date"
            startDate={new Date()}
          />
          <FormItem
            label="地区"
            name="area"
            valueType="select"
            labelInValue
            onChange={(v) => console.log(v)}
            options={[
              { value: 1, label: '南京市' },
              { value: 2, label: '无锡市' },
              { value: 3, label: '海北藏族自治区' },
              { value: 4, label: '北京市' },
              { value: 5, label: '连云港市' },
              { value: 8, label: '大庆市' },
              { value: 9, label: '绥化市' },
              { value: 10, label: '潍坊市' },
              { value: 12, label: '乌鲁木齐市' },
            ]}
          />
          <FormItem
            label="工作地"
            name="address"
            valueType="cascader"
            value="鹿城区"
            valueToList
            labelInValue
            options={[
              {
                value: '浙江',
                text: '浙江',
                children: [
                  {
                    value: '杭州',
                    text: '杭州',
                    disabled: true,
                    children: [
                      { value: '西湖区', text: '西湖区', disabled: true },
                      { value: '余杭区', text: '余杭区' },
                    ],
                  },
                  {
                    value: '温州',
                    text: '温州',
                    children: [
                      { value: '鹿城区', text: '鹿城区' },
                      { value: '瓯海区', text: '瓯海区' },
                    ],
                  },
                ],
              },
              {
                value: '湖南',
                text: '湖南',
                disabled: true,
                children: [
                  {
                    value: '长沙',
                    text: '长沙',
                    disabled: true,
                    children: [
                      { value: '芙蓉区', text: '芙蓉区' },
                      { value: '岳麓区', text: '岳麓区' },
                    ],
                  },
                  {
                    value: '岳阳',
                    text: '岳阳',
                    children: [
                      { value: '岳阳楼区', text: '岳阳楼区' },
                      { value: '云溪区', text: '云溪区' },
                    ],
                  },
                ],
              },
              {
                value: '福建',
                text: '福建',
                children: [
                  {
                    value: '福州',
                    text: '福州',
                    children: [
                      { value: '鼓楼区', text: '鼓楼区' },
                      { value: '台江区', text: '台江区' },
                    ],
                  },
                ],
              },
            ]}
          />
          <ListItemStyle label="年龄" clickable>
            kj
          </ListItemStyle>
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
