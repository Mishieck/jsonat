import { replacer } from "./replacer.js";
import { reviver } from "./reviver.js";
import { JSONATFetch } from "./jsonat-fetch.js";
import { parsePartial } from "./parse-partial.js";


const stringify = (value, space) => JSON.stringify(value, replacer, space);
const parse = text => JSON.parse(text, reviver);

const JSONAT = {
  stringify: async (value, space) => stringify(value, space),
  parse: async text => parse(text),
  replacer,
  reviver,
  fetch: JSONATFetch,
  parsePartial: async obj => parsePartial(obj)
};

const JSONATS = {
  stringify,
  parse,
  replacer,
  reviver,
  fetch: JSONATFetch,
  parsePartial
};


export { JSONAT, JSONATS };