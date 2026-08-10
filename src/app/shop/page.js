"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";
import api from "@/utils/api";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";

const SHOP_PRODUCTS = [
  {
    id: 1,
    name: "Radiance Gold Serum",
    category: "Serums & Oils",
    price: 2499,
    imageUrl: "/serum.webp",
    badge: "Best Seller",
    description: "Infused with 24k gold flakes and botanical oils to restore moisture and leave a radiant, healthy glow.",
  },
  {
    id: 2,
    name: "Hydration Boost Fluid",
    category: "Serums & Oils",
    price: 1899,
    imageUrl: "/serum.webp",
    badge: "Trending",
    description: "A lightweight, fast-absorbing fluid packed with hyaluronic acid for 24-hour deep hydration.",
  },
  {
    id: 3,
    name: "Revitalize Cream",
    category: "Moisturizers",
    price: 2999,
    imageUrl: "/hero-banner.webp",
    badge: "New",
    description: "Rich and velvety daily moisturizer formulated to smooth fine lines and improve skin elasticity.",
  },
  {
    id: 4,
    name: "Night Recovery Mask",
    category: "Moisturizers",
    price: 3299,
    imageUrl: "/hero-banner.webp",
    badge: "Limited",
    description: "An overnight sleeping mask that repairs skin barrier and locks in nutrients while you sleep.",
  },
  {
    id: 5,
    name: "Soothing Milk Cleanser",
    category: "Cleansers",
    price: 1499,
    imageUrl: "/serum.webp",
    badge: "Best Seller",
    description: "Gentle daily cleanser that removes impurities while maintaining natural moisture barrier.",
  },
  {
    id: 6,
    name: "Restorative Eye Gel",
    category: "Treatments",
    price: 1799,
    imageUrl: "/hero-banner.webp",
    badge: "New",
    description: "Cooling eye gel formulated with peptide complexes to reduce puffiness and dark circles.",
  },
  {
    id: 7,
    name: "Vitamin C Glow Drops",
    category: "Serums & Oils",
    price: 2199,
    imageUrl: "/category-hair.webp",
    badge: "Best Seller",
    description: "Supercharged antioxidant cocktail to brighten complexions and boost collagen production.",
  },
  {
    id: 8,
    name: "Squalane Barrier Cream",
    category: "Moisturizers",
    price: 2499,
    imageUrl: "/category-face.webp",
    badge: "Trending",
    description: "Bio-identical emollient cream that repairs dry skin barrier and locks deep hydration.",
  },
  {
    id: 9,
    name: "Purifying Clay Cleanser",
    category: "Cleansers",
    price: 1299,
    imageUrl: "/category-body.webp",
    badge: "New",
    description: "Deeply cleanses pores, balances sebum production, and prevents breakouts without drying skin.",
  },
  {
    id: 10,
    name: "Brightening Treatment Toner",
    category: "Treatments",
    price: 1599,
    imageUrl: "/serum.webp",
    badge: "New",
    description: "Exfoliating botanical treatment toner that clarifies, smooths texture, and balances pH.",
  },
  {
    id: 11,
    name: "Smoothing Peptide Serum",
    category: "Serums & Oils",
    price: 2799,
    imageUrl: "/serum.webp",
    badge: "Trending",
    description: "Multi-peptide cellular serum designed to target wrinkles and restore facial elasticity.",
  },
  {
    id: 12,
    name: "Botanical Restoring Face Oil",
    category: "Serums & Oils",
    price: 3499,
    imageUrl: "/category-hair.webp",
    badge: "Limited",
    description: "Luxurious pure cold-pressed botanical oils formulated to nourish dry, depleted skin barriers.",
  }
];

const CATEGORIES = ["All Products", "Cleansers", "Serums & Oils", "Moisturizers", "Treatments"];

