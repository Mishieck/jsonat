export const reviver = (key, value) => {
  if (typeof value === "object") {
    const keys = Object.keys(value);
    const symbolKeyRegex = /^(?:\[Symbol\()([\w\W]+)(?:\)\])$/;

    for (const k of keys) {
      const matches = k.match(symbolKeyRegex);

      if (matches) {
        const description = matches[1];
        const val = value[k];
        value[Symbol(description)] = typeof val === "object" ? Object.assign({}, val) : val;
        delete value[k];
      }
    }
  };

  return (
    value instanceof Array ? handleArray(value)
    : revive(value)
  );
};

const revive = value => {
  const regex = /^(?:\$\{)([\w\W]+)[\}]$/;
  if (regex.test(value)) {
    const matches = value.match(regex);
    const val = matches[1];
    
    return (
      val === "undefined" ? null
      : val === "NaN" ? NaN
      : val === "Infinity" ? Infinity
      : val === "-Infinity" ? -Infinity
      : val.startsWith("Function") ? eval(getInstanceValue(val))
      : val.startsWith("BigInt") ? BigInt(getInstanceValue(val))
      : val.startsWith("Boolean") ? new Boolean(getInstanceValue(val))
      : val.startsWith("Number") ? new Number(getInstanceValue(val))
      : val.startsWith("String") ? new String(getInstanceValue(val))
      : val.startsWith("RegExp") ? new RegExp(getInstanceValue(val).replace(/^\/|\/$/g, ""))
      : val.startsWith("Date") ? new Date(getInstanceValue(val))
      : val.startsWith("Symbol") ? Symbol(getInstanceValue(val))
      : val
    );
  };

  return value;
};

const getInstanceValue = value => value.substring(value.indexOf("(") + 1, value.lastIndexOf(")"));
const handleArray = arr => arr.map(value => value instanceof Array ? handleArray(value) : revive(value));