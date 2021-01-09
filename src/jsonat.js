import { replacer } from "./replacer.js";
import { reviver } from "./reviver.js";
import { JSONATFetch } from "./jsonat-fetch.js";
import { parseFromObject } from "./parse-from-object.js";


const stringify = async (value, space) => JSON.stringify(value, replacer, space);
const parse = async text => JSON.parse(text, reviver);

const JSONAT = {
  stringify: async (value, space) => stringify(value, space),
  parse: async text => parse(text),
  replacer,
  reviver,
  fetch: JSONATFetch,
  parseFromObject: async obj => parseFromObject(obj)
};

const JSONATS = {
  stringify,
  parse,
  replacer,
  reviver,
  fetch: JSONATFetch,
  parseFromObject
};

export { JSONAT, JSONATS };

// if(typeof exports === "undefined") {
//   window.JSONAT = JSONAT;
//   window.JSONATS = JSONATS;
// } else {
  // exports.JSONAT = JSONAT;
  // exports.JSONATS = JSONATS;
// }