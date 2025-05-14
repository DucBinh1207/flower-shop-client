const PATTERN = /^(\u3000|\u0020)+|(\u3000|\u0020)+$/;

/**
 * Enhances the trim function by removing leading and trailing whitespace, including unicode space characters (full-width spaces (U+3000) and half-width spaces (U+0020)).
 *
 * @param value The string to be trimmed.
 * @returns Returns the trimmed string.
 *
 * @example
 * // Example usage:
 * const trimmedStr = enhanceTrim(str);
 * console.log(enhanceTrim("   Hello World   ")); // Output: "Hello World"
 * console.log(enhanceTrim("\u3000\u3000\u3000Hello World\u3000\u3000\u3000")); // Output: "Hello World"
 */
export default function enhanceTrim(value: string): string {
  return value.replace(new RegExp(PATTERN, "gu"), "");
}
