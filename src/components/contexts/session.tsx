"use client";
import { useLayoutEffect, useState } from "react";

import type { ReactNode } from "react";
import createContext from "@/utils/create-context";
import { User } from "@/types/index";
import { getProfile } from "@/api/auth-api";

type TSessionValue =
  | {
      user: null;
      status: "loading";
      isAuthenticated: false;
    }
  | {
      user: User;
      status: "success";
      isAuthenticated: true;
    }
  | {
      user: null;
      status: "error";
      isAuthenticated: false;
    };

const [_SessionProvider, useSession] = createContext<
  {
    clearSession: () => void;
    updateUser: (params: User) => void;
  } & TSessionValue
>({
  name: "Session",
});

/**
 * Session Provider component
 *
 * @param param
 * @returns
 */
function SessionProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [session, setSession] = useState<TSessionValue>({
    user: null,
    isAuthenticated: false,
    status: "loading",
  });

  useLayoutEffect(() => {
    /**
     * load user profile
     */
    (async () => {
      try {
        const response = await getProfile();

        setSession({
          user: response.user,
          status: "success",
          isAuthenticated: true,
        });
      } catch {
        setSession({
          user: null,
          status: "error",
          isAuthenticated: false,
        });
      }
    })();
  }, []);

  return (
    <_SessionProvider
      value={{
        ...session,
        clearSession: () =>
          setSession({
            user: null,
            isAuthenticated: false,
            status: "loading",
          }),
        updateUser: (user) =>
          setSession({
            user,
            isAuthenticated: true,
            status: "success",
          }),
      }}
    >
      {children}
    </_SessionProvider>
  );
}

/**
 * Returns a set of role check flags
 *
 * @returns
 */
function useRoleAsserter() {
  const role = useSession().user?.role;

  return {
    isAdmin: role === "admin",
  };
}

export { SessionProvider, useSession, useRoleAsserter };
