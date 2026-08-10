"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
  id,
  name,
  description,
  price,
  mrp,
  imageUrl,
  secondaryImageUrl,
  images = [],
  badge,
  onAddToCart,
}) {
  const [liked, setLiked] = useState(false);

  // Compute hover image
  const getSecondaryImage = () => {
    if (secondaryImageUrl) return secondaryImageUrl;
    if (Array.isArray(images) && images.length > 1) return images[1];
    if (Array.isArray(images) && images.length > 0) return images[0];
    
    // Fallback based on name keywords
    const lowerName = name.toLowerCase();
    if (lowerName.includes("serum") || lowerName.includes("oil") || lowerName.includes("fluid")) {
      return "/category-face.webp";
    }
    if (lowerName.includes("cream") || lowerName.includes("mask") || lowerName.includes("moisturizer")) {
      return "/category-body.webp";
    }
    if (lowerName.includes("cleanser") || lowerName.includes("wash")) {
      return "/category-essentials.webp";
    }
    return "/category-hair.webp";
  };

  const hoverImg = getSecondaryImage();

  // Sync liked state with localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const isLiked = wishlist.includes(id);
    const timer = setTimeout(() => {
      setLiked(isLiked);
    }, 0);
    return () => clearTimeout(timer);
  }, [id]);

  const handleLikeToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window === "undefined") return;

    let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (wishlist.includes(id)) {
      wishlist = wishlist.filter((itemId) => itemId !== id);
      setLiked(false);
    } else {
      wishlist.push(id);
      setLiked(true);
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    // Dispatch a custom event to notify other components/pages
    window.dispatchEvent(new Event("wishlist-updated"));
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-[2.25rem] p-4 shadow-sm border border-border-brand/40 transition-all duration-300 hover:shadow-md h-full">
      
      {/* Image container wrapped in Link */}
      <Link 
        href={`/products/${id}`} 
        className="relative aspect-square w-full overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-[#F3ECE0]/30 to-[#FAF8F5] cursor-pointer block"
      >
        {/* Primary Image */}
        <Image
          src={imageUrl || "/logo.webp"}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-0"
        />

        {/* Secondary Hover Image */}
        <Image
          src={hoverImg}
          alt={`${name} Texture`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover object-center absolute inset-0 w-full h-full opacity-0 scale-95 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-100"
        />

        {/* Badge (Trending/Best Seller/New) */}
        {badge && (
          <span className="absolute top-4 left-4 z-10 bg-[#16a34a] text-white text-[10px] font-semibold tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
            {badge}
          </span>
        )}
      </Link>

      {/* Heart/Like Button */}
      <button
        onClick={handleLikeToggle}
        type="button"
        className="absolute top-8 right-8 z-20 bg-white hover:bg-neutral-50 shadow-sm rounded-full p-2 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Add to wishlist"
      >
        <svg
          className={`h-4.5 w-4.5 transition-colors duration-300 ${
            liked ? "fill-red-500 stroke-red-500" : "fill-none stroke-neutral-500"
          }`}
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button>

      {/* Details container */}
      <div className="flex flex-1 flex-col pt-5 px-1.5 pb-1">
        <Link href={`/products/${id}`} className="hover:text-primary-brand transition-colors duration-300 cursor-pointer">
          <h3 className="text-lg font-bold tracking-tight text-foreground mb-2 leading-snug line-clamp-1">
            {name}
          </h3>
        </Link>

        <p className="text-xs text-muted-brand leading-relaxed mb-5 font-sans line-clamp-2 min-h-[36px] sm:min-h-[40px]">
          {description}
        </p>

        {/* Bottom bar with price and Add to Cart button */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5">
            <span className="text-base font-bold text-foreground">
              ₹{parseFloat(price).toLocaleString("en-IN")}
            </span>
            {mrp && parseFloat(mrp) > parseFloat(price) && (
              <span className="text-xs text-neutral-400 line-through font-normal">
                ₹{parseFloat(mrp).toLocaleString("en-IN")}
              </span>
            )}
          </div>
          <button
            onClick={() => onAddToCart && onAddToCart(id)}
            className="bg-[#1a1a1a] hover:bg-primary-brand text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm cursor-pointer"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
