import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCatalog } from '../context/CatalogContext';
import { getFilterKey, getParamsState } from '../features/catalog/catalogParamsUtils';
import { canUseServerPagination, fetchProductCount, fetchProductPage, MissingIndexError, PAGE_SIZE } from '../services/catalogPageService';
import { applyFilters, applySort } from './useCatalogFilters';

const MAX_CLIENT_FALLBACK_ITEMS = 500;

function unwrapError(res) {
  return res.originalError || res.error || res;
}

async function loadServerPage(filters, sortKey, cursor = null, pageSize = PAGE_SIZE) {
  const [pageRes, countRes] = await Promise.all([
    fetchProductPage(filters, sortKey, cursor, pageSize),
    cursor ? Promise.resolve(null) : fetchProductCount(filters, sortKey),
  ]);

  if (!pageRes.success) throw unwrapError(pageRes);
  if (countRes && !countRes.success) throw unwrapError(countRes);

  return { pageData: pageRes.data, count: countRes ? countRes.data : null };
}

function _toErrorMessage(error) {
  return typeof error === 'string' ? error : String(error?.message ?? '');
}

const MISSING_INDEX_SENTINEL = 'MISSING_INDEX';

function isMissingIndexError(error) {
  if (error instanceof MissingIndexError) return true;
  if (error?.code === MISSING_INDEX_SENTINEL || error?.message === MISSING_INDEX_SENTINEL) return true;
  return _toErrorMessage(error).toLowerCase().includes('index');
}

function applyClientPageChange(setCurrentPage, delta) {
  setCurrentPage((p) => p + delta);
}

async function fetchAndApplyServerPage(cursor, filters, sortKey, pageSize, pageOffset, setCurrentPageProducts, setCurrentPage, setLoadedParams, setCursorStack) {
  const { pageData } = await loadServerPage(filters, sortKey, cursor, pageSize);
  setCurrentPageProducts(pageData.products);
  setCurrentPage((p) => p + pageOffset);
  setLoadedParams((prev) => ({ ...prev, page: prev.page + pageOffset }));
  if (pageOffset > 0 && pageData.lastDoc) {
    setCursorStack((prev) => [...prev, pageData.lastDoc]);
  } else if (pageOffset < 0) {
    setCursorStack((prev) => prev.slice(0, -1));
  }
}


export default function usePaginatedCatalog(filters, sortKey, flatList, categoryTree, pageSize = PAGE_SIZE) {
  const [currentPageProducts, setCurrentPageProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cursorStack, setCursorStack] = useState([]);
  const [clientFallback, setClientFallback] = useState(false);

  const [loadedParams, setLoadedParams] = useState(null);

  const { categorySubtreeMap } = useCatalog();

  const clientFilteredProductsUnsorted = useMemo(() => {
    if (!clientFallback) return [];
    const boundedList = (flatList || []).slice(0, MAX_CLIENT_FALLBACK_ITEMS);
    return applyFilters(boundedList, filters, categorySubtreeMap);
  }, [clientFallback, flatList, filters, categorySubtreeMap]);

  const { clientFilteredProducts, clientTotalCount } = useMemo(() => {
    if (!clientFallback) return { clientFilteredProducts: [], clientTotalCount: 0 };
    const sorted = applySort(clientFilteredProductsUnsorted, sortKey);
    return { clientFilteredProducts: sorted, clientTotalCount: sorted.length };
  }, [clientFallback, clientFilteredProductsUnsorted, sortKey]);

  useEffect(() => {
    let isMounted = true;

    function applyServerPage(pageData, count) {
      if (!isMounted) return;
      setClientFallback(false);
      setCurrentPageProducts(pageData.products);
      setTotalCount(count);
      setCurrentPage(1);
      setCursorStack(pageData.lastDoc ? [pageData.lastDoc] : []);
      setLoadedParams(getParamsState(filters, sortKey, 1));
    }

    function handleLoadError(error) {
      if (!isMounted) return;
      if (isMissingIndexError(error)) {
        setClientFallback(true);
        setCurrentPage(1);
      } else {
        console.error('Error loading paginated catalog:', error);
      }
    }

    async function loadInitialData() {
      if (!canUseServerPagination(filters, sortKey)) {
        if (isMounted) { setClientFallback(true); setCurrentPage(1); setLoading(false); }
        return;
      }
      setLoading(true);
      try {
        const { pageData, count } = await loadServerPage(filters, sortKey, null, pageSize);
        applyServerPage(pageData, count);
      } catch (error) {
        handleLoadError(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    const timerId = setTimeout(() => {
      loadInitialData();
    }, 300);

    return () => { 
      isMounted = false; 
      clearTimeout(timerId);
    };
  }, [filters, sortKey, pageSize]);

  const effectiveTotalCount = clientFallback ? clientTotalCount : totalCount;
  const totalPages = Math.max(1, Math.ceil(effectiveTotalCount / pageSize));

  const displayedProducts = useMemo(() => {
    if (clientFallback) {
      const startIndex = (currentPage - 1) * pageSize;
      return clientFilteredProducts.slice(startIndex, startIndex + pageSize);
    }
    return currentPageProducts;
  }, [clientFallback, currentPageProducts, clientFilteredProducts, currentPage, pageSize]);

  function resolvePageCursor(delta) {
    if (delta > 0) return cursorStack[cursorStack.length - 1];
    return cursorStack[currentPage - 3] ?? null;
  }

  const changePage = useCallback(async (delta) => {
    if (loading) return;
    if (clientFallback) { applyClientPageChange(setCurrentPage, delta); return; }

    const cursor = resolvePageCursor(delta);
    setLoading(true);
    try {
      await fetchAndApplyServerPage(cursor, filters, sortKey, pageSize, delta, setCurrentPageProducts, setCurrentPage, setLoadedParams, setCursorStack);
    } catch (error) {
      const direction = delta > 0 ? 'next' : 'prev';
      console.error(`Error fetching ${direction} page:`, error);
    } finally {
      setLoading(false);
    }
  }, [loading, clientFallback, cursorStack, currentPage, filters, sortKey, pageSize]);

  const nextPage = useCallback(() => {
    if (currentPage >= totalPages) return;
    changePage(1);
  }, [currentPage, totalPages, changePage]);

  const prevPage = useCallback(() => {
    if (currentPage <= 1) return;
    changePage(-1);
  }, [currentPage, changePage]);

  const triggerKey = useMemo(() => {
    if (clientFallback) {
      return getFilterKey(filters, sortKey, currentPage);
    }
    if (!loadedParams) {
      return 'pending';
    }
    return getFilterKey(loadedParams, loadedParams.sortKey, loadedParams.page);
  }, [clientFallback, filters, sortKey, currentPage, loadedParams]);

  return {
    currentPageProducts: displayedProducts,
    currentPage,
    totalPages,
    totalCount: effectiveTotalCount,
    loading,
    nextPage,
    prevPage,
    triggerKey,
  };
}
