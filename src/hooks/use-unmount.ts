import { useRef } from "react";
import useEffectOnce from "./use-effect-once";

/**
 * Hook runs a callback on component unmount
 *
 * @param callback
 */
function useUnmount(callback: () => void) {
  const callbackRef = useRef(callback);

  // update the ref each render so if it change the newest callback will be invoked
  callbackRef.current = callback;

  useEffectOnce(() => () => {
    callbackRef.current();
  });
}

export default useUnmount;
