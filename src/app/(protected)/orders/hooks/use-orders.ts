"use client";

import { useQuery } from "@tanstack/react-query";
import useQueryStates from "@/hooks/use-query-states";
import useConvertSearchStateToRequestParams from "@/hooks/use-convert-search-state-to-request-params";
import { getMyOrder, getOrders } from "@/api/order-api";

export type StateMyOrderQuery = {
  page: number;
  limit: number;
};

export const useMyOrders = () => {
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
      
    },
  });

  const query = useConvertSearchStateToRequestParams<
    NonNullable<StateMyOrderQuery>
  >({
    page: state.page,
    limit: state.limit,
  });

  const { data: { data = [], totalPages = 0 } = {}, isLoading } = useQuery({
    queryKey: ["MyOrder", state],
    queryFn: () => getMyOrder(query),
  });

  return {
    isLoading,
    data,
    state,
    totalPages,
    setState,
  };
};
