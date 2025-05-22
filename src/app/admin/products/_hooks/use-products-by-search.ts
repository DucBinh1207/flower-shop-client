"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/product-api";
import useQueryStates from "@/hooks/use-query-states";
import useConvertSearchStateToRequestParams from "@/hooks/use-convert-search-state-to-request-params";

export type StateProductQuery = {
  page: number;
  limit: number;
  search: string;
};

export const useProductBySearch = () => {
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
      search: {
        type: "string",
        defaultValue: "",
        queryName: "k",
      },
    },
  });

  const query = useConvertSearchStateToRequestParams<
    NonNullable<StateProductQuery>
  >({
    page: state.page,
    limit: state.limit,
    search: state.search,
  });

  const { data: { data = [], totalPages = 0 } = {}, isLoading } = useQuery({
    queryKey: ["products", state],
    queryFn: () => getProducts(query),
  });

  return {
    isLoading,
    data,
    state,
    totalPages,
    setState,
  };
};
