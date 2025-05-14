import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useCallbackRef from "./use-callback-ref";
import isString from "@/utils/is-string";
import enhanceTrim from "@/utils/enhance-trim";
import isFunction from "@/utils/is-function";
import isNull from "@/utils/is-null";
import isDefined from "@/utils/is-defined";
import usePrevious from "./use-previous";
import isNumber from "@/utils/is-number";
import isBoolean from "@/utils/is-boolean";
import isDeepEqual from "@/utils/is-deep-equal";
import isDate from "@/utils/is-date";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

type Item =
  | {
      type: "string";
      defaultValue: string;
      queryName: string;
      handle?: (parsedValue: string) => string;
    }
  | {
      type: "string";
      defaultValue: null;
      queryName: string;
      handle?: (parsedValue: string | null) => string | null;
    }
  | {
      type: "number";
      defaultValue: number;
      queryName: string;
      handle?: (parsedValue: number | null) => number;
    }
  | {
      type: "number";
      defaultValue: null;
      queryName: string;
      handle?: (parsedValue: number | null) => number | null;
    }
  | {
      type: "boolean";
      defaultValue: boolean;
      queryName: string;
      handle?: (parsedValue: boolean) => boolean;
    }
  | {
      type: "string-array";
      defaultValue: string[];
      queryName: string;
      handle?: (parsedValue: string[]) => string[];
    }
  | {
      type: "number-array";
      defaultValue: number[];
      queryName: string;
      handle?: (parsedValue: number[]) => number[];
    }
  | {
      type: "date";
      defaultValue: Date;
      queryName: string;
      handle?: (parsedValue: Date) => Date;
    };

type State<T> =
  T extends Record<keyof T, Item>
    ? {
        [P in keyof T]: T[P] extends {
          handle: (parsedValue: Any) => infer ValueHandled;
        }
          ? ValueHandled
          : T[P]["defaultValue"] extends unknown[]
            ? Extract<Item, { type: T[P]["type"] }>["defaultValue"]
            : T[P]["defaultValue"] extends null
              ? Extract<Item, { type: T[P]["type"] }>["defaultValue"]
              : NonNullable<
                  Extract<Item, { type: T[P]["type"] }>["defaultValue"]
                >;
      }
    : never;

type SetState<T> =
  T extends Record<keyof T, Item>
    ? (partialState: Partial<State<T>>) => void
    : never;

/**
 * Hook synchronize query state as local object state
 *
 * @param {Object} param.structure - The structure of the query states.
 * @param {Function} param.superHandle - The final state handler before initialization state.
 * @param {Function} param.onStateChange - The callback invoked when the stage is changed.
 *
 * @returns
 */
