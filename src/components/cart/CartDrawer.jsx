"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    items,
    itemCount,
    summary,
    updateQuantity,
    removeFromCart,
    actionLoadingId,
  } = useCart();

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeCart();
      }
    };
    if (isCartOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const subtotal = summary?.subtotal || 0;
  const freeShippingThreshold = 1000;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <aside
        className="relative z-10 w-full max-w-md bg-white shadow-2xl flex flex-col h-full transform transition-transform duration-300 ease-in-out font-sans"
        aria-label="Shopping Cart Drawer"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border-brand/60 bg-[#fbfaf8]">
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-bold text-foreground tracking-tight">Your Shopping Bag</h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#f5f0eb] text-primary-brand">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
          </div>

          <button
            onClick={closeCart}
            type="button"
            className="p-1.5 text-muted-brand hover:text-foreground rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-6 py-3.5 bg-[#fcfaf7] border-b border-border-brand/40">
          <div className="flex items-center justify-between text-xs mb-1.5">
            {subtotal >= freeShippingThreshold ? (
              <span className="font-semibold text-emerald-700 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                You unlocked FREE Express Shipping!
              </span>
            ) : (
              <span className="text-muted-brand">
                Add <strong className="text-foreground">₹{remainingForFreeShipping.toLocaleString("en-IN")}</strong> more for <strong className="text-primary-brand">FREE Delivery</strong>
              </span>
            )}
            <span className="text-[11px] font-medium text-muted-brand">₹1,000 goal</span>
          </div>
          <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                subtotal >= freeShippingThreshold ? "bg-emerald-600" : "bg-primary-brand"
              }`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-border-brand/40">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-20 h-20 rounded-full bg-[#fbfaf8] border border-border-brand/60 flex items-center justify-center text-primary-brand mb-4 shadow-inner">
                <svg className="w-9 h-9 stroke-[1.25]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-foreground mb-1">Your bag is currently empty</h3>
              <p className="text-xs text-muted-brand max-w-xs mb-6 leading-relaxed">
                Explore our potent Ayurvedic and science-backed skincare rituals to find your match.
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="bg-[#1a1a1a] hover:bg-primary-brand text-white text-xs font-semibold px-6 py-3 rounded-full transition-all duration-300 uppercase tracking-wider cursor-pointer shadow-sm"
              >
                Discover Formulations
              </Link>
            </div>
          ) : (
            items.map((item) => {
              const isUpdating = actionLoadingId === item.productId;
              return (
                <div key={item.cartItemId || `${item.productId}-${item.variantId}`} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <Link
                    href={`/products?id=${item.productId}`}
                    onClick={closeCart}
                    className="relative w-20 h-20 flex-shrink-0 bg-neutral-50 rounded-xl overflow-hidden border border-border-brand/50 group"
                  >
                    <img
                      src={item.image || "/serum.png"}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/serum.png";
                      }}
                    />
                  </Link>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products?id=${item.productId}`}
                          onClick={closeCart}
                          className="text-sm font-semibold text-foreground hover:text-primary-brand transition-colors line-clamp-1 cursor-pointer"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.productId, item.variantId)}
                          disabled={isUpdating}
                          className="text-neutral-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                          aria-label={`Remove ${item.name}`}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold text-foreground">
                          ₹{parseFloat(item.unitPrice).toLocaleString("en-IN")}
                        </span>
                        {item.mrp && parseFloat(item.mrp) > parseFloat(item.unitPrice) && (
                          <span className="text-[11px] text-neutral-400 line-through">
                            ₹{parseFloat(item.mrp).toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-border-brand rounded-lg bg-neutral-50 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                          disabled={isUpdating}
                          className="w-7 h-7 flex items-center justify-center text-muted-brand hover:text-foreground hover:bg-neutral-200 transition-colors disabled:opacity-50 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-semibold text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                          disabled={isUpdating || item.quantity >= (item.availableStock || 99)}
                          className="w-7 h-7 flex items-center justify-center text-muted-brand hover:text-foreground hover:bg-neutral-200 transition-colors disabled:opacity-50 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-bold text-primary-brand">
                        ₹{(parseFloat(item.unitPrice) * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="border-t border-border-brand/60 px-6 py-5 bg-[#fbfaf8] space-y-3">
            <div className="space-y-1.5 text-xs">
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
                <span>Estimated Tax (GST 18%)</span>
                <span className="text-[11px] text-neutral-500">
                  {summary?.taxInclusive ? "Included in product prices" : `₹${summary?.taxAmount}`}
                </span>
              </div>
              <div className="pt-2 border-t border-border-brand/50 flex justify-between text-sm font-bold text-foreground">
                <span>Grand Total</span>
                <span className="text-base text-primary-brand">
                  ₹{parseFloat(summary?.totalAmount || 0).toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-2">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-primary-brand text-white py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <Link
                href="/cart"
                onClick={closeCart}
                className="w-full block text-center py-2 text-xs font-semibold text-muted-brand hover:text-foreground transition-colors cursor-pointer"
              >
                View Detailed Cart
              </Link>
            </div>

            {/* Trust badge */}
            <div className="pt-1 flex items-center justify-center gap-3 text-[10px] text-neutral-400">
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                100% Secure Checkout
              </span>
              <span>•</span>
              <span>COD & UPI Available</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
