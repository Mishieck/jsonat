import { replacer } from "./replacer.js";
import { reviver } from "./reviver.js";


export const JSONATFetch = async (url, init) => {
  if (init && "body" in init) init.body = JSON.stringify(init.body, replacer);
  const res = await fetch(url, init);
  
  try {
    const text = await res.text();
    return JSON.parse(text, reviver);
  } catch (err) {
    return res;
  }
}