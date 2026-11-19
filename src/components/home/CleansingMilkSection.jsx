"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "../ui/ProductCard";
import api from "@/utils/api";
import { useCart } from "@/context/CartContext";

export default function CleansingMilkSection() {
  const { addToCart } = useCart();
  const sliderRef = useRef(null);
  const [cleansingMilkList, setCleansingMilkList] = useState([]);

  useEffect(() => {
    api.get("/products?storeId=javeo-store-uuid-3333-4444")
      .then((body) => {
        if (body?.success && Array.isArray(body.data)) {
          // Display any products configured under the Cleansing Milk category or with cleansing milk in the name
          const filtered = body.data.filter((p) => {
            if (p.metadata?.isActive === false || p.isActive === 0) return false;
            const cat = (p.categoryName || p.category || "").trim().toLowerCase();
            const name = (p.name || "").trim().toLowerCase();
            return cat === "cleansing milk" || name.includes("cleansing milk");
          });
          setCleansingMilkList(filtered);
        }
      })
      .catch((err) => {
        console.error("Failed to load cleansing milk products from backend:", err);
      });
  }, []);

  const handleAddToCart = (id) => {
    addToCart(id, 1);
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  };

  // If no cleansing milk products are found, do not render an empty section
  if (!cleansingMilkList || cleansingMilkList.length === 0) {
    return null;
  }

  return (
    <section id="cleansing-milk-collection" className="bg-white py-10 border-t border-border-brand/40 overflow-hidden font-sans">
      <div className="w-full px-4 sm:px-8 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6 gap-6" data-aos="fade-up">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-primary-brand tracking-widest uppercase font-sans">
              Gentle Daily Care
            </span>
            <h2 className="font-serif text-3xl font-normal tracking-wide text-foreground mt-2">
              Cleansing Milk
            </h2>
            <p className="text-xs sm:text-sm text-muted-brand mt-2 font-sans">
              Rich, soothing botanical formulas that melt away impurities while preserving the natural skin barrier.
            </p>
            <div className="h-[1.5px] w-12 bg-primary-brand mt-4" />
          </div>

          <Link
            href="/shop?category=Cleansing%20Milk"
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground hover:text-primary-brand transition-colors whitespace-nowrap"
          >
            <span>View All</span>
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Product Slider Container */}
        <div className="relative group/slider">
          
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            type="button"
            className="absolute -left-2 md:-left-6 top-[40%] -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-border-brand bg-white text-foreground hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Previous cleansing milk product"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            type="button"
            className="absolute -right-2 md:-right-6 top-[40%] -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-border-brand bg-white text-foreground hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Next cleansing milk product"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Product Slider Track */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth pb-4 px-0.5"
          >
            {cleansingMilkList.map((product, idx) => (
              <div
                key={product.id}
                className="w-full sm:w-[calc((100%-24px)/2)] md:w-[calc((100%-48px)/3)] lg:w-[calc((100%-72px)/4)] flex-shrink-0 snap-start"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  mrp={product.mrp}
                  imageUrl={product.imageUrl}
                  images={product.metadata?.images || product.images || []}
                  marks={product.marks || []}
                  badge={product.badge || product.metadata?.badge || (product.marks?.length ? "" : "Cleansing Milk")}
                  description={product.description}
                  onAddToCart={handleAddToCart}
                  quantity={product.quantity || product.metadata?.quantity}
                  unit={product.unit || product.metadata?.unit}
                  variants={product.variants || []}
                  options={product.options || []}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
