import { reviver } from "./reviver.js";


export const parseFromObject = obj => {
  if (typeof obj === "object" && obj !== null && !(obj instanceof Array)) {
    const keys = Object.keys(obj);
  
    for (const key of keys) {
      const value = reviver(key, obj[key]);
  
      if (typeof value !== 'object' || value === null || value instanceof Array) {
        obj[key] = value;
      } else {
        obj[key] = parseFromObject(value);
      };
    };
  } else console.info("Input must be of a keyed object.");
  
  return obj;
};