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

---

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

---

#### `isObj`

`Utils.isObj(target: Object)`

是否是对象

+ **target**: 目标对象。

**示例**
```javascript
Utils.isObj({});
```

---

#### `hasOwn`

`Utils.hasOwn(target: Object, key: String)`

原型

+ **target**: 目标对象。
+ **key**: 键值。

**示例**
```javascript
Utils.hasOwn({}, 'name');
```

---

#### `preZero`

`Utils.preZero(value: Number)`

补零

+ **value**: 目标对象。

**示例**
```javascript
Utils.preZero(1);
```


---

#### `cloneDeep`

`Utils.cloneDeep(target: Object)`

深拷贝对象

+ **target**: 目标对象。

**示例**
```javascript
Utils.cloneDeep({});
```

> 不支持Date/Regex等

---

#### `cloneDeepEasier`

`Utils.cloneDeepEasier(target: Object)`

使用JSON.方法深拷贝对象

+ **target**: 目标对象。

**示例**
```javascript
Utils.cloneDeepEasier({});
```

---

#### `createMixins`

`Utils.createMixins(target: Object)`

给原型注入方法

+ **target**: 目标对象。

**示例**
```javascript
Utils.createMixins(...mixins);
```

---

#### `formatMoney`

`Utils.formatMoney(money: String, options: Object)`

格式化金额

+ **money**: 金额。
+ **options**: 可配置参数。

**示例**
```javascript
Utils.formatMoney(money, {});
```

---

#### `canvas2file`

`Utils.canvas2file(canvas: Object, options: Object)`

图片资源转blob

+ **canvas**: canvas对象。
+ **options**: 可配置参数

**示例**
```javascript
Utils.canvas2file(canvas, {});
```

---

#### `base622Blob`

`Utils.base622Blob(base64: String, filename: String)`

base64 转 Blob

+ **base64**: base64字符串。
+ **filename**: 文件的名字。

**示例**
```javascript
Utils.base622Blob('data:img/jpg;base64', 'name.jpg');
```


---

#### `getWordsLength`

`Utils.getWordsLength(value: String)`

字数统计

+ **value**: 文本。

**示例**
```javascript
Utils.getWordsLength('xxxx\nxxxx');
```

---

#### `sum2array`

`Utils.sum2array(value: Number)`

二进制求和值转数组

+ **value**: 文本。

**示例**
```javascript
Utils.sum2array(3);
```

---

#### `getUid`

`Utils.getUid(prefix: String, options: Object)`

唯一的key值

+ **prefix**: 前缀
+ **options**: 配置项

**示例**
```javascript
Utils.getUid();
```

---

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

---

#### `get`

`Storage.get(key: String, options: Function)`

获取缓存中对应的值

+ **key**: 键值
+ **options**: 配置项

**示例**
```javascript
Storage.get(key);
```

---

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

---

#### `remove`

`Storage.remove(key: String, options: Function)`

清楚缓存

+ **key**: 键值
+ **options**: 配置项

**示例**
```javascript
Storage.remove(key);
```

---

#### `setVersion`

`Storage.setVersion(value: String)`

设置版本号

+ **value**: 版本号

**示例**
```javascript
Storage.setVersion(`1.0.0`);
```

### `Device` 

---

#### `androidChrome`
- type: `Boolean`

---

#### `ipad`
- type: `Boolean`

---

#### `iphone`
- type: `Boolean`

---

#### `android`
- type: `Boolean`

---

#### `ios`
- type: `Boolean`

---

#### `webView`
- type: `Boolean`

---

#### `wechat`
- type: `Boolean`

---

#### `touch`
- type: `Boolean`


### `RegEx` 

---

#### `set`

`RegEx.set(key: String, rule: Object)`

设置版本号

+ **key**: 版本号
+ **rule**: 规则

**示例**
```javascript
RegEx.set('URL', {
	value: /[a-zA-z]+:\/\/[^\s]*/,
	msg: "请填写正确网页地址协议"
});

/**
 * 或者
 */
RegEx.set({
	URL: {
		value: /[a-zA-z]+:\/\/[^\s]*/,
		msg: "请填写正确网页地址协议"
	}
});
```

---

#### `validator`

`RegEx.validator(rule: Object, value: any, next: Function, options: Object)`

验证器（通常是用于async-validator）

+ **rule**: 规则
+ **value**: 参数
+ **next**: 是否允许通过，允许（`next()`）


*rule:* 规则:
+ **value**(required): *String* 规则
+ **msg**(required): *String* 提示语
+ **required**: *Boolean, Function* 是否必填
+ **type**: *Boolean, Function* 类型验证

**示例**
```javascript
RegEx.validator(RegEx.num, '2', (error) => {});
```

