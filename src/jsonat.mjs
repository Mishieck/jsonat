import { replacer } from "./replacer.js";
import { reviver } from "./reviver.js";
import { JSONATFetch } from "./jsonat-fetch.js";
import { parseFromObject } from "./parse-from-object.js";


const stringify = async param => JSON.stringify(param, replacer);
const parse = async param => JSON.parse(param, reviver);

const JSONAT = {
  stringify: async param => stringify(param),
  parse: async param => parse(param),
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