import { replacer } from "./replacer.js";
import { reviver } from "./reviver.js";
import { JSONATFetch } from "./jsonat-fetch.js";
import { parseFromObject } from "./parse-from-object.js";


export const JSONAT = {
  stringify: param => JSON.stringify(param, replacer),
  parse: param => JSON.parse(param, reviver),
  replacer,
  reviver,
  fetch: JSONATFetch,
  parseFromObject
};