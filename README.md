# <img src="https://user-images.githubusercontent.com/57598264/104122479-de2cd780-534d-11eb-8371-e432af65162a.png" />

JSONAT is a JavaScript library which allows working with most JavaScript native data types in JSON format. JSONAT provides both asynchronous and synchronous ways of working with JSON. You can stringify, parse and fetch data using JSONAT.

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

### __Using JSONAT__

JSON, the property of the window object used to work with JSON data in JavaScript, uses synchronous methods to stringify and parse data. JSONAT has both synchronous and asynchronous variants. To use the asynchronous version, use JSONAT. To use the synchronous version, use JSONATS. When using NPM, both objects are available in the exports object. When using a CDN, both objects are available in the window object. All examples given here use JSONAT, the asynchronous version. The parameters for both variants are the same.

a) Importing JSONAT

`import { JSONAT } from "jsonat";`

b) Importing JSONATS

`import { JSONATS } from "jsonat";`

<br />

### __Stringify__

```javascript
let value = {
  function: () => console.info("Can stringify function"),
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

> __Note:__
> Both JSONAT.fetch and JSONATS.fetch are asynchronous.

<br />
<br />

## __Documentation__

### __Stringify__

#### __Description__

The method `stringify` converts a value to JSON format. For values that JSON fails to stringify, it converts the value into a value that can be used to retrive the original value and wraps it in `"${}"`. The wrapper (`"${}"`) is used to identify these values when parsing.

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

##### __JSONAT__

```javascript
let text = await JSONAT.stringify({

});
```

##### __JSONATS__

```javascript
let text = JSONATS.stringify({

});
```

`text`:

> `> text`<br />
> `> ""`

<br />

### __Parse__

#### __Description__

The method `parse` converts a string in JSON format to a JavaScript value. Its reviver parses values stringified using `stringify`.

#### __Syntax__
`parse(value)`

#### __Parameters__
__*value*__

A string to be converted to a JavaScript value.

> __Note:__
> `stringify` does not take a revover as a parameter. JSONAT uses its own replacer.

#### __Return Value__
A value in a JavaScript data type.


#### __Usage__

##### __JSONAT__

```javascript
let value = await JSONAT.parse("");
```

##### __JSONATS__

```javascript
let value = JSONATS.parse("");
```

`value`:

> `> value`<br />
> `> `

<br />

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

An object used to provide the request options. This parameter is used the same way the [init](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch#parameters) parameter of the `fetch` API of the `window` object.

__*responseType*__ (Optional)
A string which indicates the type of response expected. It takes any of the follwing values:

* `arrayBuffer`
* `blob`
* `formData`
* `json`
* `text`

The default value is `"json"`.

> __Note:__
> `stringify` does not take a revover as a parameter. JSONAT uses its own replacer.

#### __Return Value__
A value with content corresponding to the response type indicated by `responseType`. For example, an `Object` will be returned for `json`, and a `USVString` will be returned for `text`. If `fetch` fails to read the `Response` object to completion, the`Response` object will be returned instead.


#### __Usage__

##### __JSONAT__

```javascript
let value = await JSONAT.fetch(uri, {

});
```

##### __JSONATS__

```javascript
let value = JSONATS.fetch(uri, {
  
});
```

`value`:

> `> value`<br />
> `> `

<br />

### __Parse from Object__

#### __Description__

The method `parseFromObject` parses parts of an object that where stringified using JSONAT format. One case in which one might need to use this is when a JSON string has been parsed using the regular `JSON.parse` method (e.g using `response.json()`) and the parsing leaves the values stringified via `stringify` as strings. Using `parseFromObject` would complete the parsing.

#### __Syntax__
`parseFromObject(value)`

#### __Parameters__
__*value*__

An object with unparsed parts.

#### __Return Value__
An object.


#### __Usage__

##### __JSONAT__

```javascript
let value = await JSONAT.parseFromObject({

});
```

##### __JSONATS__

```javascript
let value = JSONATS.parseFromObject({

});
```

`value`:

> `> value`<br />
> `> `

<br />

### __Data Types__

JSONAT successfully stringifies and parses the following JavaScript native data types, object instances and values:

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
> `undefined` is converted to `null` in order to preserve the key in an object. This is helpful in cases where the keys of an object needs to be iterated or the number of keys needs to be known.
> `WeakSet` and `WeakMap` are not successfully stringified because they are not iterable. However, this may change in the future as suggested by this [proposal](https://github.com/tc39/proposal-weakrefs#iterable-weakmaps).


