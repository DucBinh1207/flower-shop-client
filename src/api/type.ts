export type DataResponseWithPagination<T> = {
  data: {
    data: T;
    totalCount: number;
    totalPages: number;
    currentPage: number;
  };
};

export type DataResponse<T> = {
  data: T;
};
