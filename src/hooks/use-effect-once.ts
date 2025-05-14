import { useEffect } from "react";

import type { EffectCallback } from "react";

/**
 * Hook runs effect once
 *
 * @param effect
 */
function useEffectOnce(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}

export default useEffectOnce;
