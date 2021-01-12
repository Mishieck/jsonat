# <img src="https://user-images.githubusercontent.com/57598264/104122479-de2cd780-534d-11eb-8371-e432af65162a.png" />

JSONAT is a JavaScript library which enables working with most JavaScript native data structures in [JSON](http://www.json.org/fatfree.html) format. JSONAT provides both asynchronous and synchronous ways of working with JSON. You can stringify, parse and fetch data using JSONAT.

<br />

## __Quick Start__

### __Installation__

a) NPM

`$ npm i jsonat --save`

b) CDN

`<script src="https://unpkg.com/jsonat"></script>`

or

`<script src="https://cdn.jsdelivr.net/npm/jsonat"></script>`

<br />

### __Importing__

<br />

a) JSONAT

`import { JSONAT } from "jsonat";`

b) JSONATS

`import { JSONATS } from "jsonat";`

<br />

### __Stringify__

```javascript
let value = {
  function: () => console.info("Can stringify function."),
  set: new Set([1])
}

let text = await JSONAT.stringify(value);
```

<br />

### __Parse__

```javascript
let value = await JSONAT.parse(text);
```

<br />

### __Fetch__

```javascript
let value = await JSONAT.fetch(url, {
  method: "POST",
  body: {
    date: new Date()
  }
});
```

<br />

### __Parse Partial__

```javascript
let value = await JSONAT.parsePartial({
  primaryColor: "${Uint8ClampedArray([240, 219, 79])}"
});
```

<br />
<hr />
<br />

## __Documentation__


