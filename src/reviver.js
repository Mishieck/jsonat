export const reviver = (key, value) => {
  if (typeof value === "object" && value !== null) {
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

  return value instanceof Array ? handleArray(value) : revive(value);
};

const revive = value => {
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
      : val.startsWith("BigInt64Array") ? new BigInt64Array(JSON.parse(getParam(val), reviver))
      : val.startsWith("BigUint64Array") ? new BigUint64Array(JSON.parse(getParam(val), reviver))
      : val.startsWith("BigInt") ? BigInt(getParam(val))
      : val.startsWith("RegExp") ? new RegExp(getParam(val).replace(/^\/|\/$/g, ""))
      : val.startsWith("Date") ? new Date(getParam(val))
      : val.startsWith("Symbol") ? Symbol(getParam(val))
      : val.startsWith("Set") ? new Set(JSON.parse(getParam(val), reviver))
      : val.startsWith("WeakSet") ? new WeakSet(JSON.parse(getParam(val), reviver))
      : val.startsWith("Map") ? new Map(JSON.parse(getParam(val), reviver))
      : val.startsWith("WeakMap") ? new WeakMap(JSON.parse(getParam(val), reviver))
      : val.startsWith("Int8Array") ? new Int8Array(JSON.parse(getParam(val), reviver))
      : val.startsWith("Uint8ClampedArray") ? new Uint8ClampedArray(JSON.parse(getParam(val), reviver))
      : val.startsWith("Int16Array") ? new Int16Array(JSON.parse(getParam(val), reviver))
      : val.startsWith("Int32Array") ? new Int32Array(JSON.parse(getParam(val), reviver))
      : val.startsWith("Uint8Array") ? new Uint8Array(JSON.parse(getParam(val), reviver))
      : val.startsWith("Uint16Array") ? new Uint16Array(JSON.parse(getParam(val), reviver))
      : val.startsWith("Uint32Array") ? new Uint32Array(JSON.parse(getParam(val), reviver))
      : val.startsWith("Float32Array") ? new Float32Array(JSON.parse(getParam(val), reviver))
      : val.startsWith("Float64Array") ? new Float64Array(JSON.parse(getParam(val), reviver))
      : val
    );
  };

  return value;
};

const getParam = value => value.substring(value.indexOf("(") + 1, value.lastIndexOf(")"));
const handleArray = arr => arr.map(value => value instanceof Array ? handleArray(value) : revive(value));