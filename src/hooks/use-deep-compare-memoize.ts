import { useRef } from "react";
import isDeepEqual from "@/utils/is-deep-equal";

/**
 * Hook memoizes arbitrary data
 *
 * @param value
 * @returns
 */
function useDeepCompareMemoize<T>(value: T): T {
  const ref = useRef(value);

  if (!isDeepEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export default useDeepCompareMemoize;
