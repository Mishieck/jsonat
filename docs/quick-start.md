# Quick Start Guide

## Installation

### NPM

`$ npm i jsonat --save`

### CDN

`<script src="https://cdn.jsdelivr.net/npm/jsonat"></script>`

or

`<script src="https://unpkg.com/jsonat"></script>`

## Importing

### JSONAT

```js
import { JSONAT } from "jsonat";
```

### JSONATS

```js
import { JSONATS } from "jsonat";
```

## Stringify

```js
let value = {
  function: () => console.info("Can stringify function."),
  set: new Set([1])
}

let text = await JSONAT.stringify(value);
```

## Parse

```js
let value = await JSONAT.parse('{"name":"JSONAT"}');
```

## Fetch

```js
let value = await JSONAT.fetch("https://api.genderize.io?name=john");
```

## Parse Partial

```js
let value = await JSONAT.parsePartial({
  primaryColor: "${Uint8ClampedArray([240, 219, 79])}"
});
```
