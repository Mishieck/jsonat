export const replacer = (key, value) => (value instanceof Array) ? handleArray(value) : replace(value);

const replace = value => {
  if (typeof value === "object" && value !== null) {
    const symbols = Object.getOwnPropertySymbols(value);

    if (symbols[0]) {
      for (const symbol of symbols) {
        const val = value[symbol], description = symbol.description;
        value["[Symbol(" + description + ")]"] = typeof val === "object" ? Object.assign({}, val) : val;
        delete value[value];
      };
    };
  };

  const dateRegex = /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])T(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+|)(?:Z|(?:\+|\-)(?:\d{2}):?(?:\d{2}))$/;

  return (
    value === undefined ? wrap("undefined")
    : value !== value ? wrap("NaN")
    : value === Infinity ? wrap("Infinity")
    : value === -Infinity ? wrap("-Infinity")
    : typeof value === "function" ? wrap(value, "Function")
    : typeof value === "bigint" ? wrap(value, "BigInt")
    : (typeof value === "string" && dateRegex.test(value)) ? wrap(value, "Date")
    : typeof value === "symbol" ? wrap(value.description, "Symbol")
    : typeof value === "object" ? (
      value instanceof RegExp ? wrap(value, "RegExp")
      : value instanceof Date ? wrap(value, "Date")
      : value instanceof Set ? wrap(value, "Set", true)
      : value instanceof WeakSet ? wrap(value, "WeakSet", true)
      : value instanceof Map ? wrap(value, "Map", true)
      : value instanceof WeakMap ? wrap(value, "WeakMap", true)
      : value instanceof Int8Array ? wrap(value, "Int8Array", true)
      : value instanceof Uint8ClampedArray ? wrap(value, "Uint8ClampedArray", true)
      : value instanceof Int16Array ? wrap(value, "Int16Array", true)
      : value instanceof Int32Array ? wrap(value, "Int32Array", true)
      : value instanceof Uint8Array ? wrap(value, "Uint8Array", true)
      : value instanceof Uint16Array ? wrap(value, "Uint16Array", true)
      : value instanceof Uint32Array ? wrap(value, "Uint32Array", true)
      : value instanceof Float32Array ? wrap(value, "Float32Array", true)
      : value instanceof Float64Array ? wrap(value, "Float64Array", true)
      : value instanceof BigInt64Array ? wrap(value, "BigInt64Array", true)
      : value instanceof BigUint64Array ? wrap(value, "BigUint64Array", true)
      : value
    )
    : value
  );
};

const handleArray = arr => arr.map(value => value instanceof Array ? handleArray(value) : replace(value));

const wrap = (value, type, isArray) => {
  if (isArray) value = JSON.stringify(Array.from(value), replacer);
  return type ? "${" + type + "(" + value + ")" + "}" : "${" + value + "}";
}