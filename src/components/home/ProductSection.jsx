"use client";

import React, { useRef, useState, useEffect } from "react";
import ProductCard from "../ui/ProductCard";
import api from "@/utils/api";

const PRODUCTS = [
  {
    id: 1,
    name: "Radiance Gold Serum",
    category: "Serums & Treatments",
    price: 2499,
    imageUrl: "/serum.png",
    badge: "Best Seller",
    description: "Infused with 24k gold flakes and botanical oils to restore moisture and leave a radiant, healthy glow.",
  },
  {
    id: 2,
    name: "Hydration Boost Fluid",
    category: "Serums & Treatments",
    price: 1899,
    imageUrl: "/serum.png",
    badge: "Trending",
    description: "A lightweight, fast-absorbing fluid packed with hyaluronic acid for 24-hour deep hydration.",
  },
  {
    id: 3,
    name: "Revitalize Cream",
    category: "Moisturizers",
    price: 2999,
    imageUrl: "/hero-banner.png",
    badge: "New",
    description: "Rich and velvety daily moisturizer formulated to smooth fine lines and improve skin elasticity.",
  },
  {
    id: 4,
    name: "Night Recovery Mask",
    category: "Moisturizers",
    price: 3299,
    imageUrl: "/hero-banner.png",
    badge: "Limited",
    description: "An overnight sleeping mask that repairs skin barrier and locks in nutrients while you sleep.",
  },
  {
    id: 5,
    name: "Soothing Milk Cleanser",
    category: "Cleansers",
    price: 1499,
    imageUrl: "/serum.png",
    badge: "Best Seller",
    description: "Gentle daily cleanser that removes impurities while maintaining natural moisture barrier.",
  },
  {
    id: 6,
    name: "Restorative Eye Gel",
    category: "Treatments",
    price: 1799,
    imageUrl: "/hero-banner.png",
    badge: "New",
    description: "Cooling eye gel formulated with peptide complexes to reduce puffiness and dark circles.",
  },
];

export default function ProductSection() {
  const sliderRef = useRef(null);
  const [productsList, setProductsList] = useState(PRODUCTS);

  useEffect(() => {
    api.get("/products?storeId=javeo-store-uuid-3333-4444")
      .then((body) => {
        if (body.success && Array.isArray(body.data) && body.data.length > 0) {
          const activeProducts = body.data.filter((p) => p.metadata?.isActive !== false);
          setProductsList(activeProducts);
        }
      })
      .catch((err) => console.error("Failed to load products from API:", err));
  }, []);

  const handleAddToCart = (id) => {
    const product = productsList.find((p) => p.id === id);
    if (product) {
      alert(`Added "${product.name}" to cart!`);
    }
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
    <section id="best-sellers" className="bg-white py-20 border-t border-border-brand/40 overflow-hidden">
      <div className="w-full px-4 sm:px-8 md:px-12">
        
        {/* Header container (Flex row for Title only) */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-6" data-aos="fade-up">
          <div className="max-w-xl">
            <h2 className="font-serif text-3xl font-normal tracking-wide text-foreground mt-2">
              Discover Our Best Sellers
            </h2>
            <div className="h-[1.5px] w-12 bg-primary-brand mt-4" />
          </div>
        </div>

        {/* Product Slider Container (Relative to absolute position arrows) */}
        <div className="relative group/slider">
          
          {/* Left Navigation Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute -left-2 md:-left-6 top-[40%] -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-border-brand bg-white text-foreground hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Previous products"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          {/* Right Navigation Arrow */}
          <button
            onClick={scrollRight}
            className="absolute -right-2 md:-right-6 top-[40%] -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-border-brand bg-white text-foreground hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Next products"
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
            {productsList.map((product, idx) => (
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
                  badge={product.badge || product.metadata?.badge || ""}
                  description={product.description}
                  onAddToCart={handleAddToCart}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
