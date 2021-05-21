# Documentation

### Table of Contents

- [Documentation](#documentation)
    - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Stringify](#stringify)
    - [Description](#description)
    - [Syntax](#syntax)
    - [Parameters](#parameters)
    - [Return Value](#return-value)
    - [Example](#example)
      - [JSONAT](#jsonat)
      - [JSONATS](#jsonats)
  - [Parse](#parse)
    - [Description](#description-1)
    - [Syntax](#syntax-1)
    - [Parameters](#parameters-1)
    - [Return Value](#return-value-1)
    - [Example](#example-1)
      - [JSONAT](#jsonat-1)
      - [JSONATS](#jsonats-1)
  - [Fetch](#fetch)
    - [Description](#description-2)
    - [Syntax](#syntax-2)
    - [Parameters](#parameters-2)
      - [__Return Value__](#return-value-2)
    - [Fetch Options](#fetch-options)
      - [Structure](#structure)
      - [Properties](#properties)
    - [Example](#example-2)
      - [JSONAT](#jsonat-2)
      - [JSONATS](#jsonats-2)
  - [Parse Partial](#parse-partial)
    - [Description](#description-3)
    - [Syntax](#syntax-3)
    - [Parameters](#parameters-3)
    - [Return Value](#return-value-3)
    - [Example](#example-3)
      - [JSONAT](#jsonat-3)
      - [JSONATS](#jsonats-3)
  - [Data Types](#data-types)
    - [JSON](#json)
    - [JSONAT](#jsonat-4)
    - [Special Cases](#special-cases)
  - [Security Concerns](#security-concerns)

## Introduction

JSONAT provides a way to work with most JavaScript native data types in JSON format. `JSON`, the property of the window object used to work with JSON data in JavaScript, uses synchronous methods to stringify and parse data. JSONAT has both synchronous and asynchronous variants. To use the asynchronous version, use `JSONAT`. To use the synchronous version, use `JSONATS`. When using NPM, both objects are available in the exports object. When using a CDN, both objects are available in the window object.

## Stringify

### Description

The method `stringify` converts a value to JSON format. For values that `JSON` does not support, it converts the value into a value that can be used to retrive the original value and wraps it in `"${}"`. The wrapper (`"${}"`) is used to identify these values when parsing.

### Syntax

```js
stringify(value [, space])
```

### Parameters

- `value`:
  - Type: `any`
  - Required: Yes
  - Usage: A value to be converted to JSON.
- `space`:
  - Type: `string` | `number`
  - Usage: Used for formatting JSON when displaying for readability purposes. This parameter works the same way as the equivalent parameter in `JSON.stringify`.

> __Note:__
> `stringify` does not take a replacer as a parameter. JSONAT uses its own replacer.

### Return Value

A `string` representing the value in JSON format.

### Example

#### JSONAT

```js
let text = await JSONAT.stringify({
  maximum: Infinity,
  deepClone: async obj => await JSONAT.parse(await JSONAT.stringify(obj))
});
```

#### JSONATS

```js
let text = JSONATS.stringify({
  maximum: Infinity,
  deepClone: async obj => await JSONAT.parse(await JSONAT.stringify(obj))
});
```

`text`:

> `> text`<br />
> `> {"maximum":"${Infinity}","deepClone":"${Function(async obj => await JSONAT.parse(await JSONAT.stringify(obj)))}"}`

## Parse

### Description

The method `parse` converts a string in JSON format to a JavaScript value. It uses a reviver that revives values stringified using `stringify`.

### Syntax

```js
parse(value)
```

### Parameters

- `value`:
  - Type: `string`
  - Required: Yes
  - Usage: Converted to a JavaScript value.

> __Note:__
> `stringify` does not take a reviver as a parameter. JSONAT uses its own reviver.

### Return Value

A value in a JavaScript data structure.

### Example

#### JSONAT

```js
let value = await JSONAT.parse('{"maximum":"${Infinity}","deepClone":"${Function(async obj => await JSONAT.parse(await JSONAT.stringify(obj)))}"}');
```

#### JSONATS

```js
let value = JSONATS.parse('{"maximum":"${Infinity}","deepClone":"${Function(async obj => await JSONAT.parse(await JSONAT.stringify(obj)))}"}');
```

`value`:

> `> value`<br />
> `> {maximum: Infinity, deepClone: ƒ}`

## Fetch

### Description

The method `fetch` fetches data using the `fetch` API of the `window` object. If the request has a body, the body is stringified. If the response is JSON, it is parsed.

### Syntax

```js
fetch(uri [, options])
```

### Parameters

- `uri`:
  - Type: `string`
  - Required: Yes
  - Usage: Used to locate a resource.
- `options`:
  - Type: `Object`
  - Required: No.
  - Usage: Used to specify the options for fetching.
  - Reference: [Fetch Options](#fetch-options).

#### __Return Value__
A value with content corresponding to the response type indicated by `responseType`. For example, an `Object` will be returned for `"json"`, and a `USVString` will be returned for `"text"`. If `fetch` fails to read the `Response` object to completion, the `Response` object will be returned instead.

### Fetch Options

Used to specify the options for fetching.

#### Structure

```js
{
  init,
  responseType
}
```

#### Properties

- `init`:
  - Type: `Object`
  - Required: No.
  - Usage: Provides the request options. This parameter is used the same way as the [init](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters) parameter of the `fetch` API of the `window` object.

- `responseType`:
  - Type: `string`
  - Required: No.
  - Usage: Indicates the type of response expected. The default value is `"json"`. It takes any of the following values:
    - `"arrayBuffer"`
    - `"blob"`
    - `"formData"`
    - `"json"`
    - `"text"`

### Example

#### JSONAT

```js
let value = await JSONAT.fetch("https://api.genderize.io?name=lucy");
```

#### JSONATS

```js
let value = JSONATS.fetch("https://api.genderize.io?name=lucy");
```

`value`:

> `> value`<br />
> `> {name: "lucy", gender: "female", probability: 0.97, count: 24812}`

## Parse Partial

### Description

The method `parsePartial` can parse values as `parse` can, but can also parse objects and arrays that are partially parsed. One case in which one might need to use this is when a JSON string has been parsed using the regular `JSON.parse` method (e.g using `response.json()`) and the parsing leaves the values stringified via `stringify` as strings. Using `parsePartial` would complete the parsing.

### Syntax

```js
parsePartial(value)
```

### Parameters

- `value`:
  - Type: `any`
  - Required: Yes
  - Usage: Unparsed value or value with unparsed parts.

### Return Value

A completely parsed value.

### Example

#### JSONAT

```js
let value = await JSONAT.parsePartial({
  primaryColor: "${Uint8ClampedArray([240, 219, 79])}"
});
```

#### JSONATS

```js
let value = JSONATS.parsePartial({
  primaryColor: "${Uint8ClampedArray([240, 219, 79])}"
});
```

`value`:

> `> value`<br />
> `> {primaryColor: Uint8ClampedArray(3)}`

## Data Types

### JSON

JSON supports the following data types:

- `null`
- `boolean`
- `number`
- `string`
- `object`
- `array`

### JSONAT

JSONAT supports the following data types:

- `null`
- `boolean`
- `number`
  - normal (e.g `1`)
  - `NaN`
  - `Infinity`
  - `-Infinity`
- `string`
- `function`
- `object`
  - `Date`
  - `RegExp`
  - `Set`
  - `Map`
  - `Array`
    - normal (e.g `[1]`)
    - `Int8Array`
    - `Uint8Array`
    - `Uint8ClampedArray`
    - `Int16Array`
    - `Uint16Array`
    - `Int32Array`
    - `Uint32Array`
    - `Float32Array`
    - `Float64Array`
    - `BitInt64Array`
    - `BigUint64Array`
- `bigint`
- `symbol` (values and symbol keys)

### Special Cases

- `Boolean`: stringified and parsed to `boolean`
- `Number`: stringified and parsed to `number`
- `String`: stringified and parsed to `string`
- `undefined`: stringified to `"${undefined}"` and parsed to `null`.
- `WeakSet`: stringified to `"${Set([])}"` and parsed to `new Set([])`.
- `WeakMap`: stringified to `"${WeakMap([])}"` and parsed to `new WeakMap([])`.

> __Note:__<br />
> The value `undefined` is converted to `null` in order to preserve keys in an object. This is helpful in cases where the keys of an object need to be iterated over, or the number of keys needs to be known.
> `WeakSet` and `WeakMap` are not successfully stringified because they are not iterable. However, this may change in the future as suggested by this [proposal](https://github.com/tc39/proposal-weakrefs#iterable-weakmaps).

## Security Concerns

JSONAT uses `eval` to revive functions. There are some security issues associated with `eval`. This [answer](https://security.stackexchange.com/a/94020) on StackExchange provides some insight into such security issues.
