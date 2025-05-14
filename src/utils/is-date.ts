/**
 * Checks if the given value is a Date object.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} Returns `true` if the value is a Date object, else `false`.
 *
 * @example
 * isDate(new Date()); // => true
 * isDate('2021-12-31'); // => false
 * isDate({ year: 2021, month: 12, day: 31 }); // => false
 */
export default function isDate(value: unknown): value is Date {
  return (
    value instanceof Date ||
    (typeof value === "object" &&
      Object.prototype.toString.call(value) === "[object Date]")
  );
}
