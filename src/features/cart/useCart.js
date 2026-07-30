import { useCallback, useMemo } from 'react';
import useSessionState from '../../hooks/useSessionState';
import { CartItemSchema, parseWithFallback } from '../../domain';

function parseStringPrice(priceOrQty, fallbackPrice) {
  const numericPrice = parseFloat(String(priceOrQty).replace(/[^0-9.]/g, ''));
  return !isNaN(numericPrice) ? numericPrice : fallbackPrice;
}

function parseNumberPriceOrQty(product, priceOrQty, maybeQty) {
  if (typeof maybeQty === 'number') return { price: priceOrQty, qty: maybeQty };
  const isProdPrice = typeof product?.price === 'number';
  return { price: isProdPrice ? product.price : priceOrQty, qty: isProdPrice ? priceOrQty : 1 };
}

function parseAddParameters(product, priceOrQty, maybeQty) {
  const prodPrice = product?.price || 0;
  const numQty = typeof maybeQty === 'number' ? maybeQty : 1;

  if (typeof priceOrQty === 'number') {
    return parseNumberPriceOrQty(product, priceOrQty, maybeQty);
  }
  if (typeof priceOrQty === 'string') {
    return { price: parseStringPrice(priceOrQty, prodPrice), qty: numQty };
  }
  return { price: prodPrice, qty: numQty };
}

function getMediaProps(product) {
  const media = {};
  if (product.image) media.image = product.image;
  if (product.icon) media.icon = product.icon;
  return media;
}

function createNewCartItem(product, price, qty) {
  const rawId = product.id ?? product._id ?? product.sku ?? product.productId;
  const itemId = String(rawId);
  const rawLabel = product.label || product.name || product.title || '';
  const itemLabel = typeof rawLabel === 'string' ? rawLabel : (rawLabel?.uk || rawLabel?.ru || rawLabel?.en || '');

  return {
    id: itemId,
    label: itemLabel,
    price: typeof price === 'number' && !isNaN(price) ? price : (product.price || 0),
    qty: Math.max(1, qty || 1),
    ...getMediaProps(product),
  };
}

function updateItemQty(safePrev, product, price, qty) {
  const existing = safePrev.find((i) => i.id === product.id);
  if (existing) {
    return safePrev.map((i) =>
      i.id === product.id ? { ...i, qty: Math.min(99, (i.qty || 1) + qty) } : i
    );
  }
  return [...safePrev, createNewCartItem(product, price, qty)];
}

function incrementItem(prev, id) {
  const safePrev = Array.isArray(prev) ? prev : [];
  return safePrev.map((item) =>
    item.id === id ? { ...item, qty: Math.min(99, (item.qty || 1) + 1) } : item
  );
}

function decrementItem(prev, id) {
  const safePrev = Array.isArray(prev) ? prev : [];
  return safePrev
    .map((item) => (item.id === id ? { ...item, qty: (item.qty || 1) - 1 } : item))
    .filter((item) => item.qty > 0);
}

/**
 * Custom hook for managing the shopping cart state.
 * Syncs with sessionStorage under key 'cart_items'.
 */
export default function useCart() {
  const [cartItems, setCartItems] = useSessionState('cart_items', []);

  const safeCartItems = useMemo(
    () => (Array.isArray(cartItems) ? cartItems.map((item) => parseWithFallback(CartItemSchema.partial(), item, item)) : []),
    [cartItems]
  );

  const addToCart = useCallback(
    (product, priceOrQty, maybeQty) => {
      const prodId = product?.id ?? product?._id ?? product?.sku ?? product?.productId;
      if (!product || prodId == null) return;
      const normalizedProduct = { ...product, id: String(prodId) };
      const { price, qty } = parseAddParameters(normalizedProduct, priceOrQty, maybeQty);

      setCartItems((prev) => {
        const safePrev = Array.isArray(prev) ? prev : [];
        return updateItemQty(safePrev, normalizedProduct, price, qty);
      });
    },
    [setCartItems]
  );

  const removeFromCart = useCallback(
    (productId) => {
      setCartItems((prev) => {
        const safePrev = Array.isArray(prev) ? prev : [];
        return safePrev.filter((item) => item.id !== productId);
      });
    },
    [setCartItems]
  );

  const updateQuantity = useCallback(
    (productId, delta) => {
      setCartItems((prev) => {
        if (delta > 0) return incrementItem(prev, productId);
        if (delta < 0) return decrementItem(prev, productId);
        return prev;
      });
    },
    [setCartItems]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, [setCartItems]);

  const totalCount = useMemo(
    () => safeCartItems.reduce((acc, item) => acc + (item.qty || 0), 0),
    [safeCartItems]
  );

  const totalPrice = useMemo(
    () =>
      safeCartItems.reduce(
        (acc, item) => acc + (item.price || 0) * (item.qty || 0),
        0
      ),
    [safeCartItems]
  );

  return {
    cartItems: safeCartItems,
    items: safeCartItems,
    addToCart,
    addItem: addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalCount,
    totalPrice,
  };
}
