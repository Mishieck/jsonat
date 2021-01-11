export const JAVASCRIPT_DATA_STRUCTURES = {
  primitives: {
    undefined: undefined,
    null: null,
    boolean: true,

    number: {
      normal: 1,
      special: {
        infinity: Infinity,
        negativeInfinity: -Infinity,
        nan: NaN
      }
    },

    string: "JSONAT",
    bigint: 2n,
    symbol: Symbol("JSONATS")
  },
  function: () => console.info("stringify"),
  object: {
    normal: {
      parse: "parse"
    },

    special: {
      collections: {
        indexed: {
          array: [
            undefined,
            null,
            new Boolean(false),
            new Number(1),
            Infinity,
            NaN,
            new String("fetch"),
            new Date(),
            new Set([1]),
            new Int8Array([1, 2]),
            () => "parsePartial",
            /(?:[\w\W]+)[\(]([\w\W]+)[\)]/,
            Symbol("await")
          ],

          typedArrays: {
            int8Array: new Int8Array([-127, 127]),
            uint8Array: new Uint8Array([0, 255]),
            uint8ClampedArray: new Uint8ClampedArray([0, 255]),
            int16Array: new Int16Array([-1, 2]),
            uint16Array: new Uint16Array([1.1, 2.2]),
            int32Array: new Int32Array([-1, 2]),
            uint32Array: new Uint32Array([1.1, 2.2]),
            float32Array: new Float32Array([1.1, 2.2]),
            float64Array: new Float64Array([1.1, 2.2]),
            bigInt64Array: new BigInt64Array([-1n, 2n]),
            bigUint64Array: new BigUint64Array([1n, 2n])
          }
        },

        keyed: {
          set: new Set([1]),
          map: new Map([[name, "2"]]),
          weakSet: new WeakSet([{a: 1}]),
          weakMap: new WeakMap([[{a: 1}, 2]])
        }
      },

      date: new Date(),
      regexp: /(await\sJSONAT|JSONATS)/
    }
  },

  [Symbol("Key Words")]: "JSONAT, JSONATS, stringify, parse, fetch, parsePartial"
};