"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const REGIMEN_STEPS = [
  {
    step: "Step 01",
    phase: "Cleanse",
    name: "Soothing Milk Cleanser",
    description: "Gently dissolves daily impurities & makeup without stripping the protective skin acid mantle.",
    volume: "150 ml",
    price: 1499,
    productId: 61,
    imageUrl: "/IMG_8283.webp",
    keyIngredient: "Oat Beta-Glucan & Almond Oil",
  },
  {
    step: "Step 02",
    phase: "Treat",
    name: "Radiance Gold Serum",
    description: "Deep-penetrating cellular elixir that targets dullness, refines pores, and boosts collagen.",
    volume: "30 ml",
    price: 2499,
    productId: 57,
    imageUrl: "/serum.png",
    keyIngredient: "24K Colloidal Gold & Niacinamide",
  },
  {
    step: "Step 03",
    phase: "Restore",
    name: "Revitalize Cream",
    description: "Rich bio-lipid moisture shield that locks in active nutrients for all-day supple comfort.",
    volume: "50 ml",
    price: 2999,
    productId: 59,
    imageUrl: "/hero-banner.png",
    keyIngredient: "Ceramides NP/AP & Pure Squalane",
  },
];

export default function RegimenSection() {
  const { addToCart, actionLoadingId } = useCart();
  const [addingBundle, setAddingBundle] = useState(false);
  const [bundleAdded, setBundleAdded] = useState(false);

  const individualTotal = REGIMEN_STEPS.reduce((sum, item) => sum + item.price, 0);
  const bundleDiscountPrice = Math.round(individualTotal * 0.85); // 15% discount
  const savings = individualTotal - bundleDiscountPrice;

  const handleAddBundleToCart = async () => {
    try {
      setAddingBundle(true);
      for (const item of REGIMEN_STEPS) {
        await addToCart(item.productId, 1);
      }
      setBundleAdded(true);
      setTimeout(() => setBundleAdded(false), 3500);
    } catch (err) {
      console.error("Failed to add bundle to cart:", err);
    } finally {
      setAddingBundle(false);
    }
  };

  return (
    <section id="daily-regimen" className="bg-[#FAF8F5] py-20 border-t border-border-brand/40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
          <span className="text-[11px] font-bold tracking-widest uppercase text-primary-brand font-sans">
            The Complete AM / PM Ritual
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-foreground mt-2">
            The 3-Step Barrier Reset Regimen
          </h2>
          <div className="h-[1.5px] w-12 bg-primary-brand mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-muted-brand leading-relaxed font-sans">
            Designed to work in clinical synergy. Cleanse, deeply treat, and lock in sustained cellular hydration.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-14">
          
          {REGIMEN_STEPS.map((item, idx) => {
            const isItemAdding = actionLoadingId === item.productId;

            return (
              <div
                key={item.step}
                className="group relative bg-white rounded-[2.25rem] p-6 shadow-sm border border-border-brand/30 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={idx * 150}
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-primary-brand-light text-primary-brand">
                      {item.step}
                    </span>
                    <span className="text-xs font-bold text-muted-brand uppercase tracking-wider">
                      {item.phase}
                    </span>
                  </div>

                  {/* Image Container */}
                  <Link
                    href={`/products?id=${item.productId}`}
                    className="relative aspect-square w-full rounded-[1.75rem] overflow-hidden bg-neutral-50 mb-6 flex items-center justify-center cursor-pointer block"
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-[10px] font-bold px-2.5 py-1 rounded-full text-foreground shadow-2xs">
                      {item.volume}
                    </div>
                  </Link>

                  {/* Product Title & Details */}
                  <Link href={`/products?id=${item.productId}`}>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary-brand transition-colors">
                      {item.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-muted-brand leading-relaxed mb-4 min-h-[48px]">
                    {item.description}
                  </p>

                  <div className="text-[11px] text-foreground font-semibold bg-[#F5F5F3] px-3 py-1.5 rounded-xl mb-4">
                    <span className="text-muted-brand font-normal">Key Active:</span> {item.keyIngredient}
                  </div>
                </div>

                {/* Bottom Row: Price & Quick Add */}
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between mt-auto">
                  <span className="text-base font-bold text-foreground">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                  <button
                    type="button"
                    onClick={() => addToCart(item.productId, 1)}
                    disabled={isItemAdding}
                    className="text-xs font-bold text-foreground hover:text-primary-brand transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {isItemAdding ? "Adding..." : "+ Add to Bag"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bundle Banner CTA */}
        <div
          className="bg-white rounded-[2.25rem] p-6 sm:p-8 border border-border-brand/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
          data-aos="fade-up"
        >
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider mb-1">
              <span>Save 15% With Full Routine</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
              Bundle All 3 Steps & Transform Your Barrier
            </h3>
            <p className="text-xs text-muted-brand">
              Includes Soothing Cleanser (150ml) + Radiance Serum (30ml) + Revitalize Cream (50ml).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <div className="text-center sm:text-right">
              <div className="text-xs text-neutral-400 line-through">
                ₹{individualTotal.toLocaleString("en-IN")}
              </div>
              <div className="text-2xl font-bold text-foreground">
                ₹{bundleDiscountPrice.toLocaleString("en-IN")}
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddBundleToCart}
              disabled={addingBundle}
              className="px-8 py-4 rounded-full bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-wider hover:bg-primary-brand transition-all shadow-sm cursor-pointer disabled:opacity-60 flex items-center gap-2"
            >
              {addingBundle ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Adding Bundle...</span>
                </>
              ) : bundleAdded ? (
                <>
                  <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Bundle Added!</span>
                </>
              ) : (
                "Add Full Routine (Save ₹" + savings.toLocaleString("en-IN") + ")"
              )}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