function useQueryStates<T extends Record<keyof T, Item>>({
  structure,
  superHandle,
  onStateChange: onStateChangeParam,
}: {
  structure: T;
  superHandle?: (state: State<T>) => State<T>;
  onStateChange?: (state: State<T>) => void;
}): {
  state: State<T>;
  setState: SetState<T>;
  resetState: () => void;
} {
  const onStateChange = useCallbackRef(onStateChangeParam);
  const buildState = useCallbackRef((searchParams: URLSearchParams) => {
    let state = {} as State<T>;

    type Value = State<T>[Extract<keyof T, string>];

    for (const key in structure) {
      if (Object.hasOwn(structure, key)) {
        const item = structure[key];

        if (searchParams.has(item.queryName)) {
          // handle string
          if (item.type === "string") {
            const queryValue = searchParams.get(item.queryName);
            let value: typeof item.defaultValue =
              queryValue || item.defaultValue;

            if (isString(value)) {
              value = enhanceTrim(value);
            }

            // check handle parsed value
            if (isFunction(item.handle)) {
              const valueHandled = item.handle(value);

              if (isString(valueHandled) || isNull(valueHandled)) {
                value = valueHandled;
              }
            }

            state[key] = value as Value;

            continue;
          }

          // handle number
          if (item.type === "number") {
            const queryValue = searchParams.get(item.queryName);
            let value: typeof item.defaultValue =
              isString(queryValue) &&
              queryValue.length > 0 &&
              !Number.isNaN(Number(queryValue))
                ? Number(queryValue)
                : item.defaultValue;

            // check handle parsed value
            if (isFunction(item.handle)) {
              value = item.handle(value);
            }

            state[key] = value as Value;

            continue;
          }

          // handle boolean
          if (item.type === "boolean") {
            const queryValue = searchParams.get(item.queryName);

            let value: typeof item.defaultValue =
              isString(queryValue) && queryValue.length > 0
                ? // boolean value is true/false or 1/0
                  queryValue === "true" || queryValue === "1"
                : item.defaultValue;

            // check handle parsed value
            if (isFunction(item.handle)) {
              value = item.handle(value);
            }

            state[key] = value as Value;

            continue;
          }

          // handle array of string
          if (item.type === "string-array") {
            const queryValue = searchParams.getAll(item.queryName);

            let value = queryValue
              // remove duplicate
              .filter((i, index) => queryValue.indexOf(i) === index)
              // trim each value
              .map((i) => enhanceTrim(i))
              // remove empty string
              .filter((i) => i.length > 0);

            value = value.length > 0 ? value : item.defaultValue;

            // check handle parsed value
            if (isFunction(item.handle)) {
              value = item.handle(value);
            }

            state[key] = value as Value;

            continue;
          }

          // handle array of number
          if (item.type === "number-array") {
            const queryValue = searchParams.getAll(item.queryName);

            let value = queryValue
              // remove duplicate
              .filter((i, index) => queryValue.indexOf(i) === index)
              // remove empty string
              .filter((i) => i.length > 0)
              // remove NaN
              .filter((i) => !Number.isNaN(Number(i)))
              // convert string to number
              .map(Number);

            value = value.length > 0 ? value : item.defaultValue;

            // check handle parsed value
            if (isFunction(item.handle)) {
              value = item.handle(value);
            }

            state[key] = value as Value;

            continue;
          }

          // handle date
          if (item.type === "date") {
            const queryValue = searchParams.get(item.queryName);

            let value: typeof item.defaultValue =
              isString(queryValue) &&
              queryValue.length > 0 &&
              new Date(Number(queryValue)).toString() !== "Invalid Date"
                ? new Date(Number(queryValue))
                : item.defaultValue;

            // check handle parsed value
            if (isFunction(item.handle)) {
              value = item.handle(value);
            }

            state[key] = value as Value;

            continue;
          }
        } else {
          state[key] = item.defaultValue as Value;
        }
      }
    }

    if (isDefined(superHandle)) {
      state = superHandle(state);
    }

    return state;
  });
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [state, setState] = useState(() => {
    const initialState = buildState(searchParams);
    onStateChange?.(initialState);

    return initialState;
  });
  const prevSearchParams = usePrevious(searchParams);

  const handleQueryStatesChange = useCallbackRef(
    (partialState: Partial<State<T>>) => {
      const nextState: State<T> = {
        ...state,
        ...partialState,
      };

      // the state does not change -> skip update
      if (isDeepEqual(nextState, state)) {
        return;
      }

      onStateChange?.(nextState);
      setState(nextState);

      const nextSearchParams = new URLSearchParams();

      for (const key in nextState) {
        if (Object.hasOwn(nextState, key)) {
          const value = nextState[key];
          const item = structure[key] as Item;

          const { queryName } = item;

          // handle array of string/ array of number
          if (Array.isArray(value)) {
            for (const i of value) {
              nextSearchParams.append(queryName, i);
            }

            continue;
          }

          // handle string
          if (isString(value)) {
            // value must contain at least 1 character
            if (value.length > 0) {
              nextSearchParams.set(queryName, value);
            }

            continue;
          }

          // handle number
          if (isNumber(value)) {
            nextSearchParams.set(queryName, String(value));

            continue;
          }

          // handle boolean
          if (isBoolean(value)) {
            // value is true
            if (value) {
              nextSearchParams.set(queryName, String(value));
            }

            continue;
          }

          // handle date
          if (isDate(value)) {
            nextSearchParams.set(queryName, String(value.getTime()));

            continue;
          }
        }
      }

      const nextSearchParamsString = nextSearchParams.toString();
      const nextQuery =
        nextSearchParamsString.length > 0 ? `?${nextSearchParamsString}` : "";

      // https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#windowhistorypushstate
      window.history.pushState(null, "", `${pathname}${nextQuery}`);
    },
  );

  const handleQueryStatesReset = useCallbackRef(() => {
    const nextState = {} as State<T>;

    type Value = State<T>[Extract<keyof T, string>];

    for (const key in structure) {
      if (Object.hasOwn(structure, key)) {
        const item = structure[key];

        nextState[key] = item.defaultValue as Value;
      }
    }

    if (!isDeepEqual(nextState, state)) {
      onStateChange?.(nextState);
      setState(nextState);
    }
  });

  useEffect(() => {
    const handlePopstate = () => {
      const nextSearchParams = new URLSearchParams(window.location.search);
      const nextState = buildState(nextSearchParams);

      onStateChange?.(nextState);
      setState(nextState);
    };

    window.addEventListener("popstate", handlePopstate, false);

    return () => {
      window.removeEventListener("popstate", handlePopstate, false);
    };
  }, [buildState, onStateChange]);

  useEffect(() => {
    // user visits the same link without searchParams
    // we need to reset the query states to defaultValues
    if (
      isDefined(prevSearchParams) &&
      prevSearchParams.toString() !== searchParams.toString() &&
      searchParams.toString().length === 0
    ) {
      handleQueryStatesReset();
    }
  }, [prevSearchParams, searchParams, handleQueryStatesReset]);

  return {
    state,
    setState: handleQueryStatesChange as SetState<T>,
    resetState: handleQueryStatesReset,
  };
}

export default useQueryStates;
