import isEmptyArray from "./is-empty-array";
import isEmptyObject from "./is-empty-object";
import isEmptyString from "./is-empty-string";
import isNil from "./is-nil";

type EmptyArray = never[];
type EmptyObject = Record<string, never>;
type EmptyString = "";
type Nullish = null | undefined;

type FuncReturn<T = unknown> = T extends unknown[] | Nullish
  ? EmptyArray | Nullish
  : T extends unknown[]
    ? EmptyArray
    : T extends object | Nullish
      ? EmptyObject | Nullish
      : T extends object
        ? EmptyObject
        : T extends string
          ? EmptyString
          : never;

/**
 * Checks if a value is an empty array or an empty object or `null` or `undefined` or `""`
 *
 * @param value The value to be checked.
 * @returns Returns true if the value is empty, otherwise false.
 *
 * @example
 * // Example usage:
 * console.log(isEmpty("")); // Output: true
 * console.log(isEmpty([])); // Output: true
 * console.log(isEmpty({})); // Output: true
 * console.log(isEmpty(null)); // Output: true
 * console.log(isEmpty(undefined)); // Output: true
 * console.log(isEmpty("Hello")); // Output: false
 * console.log(isEmpty([1, 2, 3])); // Output: false
 * console.log(isEmpty({ key: 'value' })); // Output: false
 */
export default function isEmpty<T>(
  value: T | EmptyArray | EmptyObject | EmptyString | Nullish,
): value is FuncReturn<T> {
  return (
    isEmptyArray(value) ||
    isEmptyObject(value) ||
    isNil(value) ||
    isEmptyString(value)
  );
}
