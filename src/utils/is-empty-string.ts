/**
 * Checks if a value is an empty string.
 *
 * @param value The value to be checked.
 * @returns Returns true if the value is an empty string, otherwise false.
 *
 * @example
 * // Example usage:
 * console.log(isEmptyString("")); // Output: true
 * console.log(isEmptyString("Hello")); // Output: false
 * console.log(isEmptyString(null)); // Output: false
 * console.log(isEmptyString(undefined)); // Output: false
 */
export default function isEmptyString(value: unknown): value is string {
  return value === "";
}
