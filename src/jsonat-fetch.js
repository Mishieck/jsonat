import { replacer } from "./replacer.js";
import { reviver } from "./reviver.js";


export const JSONATFetch = async (uri, { init, responseType } = {}) => {
  if (init && "body" in init) init.body = JSON.stringify(init.body, replacer);
  const res = await fetch(uri, init);
  let data;
  
  try {
    data = await readResponse(res, responseType);
  } catch (err) {
    console.warn(`Failed to read response of type ${res.headers.get("content-type")}`);
    data = res;
  };

  return data;
};

const readResponse = async (res, type) => {
  const responses = {
    json: async () => {
      const text = await res.text();
      return JSON.parse(text, reviver);
    },
    fromData: async () => res.fromData(),
    text: async () => res.text(),
    blob: async () => res.blob(),
    arrayBuffer: async () => res.arrayBuffer(),
  }

  return !type ? responses.json() : responses[type]();
}