---

#### `num`
- type: `Object`

---

#### `integer`
- type: `Object`

---

#### `email`
- type: `Object`

---

#### `time`
- type: `Object`

---

#### `IDCard`
- type: `Object`

---

#### `price`
- type: `Object`

---

#### `mobile`
- type: `Object`

---

#### `phone`
- type: `Object`

---

#### `postalcode`
- type: `Object`

---

#### `zipcode`
- type: `Object`

---

#### `wechat`
- type: `Object`

---

#### `name`
- type: `Object`


### `URL` 

---

#### `merge`

`URL.merge(route: Object, options: Object)`

基于规则构建新的url

+ **route**: 路由规则
+ **options**: 可配置参数

*rule:* 规则:
+ **path**: *String, Array* 路径
+ **query**: *Object* 参数

**示例**
```javascript
URL.merge({
	// path: '/home',
	path: ['/', 'home'],
	query: { name: 'wya-team' }
});
```

---

#### `parse`

`URL.parse(url: String, options: Object)`

解析当前路由 -> `{ query: {}, path: [] }`

+ **url**: 路径，默认值：当前路由
+ **options**: 可配置参数

**示例**
```javascript
URL.parse();
```

---

#### `get`

`URL.get(key: String, url: String, options: Object)`

设置版本号

+ **key**: 参数键值
+ **url**: 路径，默认值：当前路由
+ **options**: 可配置参数

**示例**
```javascript
URL.get('name');
```

### `Calc` 

---

#### `add`

`Calc(value: Number).add(value: Number).val()`

加法

+ **value**: 相加的数

**示例**
```javascript
/**
 * 1 + 1
 */
`Calc(1).add(1).val()`;
```

---

#### `sub`

`Calc(value: Number).sub(value: Number, exchange: Boolean).val()`

减法

+ **value**: 相减的数
+ **exchange**: 默认 false, 互换位置

**示例**
```javascript
/**
 * 1 - 1
 */
`Calc(1).sub(1).val()`;
```

---

#### `mul`

`Calc(value: Number).mul(value: Number).val()`

乘法

+ **value**: 相乘的数

**示例**
```javascript
/**
 * 1 * 1
 */
`Calc(1).mul(1).val()`;
```

---

#### `div`

`Calc(value: Number).div(value: Number, exchange: Boolean).val()`

除法

+ **value**: 相除的数
+ **exchange**: 默认 false, 互换位置

**示例**
```javascript
/**
 * 1 / 1
 */
`Calc(1).div(1).val()`;
```

### `Load` 

---

#### `css`

`Load.css(url: String, options: Object)`

加载css

+ **url**: 链接
+ **options**: 可配置参数

**示例**
```javascript
Load.css('https://wya-team.github.io');
```

---

#### `cssCode`

`Load.cssCode(code: String, options: Object)`

加载cssCode

+ **code**: 代码块
+ **options**: 可配置参数

*options:* 规则:
+ **id**: *String* 避免重复创建

**示例**
```javascript
Load.cssCode('#test { font-size: 12px }');
```

---

#### `removeCSSCode`

`Load.removeCSSCode(id: String)`

删除cssCode

+ **id**: *String* 避免重复创建


**示例**
```javascript
Load.cssCode('test');
```

---


#### `js`

`Load.js(url: String, options: Object)`

加载js

+ **url**: 链接
+ **options**: 可配置参数

**示例**
```javascript
Load.js('https://wya-team.github.io');
```

### `DOM/$` 

---

#### `prefixStyle`

`DOM.prefixStyle(key: String)`

样式兼容前缀

+ **key**: 样式的名字

**示例**
```javascript
DOM.composedPath('transform');
```

---

#### `composedPath`

`DOM.composedPath(event: Object)`

e.taget父层相关path兼容

+ **event**: 当前触发的事件

**示例**
```javascript
DOM.composedPath(event);
```

---

#### `on`

`$(el: String | Object).on(eventName: String, handler: Function)`

注册当前事件

+ **event**: 当前触发的事件

**示例**
```javascript
$(el).on('click', handler);
```

---

#### `off`

`$(el: String | Object).off(eventName: String, handler: Function)`

卸载当前事件

+ **event**: 当前触发的事件

**示例**
```javascript
$(el).off('click', handler);
```

---

#### `once`

`$(el: String | Object).once(eventName: String, handler: Function)`

一次执行当前事件

+ **event**: 当前触发的事件

**示例**
```javascript
$(el).once('click', handler);
```

---

#### `addClass`

`$(el: String | Object).addClass(className: String)`

添加样式

+ **className**: 样式名

**示例**
```javascript
$(el).addClass('g-fs-12');
```

---

#### `removeClass`

