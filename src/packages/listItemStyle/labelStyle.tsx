import { Text, View } from '@tarojs/components';

const LabelStyle = (props: any) => {
  const { text, required } = props;

  return (
    <View className="list-item-style-label">
      {required ? <Text className="list-item-style-label-required">*</Text> : null}
      {text}
    </View>
  );
};

export default LabelStyle;
