export const replacer = (key, value) => (value instanceof Array) ? handleArray(value) : replace(value);

const replace = value => {
  if (typeof value === "object") {
    const symbols = Object.getOwnPropertySymbols(value);

    if (symbols[0]) {
      for (const symbol of symbols) {
        const val = value[symbol];
        const description = symbol.description;
        value["[Symbol(" + description + ")]"] = typeof val === "object" ? Object.assign({}, val) : val;
        delete value[value];
      };
    };
  };

  const dateRegex = /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2]\d|3[0-1])T(?:[0-1]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+|)(?:Z|(?:\+|\-)(?:\d{2}):?(?:\d{2}))$/;

  return (
    value === undefined ? values.undefined()
    : value !== value ? values.nan()
    : value === Infinity ? values.infinity()
    : value === -Infinity ? values.negativeInfinity()
    : typeof value === "function" ? values.function(value)
    : typeof value === "bigint" ? values.function(value)
    : (typeof value === "string" && dateRegex.test(value)) ? values.date(value)
    : typeof value === "symbol" ? values.symbol(value)
    : value instanceof Boolean ? values.boolean(value)
    : value instanceof Number ? values.number(value)
    : value instanceof String ? values.string(value)
    : value instanceof RegExp ? values.regexp(value)
    : value instanceof Date ? values.date(value)
    : value
  );
};

const handleArray = arr => arr.map(value => value instanceof Array ? handleArray(value) : replace(value));

const values = {
  undefined: () => "${undefined}",
  function: value => "${Function(" + value + ")}",
  bigint: value => "${BigInt(" + value + ")}",
  nan: () => "${NaN}",
  infinity: () => "${Infinity}",
  negativeInfinity: () => "${-Infinity}",
  boolean: value => "${Boolean(" + value + ")}",
  number: value => "${Number(" + value + ")}",
  string: value => "${String(" + value + ")}",
  regexp: value => "${RegExp(" + value + ")}",
  date: value => "${Date(" + value + ")}",
  symbol: value => "${Symbol(" + value.description + ")}"
};