export const reviver = function (key, value) {
  return value instanceof Array ? handleArray(value) : revive(value);
};

const revive = value => {
  if (typeof value === "object" && value !== null && !(value instanceof Array)) {
    reviveSymbolKeys(value);
  };

  const regex = /^(?:\$\{)([\w\W]+)[\}]$/, matches = typeof value === "string" && value.match(regex);

  if (matches) {
    const val = matches[1];
    val.startsWith("BigInt64Array") && console.info(getParam(val))
    
    return (
      val === "undefined" ? null
      : val === "NaN" ? NaN
      : val === "Infinity" ? Infinity
      : val === "-Infinity" ? -Infinity
      : val.startsWith("Function") ? eval(getParam(val))
      : val.startsWith("BigInt(") ? BigInt(getParam(val))
      : val.startsWith("RegExp") ? reviveRegex(getParam(val))
      : val.startsWith("Date") ? new Date(getParam(val))
      : val.startsWith("Symbol") ? Symbol(getParam(val))
      : val.startsWith("Set") ? new Set(parse(val))
      : val.startsWith("WeakSet") ? new WeakSet(parse(val))
      : val.startsWith("Map") ? new Map(parse(val))
      : val.startsWith("WeakMap") ? new WeakMap(parse(val))
      : val.startsWith("Int8Array") ? new Int8Array(parse(val))
      : val.startsWith("Uint8ClampedArray") ? new Uint8ClampedArray(parse(val))
      : val.startsWith("Int16Array") ? new Int16Array(parse(val))
      : val.startsWith("Int32Array") ? new Int32Array(parse(val))
      : val.startsWith("Uint8Array") ? new Uint8Array(parse(val))
      : val.startsWith("Uint16Array") ? new Uint16Array(parse(val))
      : val.startsWith("Uint32Array") ? new Uint32Array(parse(val))
      : val.startsWith("Float32Array") ? new Float32Array(parse(val))
      : val.startsWith("Float64Array") ? new Float64Array(parse(val))
      : val.startsWith("BigInt64Array") ? new BigInt64Array(parse(val))
      : val.startsWith("BigUint64Array") ? new BigUint64Array(parse(val))
      : val
    );
  };

  return value;
};

const reviveSymbolKeys = value => {
  const keys = Object.keys(value), symbolKeyRegex = /^(?:\[Symbol\()([\w\W]+)(?:\)\])$/;

  for (const k of keys) {
    const matches = k.match(symbolKeyRegex);

    if (matches) {
      const description = matches[1], val = value[k];
      value[Symbol(description)] = typeof val === "object" ? Object.assign({}, val) : val;
      delete value[k];
    };
  };
};

const reviveRegex = value => {
  let flags = value.substring(value.lastIndexOf("/") + 1);
  value = value.substring(value.indexOf("/") + 1, value.lastIndexOf("/"));
  return new RegExp(value, flags);
}

const handleArray = arr => arr.map(value => value instanceof Array ? handleArray(value) : revive(value));
const getParam = value => value.substring(value.indexOf("(") + 1, value.lastIndexOf(")"));
const parse = value => JSON.parse(getParam(value), reviver);