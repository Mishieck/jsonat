import { reviver } from "./reviver.js";


export const parseFromObject = obj => {
  const keys = Object.keys(obj);

  for (const key of keys) {
    const value = reviver(key, obj[key]);

    if (typeof obj !== 'object' || obj === null || obj instanceof Array) {
      obj[key] = value;
    } else {
      obj[key] = parseFromObject(value);
    }
  }
  
  return obj;
}