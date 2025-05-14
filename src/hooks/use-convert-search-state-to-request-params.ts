import { useMemo } from "react";
import useDeepCompareMemoize from "./use-deep-compare-memoize";
import isEmpty from "@/utils/is-empty";

export type AnyObject = Record<string, any>;

type HookReturn<
  T,
  KeepOriginalType extends boolean = false,
> = KeepOriginalType extends true ? T : Partial<T>;
/**
 * Hook returns a request params object for the search state object
 *
 * @param searchState
 * @returns
 */
function useConvertSearchStateToRequestParams<
  T extends AnyObject,
  KeepOriginalType extends boolean = false,
>(searchState: T): HookReturn<T, KeepOriginalType> {
  const memoizedSearchState = useDeepCompareMemoize(searchState);

  return useMemo(() => {
    const requestParams = {} as HookReturn<T, KeepOriginalType>;

    for (const key in memoizedSearchState) {
      if (Object.hasOwn(memoizedSearchState, key)) {
        const value = memoizedSearchState[key];

        // skip value
        if (isEmpty(value)) {
          continue;
        }

        requestParams[key] = value;
      }
    }

    return requestParams;
  }, [memoizedSearchState]);
}

export default useConvertSearchStateToRequestParams;
