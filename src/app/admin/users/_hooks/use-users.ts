"use client";

import { useQuery } from "@tanstack/react-query";
import useQueryStates from "@/hooks/use-query-states";
import useConvertSearchStateToRequestParams from "@/hooks/use-convert-search-state-to-request-params";
import { getUsers } from "@/api/users-api";

export type StateUserQuery = {
  page: number;
  limit: number;
  search: string;
  role: string;
};

export const useUsers = () => {
  const { state, setState } = useQueryStates({
    structure: {
      page: {
        type: "number",
        defaultValue: 1,
        queryName: "p",
      },
      limit: {
        type: "number",
        defaultValue: 100,
        queryName: "l",
      },
      search: {
        type: "string",
        defaultValue: "",
        queryName: "k",
      },
      role: {
        type: "string",
        defaultValue: "",
        queryName: "role",
      },
    },
  });

  const query = useConvertSearchStateToRequestParams<
    NonNullable<StateUserQuery>
  >({
    page: state.page,
    limit: state.limit,
    search: state.search,
    role: state.role,
  });

  const { data: { data = [], totalPages = 0 } = {}, isLoading } = useQuery({
    queryKey: ["all-user", state],
    queryFn: () => getUsers(query),
  });

  return {
    isLoading,
    data,
    state,
    totalPages,
    setState,
  };
};
