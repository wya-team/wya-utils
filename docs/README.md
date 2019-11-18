<p align="center"><image src="https://avatars1.githubusercontent.com/u/34465004?s=400&u=25c4b1279b2f092b368102edac8b7b54dc708d00&v=4" width="128"></p>

# @wya/utils
[![npm][npm-image]][npm-url] [![changelog][changelog-image]][changelog-url]

<!--  以下内容无视  -->
[changelog-image]: https://img.shields.io/badge/changelog-md-blue.svg
[changelog-url]: CHANGELOG.md

[npm-image]: https://img.shields.io/npm/v/@wya/utils.svg
[npm-url]: https://www.npmjs.com/package/@wya/utils

**@wya/utils** 工具集

---

## 安装
``` shell
$ npm install @wya/utils --save
```

---

## 示例

```javascript
import { Utils, Storage, URL, Load } from '@wya/utils';

Utils.getUid();
Utils.set();

Storage.get('[key]');
Storage.set('[key]', {});
Storage.remove('[key]', {});

```

---

## 设置开发环境
克隆仓库之后，运行：

```shell
$ yarn install # 是的，推荐使用 yarn。 :)
```

```shell
# 监听并自动重新构建
$ npm run dev

# 单元测试
$ npm run test

# 构建所有发布文件
$ npm run pub
```

---

## 项目结构
+ **`assets`**: logo 文件。
+ **`config`**: 包含所有和构建过程相关的配置文件。
+ **`docs`**: 项目主页及文档。
+ **`lib`**: 包含用来发布的文件，执行 `npm run lib` 脚本后，这个目录不会被上传。
+ **`tests`**: 包含所有的测试，单元测试使用
+ **`src`**: 源代码目录。
+ **`demo`**: 在线运行的例子。
+ **`examples`**: 在线运行的源代码。

---

## API

### `Utils` 

#### `def`

- `Utils.def(target: Object, key: String, value: any, enumerable: Boolean)`

定义属性

+ **target**: 目标对象。
+ **key**: 键值。
+ **value**: 属性。
+ **enumerable**: 是否可枚举。

**示例**
```javascript
Utils.def({}, 'name', 'wya-utils');
```

#### `isObj`

`Utils.isObj(target: Object)`

是否是对象

+ **target**: 目标对象。

**示例**
```javascript
Utils.isObj({});
```

#### `hasOwn`

`Utils.hasOwn(target: Object, key: String)`

原型

+ **target**: 目标对象。
+ **key**: 键值。

**示例**
```javascript
Utils.hasOwn({}, 'name');
```

#### `preZero`

`Utils.preZero(value: Number)`

补零

+ **value**: 目标对象。

**示例**
```javascript
Utils.preZero(1);
```


#### `cloneDeep`

`Utils.cloneDeep(target: Object)`

深拷贝对象

+ **target**: 目标对象。

**示例**
```javascript
Utils.cloneDeep({});
```

> 不支持Date/Regex等

#### `cloneDeepEasier`

`Utils.cloneDeepEasier(target: Object)`

使用JSON.方法深拷贝对象

+ **target**: 目标对象。

**示例**
```javascript
Utils.cloneDeepEasier({});
```

#### `createMixins`

`Utils.createMixins(target: Object)`

给原型注入方法

+ **target**: 目标对象。

**示例**
```javascript
Utils.createMixins(...mixins);
```

#### `formatMoney`

`Utils.formatMoney(money: String, options: Object)`

格式化金额

+ **money**: 金额。
+ **options**: 可配置参数。

**示例**
```javascript
Utils.formatMoney(money, {});
```

#### `canvas2file`

`Utils.canvas2file(canvas: Object, options: Object)`

图片资源转blob

+ **canvas**: canvas对象。
+ **options**: 可配置参数

**示例**
```javascript
Utils.canvas2file(canvas, {});
```

#### `base622Blob`

`Utils.base622Blob(base64: String, filename: String)`

base64 转 Blob

+ **base64**: base64字符串。
+ **filename**: 文件的名字。

**示例**
```javascript
Utils.base622Blob('data:img/jpg;base64', 'name.jpg');
```


#### `getWordsLength`

`Utils.getWordsLength(value: String)`

字数统计

+ **value**: 文本。

**示例**
```javascript
Utils.getWordsLength('xxxx\nxxxx');
```

#### `sum2array`

`Utils.sum2array(value: Number)`

二进制求和值转数组

+ **value**: 文本。

**示例**
```javascript
Utils.sum2array(3);
```

#### `getUid`

`Utils.getUid(prefix: String, options: Object)`

唯一的key值

+ **prefix**: 前缀
+ **options**: 配置项

**示例**
```javascript
Utils.getUid();
```

#### `set`

`Utils.set(key: String, method: Function)`

唯一的key值

+ **prefix**: 前缀
+ **options**: 配置项

**示例**
```javascript
Utils.set(key, );
```

### `Storage/Cookie` 

#### `get`

`Storage.get(key: String, options: Function)`

获取缓存中对应的值

+ **key**: 键值
+ **options**: 配置项

**示例**
```javascript
Storage.get(key);
```

#### `set`

`Storage.set(key: String, value: any, options: Function)`

设置缓存

+ **key**: 键值
+ **value**: 缓存
+ **options**: 配置项

**示例**
```javascript
Storage.set(key);
```

#### `remove`

`Storage.remove(key: String, options: Function)`

清楚缓存

+ **key**: 键值
+ **options**: 配置项

**示例**
```javascript
Storage.remove(key);
```

#### `setVersion`

`Storage.setVersion(value: String)`

设置版本号

+ **value**: 版本号

**示例**
```javascript
Storage.setVersion(`1.0.0`);
```

### `Device` 

#### `androidChrome`
- type: `Boolean`

#### `ipad`
- type: `Boolean`

#### `iphone`
- type: `Boolean`

#### `android`
- type: `Boolean`

#### `ios`
- type: `Boolean`

#### `webView`
- type: `Boolean`

#### `wechat`
- type: `Boolean`

#### `touch`
- type: `Boolean`


### `RegEx` 

#### `set`

`RegEx.set(key: String, rule: Object)`

设置版本号

+ **key**: 版本号
+ **rule**: 规则

**示例**
```javascript
RegEx.set('email', { });
```

---

## 开源许可类型
MIT

## FAQ
Q: ？  
A: 。


