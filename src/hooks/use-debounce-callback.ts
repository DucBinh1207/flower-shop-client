import { useRef } from "react";

import useCallbackRef from "./use-callback-ref";
import useMountedState from "./use-mounted-state";
import useUnmount from "./use-unmount";

type AnyFunction = (...args: any[]) => any;

/**
 * Custom hook for creating a debounced callback function.
 **/
function useDebounceCallback<T extends AnyFunction>(
  callback: T,
  delay: number | undefined = 200,
): [(...args: Parameters<T>) => void, () => void] {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedCallback = useCallbackRef(callback);
  const isMounted = useMountedState();

  const cancel = useCallbackRef(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  });

  const debounced = useCallbackRef((...args: Parameters<T>) => {
    cancel();
    timeoutRef.current = setTimeout(() => {
      if (isMounted()) {
        savedCallback(...args);
      }
    }, delay);
  });

  // cancel on unmount
  useUnmount(cancel);

  return [debounced, cancel];
}

export default useDebounceCallback;
