import { useRef, useCallback } from "react";

type AnyFunction = (...args: any[]) => any;
/**
 * Hook returns an immutable callback version for the callback parameter
 *
 * @param callback
 * @returns
 */
function useCallbackRef<T extends AnyFunction>(callback: T | undefined) {
  const callbackRef = useRef(callback);

  // update the ref each render so if it change the newest callback will be invoked
  callbackRef.current = callback;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(((...args) => callbackRef.current?.(...args)) as T, []);
}

export default useCallbackRef;
