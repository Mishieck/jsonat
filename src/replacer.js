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
    value === undefined ? "${undefined}"
    : value !== value ? "${NaN}"
    : value === Infinity ? "${Infinity}"
    : value === -Infinity ? "${-Infinity}"
    : typeof value === "function" ? "${Function(" + value + ")}"
    : typeof value === "bigint" ? "${BigInt(" + value + ")}"
    : (typeof value === "string" && dateRegex.test(value)) ? "${Date(" + value + ")}"
    : typeof value === "symbol" ? "${Symbol(" + value.description + ")}"
    : value instanceof Boolean ? "${Boolean(" + value + ")}"
    : value instanceof Number ? "${Number(" + value + ")}"
    : value instanceof String ? "${String(" + value + ")}"
    : value instanceof RegExp ? "${RegExp(" + value + ")}"
    : value instanceof Date ? "${Date(" + value + ")}"
    : value
  );
};

const handleArray = arr => arr.map(value => value instanceof Array ? handleArray(value) : replace(value));