/**
 * Checks if a value is an empty array.
 *
 * @param value The value to be checked.
 * @returns Returns true if the value is an empty array, otherwise false.
 *
 * @example
 * // Example usage:
 * console.log(isEmptyArray([])); // Output: true
 * console.log(isEmptyArray([1, 2, 3])); // Output: false
 * console.log(isEmptyArray('')); // Output: false
 * console.log(isEmptyArray(null)); // Output: false
 */
export default function isEmptyArray(value: unknown): value is unknown[] {
  return Array.isArray(value) && value.length === 0;
}
