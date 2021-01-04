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
      val === "undefined" ? values.undefined()
      : val === "NaN" ? values.nan()
      : val === "Infinity" ? values.infinity()
      : val === "-Infinity" ? values.negativeInfinity()
      : val.startsWith("Function") ? values.function(getInstanceValue(val))
      : val.startsWith("BigInt") ? values.bigint(getInstanceValue(val))
      : val.startsWith("Boolean") ? values.boolean(getInstanceValue(val))
      : val.startsWith("Number") ? values.number(getInstanceValue(val))
      : val.startsWith("String") ? values.string(getInstanceValue(val))
      : val.startsWith("RegExp") ? values.regexp(getInstanceValue(val))
      : val.startsWith("Date") ? values.date(getInstanceValue(val))
      : val.startsWith("Symbol") ? values.symbol(getInstanceValue(val))
      : val
    );
  };

  return value;
};

const getInstanceValue = value => value.substring(value.indexOf("(") + 1, value.lastIndexOf(")"));

const handleArray = arr => arr.map(value => value instanceof Array ? handleArray(value) : revive(value));

const values = {
  undefined: () => null,
  nan: () => NaN,
  infinity: () => Infinity,
  negativeInfinity: () => -Infinity,
  function: value => eval(value),
  bigint: value => new BigInt(value),
  boolean: value => new Boolean(value),
  number: value => new Number(value),
  string: value => new String(value),
  regexp: value => new RegExp(value.replace(/^\/|\/$/g, "")),
  date: value => new Date(value),
  symbol: value => Symbol(value),
};