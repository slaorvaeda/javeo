"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartClient() {
  const {
    items,
    itemCount,
    summary,
    updateQuantity,
    removeFromCart,
    clearCart,
    actionLoadingId,
  } = useCart();

  const subtotal = summary?.subtotal || 0;
  const freeShippingThreshold = 1000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="bg-[#fbfaf8] min-h-screen py-10 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <nav className="text-xs text-muted-brand mb-2 flex items-center gap-2">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span className="text-foreground font-semibold">Shopping Bag</span>
          </nav>
          <div className="flex items-baseline justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Your Shopping Bag
            </h1>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-muted-brand hover:text-red-600 transition-colors cursor-pointer"
              >
                Clear Bag
              </button>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-border-brand/60 p-12 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-20 h-20 rounded-full bg-[#fbfaf8] border border-border-brand/60 flex items-center justify-center text-primary-brand mx-auto mb-4">
              <svg className="w-9 h-9 stroke-[1.25]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-foreground mb-2">Your Bag is Empty</h2>
            <p className="text-xs text-muted-brand mb-6 leading-relaxed">
              Looks like you haven&apos;t added any formulations to your bag yet.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-[#1a1a1a] hover:bg-primary-brand text-white text-xs font-semibold px-8 py-3.5 rounded-full uppercase tracking-wider transition-all duration-300 shadow-sm"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Items Column */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-border-brand/60 overflow-hidden shadow-sm">
              {/* Free shipping banner */}
              <div className="bg-[#fcfaf7] border-b border-border-brand/40 px-6 py-3.5 text-xs text-muted-brand flex items-center justify-between">
                <span>
                  {subtotal >= freeShippingThreshold ? (
                    <strong className="text-emerald-700 font-semibold">🎉 You have unlocked FREE Express Shipping!</strong>
                  ) : (
                    <>
                      Add <strong className="text-foreground">₹{remainingForFreeShipping.toLocaleString("en-IN")}</strong> more to enjoy <strong className="text-primary-brand">FREE Express Delivery</strong>.
                    </>
                  )}
                </span>
                <span className="text-[11px] font-semibold text-primary-brand">₹1,000 threshold</span>
              </div>

              <div className="divide-y divide-border-brand/40 px-6">
                {items.map((item) => {
                  const isUpdating = actionLoadingId === item.productId;
                  return (
                    <div key={item.cartItemId || `${item.productId}-${item.variantId}`} className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4 min-w-0">
                        <Link
                          href={`/products?id=${item.productId}`}
                          className="w-20 h-20 rounded-xl overflow-hidden bg-neutral-50 border border-border-brand/50 flex-shrink-0"
                        >
                          <img
                            src={item.image || "/serum.png"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/serum.png";
                            }}
                          />
                        </Link>
                        <div>
                          <Link
                            href={`/products?id=${item.productId}`}
                            className="text-sm font-bold text-foreground hover:text-primary-brand transition-colors block line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-semibold text-foreground">
                              ₹{parseFloat(item.unitPrice).toLocaleString("en-IN")}
                            </span>
                            {item.mrp && parseFloat(item.mrp) > parseFloat(item.unitPrice) && (
                              <span className="text-[11px] text-neutral-400 line-through">
                                ₹{parseFloat(item.mrp).toLocaleString("en-IN")}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Stepper & Total */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                        <div className="flex items-center border border-border-brand rounded-lg bg-neutral-50 overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                            disabled={isUpdating}
                            className="w-8 h-8 flex items-center justify-center text-muted-brand hover:text-foreground hover:bg-neutral-200 transition-colors disabled:opacity-50 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-10 text-center text-xs font-bold text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                            disabled={isUpdating || item.quantity >= (item.availableStock || 99)}
                            className="w-8 h-8 flex items-center justify-center text-muted-brand hover:text-foreground hover:bg-neutral-200 transition-colors disabled:opacity-50 cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-sm font-bold text-foreground min-w-[70px] text-right">
                          ₹{(parseFloat(item.unitPrice) * item.quantity).toLocaleString("en-IN")}
                        </span>

                        <button
                          onClick={() => removeFromCart(item.productId, item.variantId)}
                          disabled={isUpdating}
                          className="text-neutral-400 hover:text-red-500 p-1.5 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary Column */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-border-brand/60 p-6 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-foreground">Order Summary</h2>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-muted-brand">
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="font-semibold text-foreground">
                    ₹{parseFloat(summary?.subtotal || 0).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-muted-brand">
                  <span>Delivery Charges</span>
                  <span className="font-semibold">
                    {summary?.shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      `₹${parseFloat(summary?.shippingFee || 49).toLocaleString("en-IN")}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-muted-brand">
                  <span>Tax</span>
                  <span className="text-neutral-500">
                    {summary?.taxInclusive ? "Included (GST 18%)" : `₹${summary?.taxAmount}`}
                  </span>
                </div>
                <div className="pt-3 border-t border-border-brand/50 flex justify-between text-base font-bold text-foreground">
                  <span>Total Amount</span>
                  <span className="text-primary-brand font-extrabold text-lg">
                    ₹{parseFloat(summary?.totalAmount || 0).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-primary-brand text-white py-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <div className="pt-3 border-t border-border-brand/30 flex items-center justify-center gap-2 text-[11px] text-muted-brand">
                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Guaranteed Safe & Secure Checkout</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