### Table of Contents
- [<img src="https://user-images.githubusercontent.com/57598264/104122479-de2cd780-534d-11eb-8371-e432af65162a.png" />](#)
  - [__Quick Start__](#quick-start)
    - [__Installation__](#installation)
    - [__Importing__](#importing)
    - [__Stringify__](#stringify)
    - [__Parse__](#parse)
    - [__Fetch__](#fetch)
    - [__Parse from Object__](#parse-from-object)
  - [__Documentation__](#documentation)
    - [Table of Contents](#table-of-contents)
    - [__Introduction__](#introduction)
    - [__Stringify__](#stringify-1)
      - [__Description__](#description)
      - [__Syntax__](#syntax)
      - [__Parameters__](#parameters)
      - [__Return Value__](#return-value)
      - [__Usage__](#usage)
        - [JSONAT](#jsonat)
        - [JSONATS](#jsonats)
    - [__Parse__](#parse-1)
      - [__Description__](#description-1)
      - [__Syntax__](#syntax-1)
      - [__Parameters__](#parameters-1)
      - [__Return Value__](#return-value-1)
      - [__Usage__](#usage-1)
        - [JSONAT](#jsonat-1)
        - [JSONATS](#jsonats-1)
    - [__Fetch__](#fetch-1)
      - [__Description__](#description-2)
      - [__Syntax__](#syntax-2)
      - [__Parameters__](#parameters-2)
      - [__Parameters__](#parameters-3)
      - [__Return Value__](#return-value-2)
      - [__Usage__](#usage-2)
        - [JSONAT](#jsonat-2)
        - [JSONATS](#jsonats-2)
    - [__Parse from Object__](#parse-from-object-1)
      - [__Description__](#description-3)
      - [__Syntax__](#syntax-3)
      - [__Parameters__](#parameters-4)
      - [__Return Value__](#return-value-3)
      - [__Usage__](#usage-3)
        - [JSONAT](#jsonat-3)
        - [JSONATS](#jsonats-3)
    - [__Data Types__](#data-types)
      - [__Special Cases__](#special-cases)
    - [__Security Concerns__](#security-concerns)

<br />
<br />

### __Introduction__

JSONAT provides a way to work with most JavaScript native data structures in JSON format. `JSON`, the property of the window object used to work with JSON data in JavaScript, uses synchronous methods to stringify and parse data. JSONAT has both synchronous and asynchronous variants. To use the asynchronous version, use `JSONAT`. To use the synchronous version, use `JSONATS`. When using NPM, both objects are available in the exports object. When using a CDN, both objects are available in the window object. All examples given here use JSONAT, the asynchronous version. The parameters for both variants are the same.

<br />

### __Stringify__

#### __Description__

The method `stringify` converts a value to JSON format. For values that `JSON` does not support, it converts the value into a value that can be used to retrive the original value and wraps it in `"${}"`. The wrapper (`"${}"`) is used to identify these values when parsing.

<br />

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

<br />

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

<br />

`text`:

> `> text`<br />
> `> {"maximum":"${Infinity}","deepClone":"${Function(async obj => await JSONAT.parse(await JSONAT.stringify(obj)))}"}`

<br />

### __Parse__

#### __Description__

The method `parse` converts a string in JSON format to a JavaScript value. Its reviver parses values stringified using `stringify`.

<br />

#### __Syntax__
`parse(value)`

#### __Parameters__
__*value*__

A string to be converted to a JavaScript value.

<br />

> __Note:__
> `stringify` does not take a revover as a parameter. JSONAT uses its own replacer.

<br />

#### __Return Value__
A value in a JavaScript data structure.

<br />

#### __Usage__

##### _JSONAT:_

```javascript
let value = await JSONAT.parse('{"maximum":"${Infinity}","deepClone":"${Function(async obj => await JSONAT.parse(await JSONAT.stringify(obj)))}"}');
```

##### _JSONATS:_

```javascript
let value = JSONATS.parse('{"maximum":"${Infinity}","deepClone":"${Function(async obj => await JSONAT.parse(await JSONAT.stringify(obj)))}"}');
```

<br />

`value`:

> `> value`<br />
> `> {maximum: Infinity, deepClone: ƒ}`

<br />

### __Fetch__

#### __Description__

The method `fetch` fetches data using the `fetch` API of the `window` object. If the request has a body, the body is stringified. If the response is JSON, it is parsed.

<br />

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

<br />

> __Note:__
> `stringify` does not take a reviver as a parameter. JSONAT uses its own replacer.

<br />

#### __Return Value__
A value with content corresponding to the response type indicated by `responseType`. For example, an `Object` will be returned for `json`, and a `USVString` will be returned for `text`. If `fetch` fails to read the `Response` object to completion, the `Response` object will be returned instead.

<br />

#### __Usage__

##### _JSONAT:_

```javascript
let value = await JSONAT.fetch("https://api.genderize.io?name=lucy");
```

##### _JSONATS:_

```javascript
let value = JSONATS.fetch("https://api.genderize.io?name=lucy");
```

<br />

`value`:

> `> value`<br />
> `> {name: "lucy", gender: "female", probability: 0.97, count: 24812}`

<br />

### __Parse Partial__

#### __Description__

The method `parsePartial` can parse values as `parse` can, but can also parse objects and arrays that are partially parsed. One case in which one might need to use this is when a JSON string has been parsed using the regular `JSON.parse` method (e.g using `response.json()`) and the parsing leaves the values stringified via `stringify` as strings. Using `parsePartial` would complete the parsing.

<br />

#### __Syntax__
`parsePartial(value)`

#### __Parameters__
__*value*__

An unparsed value or value with unparsed parts.

#### __Return Value__
The completly parsed value.

<br />

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

<br />

`value`:

> `> value`<br />
> `> {primaryColor: Uint8ClampedArray(3)}`

<br />

### __Data Types__

#### __JSON__

JSON supports the following data types:

* `null`
* `boolean`
* `number`
* `string`
* `object`
* `array`

<br />

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

<br />

#### __Special Cases__

* `Boolean`: stringified and parsed to `boolean`
* `Number`: stringified and parsed to `number`
* `String`: stringified and parsed to `string`
* `undefined`: stringified to `"${undefined}"` and parsed to `null`.
* `WeakSet`: stringified to `"${Set([])}"` and parsed to `new Set([])`.
* `WeakMap`: stringified to `"${WeakMap([])}"` and parsed to `new WeakMap([])`.

<br />

> __Note:__<br />
> The value `undefined` is converted to `null` in order to preserve keys in an object. This is helpful in cases where the keys of an object need to be iterated over or the number of keys needs to be known.
> `WeakSet` and `WeakMap` are not successfully stringified because they are not iterable. However, this may change in the future as suggested by this [proposal](https://github.com/tc39/proposal-weakrefs#iterable-weakmaps).

<br />

### __Security Concerns__
JSONAT uses `eval` to revive functions. There are some security issues associated with `eval`. This [answer](https://security.stackexchange.com/a/94020) on StackExchange provides an insight into such security issues.

