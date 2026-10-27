"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import api from "@/utils/api";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  const { addToCart } = useCart();
  const [wishlistIds, setWishlistIds] = useState([]);
  const [productsList, setProductsList] = useState([]);

  // Fetch wishlisted items from local storage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadWishlist = () => {
      const ids = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlistIds(ids);
    };

    loadWishlist();

    // Listen to changes in the wishlist
    window.addEventListener("wishlist-updated", loadWishlist);
    return () => window.removeEventListener("wishlist-updated", loadWishlist);
  }, []);

  // Fetch products catalog from database API
  useEffect(() => {
    api.get("/products?storeId=javeo-store-uuid-3333-4444")
      .then((body) => {
        if (body.success && Array.isArray(body.data) && body.data.length > 0) {
          setProductsList(body.data);
        }
      })
      .catch((err) => console.error("Failed to load products from API:", err));
  }, []);

  // Filter products by wishlisted IDs
  const wishlistedProducts = useMemo(() => {
    return productsList.filter((p) => wishlistIds.includes(p.id));
  }, [productsList, wishlistIds]);

  const handleAddToCart = (id) => {
    addToCart(id, 1);
  };

  return (
    <div className="bg-white min-h-screen pt-8 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header and Breadcrumbs */}
        <div className="border-b border-border-brand/40 pb-8 mb-10">
          <nav className="flex text-xs text-muted-brand font-sans tracking-wide mb-3 uppercase">
            <Link href="/" className="hover:text-primary-brand transition-colors">Home</Link>
            <span className="mx-2 text-neutral-300">/</span>
            <span className="text-foreground">Wishlist</span>
          </nav>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            My Wishlist
          </h1>
          <p className="text-xs text-muted-brand font-sans mt-3">
            Keep track of your favorite skincare formulations. Click the heart to remove them from your routine favorites list.
          </p>
        </div>

        {/* Wishlisted items grid display */}
        {wishlistedProducts.length > 0 ? (
          <div>
            <div className="text-xs text-muted-brand font-sans mb-8">
              You have {wishlistedProducts.length} items in your wishlist
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {wishlistedProducts.map((product) => (
                <div key={product.id} className="w-full" data-aos="fade-up">
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    mrp={product.mrp}
                    imageUrl={product.imageUrl}
                    images={product.metadata?.images || []}
                    marks={product.marks || []}
                  badge={product.badge || product.metadata?.badge || ""}
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
        ) : (
          <div className="text-center py-24 border border-dashed border-border-brand/40 rounded-[2.25rem] max-w-lg mx-auto px-6">
            <svg
              className="h-16 w-16 text-neutral-300 mx-auto mb-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <h3 className="font-serif text-lg font-bold text-foreground">Your wishlist is empty</h3>
            <p className="text-xs text-muted-brand mt-1 mb-8">
              Explore our range of clean, dermatologist-tested formulas and tap the heart icon on any product to save it here.
            </p>
            <Link
              href="/shop"
              className="inline-flex bg-foreground text-background px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-primary-brand hover:text-white transition-all duration-300"
            >
              Browse Products
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
