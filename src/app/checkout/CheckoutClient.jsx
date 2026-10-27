"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart, STORE_ID } from "@/context/CartContext";
import api from "@/utils/api";

export default function CheckoutClient() {
  const { items, summary, sessionToken, clearCart } = useCart();

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "cod",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!items || items.length === 0) {
      setErrorMsg("Your bag is empty. Please add products before checking out.");
      return;
    }

    if (!formData.customerName || !formData.customerPhone || !formData.address || !formData.pincode) {
      setErrorMsg("Please fill in all required shipping fields.");
      return;
    }

    try {
      setSubmitting(true);

      const orderPayload = {
        storeId: STORE_ID,
        sessionToken,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail || "customer@javeo.in",
        customerPhone: formData.customerPhone,
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        billingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        items: items.map((itm) => ({
          productId: itm.productId,
          variantId: itm.variantId || null,
          quantity: itm.quantity,
        })),
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
      };

      const res = await api.post("/orders", orderPayload);

      if (res && res.success) {
        setOrderSuccess(res.data);
        clearCart();
      } else {
        setErrorMsg(res?.message || "Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error("Order placement error:", err);
      const msg = err.data?.message || err.message || "An unexpected error occurred while placing your order.";
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="bg-[#fbfaf8] min-h-screen py-16 px-4 sm:px-6">
        <div className="max-w-lg mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-border-brand/60 shadow-xl text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Order Confirmed!</h1>
          <p className="text-xs text-muted-brand mb-6">
            Thank you for your order, <strong>{orderSuccess.customerName}</strong>. We are preparing your formulations with utmost care.
          </p>

          <div className="bg-neutral-50 rounded-2xl p-4 text-left text-xs space-y-2 border border-border-brand/40 mb-6">
            <div className="flex justify-between">
              <span className="text-muted-brand">Order ID:</span>
              <span className="font-bold text-foreground">#{orderSuccess.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-brand">Payment Method:</span>
              <span className="font-semibold uppercase">{orderSuccess.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-brand">Total Amount:</span>
              <span className="font-bold text-primary-brand text-sm">
                ₹{parseFloat(orderSuccess.totalAmount).toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <Link
            href="/"
            className="inline-block w-full bg-[#1a1a1a] hover:bg-primary-brand text-white py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fbfaf8] min-h-screen py-10 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <nav className="text-xs text-muted-brand mb-2 flex items-center gap-2">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href="/cart" className="hover:text-foreground">Bag</Link>
            <span>/</span>
            <span className="text-foreground font-semibold">Checkout</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Complete Your Order
          </h1>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Shipping Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-border-brand/60 p-6 sm:p-8 shadow-sm">
            <h2 className="text-base font-bold text-foreground mb-4">Shipping Information</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-brand mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Durga Madhab"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border-brand focus:outline-none focus:border-primary-brand"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-brand mb-1">
                    Phone Number (for courier updates) *
                  </label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    required
                    placeholder="+91 9876543210"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border-brand focus:outline-none focus:border-primary-brand"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-brand mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border-brand focus:outline-none focus:border-primary-brand"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-muted-brand mb-1">
                  Delivery Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={2}
                  placeholder="House / Flat / Street / Landmark"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border-brand focus:outline-none focus:border-primary-brand"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-brand mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="Bhubaneswar"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border-brand focus:outline-none focus:border-primary-brand"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-brand mb-1">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    placeholder="Odisha"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border-brand focus:outline-none focus:border-primary-brand"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-brand mb-1">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    placeholder="751001"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-border-brand focus:outline-none focus:border-primary-brand"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-border-brand/40">
                <h3 className="text-sm font-bold text-foreground mb-3">Payment Method</h3>
                <div className="space-y-2">
                  <label className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-primary-brand bg-amber-50/30' : 'border-border-brand'}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                      className="accent-primary-brand"
                    />
                    <div>
                      <span className="text-xs font-bold text-foreground block">Cash on Delivery (COD)</span>
                      <span className="text-[11px] text-muted-brand">Pay upon delivery via cash or UPI</span>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${formData.paymentMethod === 'prepaid' ? 'border-primary-brand bg-amber-50/30' : 'border-border-brand'}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="prepaid"
                      checked={formData.paymentMethod === 'prepaid'}
                      onChange={handleChange}
                      className="accent-primary-brand"
                    />
                    <div>
                      <span className="text-xs font-bold text-foreground block">Online Payment (UPI, Cards, NetBanking)</span>
                      <span className="text-[11px] text-muted-brand">Direct and secure checkout</span>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-4 bg-[#1a1a1a] hover:bg-primary-brand text-white py-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50"
              >
                {submitting ? "Placing Order..." : `Place Order • ₹${parseFloat(summary?.totalAmount || 0).toLocaleString("en-IN")}`}
              </button>
            </form>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-border-brand/60 p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-foreground">Items in Order ({items.length})</h2>

            <div className="max-h-80 overflow-y-auto divide-y divide-border-brand/40 pr-2">
              {items.map((item) => (
                <div key={item.cartItemId || item.productId} className="py-3 flex items-center gap-3">
                  <img
                    src={item.image || "/serum.png"}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-lg bg-neutral-50 border border-border-brand/40"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/serum.png";
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-foreground line-clamp-1">{item.name}</p>
                    <p className="text-[11px] text-muted-brand">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-xs font-bold text-foreground">
                    ₹{(parseFloat(item.unitPrice) * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-border-brand/50 space-y-2 text-xs">
              <div className="flex justify-between text-muted-brand">
                <span>Subtotal</span>
                <span className="font-semibold text-foreground">
                  ₹{parseFloat(summary?.subtotal || 0).toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between text-muted-brand">
                <span>Shipping</span>
                <span className="font-semibold">
                  {summary?.shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    `₹${parseFloat(summary?.shippingFee || 49).toLocaleString("en-IN")}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-muted-brand">
                <span>GST (18%)</span>
                <span>Included</span>
              </div>
              <div className="pt-2 border-t border-border-brand/50 flex justify-between text-base font-bold text-foreground">
                <span>Total</span>
                <span className="text-primary-brand font-extrabold">
                  ₹{parseFloat(summary?.totalAmount || 0).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
