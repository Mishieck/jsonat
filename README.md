# <img src="https://user-images.githubusercontent.com/57598264/104338431-2c350d00-54ff-11eb-8293-73f2ac3f9aa3.png" />

JSONAT is a JavaScript library for working with most JavaScript native data structures in [JSON](http://www.json.org/fatfree.html) format. JSONAT provides both asynchronous (`JSONAT`) and synchronous (`JSONATS`) ways of working with JSON. You can stringify, parse and fetch data using JSONAT.

## __Quick Start__

### __Installation__

a) NPM

`$ npm i jsonat --save`

b) CDN

`<script src="https://unpkg.com/jsonat"></script>`

or

`<script src="https://cdn.jsdelivr.net/npm/jsonat"></script>`


### __Importing__

<br />

a) JSONAT

`import { JSONAT } from "jsonat";`

b) JSONATS

`import { JSONATS } from "jsonat";`


### __Stringify__

```javascript
let value = {
  function: () => console.info("Can stringify function."),
  set: new Set([1])
}

let text = await JSONAT.stringify(value);
```

### __Parse__

```javascript
let value = await JSONAT.parse(text);
```

### __Fetch__

```javascript
let value = await JSONAT.fetch(url, {
  method: "POST",
  body: {
    date: new Date()
  }
});
```

### __Parse Partial__

```javascript
let value = await JSONAT.parsePartial({
  primaryColor: "${Uint8ClampedArray([240, 219, 79])}"
});
```

<hr />

## __Documentation__

### Table of Contents

