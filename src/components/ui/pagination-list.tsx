import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "./pagination";

type PaginationListProps = {
  totalPage: number;
  currentPage: number;
  onChangePage: (page: number) => void;
};

export default function PaginationList({
  currentPage,
  totalPage,
  onChangePage,
}: PaginationListProps) {
  return (
    <Pagination>
      <PaginationContent>
        {Array.from({ length: totalPage }, (_, k) => (
          <PaginationItem key={k}>
            <PaginationLink
              isActive={k + 1 === currentPage}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onChangePage(k + 1);
              }}
            >
              {k + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
}
