import { replacer } from "./replacer.js";
import { reviver } from "./reviver.js";
import { JSONATFetch } from "./jsonat-fetch.js";


export const JSONAT = {
  stringify: async param => JSON.stringify(param, replacer),
  parse:  async param => JSON.parse(param, reviver),
  replacer,
  reviver,
  fetch: JSONATFetch
};