`$(el: String | Object).removeClass(className: String)`

移除样式

+ **className**: 样式名

**示例**
```javascript
$(el).removeClass('g-fs-12');
```

---

#### `hasClass`

`$(el: String | Object).hasClass(className: String)`

是否包含当前样式

+ **className**: 样式名

**示例**
```javascript
$(el).hasClass('g-fs-12');
```

---

#### `getStyle`

`$(el: String | Object).getStyle(key: String)`

计算当前元素的样式对应的值（计算属性，css/style）

+ **key**: 样式的名字

**示例**
```javascript
$(el).getStyle('height');
```

---

#### `setStyle`

`$(el: String | Object).setStyle(key: String)`

设置样式

+ **key**: 样式的名字

**示例**
```javascript
$(el).setStyle('height', '100px');
```


---

#### `isScroll`

`$(el: String | Object).isScroll(vertical: Boolean)`

是否含有滚动条

+ **vertical**: 是否垂直方向

**示例**
```javascript
$(el).isScroll();
```

---

#### `getScroller`

`$(el: String | Object).getScroller(vertical: Boolean)`

获取最近的滚动条元素

**示例**
```javascript
$(el).getScroller();
```

---

#### `contains`

`$(el: String | Object).contains(children: Object)`

父层是否包含子层（计算的是x,y,w,h）

+ **children**: 子元素

**示例**
```javascript
$(el).contains(children);
```


---

#### `scrollIntoView`

`$(el: String | Object).scrollIntoView(options: Object)`

父层是否包含子层（计算的是x,y,w,h）

+ **options**: 可配置参数

*options:* 规则:
+ **from**: *Number* 开始
+ **to**: *Number* 结束
+ **duration**: *Number* 持续时间
+ **onEnd**: *Function* 结束后回调
+ **scroller**: *Object* 滚动条

**示例**
```javascript
$(el).scrollIntoView({ });
```

---

### `Decorator` 

---

#### `AutoCatch`

`@Decorator.AutoCatch(type: String | Function)`

自动捕获错误

+ **type**: 'log' | 'error' | '(res) => {}' | 'handleCatch'

**示例**
```javascript
let methods = {
	@Decorator.AutoCatch()
	async request() {
		await xxx
	}
}
```

--- 

#### `Debounce`

`@Decorator.Debounce(wait: Number, options: Object)`

防抖

+ **wait**: 时间戳，默认值：0
+ **options**: 可配置参数

*options:* 规则:
+ **leading**: *Boolean* 指定在延迟开始前调用。 默认值：`false`
+ **trailing**: *Boolean* 指定在延迟结束后调用。 默认值：`true`

**示例**
```javascript
let methods = {
	@Decorator.Debounce()
	async request() {
		await xxx
	}
}
```

--- 

#### `Throttle`

`@Decorator.Throttle(wait: Number, options: Object)`

节流

+ **wait**: 时间戳，默认值：0
+ **options**: 可配置参数

*options:* 规则:
+ **leading**: *Boolean* 指定在延迟开始前调用。 默认值：`true`
+ **trailing**: *Boolean* 指定在延迟结束后调用。 默认值：`true`

**示例**
```javascript
let methods = {
	@Decorator.Throttle()
	async request() {
		await xxx
	}
}
```

--- 

#### `Delay`

`@Decorator.Delay(wait: Number)`

延迟执行（setTimeout）

+ **wait**: 时间戳，默认值：0

**示例**
```javascript
let methods = {
	@Decorator.Delay()
	async request() {
		await xxx
	}
}
```

--- 

#### `Ready`

`@Decorator.Ready(fn: Function)`

在ready函数下执行

+ **fn**: ready函数，'$ready' | 'ready' | '$nextTick' | 'nextTick'

**示例**
```javascript
let methods = {
	@Decorator.Ready(cb => cb())
	async request() {
		await xxx
	}
}
```

--- 

#### `Time`

`@Decorator.Time(logger: Object)`

打印执行的时间长度

+ **logger**: 默认值: `console`

*logger:* 规则:
+ **time**: *Function* 执行前调用。 默认值：`true`
+ **timeEnd**: *Function* 执行后调用 默认值：`true`

**示例**
```javascript
let methods = {
	@Decorator.Time(cb => cb())
	async request() {
		await xxx
	}
}
```

--- 

#### `Deprecated`

`@Decorator.Deprecated(msg: String | Function)`

提示废弃的方法

+ **msg**: 提示语，默认值: `This function will be removed.`

**示例**
```javascript
let methods = {
	@Decorator.Deprecated()
	async request() {
		await xxx
	}
}
```

--- 


## 开源许可类型
MIT

## FAQ
Q: ？  
A: 。


