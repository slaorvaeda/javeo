"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

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
                    className="relative aspect-square w-full rounded-[1.75rem] overflow-hidden bg-gradient-to-b from-[#F3ECE0]/30 to-[#FAF8F5] mb-6 flex items-center justify-center cursor-pointer block"
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain object-center p-4 transition-transform duration-700 ease-out group-hover:scale-105"
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

                {/* Bottom Row: Step & View Product */}
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between mt-auto">
                  <span className="text-xs font-semibold text-primary-brand font-serif">
                    Step {item.step}
                  </span>
                  <Link
                    href={`/products?id=${item.productId}`}
                    className="text-xs font-bold text-foreground hover:text-primary-brand transition-colors cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>View Product</span>
                    <span>→</span>
                  </Link>
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
              <span>Complete Daily Routine</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
              Transform Your Skin Barrier With All 3 Steps
            </h3>
            <p className="text-xs text-muted-brand">
              Includes Soothing Cleanser (150ml) + Radiance Serum (30ml) + Revitalize Cream (50ml).
            </p>
          </div>

          <div className="flex items-center shrink-0">
            <Link
              href="/shop"
              className="px-8 py-4 rounded-full bg-[#1a1a1a] text-white text-xs font-bold uppercase tracking-wider hover:bg-primary-brand transition-all shadow-sm cursor-pointer inline-flex items-center gap-2"
            >
              <span>Explore All Formulations</span>
              <span>→</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
