import { useState, useMemo } from "react";

export function usePagination<T>(data: T[], itemsPerPage: number) {
  const [page, setPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage);
  }, [data.length, itemsPerPage]);

  const currentData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  }, [page, data, itemsPerPage]);

  const nextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (p: number) => {
    setPage(Math.min(Math.max(p, 1), totalPages));
  };

  return {
    page,
    totalPages,
    currentData,
    nextPage,
    prevPage,
    goToPage,
    setPage,
  };
}
