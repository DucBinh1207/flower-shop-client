import {
  createContext as createReactContext,
  useContext as useReactContext,
} from "react";

import type { Context as ReactContext, Provider as ReactProvider } from "react";

interface CreateContextOptions {
  /**
   * The display name of the context
   */
  name: string;
}

type CreateContextReturn<T> = [ReactProvider<T>, () => T, ReactContext<T>];

/**
 * Creates a named context, provider and hook
 *
 * @param options create context options
 * @example
 *
 * const [SampleProvider, useSample] = createContext<SampleValueType>({ name: "Sample" });
 */
export default function createContext<ContextType>(
  options: CreateContextOptions,
) {
  const { name } = options;
  const Context = createReactContext<ContextType | undefined>(undefined);

  Context.displayName = name;

  function useContext() {
    const context = useReactContext(Context);

    if (!context) {
      const error = new Error(`Your hook must be used within ${name} Provider`);

      error.name = "ContextError";
      Error.captureStackTrace?.(error, useContext);

      throw error;
    }

    return context;
  }

  return [
    Context.Provider,
    useContext,
    Context,
  ] as CreateContextReturn<ContextType>;
}
