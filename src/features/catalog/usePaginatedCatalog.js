import { useCallback, useEffect, useMemo, useState } from 'react';
import { canUseServerPagination, fetchProductCount, fetchProductPage, MissingIndexError, PAGE_SIZE } from '../../services/catalogPageService';
import { getParamsState, getFilterKey } from './catalogParamsUtils';
import { applyFilters, applySort } from './useCatalogFilters';
import { useCatalog } from '../../context/CatalogContext';

const MAX_CLIENT_FALLBACK_ITEMS = 500;

async function loadServerPage(filters, sortKey, cursor = null, pageSize = PAGE_SIZE) {
  const [pageRes, countRes] = await Promise.all([
    fetchProductPage(filters, sortKey, cursor, pageSize),
    cursor ? Promise.resolve(null) : fetchProductCount(filters, sortKey),
  ]);
  
  if (!pageRes.success) throw pageRes.originalError || pageRes.error || pageRes;
  if (countRes && !countRes.success) throw countRes.originalError || countRes.error || countRes;

  return { pageData: pageRes.data, count: countRes ? countRes.data : null };
}

function isMissingIndexError(error) {
  if (error instanceof MissingIndexError) return true;
  if (error?.code === 'MISSING_INDEX' || error?.message === 'MISSING_INDEX') return true;
  if (typeof error === 'string') return error.includes('index') || error.includes('MISSING_INDEX');
  if (typeof error?.message === 'string') return error.message.toLowerCase().includes('index');
  return false;
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

  const nextPage = useCallback(async () => {
    if (currentPage >= totalPages || loading) return;
    if (clientFallback) { setCurrentPage((p) => p + 1); return; }

    setLoading(true);
    try {
      const cursor = cursorStack[cursorStack.length - 1];
      const { pageData } = await loadServerPage(filters, sortKey, cursor, pageSize);
      setCurrentPageProducts(pageData.products);
      setCurrentPage((p) => p + 1);
      setLoadedParams((prev) => ({ ...prev, page: prev.page + 1 }));
      if (pageData.lastDoc) setCursorStack((prev) => [...prev, pageData.lastDoc]);
    } catch (error) {
      console.error('Error fetching next page:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, totalPages, loading, clientFallback, cursorStack, filters, sortKey, pageSize]);

  const prevPage = useCallback(async () => {
    if (currentPage <= 1 || loading) return;
    if (clientFallback) { setCurrentPage((p) => p - 1); return; }

    setLoading(true);
    try {
      const prevPageIndex = currentPage - 2;
      const cursor = prevPageIndex > 0 ? cursorStack[prevPageIndex - 1] : null;
      const { pageData } = await loadServerPage(filters, sortKey, cursor, pageSize);
      setCurrentPageProducts(pageData.products);
      setCurrentPage((p) => p - 1);
      setLoadedParams((prev) => ({ ...prev, page: prev.page - 1 }));
      setCursorStack((prev) => prev.slice(0, -1));
    } catch (error) {
      console.error('Error fetching prev page:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, loading, clientFallback, cursorStack, filters, sortKey, pageSize]);

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
