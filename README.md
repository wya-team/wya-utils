# wya-utils
[![npm][npm-image]][npm-url] [![changelog][changelog-image]][changelog-url]

## 安装

```vim
npm install wya-utils --save
```

## 工具方法
- `setCookie = (key, val, days, path, domain, opts)`

属性 | 说明 | 类型 | 默认值
---|---|---|---
key | - | `str` | -
val | - | `any` | -
days | - | `num` | 0.5（天）
path | 域名下的目录 | `str` | /
domain | 域名 | `str` | -
opts | 自定义参数 | `obj` | {}

- `delCookie = (key, path, domain, opts)`

属性 | 说明 | 类型 | 默认值
---|---|---|---
key | - | `str` | -
path | 域名下的目录 | `str` | /
domain | 域名 | `str` | -
opts | 自定义参数 | `obj` | {}

- `getCookie = (key, opts)`

属性 | 说明 | 类型 | 默认值
---|---|---|---
key | - | `str` | -
opts | 自定义参数 | `obj` | {}

- `setItem(key, val, type, opts)`
- `getItem(key, type, opts)`
- `delItem(key, type, opts)`
- `getDevice(opts)`
- `getConstructUrl(route, opts)`
- `getParseUrl(windowHash, opts)`
- `getHashUrl(url, paramObj, opts)`
- `getUrlParam(key, urlInfo, opts)`
- `objRegex`
- `changeObjRegex(rule, opts)`
- `dataValidity(rule, value, callback, opts)`
- `getCroppedImg(canvas, fileName, getFile, opts)`
- `defineProperty(obj, key, value, opts)`
- `getFormatInputMoney(string, opts = {})`
- `accAdd(arg1, arg2, opts = {})`
- `accSub(arg1, arg2, opts = {})`
- `accMul(arg1, arg2, opts = {})`
- `accDiv(arg1, arg2, opts = {})`
...

<!--  以下内容无视  -->
[changelog-image]: https://img.shields.io/badge/changelog-md-blue.svg
[changelog-url]: CHANGELOG.md

[npm-image]: https://img.shields.io/npm/v/wya-utils.svg
[npm-url]: https://www.npmjs.com/package/wya-utils
