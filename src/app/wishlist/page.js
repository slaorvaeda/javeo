"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import api from "@/utils/api";

// Catalog of products to look up details for wishlisted IDs
const PRODUCT_CATALOG = [
  {
    id: 1,
    name: "Radiance Gold Serum",
    category: "Serums & Oils",
    price: 2499,
    imageUrl: "/serum.png",
    badge: "Best Seller",
    description: "Infused with 24k gold flakes and botanical oils to restore moisture and leave a radiant, healthy glow.",
  },
  {
    id: 2,
    name: "Hydration Boost Fluid",
    category: "Serums & Oils",
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
  {
    id: 7,
    name: "Vitamin C Glow Drops",
    category: "Serums & Oils",
    price: 2199,
    imageUrl: "/category-hair.png",
    badge: "Best Seller",
    description: "Supercharged antioxidant cocktail to brighten complexions and boost collagen production.",
  },
  {
    id: 8,
    name: "Squalane Barrier Cream",
    category: "Moisturizers",
    price: 2499,
    imageUrl: "/category-face.png",
    badge: "Trending",
    description: "Bio-identical emollient cream that repairs dry skin barrier and locks deep hydration.",
  },
  {
    id: 9,
    name: "Purifying Clay Cleanser",
    category: "Cleansers",
    price: 1299,
    imageUrl: "/category-body.png",
    badge: "New",
    description: "Deeply cleanses pores, balances sebum production, and prevents breakouts without drying skin.",
  },
  {
    id: 10,
    name: "Brightening Treatment Toner",
    category: "Treatments",
    price: 1599,
    imageUrl: "/serum.png",
    badge: "New",
    description: "Exfoliating botanical treatment toner that clarifies, smooths texture, and balances pH.",
  },
  {
    id: 11,
    name: "Smoothing Peptide Serum",
    category: "Serums & Oils",
    price: 2799,
    imageUrl: "/serum.png",
    badge: "Trending",
    description: "Multi-peptide cellular serum designed to target wrinkles and restore facial elasticity.",
  },
  {
    id: 12,
    name: "Botanical Restoring Face Oil",
    category: "Serums & Oils",
    price: 3499,
    imageUrl: "/category-hair.png",
    badge: "Limited",
    description: "Luxurious pure cold-pressed botanical oils formulated to nourish dry, depleted skin barriers.",
  }
];

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [productsList, setProductsList] = useState(PRODUCT_CATALOG);

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
    const product = productsList.find((p) => p.id === id);
    if (product) {
      alert(`Added "${product.name}" to cart!`);
    }
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
                    badge={product.badge || product.metadata?.badge || ""}
                    description={product.description}
                    onAddToCart={handleAddToCart}
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
