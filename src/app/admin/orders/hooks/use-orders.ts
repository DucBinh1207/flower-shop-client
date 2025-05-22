"use client";

import { useQuery } from "@tanstack/react-query";
import useQueryStates from "@/hooks/use-query-states";
import useConvertSearchStateToRequestParams from "@/hooks/use-convert-search-state-to-request-params";
import { getOrders } from "@/api/order-api";

export type StateOrderQuery = {
  page: number;
  limit: number;
  status: string;
  search: string;
};

export const useOrders = () => {
  const { state, setState } = useQueryStates({
    structure: {
      page: {
        type: "number",
        defaultValue: 1,
        queryName: "p",
      },
      limit: {
        type: "number",
        defaultValue: 10,
        queryName: "l",
      },
      status: {
        type: "string",
        defaultValue: "",
        queryName: "status",
      },
      search: {
        type: "string",
        defaultValue: "",
        queryName: "k",
      },
      
    },
  });

  const query = useConvertSearchStateToRequestParams<
    NonNullable<StateOrderQuery>
  >({
    page: state.page,
    limit: state.limit,
    search: state.search,
    status: state.status,
  });

  const { data: { data = [], totalPages = 0 } = {}, isLoading } = useQuery({
    queryKey: ["all-order", state],
    queryFn: () => getOrders(query),
  });

  

  return {
    isLoading,
    data,
    state,
    totalPages,
    setState,
  };
};
