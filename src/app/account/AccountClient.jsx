"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const SKIN_TYPES = ["Normal", "Dry", "Oily", "Combination", "Sensitive"];
const SKIN_CONCERNS_LIST = [
  "Acne & Breakouts",
  "Hyperpigmentation & Dark Spots",
  "Fine Lines & Aging",
  "Enlarged Pores",
  "Dullness & Uneven Tone",
  "Barrier Damage & Redness",
];

export default function AccountClient() {
  const {
    customer,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    fetchOrders,
    addAddress,
    deleteAddress,
  } = useAuth();

  // Auth tab (login vs register)
  const [authTab, setAuthTab] = useState("login");
  const [activeTab, setActiveTab] = useState("overview"); // overview, orders, profile, addresses

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Register form state
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    skinType: "Combination",
    skinConcerns: ["Hyperpigmentation & Dark Spots"],
  });

  // Profile edit state
  const [profileForm, setProfileForm] = useState({
    name: "",
    phone: "",
    skinType: "",
    skinConcerns: "",
  });
  const [profileMsg, setProfileMsg] = useState("");

  // Orders list state
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // New address state
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressForm, setAddressForm] = useState({
    name: "",
    phone: "",
    tag: "Home",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    isDefault: false,
  });

  // Sync profile form when customer data loads
  useEffect(() => {
    if (customer) {
      setProfileForm({
        name: customer.name || "",
        phone: customer.phone || "",
        skinType: customer.skinType || "Combination",
        skinConcerns: customer.skinConcerns || "",
      });
    }
  }, [customer]);

  // Load orders when activeTab is orders
  useEffect(() => {
    if (isAuthenticated && activeTab === "orders") {
      setOrdersLoading(true);
      fetchOrders()
        .then((data) => setOrders(data))
        .finally(() => setOrdersLoading(false));
    }
  }, [isAuthenticated, activeTab, fetchOrders]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    setIsSubmitting(true);
    const res = await login(loginEmail, loginPassword);
    setIsSubmitting(false);
    if (!res.success) {
      setAuthError(res.message);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    setIsSubmitting(true);
    const res = await register(regData);
    setIsSubmitting(false);
    if (!res.success) {
      setAuthError(res.message);
    }
  };

  const toggleConcern = (concern) => {
    setRegData((prev) => {
      const exists = prev.skinConcerns.includes(concern);
      const updated = exists
        ? prev.skinConcerns.filter((c) => c !== concern)
        : [...prev.skinConcerns, concern];
      return { ...prev, skinConcerns: updated };
    });
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileMsg("");
    const res = await updateProfile(profileForm);
    if (res.success) {
      setProfileMsg("Profile updated successfully!");
      setTimeout(() => setProfileMsg(""), 3000);
    } else {
      setProfileMsg(res.message || "Failed to update profile.");
    }
  };

  const handleAddAddressSubmit = async (e) => {
    e.preventDefault();
    const res = await addAddress(addressForm);
    if (res.success) {
      setShowAddressModal(false);
      setAddressForm({
        name: "",
        phone: "",
        tag: "Home",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India",
        isDefault: false,
      });
    } else {
      alert(res.message || "Failed to save address");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fbfaf8] flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-primary-brand border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-muted-brand font-medium tracking-wide">
            Loading your Javeo rituals...
          </span>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------------
  // UNAUTHENTICATED STATE: LOGIN & REGISTRATION
  // -----------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="bg-[#fbfaf8] min-h-screen py-12 sm:py-20 px-4 sm:px-6 font-sans">
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-border-brand/70 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-8 text-center border-b border-border-brand/40 bg-[#fdfcfb]">
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary-brand bg-amber-50/60 px-3 py-1 rounded-full border border-amber-200/60">
              Javeo Privé
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-3">
              Your Ayurvedic Skincare Sanctuary
            </h1>
            <p className="text-xs text-muted-brand max-w-sm mx-auto mt-2 leading-relaxed">
              Sign in to manage your formulations, review order dispatch tracking, and access tailored routine regimens.
            </p>

            {/* Tab switch */}
            <div className="flex rounded-full bg-neutral-100 p-1 mt-6 max-w-xs mx-auto">
              <button
                type="button"
                onClick={() => {
                  setAuthTab("login");
                  setAuthError("");
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  authTab === "login"
                    ? "bg-white text-foreground shadow-xs"
                    : "text-muted-brand hover:text-foreground"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthTab("register");
                  setAuthError("");
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  authTab === "register"
                    ? "bg-white text-foreground shadow-xs"
                    : "text-muted-brand hover:text-foreground"
                }`}
              >
                Create Account
              </button>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            {authError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                {authError}
              </div>
            )}

            {/* LOGIN FORM */}
            {authTab === "login" && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">
                    Email Address or Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="name@example.com or +91 9876543210"
                    className="w-full text-xs px-4 py-3 rounded-xl border border-border-brand focus:outline-none focus:border-primary-brand"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-foreground">Password</label>
                    <a href="#forgot" className="text-[11px] text-muted-brand hover:text-primary-brand">
                      Forgot Password?
                    </a>
                  </div>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs px-4 py-3 rounded-xl border border-border-brand focus:outline-none focus:border-primary-brand"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 bg-[#1a1a1a] hover:bg-primary-brand text-white py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? "Authenticating..." : "Sign In to Your Rituals"}
                </button>
              </form>
            )}

            {/* REGISTRATION FORM */}
            {authTab === "register" && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={regData.name}
                    onChange={(e) => setRegData({ ...regData, name: e.target.value })}
                    placeholder="Durga Madhab Nayak"
                    className="w-full text-xs px-4 py-3 rounded-xl border border-border-brand focus:outline-none focus:border-primary-brand"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={regData.email}
                      onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full text-xs px-4 py-3 rounded-xl border border-border-brand focus:outline-none focus:border-primary-brand"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={regData.phone}
                      onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                      placeholder="+91 9876543210"
                      className="w-full text-xs px-4 py-3 rounded-xl border border-border-brand focus:outline-none focus:border-primary-brand"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">Password *</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={regData.password}
                    onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                    placeholder="At least 6 characters"
                    className="w-full text-xs px-4 py-3 rounded-xl border border-border-brand focus:outline-none focus:border-primary-brand"
                  />
                </div>

                {/* Skin Type consultation */}
                <div className="pt-2 border-t border-border-brand/40">
                  <label className="block text-xs font-semibold text-foreground mb-2">
                    What is your Skin Type?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SKIN_TYPES.map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setRegData({ ...regData, skinType: type })}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                          regData.skinType === type
                            ? "border-primary-brand bg-primary-brand text-white font-semibold"
                            : "border-border-brand text-muted-brand hover:border-neutral-400"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Skin Concerns selection */}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-2">
                    Your Skin Concerns (Select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SKIN_CONCERNS_LIST.map((concern) => {
                      const selected = regData.skinConcerns.includes(concern);
                      return (
                        <button
                          type="button"
                          key={concern}
                          onClick={() => toggleConcern(concern)}
                          className={`text-[11px] px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                            selected
                              ? "border-primary-brand bg-amber-50 text-foreground font-semibold"
                              : "border-border-brand text-muted-brand hover:border-neutral-400"
                          }`}
                        >
                          {selected ? "✓ " : "+ "}
                          {concern}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 bg-[#1a1a1a] hover:bg-primary-brand text-white py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? "Creating Sanctuary Account..." : "Create Account & Unlock Rituals"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------------
  // AUTHENTICATED STATE: CUSTOMER DASHBOARD
  // -----------------------------------------------------------------------
  return (
    <div className="bg-[#fbfaf8] min-h-screen py-10 sm:py-16 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-border-brand/60 shadow-sm mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-50/80 border border-border-brand/80 flex items-center justify-center text-primary-brand font-bold text-2xl shadow-inner">
              {customer?.name ? customer.name.charAt(0).toUpperCase() : "J"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  Hello, {customer?.name || "Valued Customer"}
                </h1>
                <span className="text-[10px] font-bold text-primary-brand bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full uppercase">
                  Member
                </span>
              </div>
              <p className="text-xs text-muted-brand mt-0.5">{customer?.email}</p>
            </div>
          </div>

          <button
            onClick={logout}
            type="button"
            className="self-start sm:self-center text-xs font-semibold text-muted-brand hover:text-red-600 transition-colors px-4 py-2 rounded-full border border-border-brand hover:border-red-200 cursor-pointer"
          >
            Sign Out
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Nav */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-border-brand/60 p-3 shadow-sm space-y-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                activeTab === "overview"
                  ? "bg-[#1a1a1a] text-white shadow-xs"
                  : "text-muted-brand hover:bg-neutral-50 hover:text-foreground"
              }`}
            >
              <span>Dashboard Overview</span>
              <span>→</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                activeTab === "orders"
                  ? "bg-[#1a1a1a] text-white shadow-xs"
                  : "text-muted-brand hover:bg-neutral-50 hover:text-foreground"
              }`}
            >
              <span>My Orders</span>
              <span className="text-[10px] bg-neutral-200/60 text-foreground px-2 py-0.5 rounded-full font-bold">
                {customer?.stats?.totalOrders || 0}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                activeTab === "profile"
                  ? "bg-[#1a1a1a] text-white shadow-xs"
                  : "text-muted-brand hover:bg-neutral-50 hover:text-foreground"
              }`}
            >
              <span>Skin Profile & Details</span>
              <span>→</span>
            </button>

            <button
              onClick={() => setActiveTab("addresses")}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                activeTab === "addresses"
                  ? "bg-[#1a1a1a] text-white shadow-xs"
                  : "text-muted-brand hover:bg-neutral-50 hover:text-foreground"
              }`}
            >
              <span>Saved Addresses</span>
              <span className="text-[10px] bg-neutral-200/60 text-foreground px-2 py-0.5 rounded-full font-bold">
                {customer?.addresses?.length || 0}
              </span>
            </button>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 bg-white rounded-2xl border border-border-brand/60 p-6 sm:p-8 shadow-sm">
            {/* 1. OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-foreground">Welcome to Your Dashboard</h2>
                  <p className="text-xs text-muted-brand mt-1">
                    Manage your delivery details, view placed orders, and adjust your personalized skin consultation profile.
                  </p>
                </div>

                {/* Quick stats cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-neutral-50 border border-border-brand/40">
                    <span className="text-[11px] text-muted-brand font-medium block">Total Orders</span>
                    <span className="text-2xl font-bold text-foreground mt-1 block">
                      {customer?.stats?.totalOrders || 0}
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-neutral-50 border border-border-brand/40">
                    <span className="text-[11px] text-muted-brand font-medium block">Total Investment</span>
                    <span className="text-2xl font-bold text-primary-brand mt-1 block">
                      ₹{parseFloat(customer?.stats?.totalSpent || 0).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-neutral-50 border border-border-brand/40">
                    <span className="text-[11px] text-muted-brand font-medium block">Diagnosed Skin Type</span>
                    <span className="text-base font-bold text-foreground mt-2 block">
                      {customer?.skinType || "Not configured"}
                    </span>
                  </div>
                </div>

                {/* Skincare Prescription Summary */}
                <div className="p-6 rounded-2xl bg-[#fdfcfb] border border-border-brand/80">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-foreground">Your Prescribed Skin Profile</h3>
                      <p className="text-xs text-muted-brand mt-0.5">
                        Formulations aligned with your barrier and texture goals:
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab("profile")}
                      className="text-xs font-semibold text-primary-brand hover:underline cursor-pointer"
                    >
                      Edit Profile
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 items-center">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary-brand text-white">
                      Type: {customer?.skinType || "Combination"}
                    </span>
                    {customer?.skinConcerns ? (
                      customer.skinConcerns.split(",").map((c) => (
                        <span
                          key={c.trim()}
                          className="text-xs font-medium px-3 py-1 rounded-full bg-white border border-border-brand text-foreground"
                        >
                          Target: {c.trim()}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-muted-brand italic">No concerns listed yet</span>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-border-brand/40 flex items-center justify-between">
                    <span className="text-xs text-muted-brand">
                      Need custom formulations for your current concerns?
                    </span>
                    <Link
                      href="/shop"
                      className="text-xs font-bold text-foreground hover:text-primary-brand transition-colors"
                    >
                      Explore Matched Products →
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* 2. ORDERS TAB */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-foreground">Order History</h2>
                  <p className="text-xs text-muted-brand mt-1">
                    Track dispatches, review items, and monitor your delivery status in real time.
                  </p>
                </div>

                {ordersLoading ? (
                  <div className="py-12 flex justify-center">
                    <div className="w-8 h-8 border-2 border-primary-brand border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-border-brand rounded-2xl p-8">
                    <p className="text-sm font-semibold text-foreground">No orders found yet</p>
                    <p className="text-xs text-muted-brand mt-1 mb-4">
                      When you place an order, its details and courier tracking link will show here.
                    </p>
                    <Link
                      href="/shop"
                      className="inline-block bg-[#1a1a1a] hover:bg-primary-brand text-white text-xs font-semibold px-6 py-2.5 rounded-full uppercase tracking-wider transition-colors"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="rounded-2xl border border-border-brand/60 overflow-hidden bg-white shadow-xs"
                      >
                        {/* Order header */}
                        <div className="bg-[#fbfaf8] px-5 py-3.5 border-b border-border-brand/40 flex flex-wrap items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-foreground">Order #{ord.id}</span>
                            <span className="text-muted-brand">
                              {new Date(ord.createdAt).toLocaleDateString("en-IN", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                ord.status === "delivered"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : ord.status === "shipped"
                                  ? "bg-blue-100 text-blue-700"
                                  : ord.status === "cancelled"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {ord.status}
                            </span>
                            <span className="text-[10px] font-semibold text-muted-brand uppercase">
                              {ord.paymentMethod} • {ord.paymentStatus}
                            </span>
                          </div>
                        </div>

                        {/* Order items */}
                        <div className="p-5 divide-y divide-border-brand/30">
                          {ord.items?.map((item) => (
                            <div key={item.id} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                              <div>
                                <p className="font-semibold text-foreground">{item.name}</p>
                                <p className="text-[11px] text-muted-brand">Qty: {item.quantity}</p>
                              </div>
                              <span className="font-bold text-foreground">
                                ₹{(parseFloat(item.price) * item.quantity).toLocaleString("en-IN")}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order footer */}
                        <div className="px-5 py-3 bg-[#fdfcfb] border-t border-border-brand/40 flex items-center justify-between text-xs">
                          <div>
                            {ord.trackingNumber && (
                              <span className="text-muted-brand">
                                Tracking: <strong className="text-foreground">{ord.trackingNumber}</strong> ({ord.courierName || "Shipway"})
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-brand">Total:</span>
                            <span className="text-sm font-bold text-primary-brand">
                              ₹{parseFloat(ord.totalAmount).toLocaleString("en-IN")}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-foreground">Personal Details & Skin Profile</h2>
                  <p className="text-xs text-muted-brand mt-1">
                    Keep your contact information and dermatological preferences current.
                  </p>
                </div>

                {profileMsg && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
                    {profileMsg}
                  </div>
                )}

                <form onSubmit={handleProfileSave} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">Full Name</label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border-brand focus:outline-none focus:border-primary-brand"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border-brand focus:outline-none focus:border-primary-brand"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">Email Address</label>
                    <input
                      type="email"
                      disabled
                      value={customer?.email || ""}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border-brand bg-neutral-100 text-neutral-500 cursor-not-allowed"
                    />
                    <span className="text-[10px] text-muted-brand mt-1 block">Email cannot be changed directly</span>
                  </div>

                  {/* Skin Type selector */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-2">Diagnosed Skin Type</label>
                    <div className="flex flex-wrap gap-2">
                      {SKIN_TYPES.map((type) => (
                        <button
                          type="button"
                          key={type}
                          onClick={() => setProfileForm({ ...profileForm, skinType: type })}
                          className={`text-xs px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                            profileForm.skinType === type
                              ? "border-primary-brand bg-primary-brand text-white font-semibold"
                              : "border-border-brand text-muted-brand hover:border-neutral-400"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Skin Concerns input */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">Primary Skin Concerns</label>
                    <input
                      type="text"
                      value={profileForm.skinConcerns}
                      onChange={(e) => setProfileForm({ ...profileForm, skinConcerns: e.target.value })}
                      placeholder="e.g. Hyperpigmentation, Acne, Fine Lines"
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border-brand focus:outline-none focus:border-primary-brand"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#1a1a1a] hover:bg-primary-brand text-white px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* 4. ADDRESSES TAB */}
            {activeTab === "addresses" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-foreground">Saved Delivery Addresses</h2>
                    <p className="text-xs text-muted-brand mt-0.5">
                      Addresses used for one-click checkout and delivery dispatches.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="bg-[#1a1a1a] hover:bg-primary-brand text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer"
                  >
                    + Add New
                  </button>
                </div>

                {customer?.addresses?.length === 0 ? (
                  <div className="text-center py-12 border border-dashed border-border-brand rounded-2xl p-8">
                    <p className="text-xs text-muted-brand mb-3">No saved addresses found.</p>
                    <button
                      onClick={() => setShowAddressModal(true)}
                      className="text-xs font-bold text-primary-brand hover:underline cursor-pointer"
                    >
                      Add your primary shipping address now
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {customer?.addresses?.map((addr) => (
                      <div
                        key={addr.id}
                        className="p-5 rounded-2xl border border-border-brand/70 bg-white relative flex flex-col justify-between shadow-xs"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-primary-brand bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                              {addr.tag || "Home"}
                            </span>
                            {addr.isDefault == 1 && (
                              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm font-bold text-foreground">{addr.name || customer.name}</p>
                          <p className="text-xs text-muted-brand mt-1 leading-relaxed">
                            {addr.street}, {addr.city}, {addr.state} - {addr.postalCode}
                          </p>
                          {addr.phone && (
                            <p className="text-xs text-muted-brand mt-1">Phone: {addr.phone}</p>
                          )}
                        </div>

                        <div className="mt-4 pt-3 border-t border-border-brand/40 flex justify-end">
                          <button
                            onClick={() => deleteAddress(addr.id)}
                            className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ADD ADDRESS MODAL */}
                {showAddressModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-border-brand">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-base font-bold text-foreground">Add New Address</h3>
                        <button
                          onClick={() => setShowAddressModal(false)}
                          className="text-muted-brand hover:text-foreground text-sm cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>

                      <form onSubmit={handleAddAddressSubmit} className="space-y-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-foreground mb-1">
                            Recipient Name
                          </label>
                          <input
                            type="text"
                            required
                            value={addressForm.name}
                            onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                            placeholder="e.g. Durga Madhab"
                            className="w-full text-xs px-3 py-2 rounded-xl border border-border-brand focus:outline-none focus:border-primary-brand"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-foreground mb-1">
                              Phone
                            </label>
                            <input
                              type="tel"
                              required
                              value={addressForm.phone}
                              onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                              placeholder="+91 9876543210"
                              className="w-full text-xs px-3 py-2 rounded-xl border border-border-brand focus:outline-none focus:border-primary-brand"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-foreground mb-1">
                              Address Label
                            </label>
                            <select
                              value={addressForm.tag}
                              onChange={(e) => setAddressForm({ ...addressForm, tag: e.target.value })}
                              className="w-full text-xs px-3 py-2 rounded-xl border border-border-brand focus:outline-none focus:border-primary-brand bg-white"
                            >
                              <option value="Home">Home</option>
                              <option value="Work">Work</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-foreground mb-1">
                            Street Address
                          </label>
                          <textarea
                            required
                            rows={2}
                            value={addressForm.street}
                            onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                            placeholder="House number, Street, Area"
                            className="w-full text-xs px-3 py-2 rounded-xl border border-border-brand focus:outline-none focus:border-primary-brand"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[11px] font-semibold text-foreground mb-1">
                              City
                            </label>
                            <input
                              type="text"
                              required
                              value={addressForm.city}
                              onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                              placeholder="Bhubaneswar"
                              className="w-full text-xs px-3 py-2 rounded-xl border border-border-brand focus:outline-none focus:border-primary-brand"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-foreground mb-1">
                              State
                            </label>
                            <input
                              type="text"
                              required
                              value={addressForm.state}
                              onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                              placeholder="Odisha"
                              className="w-full text-xs px-3 py-2 rounded-xl border border-border-brand focus:outline-none focus:border-primary-brand"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-foreground mb-1">
                              Pincode
                            </label>
                            <input
                              type="text"
                              required
                              value={addressForm.postalCode}
                              onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                              placeholder="751001"
                              className="w-full text-xs px-3 py-2 rounded-xl border border-border-brand focus:outline-none focus:border-primary-brand"
                            />
                          </div>
                        </div>

                        <label className="flex items-center gap-2 pt-1 text-xs text-muted-brand cursor-pointer">
                          <input
                            type="checkbox"
                            checked={addressForm.isDefault}
                            onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                            className="rounded accent-primary-brand"
                          />
                          <span>Set as default delivery address</span>
                        </label>

                        <button
                          type="submit"
                          className="w-full mt-4 bg-[#1a1a1a] hover:bg-primary-brand text-white py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Save Address
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
