import { Divider } from '@nutui/nutui-react-taro';
import { View } from '@tarojs/components';

const DividerStyle = (props: any) => {
  const { text, type, style, className } = props;

  const dividerProps: any = { className, style };
  const dividerStyle = Object.assign(
    {
      marginTop: 0,
      marginBottom: 0,
    },
    style,
  );

  if (text || text === 0) {
    dividerProps.contentPosition = 'left';
  }

  if (type === 'error') {
    Object.assign(dividerStyle, { color: 'red' });
  }

  return (
    <View className="list-item-style-divider">
      <Divider {...dividerProps} style={dividerStyle}>
        {text}
      </Divider>
    </View>
  );
};

export default DividerStyle;
