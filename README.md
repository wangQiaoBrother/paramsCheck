## params-filter

### 介绍

- 递归对象或者数组多层处理 null 或者 undefined 替换成空字符串
- 场景 1，处理后台返回接口所有字段 null 或者 undefined
- 支持 node 和 es6 模块引入

## 安装及使用

```js
1. 安装

  npm install params-filter 或者 yarn add params-filter

2. 引入

  node模块：const params = require('params-filter')

  es6模块：import { paramsFilter } from 'params-filter'
  
3. 使用

  import方式：paramsFilter({a: 1, b: 2,c: null})

  require方式：params.paramsFilter({a: 1, b: 2,c: null})
```

## 示例

```js
1. { a: null, c: 2, b: null, d: [{ e: undefined }] }
  处理成
  { a: '', c: 2, b: '', d: [{ e: '' }] }
2. [{ a: null, c: 2, b: null, d: [{ e: undefined }] }]
  处理成
  [{ a: '', c: 2, b: '', d: [{ e: '' }] }]
```

**强烈推荐福利！！！每天免费领取饿了么，美团外卖红包（买菜，点美食都可以）**

<div align="left">
  <img src="https://user-images.githubusercontent.com/21699695/221159459-81384c4b-67a0-4616-b885-515965989fa4.png" alt="Editor" width="600">
</div>

## LICENSE
[MIT](https://github.com/liuxing/translator-cli/blob/master/LICENSE)
