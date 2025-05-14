/**
 * Checks if a value is a function.
 *
 * @param value The value to be checked.
 * @returns Returns true if the value is a function, otherwise false.
 *
 * @example
 * // Example usage:
 * const func1 = () => {};
 * const func2 = function() {};
 * const func3 = function namedFunction() {};
 * console.log(isFunction(func1)); // Output: true
 * console.log(isFunction(func2)); // Output: true
 * console.log(isFunction(func3)); // Output: true
 */
export default function isFunction(
  value: unknown,
): value is (...args: unknown[]) => unknown {
  return typeof value === "function";
}
