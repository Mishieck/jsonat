# <img src="https://user-images.githubusercontent.com/57598264/104118015-63a08f80-532e-11eb-9196-92728472296d.png" width="64" height="15" />

JSONAT is a JavaScript library which allows working with most JavaScript native data types in JSON format. JSONAT provides both asynchronous and synchronous ways of working with JSON. You can stringify, parse and fetch data using JSONAT.

## Quick Start

### Installation

a) NPM

`$ npm i jsonat --save`

b) CDN

`<script src="https://unpkg.com/jsonat"></script>`

or

`<script src="https://cdn.jsdelivr.net/npm/jsonat"></script>`


### Using JSONAT

JSON, the property of the window object used to work with JSON data in JavaScript, uses synchronous methods to stringify and parse data. JSONAT has both synchronous and asynchronous variants. To use the asynchronous version, use JSONAT. To use the synchronous version, use JSONATS. When using NPM, both objects are available in the exports object. When using a CDN, both objects are available in the window object. All examples given here use JSONAT, the asynchronous version. The parameters for both variants are the same.

a) Importing JSONAT

`import { JSONAT } from "jsonat";`

b) Importing JSONATS

`import { JSONATS } from "jsonat";`

### Stringify

```javascript
const value = {
  function: () => console.info("Can stringify function"),
  set: new Set([1])
}

const text = await JSONAT.stringify(value);
```

### Parse

```javascript
const value = await JSONAT.parse(text);
```

### Fetch

JSONAT.fetch (or JSONATS.fetch) fetches JSON data using the fetch API of the browser. If the request has a body, the body is stringified. If the response is JSON, it is parsed.

```javascript
const value = await JSONAT.fetch(url, {
  method: "POST",
  body: {
    date: new Date()
  }
});
```

> __Note:__
> Both JSONAT.fetch and JSONATS.fetch are asynchronous.

