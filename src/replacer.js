export const replacer = function (key, value) {
  if (this[key] instanceof Date) return wrap(this[key].toISOString(), "Date");
  return (value instanceof Array) ? handleArray(value) : replace(value);
  
}

const replace = value => {
  if (typeof value === "object" && value !== null) {
    const propertySymbols = Object.getOwnPropertySymbols(value);

    if (propertySymbols[0]) {
      for (const symbol of propertySymbols) {
        const val = value[symbol], description = symbol.description;
        value["[Symbol(" + description + ")]"] = typeof val === "object" ? Object.assign({}, val) : val;
        delete value[value];
      };
    };
  };

  return (
    value === undefined ? wrap("undefined")
    : value !== value ? wrap("NaN")
    : value === Infinity ? wrap("Infinity")
    : value === -Infinity ? wrap("-Infinity")
    : typeof value === "function" ? wrap(value, "Function")
    : typeof value === "bigint" ? wrap(value, "BigInt")
    : typeof value === "symbol" ? wrap(value.description, "Symbol")
    : typeof value === "object" ? (
      value instanceof RegExp ? wrap(value, "RegExp")
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