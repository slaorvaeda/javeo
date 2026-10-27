"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "@/utils/api";

const CartContext = createContext(null);

export const STORE_ID = "javeo-store-uuid-3333-4444";
const STORAGE_KEY = "javeo_cart_session";

export function CartProvider({ children }) {
  const [cart, setCart] = useState({
    cartId: null,
    storeId: STORE_ID,
    itemCount: 0,
    items: [],
    summary: {
      subtotal: 0,
      gstRate: 18,
      taxAmount: 0,
      shippingFee: 0,
      codExtraCharge: 0,
      totalAmount: 0,
      currency: "INR (₹)",
    },
    validation: {
      canCheckout: false,
      minOrderValue: 499,
      minOrderMet: false,
      outOfStockItems: [],
    },
  });

  const [sessionToken, setSessionToken] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null); // productId or 'all'

  // Retrieve or initialize sessionToken from localStorage
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(STORAGE_KEY);
      if (storedToken) {
        setSessionToken(storedToken);
      }
    } catch (e) {
      console.warn("Could not read cart session token from storage", e);
    }
  }, []);

  // Fetch cart whenever sessionToken is available
  const fetchCart = useCallback(async (token) => {
    const activeToken = token || sessionToken;
    if (!activeToken) return;

    try {
      setIsLoading(true);
      const res = await api.get("/cart", {
        params: {
          storeId: STORE_ID,
          sessionToken: activeToken,
        },
      });

      if (res && res.data) {
        setCart(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch cart from cPanel backend:", err);
    } finally {
      setIsLoading(false);
    }
  }, [sessionToken]);

  useEffect(() => {
    if (sessionToken) {
      fetchCart(sessionToken);
    }
  }, [sessionToken, fetchCart]);

  // Helper to persist token
  const saveToken = (token) => {
    if (!token) return;
    setSessionToken(token);
    try {
      localStorage.setItem(STORAGE_KEY, token);
    } catch (e) {
      console.warn("Could not save cart session token", e);
    }
  };

  // Add Item to Cart
  const addToCart = async (productId, quantity = 1, variantId = null) => {
    try {
      setActionLoadingId(productId);
      const payload = {
        storeId: STORE_ID,
        productId: Number(productId),
        quantity: Number(quantity) || 1,
      };

      if (sessionToken) {
        payload.sessionToken = sessionToken;
      }
      if (variantId) {
        payload.variantId = variantId;
      }

      const res = await api.post("/cart", payload);

      if (res && res.data) {
        setCart(res.data);
        if (res.data.sessionToken && res.data.sessionToken !== sessionToken) {
          saveToken(res.data.sessionToken);
        }
        setIsCartOpen(true);
        return { success: true, data: res.data };
      }
      return { success: false, message: "Unexpected response format" };
    } catch (err) {
      console.error("Add to cart error:", err);
      const msg = err.data?.message || err.message || "Failed to add item to cart";
      alert(msg);
      return { success: false, message: msg };
    } finally {
      setActionLoadingId(null);
    }
  };

  // Update item quantity
  const updateQuantity = async (productId, quantity, variantId = null) => {
    if (!sessionToken) return;

    try {
      setActionLoadingId(productId);
      if (quantity <= 0) {
        return await removeFromCart(productId, variantId);
      }

      const res = await api.put("/cart", {
        storeId: STORE_ID,
        sessionToken,
        productId: Number(productId),
        variantId: variantId || null,
        quantity: Number(quantity),
      });

      if (res && res.data) {
        setCart(res.data);
        return { success: true, data: res.data };
      }
    } catch (err) {
      console.error("Update quantity error:", err);
      const msg = err.data?.message || err.message || "Failed to update quantity";
      alert(msg);
      return { success: false, message: msg };
    } finally {
      setActionLoadingId(null);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId, variantId = null) => {
    if (!sessionToken) return;

    try {
      setActionLoadingId(productId);
      const params = {
        storeId: STORE_ID,
        sessionToken,
        productId: Number(productId),
      };
      if (variantId) {
        params.variantId = variantId;
      }

      const res = await api.delete("/cart", { params });

      if (res && res.data) {
        setCart(res.data);
        return { success: true, data: res.data };
      }
    } catch (err) {
      console.error("Remove from cart error:", err);
      const msg = err.data?.message || err.message || "Failed to remove item";
      alert(msg);
      return { success: false, message: msg };
    } finally {
      setActionLoadingId(null);
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!sessionToken) return;

    try {
      setIsLoading(true);
      const res = await api.delete("/cart", {
        params: {
          storeId: STORE_ID,
          sessionToken,
          action: "clear",
        },
      });

      if (res && res.data) {
        setCart(res.data);
      }
    } catch (err) {
      console.error("Clear cart error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        itemCount: cart?.itemCount || 0,
        items: cart?.items || [],
        summary: cart?.summary || {},
        validation: cart?.validation || {},
        sessionToken,
        isLoading,
        actionLoadingId,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen((prev) => !prev),
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart: () => fetchCart(sessionToken),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
