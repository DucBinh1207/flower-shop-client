import { useCallback, useEffect, useRef } from "react";

/**
 * Hook provides ability to check component's mount state
 * If component mounted = true, false otherwise
 *
 * @returns
 */
function useMountedState() {
  const mountedRef = useRef(false);
  const get = useCallback(() => mountedRef.current, []);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return get;
}

export default useMountedState;
