import { useState, useCallback } from 'react';

interface UsePaginationOptions {
  initialPage?: number;
  initialLimit?: number;
  totalItems?: number;
}

export const usePagination = (options: UsePaginationOptions = {}) => {
  const { 
    initialPage = 1, 
    initialLimit = 10,
    totalItems = 0,
  } = options;

  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [total, setTotal] = useState(totalItems);

  const totalPages = Math.ceil(total / limit);

  const goToPage = useCallback((newPage: number) => {
    setPage(Math.max(1, Math.min(newPage, totalPages || 1)));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    goToPage(page + 1);
  }, [page, goToPage]);

  const previousPage = useCallback(() => {
    goToPage(page - 1);
  }, [page, goToPage]);

  const changeLimit = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  }, []);

  const reset = useCallback(() => {
    setPage(initialPage);
    setLimit(initialLimit);
  }, [initialPage, initialLimit]);

  const getPaginationParams = useCallback(() => {
    return {
      page,
      limit,
    };
  }, [page, limit]);

  return {
    page,
    limit,
    total,
    totalPages,
    setTotal,
    goToPage,
    nextPage,
    previousPage,
    changeLimit,
    reset,
    getPaginationParams,
    hasNext: page < totalPages,
    hasPrevious: page > 1,
  };
};
