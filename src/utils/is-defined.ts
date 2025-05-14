/**
 * Checks if a value is defined (not null or undefined).
 *
 * @param value The value to be checked.
 * @returns Returns true if the value is defined, otherwise false.
 *
 * @example
 * // Example usage:
 * console.log(isDefined(5)); // Output: true
 * console.log(isDefined('Hello')); // Output: true
 * console.log(isDefined(null)); // Output: false
 * console.log(isDefined(undefined)); // Output: false
 */
export default function isDefined<T = unknown>(
  value: T,
): value is NonNullable<T> {
  return value !== undefined && value !== null;
}
