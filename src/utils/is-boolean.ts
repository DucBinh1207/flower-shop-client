/**
 * Checks if a value is a boolean.
 *
 * @param value The value to be checked.
 * @returns Returns true if the value is a boolean, otherwise false.
 *
 * @example
 * // Example usage:
 * console.log(isBoolean(true)); // Output: true
 * console.log(isBoolean(false)); // Output: true
 * console.log(isBoolean(0)); // Output: false
 * console.log(isBoolean('true')); // Output: false
 */
export default function isBoolean(value: unknown): value is boolean {
  return value === true || value === false;
}
