"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/product-api";
import useQueryStates from "@/hooks/use-query-states";
import useConvertSearchStateToRequestParams from "@/hooks/use-convert-search-state-to-request-params";

export type StateProductQuery = {
  page: number;
  limit: number;
  categoryId: string;
  search: string;
  supplierId: string;
  sort: string;
  minPrice?: number;
  maxPrice?: number;
};

export const useProductFiltering = () => {
  const { state, setState } = useQueryStates({
    structure: {
      page: {
        type: "number",
        defaultValue: 1,
        queryName: "p",
      },
      limit: {
        type: "number",
        defaultValue: 9,
        queryName: "l",
      },
      categoryId: {
        type: "string",
        defaultValue: "",
        queryName: "categoryId",
      },
      search: {
        type: "string",
        defaultValue: "",
        queryName: "k",
      },
      supplierId: {
        type: "string",
        defaultValue: "",
        queryName: "supplierId",
      },
      sort: {
        type: "string",
        defaultValue: "",
        queryName: "s",
      },
      minPrice: {
        type: "number",
        defaultValue: 0,
        queryName: "minPrice",
      },
      maxPrice: {
        type: "number",
        defaultValue: 0,
        queryName: "maxPrice",
      },
    },
  });

  const query = useConvertSearchStateToRequestParams<
    NonNullable<StateProductQuery>
  >({
    page: state.page,
    limit: state.limit,
    search: state.search,
    categoryId: state.categoryId,
    supplierId: state.supplierId,
    sort: state.sort,
    ...(state.maxPrice && {
      maxPrice: state.maxPrice,
    }),
    ...(state.minPrice && {
      minPrice: state.minPrice,
    }),
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
