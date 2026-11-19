"use client";

import React, { useRef, useState, useEffect } from "react";
import ProductCard from "../ui/ProductCard";
import api from "@/utils/api";
import { useCart } from "@/context/CartContext";

export default function BleachSection() {
  const { addToCart } = useCart();
  const sliderRef = useRef(null);
  const [bleachList, setBleachList] = useState([]);

  useEffect(() => {
    api.get("/products?storeId=javeo-store-uuid-3333-4444")
      .then((body) => {
        if (body?.success && Array.isArray(body.data)) {
          // Display any products configured under the bleach category in backend
          const filtered = body.data.filter((p) => {
            if (p.metadata?.isActive === false || p.isActive === 0) return false;
            const cat = (p.categoryName || p.category || "").trim().toLowerCase();
            return cat === "bleach";
          });
          setBleachList(filtered);
        }
      })
      .catch((err) => {
        console.error("Failed to load bleach products from backend:", err);
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

  // If no bleach products are found in the backend, don't render an empty section
  if (!bleachList || bleachList.length === 0) {
    return null;
  }

  return (
    <section id="bleach-collection" className="bg-[#fcfaf7] py-20 border-t border-border-brand/40 overflow-hidden font-sans">
      <div className="w-full px-4 sm:px-8 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-6" data-aos="fade-up">
          <div className="max-w-xl">
            <h2 className="font-serif text-3xl font-normal tracking-wide text-foreground mt-2">
              Bleaches
            </h2>
            <div className="h-[1.5px] w-12 bg-primary-brand mt-4" />
          </div>
        </div>

        {/* Product Slider Container */}
        <div className="relative group/slider">
          
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            type="button"
            className="absolute -left-2 md:-left-6 top-[40%] -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-border-brand bg-white text-foreground hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Previous bleach product"
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
            aria-label="Next bleach product"
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
            {bleachList.map((product, idx) => (
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
                  badge={product.badge || product.metadata?.badge || (product.marks?.length ? "" : "Bleach")}
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
