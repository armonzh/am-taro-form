import { defineConfig } from 'father';

export default defineConfig({
  cjs: {
    input: 'src/packages',
  },
  esm: {
    input: 'src/packages',
  },
  prebundle: {
    deps: {}
  },
  extraBabelPresets: [
    ['@babel/preset-react', { runtime: 'automatic' }] // React 17+ 新 JSX 转换
  ],
});
