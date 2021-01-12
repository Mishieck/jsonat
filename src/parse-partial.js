import { reviver } from "./reviver.js";


export const parsePartial = param => {
  param = reviver("", param);
  const regex = /^(?:\$\{)([\w\W]+)[\}]$/;

  if (typeof param === "object" && param !== null) {
    const entries = Object.entries(param);

    for (const [key, value] of entries) {
      if (regex.test(value)) param[key] = reviver(key, value);
      else if (typeof value === "object" && value !== null) param[key] = parsePartial(value);
    };
  } else if (param instanceof Array) {
    for (let len = param.length; len--; ) {
      if (typeof val === "object") param[i] = parsePartial(param[i]);
    };
  };
  
  return param;
};