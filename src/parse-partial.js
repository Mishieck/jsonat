import { reviver } from "./reviver.js";


export const parsePartial = param => {
  if (typeof param === "object" && param !== null && !(param instanceof Array)) {
    const keys = Object.keys(param);
  
    for (const key of keys) {
      const value = reviver(key, param[key]);
  
      if (typeof value === "object" && value !== null) param[key] = parsePartial(value);
      else  param[key] = value;
    };
  } else if (param instanceof Array) {
    for (let i = 0, len = param.length; i < len; i++) {
      const value = reviver("", param[i]);

      if (typeof value === "object" && value !== null) param[i] = parsePartial(value);
      else  param[i] = value;
    } 
  } else console.info("Input must be an object or array.");
  
  return param;
};