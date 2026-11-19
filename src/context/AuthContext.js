"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "@/utils/api";
import { STORE_ID } from "./CartContext";

const AuthContext = createContext(null);
const TOKEN_KEY = "javeo_customer_token";

export function AuthProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load profile from server with active token
  const fetchProfile = useCallback(async () => {
    try {
      const res = await api.get("/customer/me");
      if (res && res.data) {
        setCustomer(res.data);
      }
    } catch (err) {
      console.warn("Session expired or invalid, logging out:", err.message);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize token from storage
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem(TOKEN_KEY);
      if (savedToken) {
        setToken(savedToken);
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      console.warn("Storage access failed", e);
      setIsLoading(false);
    }
  }, []);

  // When token is set, fetch customer profile
  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token, fetchProfile]);

  // Login handler
  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const res = await api.post("/customer/login", {
        storeId: STORE_ID,
        email: email.trim(),
        password,
      });

      if (res && res.data) {
        const { token: receivedToken, customer: receivedCustomer } = res.data;
        localStorage.setItem(TOKEN_KEY, receivedToken);
        setToken(receivedToken);
        setCustomer(receivedCustomer);
        await fetchProfile();
        return { success: true };
      }
      return { success: false, message: res?.message || "Login failed" };
    } catch (err) {
      const msg = err.data?.message || err.message || "Invalid credentials";
      return { success: false, message: msg };
    } finally {
      setIsLoading(false);
    }
  };

  // Register handler
  const register = async (data) => {
    try {
      setIsLoading(true);
      const payload = {
        storeId: STORE_ID,
        email: data.email?.trim(),
        password: data.password,
        name: data.name?.trim(),
        phone: data.phone?.trim(),
        skinType: data.skinType,
        skinConcerns: data.skinConcerns,
      };

      const res = await api.post("/customer/register", payload);

      if (res && res.data) {
        const { token: receivedToken, customer: receivedCustomer } = res.data;
        localStorage.setItem(TOKEN_KEY, receivedToken);
        setToken(receivedToken);
        setCustomer(receivedCustomer);
        await fetchProfile();
        return { success: true };
      }
      return { success: false, message: res?.message || "Registration failed" };
    } catch (err) {
      const msg = err.data?.message || err.message || "Registration failed";
      return { success: false, message: msg };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout handler
  const logout = () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (e) {}
    setToken(null);
    setCustomer(null);
  };

  // Update profile
  const updateProfile = async (updates) => {
    try {
      const res = await api.put("/customer/me", updates);
      if (res && res.data) {
        setCustomer((prev) => ({ ...prev, ...res.data }));
        return { success: true };
      }
      return { success: false, message: "Update failed" };
    } catch (err) {
      const msg = err.data?.message || err.message || "Update failed";
      return { success: false, message: msg };
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await api.get("/customer/orders");
      return res?.data || [];
    } catch (err) {
      console.error("Failed to fetch customer orders:", err);
      return [];
    }
  };

  // Add address
  const addAddress = async (address) => {
    try {
      const res = await api.post("/customer/addresses", address);
      if (res && res.data) {
        setCustomer((prev) => ({ ...prev, addresses: res.data }));
        return { success: true };
      }
      return { success: false, message: "Failed to add address" };
    } catch (err) {
      const msg = err.data?.message || err.message || "Failed to add address";
      return { success: false, message: msg };
    }
  };

  // Delete address
  const deleteAddress = async (addressId) => {
    try {
      const res = await api.delete("/customer/addresses", {
        params: { addressId },
      });
      if (res && res.data) {
        setCustomer((prev) => ({ ...prev, addresses: res.data }));
        return { success: true };
      }
      return { success: false };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        customer,
        token,
        isAuthenticated: !!customer,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        fetchOrders,
        addAddress,
        deleteAddress,
        refreshProfile: fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
