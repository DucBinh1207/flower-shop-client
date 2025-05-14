import isObject from "./is-object";

/**
 * Checks if a value is an empty object (no own key).
 *
 * @param value The value to be checked.
 * @returns Returns true if the value is an empty object, otherwise false.
 *
 * @example
 * // Example usage:
 * console.log(isEmptyObject({})); // Output: true
 * console.log(isEmptyObject({ key: 'value' })); // Output: false
 * console.log(isEmptyObject([])); // Output: false
 * console.log(isEmptyObject('')); // Output: false
 */
export default function isEmptyObject(
  value: unknown,
): value is Record<string, unknown> {
  return isObject(value) && Object.keys(value).length === 0;
}