function ShopContent() {
  const [productsList, setProductsList] = useState(SHOP_PRODUCTS);
  const [categoriesList, setCategoriesList] = useState(CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [selectedConcern, setSelectedConcern] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const concernParam = searchParams.get("concern");
  const searchParam = searchParams.get("search");

  const [loading, setLoading] = useState(true);

  // Fetch dynamic products and categories on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const body = await api.get("/products?storeId=javeo-store-uuid-3333-4444");
        if (body.success && Array.isArray(body.data) && body.data.length > 0) {
          const activeProducts = body.data.filter((p) => p.metadata?.isActive !== false);
          setProductsList(activeProducts);
        }
      } catch (err) {
        console.error("Failed to load products from API:", err);
      }

      try {
        const catBody = await api.get("/categories?storeId=javeo-store-uuid-3333-4444");
        if (catBody.success && Array.isArray(catBody.data) && catBody.data.length > 0) {
          const names = catBody.data.map((c) => c.name);
          setCategoriesList(["All Products", ...names]);
        }
      } catch (err) {
        console.error("Failed to load categories from API:", err);
      }
      
      setLoading(false);
    };

    loadData();
  }, []);

  // Sync state with URL parameters
  useEffect(() => {
    const timer = setTimeout(() => {
      if (categoryParam && categoriesList.includes(categoryParam)) {
        setSelectedCategory(categoryParam);
        setSelectedConcern("");
        setSearchQuery("");
      } else if (concernParam) {
        setSelectedConcern(concernParam);
        setSelectedCategory("All Products");
        setSearchQuery("");
      } else if (searchParam) {
        setSearchQuery(searchParam);
        setSelectedCategory("All Products");
        setSelectedConcern("");
      } else {
        setSelectedCategory("All Products");
        setSelectedConcern("");
        setSearchQuery("");
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [categoryParam, concernParam, searchParam, categoriesList]);

  // Handle Add to Cart action
  const handleAddToCart = (id) => {
    const product = productsList.find((p) => p.id === id);
    if (product) {
      alert(`Added "${product.name}" to cart!`);
    }
  };

  // Filter and sort products dynamically
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...productsList];

    // 1. Filter by category
    if (selectedCategory !== "All Products") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 1b. Filter by concern
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

    // 1c. Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((p) => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
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
  }, [productsList, selectedCategory, selectedConcern, searchQuery, sortBy]);

  return (
    <div className="bg-white min-h-screen pt-8 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10" data-aos="fade-up" suppressHydrationWarning={true}>
          <span className="text-[10px] font-bold text-muted-brand tracking-widest uppercase font-sans">
            Clinically Proven Skincare
          </span>
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground mt-2">
            Shop All Products
          </h1>
          {selectedConcern && (
            <p className="text-xs text-primary-brand font-bold font-sans mt-2.5 uppercase tracking-widest">
              Concern active: {selectedConcern.replace("-", " ")}
            </p>
          )}
          {searchQuery && (
            <p className="text-xs text-primary-brand font-bold font-sans mt-2.5 uppercase tracking-widest">
              Search results for: &quot;{searchQuery}&quot;
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
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedConcern("");
                  setSearchQuery("");
                }}
                className={`text-xs font-semibold px-4 py-2.5 rounded-full border transition-all duration-300 whitespace-nowrap cursor-pointer ${selectedCategory === cat && !selectedConcern && !searchQuery
                    ? "bg-[#1a1a1a] text-white border-transparent shadow-sm"
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

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {filteredAndSortedProducts.map((product) => (
              <div
                key={product.id}
                className="w-full animate-in fade-in duration-250"
                data-aos="fade-up"
                suppressHydrationWarning={true}
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
                  quantity={product.quantity || product.metadata?.quantity}
                  unit={product.unit || product.metadata?.unit}
                  variants={product.variants}
                  options={product.options}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#f5f5f3]/40 rounded-[2.5rem] border border-dashed border-border-brand/40">
            <h3 className="font-serif text-lg font-bold text-foreground">No products found</h3>
            <p className="text-xs text-muted-brand mt-1">Try relaxing your search query or filter tags to find formulas.</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white py-32">
        <div className="h-8 w-8 border-4 border-indigo-650 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
