import { useEffect, useRef } from "react";

/**
 * Hook returns the previous value
 *
 * @param value
 * @returns
 */
function usePrevious<T>(value: T) {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

export default usePrevious;
