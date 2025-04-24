# am-taro-form

基于taro的跨平台Form表单库

# 本地调试

## 使用本地H5调试

```bash
# 使用npm
npm install
npm run dev:H5

# 使用yarn
yarn install
yarn dev:H5
```

## 也可以自行添加一下脚本在其他平台调试

> 不同平台运行请参考taro官方文档

```JSON
{
  "scripts": {
    "build:weapp": "taro build --type weapp",
    "build:swan": "taro build --type swan",
    "build:alipay": "taro build --type alipay",
    "build:tt": "taro build --type tt",
    "build:h5": "taro build --type h5",
    "build:rn": "taro build --type rn",
    "build:qq": "taro build --type qq",
    "build:jd": "taro build --type jd",
    "build:harmony-hybrid": "taro build --type harmony-hybrid",
    "dev:weapp": "npm run build:weapp -- --watch",
    "dev:swan": "npm run build:swan -- --watch",
    "dev:alipay": "npm run build:alipay -- --watch",
    "dev:tt": "npm run build:tt -- --watch",
    "dev:h5": "npm run build:h5 -- --watch",
    "dev:rn": "npm run build:rn -- --watch",
    "dev:qq": "npm run build:qq -- --watch",
    "dev:jd": "npm run build:jd -- --watch",
    "dev:harmony-hybrid": "npm run build:harmony-hybrid -- --watch"
  }
}
```
