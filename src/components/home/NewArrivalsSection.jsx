"use client";

import React, { useRef, useState, useEffect } from "react";
import ProductCard from "../ui/ProductCard";
import api from "@/utils/api";
import { useCart } from "@/context/CartContext";

export default function NewArrivalsSection() {
  const { addToCart } = useCart();
  const sliderRef = useRef(null);
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    api.get("/products?storeId=javeo-store-uuid-3333-4444")
      .then((body) => {
        if (body.success && Array.isArray(body.data) && body.data.length > 0) {
          const activeProducts = body.data.filter((p) => p.metadata?.isActive !== false);

          // Filter for New or Trending products
          let filtered = activeProducts.filter((p) => {
            const badge = (p.badge || p.metadata?.badge || "").toLowerCase();
            const hasNewOrTrendingMark = Array.isArray(p.marks) && p.marks.some((m) => {
              const markName = (m.name || "").toLowerCase();
              return markName.includes("new") || markName.includes("trending");
            });
            return badge.includes("new") || badge.includes("trending") || hasNewOrTrendingMark;
          });

          // Fallback if none are specifically tagged: take latest 4 products
          if (filtered.length === 0) {
            filtered = [...activeProducts].reverse().slice(0, 4);
          }

          setNewProducts(filtered);
        }
      })
      .catch((err) => console.error("Failed to load new arrival products:", err));
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

  if (newProducts.length === 0) return null;

  return (
    <section id="new-arrivals" className="bg-[#FAF8F5] py-20 border-t border-border-brand/40 overflow-hidden">
      <div className="w-full px-4 sm:px-8 md:px-12">
        
        {/* Header container */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-6" data-aos="fade-up">
          <div className="max-w-xl">
            <span className="text-[11px] font-bold tracking-widest uppercase text-primary-brand font-sans">
              Fresh Formulations
            </span>
            <h2 className="font-serif text-3xl font-normal tracking-wide text-foreground mt-2">
              New Drops & Trending Innovations
            </h2>
            <div className="h-[1.5px] w-12 bg-primary-brand mt-4" />
          </div>
        </div>

        {/* Product Slider Container */}
        <div className="relative group/slider">
          
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute -left-2 md:-left-6 top-[40%] -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-border-brand bg-white text-foreground hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Previous new arrivals"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute -right-2 md:-right-6 top-[40%] -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-border-brand bg-white text-foreground hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Next new arrivals"
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
            {newProducts.map((product, idx) => (
              <div
                key={product.id}
                className="w-full sm:w-[calc((100%-24px)/2)] md:w-[calc((100%-48px)/3)] lg:w-[calc((100%-72px)/4)] xl:w-[calc((100%-96px)/5)] flex-shrink-0 snap-start"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  mrp={product.mrp}
                  imageUrl={product.imageUrl}
                  images={product.metadata?.images || []}
                  marks={product.marks || []}
                  badge={product.badge || product.metadata?.badge || (product.marks?.length ? "" : "New")}
                  description={product.description}
                  onAddToCart={handleAddToCart}
                  quantity={product.quantity || product.metadata?.quantity}
                  unit={product.unit || product.metadata?.unit}
                  variants={product.variants}
                  options={product.options}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
