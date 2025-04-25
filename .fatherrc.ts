import { defineConfig } from 'father';

export default defineConfig({
  cjs: {
    input: 'src/packages',
  },
  esm: {
    input: 'src/packages',
  },
  prebundle: {
    deps: {},
  },
  extraBabelPresets: [
    ['@babel/preset-react', { runtime: 'automatic' }], // React 17+ 新 JSX 转换
  ],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: '@nutui/nutui-react-taro',
        libraryDirectory: 'dist/esm',
        style: 'css',
        camel2DashComponentName: false,
      },
      'nutui-react-taro',
    ],
  ],
});
