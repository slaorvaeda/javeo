"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";

const SHOP_PRODUCTS = [
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

const CATEGORIES = ["All Products", "Cleansers", "Serums & Oils", "Moisturizers", "Treatments"];

function ShopContent() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [selectedConcern, setSelectedConcern] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const concernParam = searchParams.get("concern");

  // Sync state with URL parameters (category & concerns)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (categoryParam && CATEGORIES.includes(categoryParam)) {
        setSelectedCategory(categoryParam);
        setSelectedConcern("");
      } else if (concernParam) {
        setSelectedConcern(concernParam);
        setSelectedCategory("All Products");
      } else {
        setSelectedCategory("All Products");
        setSelectedConcern("");
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [categoryParam, concernParam]);

  // Handle Add to Cart action
  const handleAddToCart = (id) => {
    const product = SHOP_PRODUCTS.find((p) => p.id === id);
    alert(`Added "${product.name}" to cart!`);
  };

  // Filter and sort products dynamically
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...SHOP_PRODUCTS];

    // 1. Filter by category
    if (selectedCategory !== "All Products") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 1b. Filter by concern (intelligent text mapping)
    if (selectedConcern) {
      const query = selectedConcern.toLowerCase();
      let filterQuery = query;
      if (query === "pores") filterQuery = "pore";
      if (query === "anti-aging") filterQuery = "wrinkle";
      if (query === "hyperpigmentation") filterQuery = "glow";
      
      result = result.filter((p) => 
        p.name.toLowerCase().includes(filterQuery) || 
        p.description.toLowerCase().includes(filterQuery)
      );
    }

    // 2. Sort products
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [selectedCategory, selectedConcern, sortBy]);

  return (
    <div className="bg-white min-h-screen p-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Breadcrumbs & Header */}
        <div className="border-b border-border-brand/40 pb-8 mb-10">
          <nav className="flex text-xs text-muted-brand font-sans tracking-wide mb-3 uppercase">
            <Link href="/" className="hover:text-primary-brand transition-colors">Home</Link>
            <span className="mx-2 text-neutral-300">/</span>
            <span className="text-foreground">Shop</span>
          </nav>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Shop All Products
          </h1>
          {selectedConcern && (
            <p className="text-xs text-primary-brand font-bold font-sans mt-2.5 uppercase tracking-widest">
              Concern active: {selectedConcern.replace("-", " ")}
            </p>
          )}
          <p className="text-xs text-muted-brand font-sans mt-3 max-w-md">
            Explore our curated catalog of clean, clinical formulas designed to hydrate, balance, and rejuvenate your skin barrier.
          </p>
        </div>

        {/* Toolbar (Filters + Sorters) */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-border-brand/20 pb-6 mb-10">

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedConcern("");
                }}
                className={`text-xs font-semibold px-4 py-2.5 rounded-full border transition-all duration-300 whitespace-nowrap cursor-pointer ${selectedCategory === cat && !selectedConcern
                    ? "bg-foreground text-background border-foreground shadow-sm"
                    : "bg-[#f5f5f3] text-muted-brand border-transparent hover:border-neutral-300"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <span className="text-xs text-muted-brand font-sans">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#f5f5f3] border-none text-xs font-semibold px-4 py-2.5 rounded-full outline-none focus:ring-1 focus:ring-primary-brand cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>

        </div>

        {/* Results Counter */}
        <div className="text-xs text-muted-brand font-sans mb-8">
          Showing {filteredAndSortedProducts.length} of {SHOP_PRODUCTS.length} products
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {filteredAndSortedProducts.map((product) => (
              <div
                key={product.id}
                className="w-full"
                data-aos="fade-up"
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  badge={product.badge}
                  description={product.description}
                  onAddToCart={handleAddToCart}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-border-brand/40 rounded-3xl">
            <h3 className="font-serif text-lg font-bold text-foreground">No products found</h3>
            <p className="text-xs text-muted-brand mt-2">Try clearing your category filter to see all results.</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-28 text-center text-xs text-muted-brand">Loading Catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
