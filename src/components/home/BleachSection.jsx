"use client";

import React, { useRef, useState, useEffect } from "react";
import ProductCard from "../ui/ProductCard";
import api from "@/utils/api";
import { useCart } from "@/context/CartContext";

// Production Bleach Products Fallback ensuring zero-downtime render
const FALLBACK_BLEACH_PRODUCTS = [
  {
    id: 104,
    name: "VITAMIN C SHINIER BLEACH | HD FAIRNESS | RADIANT GLOWING & BEAUTIFUL SKIN",
    price: 300,
    mrp: 800,
    description: "Supercharged with stabilized Vitamin C antioxidants to neutralize environmental dullness, lighten fine facial hair, and restore supple morning luminosity.",
    imageUrl: "https://res.cloudinary.com/du5qspp8n/image/upload/v1793098811/cpanel_uploads/um6iqbiqukgssxzxjhyl.png",
    images: ["https://res.cloudinary.com/du5qspp8n/image/upload/v1793098831/cpanel_uploads/uvw7y2yi2iwrnyvgdgx5.png"],
    category: "Bleach",
    quantity: "250",
    unit: "g",
    badge: "Best Seller",
  },
  {
    id: 105,
    name: "SKIN WHITENING SHINIER BLEACH | HD FAIRNESS | WHITER - BRIGHTER & LIGHTER SKIN TONE",
    price: 340,
    mrp: 780,
    description: "Ultra-nourishing brightening formula targeting hyperpigmentation, uneven patches, and dull epidermal layers for high-definition luminous skin tone.",
    imageUrl: "https://res.cloudinary.com/du5qspp8n/image/upload/v1793098954/cpanel_uploads/slq1hdivfjjwv2wut1qb.png",
    images: ["https://res.cloudinary.com/du5qspp8n/image/upload/v1793098980/cpanel_uploads/elp5qrdmekvbdk1r4i3j.png"],
    category: "Bleach",
    quantity: "300",
    unit: "g",
    badge: "Skin Brightening",
  },
  {
    id: 106,
    name: "OXY DIAMOND SHINIER BLEACH | HD FAIRNESS | SKIN ENERGIZING & YOUTHFUL GLOW",
    price: 450,
    mrp: 900,
    description: "Infused with active micro-oxygen spheres and diamond ash to deeply energize cellular respiration, unveiling breathtaking diamond clarity and youthful radiance.",
    imageUrl: "https://res.cloudinary.com/du5qspp8n/image/upload/v1793099094/cpanel_uploads/r47qaiczkpkwzsfgs6xg.png",
    images: ["https://res.cloudinary.com/du5qspp8n/image/upload/v1793099119/cpanel_uploads/jr7nxsgspuq5vstmwuyq.png"],
    category: "Bleach",
    quantity: "300",
    unit: "g",
    badge: "50% OFF",
  },
  {
    id: 107,
    name: "DE-TAN SHINIER BLEACH | HD FAIRNESS | ACNE CONTROL & UV PROTECTION",
    price: 350,
    mrp: 560,
    description: "Formulated with specialized anti-tan actives, botanical tea tree, and UV barrier shields to gently eliminate deep sun tanning while maintaining skin hydration.",
    imageUrl: "https://res.cloudinary.com/du5qspp8n/image/upload/v1793099421/cpanel_uploads/ekgvrvwx8apccgw9sqyv.png",
    images: ["https://res.cloudinary.com/du5qspp8n/image/upload/v1793099307/cpanel_uploads/zypxk1szj6nj0xbuwwry.png"],
    category: "Bleach",
    quantity: "350",
    unit: "g",
    badge: "De-Tan Formula",
  },
];

export default function BleachSection() {
  const { addToCart } = useCart();
  const sliderRef = useRef(null);
  const [bleachList, setBleachList] = useState(FALLBACK_BLEACH_PRODUCTS);

  useEffect(() => {
    api.get("/products?storeId=javeo-store-uuid-3333-4444")
      .then((body) => {
        if (body?.success && Array.isArray(body.data)) {
          // Filter strictly for Bleach products
          const filtered = body.data.filter((p) => {
            const cat = (p.categoryName || p.category || "").toLowerCase();
            const name = (p.name || "").toLowerCase();
            return cat === "bleach" || name.includes("bleach");
          });

          if (filtered.length > 0) {
            setBleachList(filtered);
          }
        }
      })
      .catch((err) => {
        console.warn("Using fallback bleach collection:", err);
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
                  badge={product.badge || product.metadata?.badge || "Bleach"}
                  description={product.description}
                  onAddToCart={handleAddToCart}
                  quantity={product.quantity || product.metadata?.quantity || "250"}
                  unit={product.unit || product.metadata?.unit || "g"}
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