- [__Introduction__](#introduction)
- [__Stringify__](#stringify-1)
  - [__Description__](#description)
  - [__Syntax__](#syntax)
  - [__Parameters__](#parameters)
  - [__Return Value__](#return-value)
  - [__Usage__](#usage)
    - [_JSONAT:_](#jsonat)
    - [_JSONATS:_](#jsonats)
- [__Parse__](#parse-1)
  - [__Description__](#description-1)
  - [__Syntax__](#syntax-1)
  - [__Parameters__](#parameters-1)
  - [__Return Value__](#return-value-1)
  - [__Usage__](#usage-1)
    - [_JSONAT:_](#jsonat-1)
    - [_JSONATS:_](#jsonats-1)
- [__Fetch__](#fetch-1)
  - [__Description__](#description-2)
  - [__Syntax__](#syntax-2)
  - [__Parameters__](#parameters-2)
  - [__Parameters__](#parameters-3)
  - [__Return Value__](#return-value-2)
  - [__Usage__](#usage-2)
    - [_JSONAT:_](#jsonat-2)
    - [_JSONATS:_](#jsonats-2)
- [__Parse Partial__](#parse-partial-1)
  - [__Description__](#description-3)
  - [__Syntax__](#syntax-3)
  - [__Parameters__](#parameters-4)
  - [__Return Value__](#return-value-3)
  - [__Usage__](#usage-3)
    - [_JSONAT:_](#jsonat-3)
    - [_JSONATS:_](#jsonats-3)
- [__Data Types__](#data-types)
  - [__JSON__](#json)
  - [__JSONAT__](#jsonat-4)
  - [__Special Cases__](#special-cases)
- [__Security Concerns__](#security-concerns)

### __Introduction__

JSONAT provides a way to work with most JavaScript native data structures in JSON format. `JSON`, the property of the window object used to work with JSON data in JavaScript, uses synchronous methods to stringify and parse data. JSONAT has both synchronous and asynchronous variants. To use the asynchronous version, use `JSONAT`. To use the synchronous version, use `JSONATS`. When using NPM, both objects are available in the exports object. When using a CDN, both objects are available in the window object. All examples given in this documentation use JSONAT, the asynchronous version. The parameters for both variants are the same.

### __Stringify__

#### __Description__

The method `stringify` converts a value to JSON format. For values that `JSON` does not support, it converts the value into a value that can be used to retrive the original value and wraps it in `"${}"`. The wrapper (`"${}"`) is used to identify these values when parsing.

#### __Syntax__
`stringify(value [, space])`

#### __Parameters__
__*value*__

A value to be converted to JSON.

__*space*__ (Optional)

A `String` or `Number` used for formatting JSON when displaying for readability purposes. This parameter works the same way as the equivalent parameter in `JSON.stringify`.

> __Note:__
> `stringify` does not take a replacer as a parameter. JSONAT uses its own replacer.

#### __Return Value__
A string representing the value in JSON format.

#### __Usage__

##### _JSONAT:_

```javascript
let text = await JSONAT.stringify({
  maximum: Infinity,
  deepClone: async obj => await JSONAT.parse(await JSONAT.stringify(obj))
});
```

##### _JSONATS:_

```javascript
let text = JSONATS.stringify({
  maximum: Infinity,
  deepClone: async obj => await JSONAT.parse(await JSONAT.stringify(obj))
});
```

`text`:

> `> text`<br />
> `> {"maximum":"${Infinity}","deepClone":"${Function(async obj => await JSONAT.parse(await JSONAT.stringify(obj)))}"}`

### __Parse__

#### __Description__

The method `parse` converts a string in JSON format to a JavaScript value. It uses a reviver taht revives values stringified using `stringify`.

#### __Syntax__
`parse(value)`

#### __Parameters__
__*value*__

A string to be converted to a JavaScript value.

> __Note:__
> `stringify` does not take a reviver as a parameter. JSONAT uses its own reviver.

#### __Return Value__
A value in a JavaScript data structure.

#### __Usage__

##### _JSONAT:_

```javascript
let value = await JSONAT.parse('{"maximum":"${Infinity}","deepClone":"${Function(async obj => await JSONAT.parse(await JSONAT.stringify(obj)))}"}');
```

##### _JSONATS:_

```javascript
let value = JSONATS.parse('{"maximum":"${Infinity}","deepClone":"${Function(async obj => await JSONAT.parse(await JSONAT.stringify(obj)))}"}');
```

`value`:

> `> value`<br />
> `> {maximum: Infinity, deepClone: ƒ}`

### __Fetch__

#### __Description__

The method `fetch` fetches data using the `fetch` API of the `window` object. If the request has a body, the body is stringified. If the response is JSON, it is parsed.

#### __Syntax__
`fetch(uri [, options])`

#### __Parameters__
__*uri*__

A URI string used to locate a resource.

#### __Parameters__
__*options*__ (Optional)

Format:
```javascript
{
  init,
  responseType
}
```

__*init*__

An object used to provide the request options. This parameter is used the same way as the [init](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters) parameter of the `fetch` API of the `window` object.

__*responseType*__ (Optional)

A string which indicates the type of response expected. It takes any of the follwing values:

* `arrayBuffer`
* `blob`
* `formData`
* `json`
* `text`

The default value is `"json"`.

#### __Return Value__
A value with content corresponding to the response type indicated by `responseType`. For example, an `Object` will be returned for `json`, and a `USVString` will be returned for `text`. If `fetch` fails to read the `Response` object to completion, the `Response` object will be returned instead.

#### __Usage__

##### _JSONAT:_

```javascript
let value = await JSONAT.fetch("https://api.genderize.io?name=lucy");
```

##### _JSONATS:_

```javascript
let value = JSONATS.fetch("https://api.genderize.io?name=lucy");
```

`value`:

> `> value`<br />
> `> {name: "lucy", gender: "female", probability: 0.97, count: 24812}`

<br />

### __Parse Partial__

#### __Description__

The method `parsePartial` can parse values as `parse` can, but can also parse objects and arrays that are partially parsed. One case in which one might need to use this is when a JSON string has been parsed using the regular `JSON.parse` method (e.g using `response.json()`) and the parsing leaves the values stringified via `stringify` as strings. Using `parsePartial` would complete the parsing.

#### __Syntax__
`parsePartial(value)`

#### __Parameters__
__*value*__

An unparsed value or value with unparsed parts.

#### __Return Value__
The completely parsed value.

#### __Usage__

##### _JSONAT:_

```javascript
let value = await JSONAT.parsePartial({
  primaryColor: "${Uint8ClampedArray([240, 219, 79])}"
});
```

##### _JSONATS:_

```javascript
let value = JSONATS.parsePartial({
  primaryColor: "${Uint8ClampedArray([240, 219, 79])}"
});
```

`value`:

> `> value`<br />
> `> {primaryColor: Uint8ClampedArray(3)}`

### __Data Types__

#### __JSON__

JSON supports the following data types:

* `null`
* `boolean`
* `number`
* `string`
* `object`
* `array`

#### __JSONAT__

JSONAT supports the following data types:

* `null`
* `boolean`
* `number`
  * normal (e.g `1`)
  * `NaN`
  * `Infinity`
  * `-Infinity`
* `string`
* `function`
* `object`
  * `Date`
  * `RegExp`
  * `Set`
  * `Map`
  * `Array`
    * normal (e.g `[1]`)
    * `Int8Array`
    * `Uint8Array`
    * `Uint8ClampedArray`
    * `Int16Array`
    * `Uint16Array`
    * `Int32Array`
    * `Uint32Array`
    * `Float32Array`
    * `Float64Array`
    * `BitInt64Array`
    * `BigUint64Array`
* `bigint`
* `symbol` (values and symbol keys)

#### __Special Cases__

* `Boolean`: stringified and parsed to `boolean`
* `Number`: stringified and parsed to `number`
* `String`: stringified and parsed to `string`
* `undefined`: stringified to `"${undefined}"` and parsed to `null`.
* `WeakSet`: stringified to `"${Set([])}"` and parsed to `new Set([])`.
* `WeakMap`: stringified to `"${WeakMap([])}"` and parsed to `new WeakMap([])`.

> __Note:__<br />
> The value `undefined` is converted to `null` in order to preserve keys in an object. This is helpful in cases where the keys of an object need to be iterated over or the number of keys needs to be known.
> `WeakSet` and `WeakMap` are not successfully stringified because they are not iterable. However, this may change in the future as suggested by this [proposal](https://github.com/tc39/proposal-weakrefs#iterable-weakmaps).

### __Security Concerns__
JSONAT uses `eval` to revive functions. There are some security issues associated with `eval`. This [answer](https://security.stackexchange.com/a/94020) on StackExchange provides an insight into such security issues.

<hr />

## Contributing

Refer to our [Contributing to JSONAT](https://github.com/Mishieck/jsonat/main/CONTRIBUTING.md) guide for information concerning contributing.

## Contact Us

You can contact us via email at <jsonat4otypes@gmail.com>.

## License

This library is under the [MIT License](http://choosealicense.com/licenses/mit/).