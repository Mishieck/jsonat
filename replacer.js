export const replacer = (key, value) => (value instanceof Array) ? handleArray(value) : replace(value);

const replace = value => {
  return (
    typeof value === "undefined" ? values.undefined()
    : typeof value === "function" ? values.function(value)
    : typeof value === "bigint" ? values.function(value)
    : value === NaN ? values.nan()
    : value instanceof Boolean ? values.boolean(value)
    : value instanceof Number ? values.number(value)
    : value instanceof String ? values.string(value)
    : value instanceof RegExp ? values.regexp(value)
    : value
  );
};

const handleArray = arr => arr.map(value => value instanceof Array ? handleArray(value) : replace(value));

const values = {
  undefined: () => "${undefined}",
  function: value => "${Function(" + value + ")}",
  bigint: value => "${BigInt(" + value + ")}",
  nan: () => "${NaN}",
  boolean: value => "${Boolean(" + (value === true ? "true" : "false") + ")}",
  number: value => "${Number(" + value + ")}",
  string: value => "${String(" + value + ")}",
  regexp: value => "${RegExp(" + value + ")}"
};