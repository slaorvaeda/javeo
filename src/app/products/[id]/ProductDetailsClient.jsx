"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import api from "@/utils/api";
import { ProductDetailsSkeleton } from "@/components/ui/Skeleton";

const formatRichText = (str) => {
  if (!str) return "";
  return str
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/__(.*?)__/g, '<u>$1</u>');
};

export default function ProductDetailsClient({ id }) {
  const productId = parseInt(id);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    contact: "",
    message: "",
  });

  const matchedVariant = useMemo(() => {
    if (!product || !product.hasVariants || !product.variants) return null;
    return product.variants.find(variant => {
      return Object.keys(selectedOptions).every(key => {
        return variant.combination && variant.combination[key] === selectedOptions[key];
      });
    });
  }, [product, selectedOptions]);

  // Sync selectedOptions when product is loaded
  useEffect(() => {
    if (product && product.hasVariants && product.options && product.options.length > 0) {
      const initial = {};
      product.options.forEach(opt => {
        if (opt.values && opt.values.length > 0) {
          initial[opt.name] = opt.values[0];
        }
      });
      const timer = setTimeout(() => {
        setSelectedOptions(initial);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [product]);

  // Sync main image when variant image changes
  useEffect(() => {
    if (matchedVariant && matchedVariant.imageUrl) {
      const timer = setTimeout(() => {
        setSelectedImage(matchedVariant.imageUrl);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [matchedVariant]);

  // Set initial active tab based on visibility metadata
  useEffect(() => {
    if (product) {
      const directionsVis = product.metadata?.showDirections !== false;
      const ingredientsVis = product.metadata?.showIngredients !== false;
      let targetTab = "description";
      if (!directionsVis && ingredientsVis) {
        targetTab = "ingredients";
      } else if (directionsVis) {
        targetTab = "description";
      }
      const timer = setTimeout(() => {
        setActiveTab(targetTab);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [product]);

  // Fetch product from DB / API
  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        setLoading(true);
        const body = await api.get(`/products/${productId}`);
        const data = body?.data || (body?.id ? body : null);

        if (data && data.id) {
          setProduct(data);
          setSelectedImage(data.imageUrl || "");
        } else {
          setProduct(null);
          setSelectedImage("");
        }

        // Fetch dynamic product recommendations from DB/API
        try {
          const listBody = await api.get('/products?storeId=javeo-store-uuid-3333-4444');
          const listData = listBody?.data || [];
          if (Array.isArray(listData) && listData.length > 0) {
            setRecommendedProducts(listData);
          }
        } catch (listErr) {
          console.warn('Failed to fetch recommendations list from API:', listErr);
        }
      } catch (err) {
        console.error('Failed to load product from API:', err);
        setProduct(null);
        setSelectedImage("");
      } finally {
        setLoading(false);
      }
    };

    loadProductDetails();
  }, [productId]);

  // Dynamic client-side document title sync for SPA query parameter route /products?id=...
  useEffect(() => {
    if (typeof window !== "undefined" && product && product.name) {
      document.title = `${product.name} | Javeo Skincare`;
    }
  }, [product]);

  // Sync size list (only return sizes if explicitly defined in product or metadata)
  const sizes = useMemo(() => {
    if (!product) return [];
    if (product.sizes && product.sizes.length > 0) return product.sizes;
    if (product.metadata?.sizes) {
      return Array.isArray(product.metadata.sizes) ? product.metadata.sizes : [product.metadata.sizes];
    }
    return [];
  }, [product]);

  useEffect(() => {
    if (sizes.length > 0) {
      const timer = setTimeout(() => {
        setSelectedSize(sizes[0]);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [sizes]);

  // Sync liked state with localStorage
  useEffect(() => {
    if (!product) return;
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const isLiked = wishlist.includes(product.id);
    const timer = setTimeout(() => {
      setLiked(isLiked);
    }, 0);
    return () => clearTimeout(timer);
  }, [product]);

  // Handle wishlist toggle
  const handleLikeToggle = () => {
    if (!product) return;
    let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (wishlist.includes(product.id)) {
      wishlist = wishlist.filter((id) => id !== product.id);
      setLiked(false);
    } else {
      wishlist.push(product.id);
      setLiked(true);
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    window.dispatchEvent(new Event("wishlist-updated"));
  };

  // Get recommended products (excluding current, sorted by category similarity)
  const recommendations = useMemo(() => {
    if (!product) return [];

    // Choose data source (API products list or empty fallback)
    const baseList = recommendedProducts.length > 0 ? recommendedProducts : [];
    const cleanCurrentId = product.id.toString();

    // Filter out the current product
    const otherProducts = baseList.filter((p) => p.id.toString() !== cleanCurrentId);

    // Sort: same category first for smarter recommendation logic
    return otherProducts
      .sort((a, b) => {
        const aSame = a.category?.toLowerCase() === product.category?.toLowerCase() ? 1 : 0;
        const bSame = b.category?.toLowerCase() === product.category?.toLowerCase() ? 1 : 0;
        return bSame - aSame;
      })
      .slice(0, 4);
  }, [product, recommendedProducts]);

  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white py-20 px-4">
        <div className="text-center max-w-md">
          <h2 className="font-serif text-2xl font-bold text-foreground">Product Not Found</h2>
          <p className="text-xs text-muted-brand mt-2 mb-6">The skincare formula you are looking for does not exist or has been discontinued.</p>
          <Link href="/shop" className="inline-flex bg-foreground text-background px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-primary-brand hover:text-white">
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  // Gallery images combined list
  const imagesList = [product.imageUrl, ...(product.metadata?.images || [])].filter(Boolean);

  return (
    <div className="bg-white min-h-screen pt-8 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Breadcrumbs */}
        <nav className="flex text-xs text-muted-brand font-sans tracking-wide mb-8 uppercase">
          <Link href="/" className="hover:text-primary-brand transition-colors">Home</Link>
          <span className="mx-2 text-neutral-300">/</span>
          <Link href="/shop" className="hover:text-primary-brand transition-colors">Shop</Link>
          <span className="mx-2 text-neutral-300">/</span>
          <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* Core Product Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">

          {/* Left Column (Product Image Frame + Thumbnails Grid) */}
          <div className="lg:col-span-6 w-full flex flex-col" data-aos="fade-right">
            <div className="relative aspect-[4/3.8] w-full overflow-hidden shadow-sm flex items-center justify-center">
              <Image
                src={selectedImage || "/serum.webp"}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-center p-6 sm:p-8 transition-transform duration-500 ease-in-out hover:scale-[1.03] rounded-3xl cursor-pointer drop-shadow-sm"
              />

              {/* Product Badge & Discount Tag */}
              <div className="absolute top-6 left-6 z-10 flex flex-wrap gap-2">
                {product.badge && (
                  <span className="bg-[#16a34a] text-white text-[10px] font-semibold tracking-wider px-3.5 py-1.5 rounded-full shadow-sm uppercase">
                    {product.badge}
                  </span>
                )}
                {/* Discount tag hidden for brand reveal */}
                {/*
                {(() => {
                  const currentPrice = parseFloat(matchedVariant ? matchedVariant.price : product.price) || 0;
                  const currentMrp = parseFloat(matchedVariant ? matchedVariant.mrp : product.mrp) || 0;
                  const discountPct = (currentMrp > currentPrice)
                    ? Math.round(((currentMrp - currentPrice) / currentMrp) * 100)
                    : 0;
                  if (discountPct > 0) {
                    return (
                      <span className="bg-red-600 text-white text-[10px] font-bold tracking-wider px-3 py-1.5 rounded-full shadow-sm uppercase">
                        {discountPct}% OFF
                      </span>
                    );
                  }
                  return null;
                })()}
                */}
              </div>
            </div>

            {/* Gallery Thumbnail Row */}
            {imagesList.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {imagesList.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden border-2 bg-gradient-to-b from-[#F3ECE0]/30 to-[#FAF8F5] transition-all flex-shrink-0 cursor-pointer ${selectedImage === img ? 'border-[#1a1a1a] scale-102 shadow-sm' : 'border-zinc-200 hover:border-zinc-400'
                      }`}
                  >
                    <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-contain p-1.5" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column (Product Details & Purchasing Panel) */}
          <div className="lg:col-span-6 w-full flex flex-col" data-aos="fade-left">

            {/* Category and Product Marks */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-bold text-primary-brand tracking-widest uppercase font-sans">
                {product.category}
              </span>
              {product.marks && product.marks.map(mark => (
                <span
                  key={mark.id}
                  className="text-[10px] font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider font-sans"
                  style={{
                    backgroundColor: `${mark.color}15`,
                    borderColor: `${mark.color}40`,
                    color: mark.color
                  }}
                >
                  {mark.name}
                </span>
              ))}
            </div>

            {/* Product Title */}
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Pricing & Rounded Discount Badge hidden for brand reveal */}
            {/*
            {(() => {
              const currentPrice = parseFloat(matchedVariant ? matchedVariant.price : product.price) || 0;
              const currentMrp = parseFloat(matchedVariant ? matchedVariant.mrp : product.mrp) || 0;
              const discountPct = (currentMrp > currentPrice)
                ? Math.round(((currentMrp - currentPrice) / currentMrp) * 100)
                : 0;

              return (
                <div className="flex items-center flex-wrap gap-3 mb-6 font-sans">
                  <span className="text-2xl sm:text-3xl font-bold text-foreground">
                    ₹{currentPrice.toLocaleString("en-IN")}
                  </span>
                  {currentMrp > currentPrice && (
                    <span className="text-base text-neutral-400 line-through font-normal">
                      ₹{currentMrp.toLocaleString("en-IN")}
                    </span>
                  )}
                  {discountPct > 0 && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {discountPct}% OFF
                    </span>
                  )}
                </div>
              );
            })()}
            */}

            {/* Catalog Description */}
            <div
              className="text-sm text-muted-brand leading-relaxed mb-8 font-sans whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: formatRichText(product.description) }}
            />

            {/* Dynamic Variant Options Selectors */}
            {product.hasVariants && product.options && product.options.map((opt) => (
              <div key={opt.id || opt.name} className="mb-6 animate-in fade-in duration-200">
                <span className="text-[10px] font-bold text-muted-brand tracking-widest uppercase block mb-3 font-sans">
                  Select {opt.name}
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {opt.values.map((val) => {
                    const isSelected = selectedOptions[opt.name] === val;
                    return (
                      <button
                        key={val}
                        onClick={() => setSelectedOptions(prev => ({ ...prev, [opt.name]: val }))}
                        className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider font-sans transition-all duration-300 cursor-pointer ${isSelected
                          ? "bg-[#1a1a1a] text-white shadow-sm"
                          : "bg-white border border-border-brand text-muted-brand hover:border-foreground hover:text-foreground"
                          }`}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Size Selector */}
            {!product.hasVariants && sizes.length > 0 && (
              <div className="mb-8">
                <span className="text-[10px] font-bold text-muted-brand tracking-widest uppercase block mb-3 font-sans">
                  Select Size
                </span>
                <div className="flex gap-3">
                  {sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider font-sans transition-all duration-300 cursor-pointer ${selectedSize === sz
                        ? "bg-[#1a1a1a] text-white shadow-sm"
                        : "bg-white border border-border-brand text-muted-brand hover:border-foreground hover:text-foreground"
                        }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Enquiry CTA & Wishlist button */}
            <div className="flex items-center gap-3 mb-8 border-y border-border-brand/20 py-6">
              <button
                type="button"
                onClick={() => {
                  setEnquiryForm((prev) => ({
                    ...prev,
                    message: `Hi, I would like to enquire about ${product?.name || "this product"}.`,
                  }));
                  setIsEnquireOpen(true);
                }}
                className="flex-1 bg-[#1a1a1a] hover:bg-primary-brand text-white py-4 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-sm cursor-pointer hover:shadow-md active:scale-98 flex items-center justify-center gap-2"
              >
                <span>Enquire Now</span>
                <span className="text-sm font-sans">→</span>
              </button>

              {/* Wishlist Heart button */}
              <button
                onClick={handleLikeToggle}
                type="button"
                className="h-12 w-12 flex items-center justify-center border border-border-brand bg-white hover:bg-neutral-50 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-sm shrink-0"
                aria-label="Add to wishlist"
              >
                <svg
                  className={`h-5 w-5 transition-colors duration-300 ${liked ? "fill-red-500 stroke-red-500" : "fill-none stroke-neutral-500"
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

            </div>

            {/* External Marketplace Links (Amazon, Flipkart, Myntra, Nykaa) */}
            {product.links && product.links.length > 0 && (
              <div className="mb-8 p-4 rounded-2xl bg-neutral-50 border border-border-brand/30">
                <span className="text-[10px] font-extrabold text-muted-brand tracking-widest uppercase block mb-3 font-sans">
                  Also Available On
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {product.links.map((link) => (
                    <a
                      key={link.id || link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-border-brand text-foreground hover:border-primary-brand hover:text-primary-brand transition-all cursor-pointer shadow-2xs"
                    >
                      <span>🛍️ {link.platformName || link.platform?.name || 'Store'}</span>
                      <span className="text-[10px] text-muted-brand font-mono">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100/60 mb-8 font-sans text-center">
              <div className="flex flex-col items-center">
                <svg className="h-5.5 w-5.5 text-emerald-800 mb-1.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125a1.125 1.125 0 0 0 1.125-1.125V9.75M3.75 16.5h15m-15-9H5.25A2.25 2.25 0 0 1 7.5 9.75V16.5m12-9h-1.125A2.25 2.25 0 0 0 16.5 9.75V16.5m0-9.75H13.5A2.25 2.25 0 0 0 11.25 9.75V16.5" />
                </svg>
                <span className="text-[10px] font-extrabold text-emerald-950 uppercase tracking-wider">Free Shipping</span>
                <span className="text-[9px] text-emerald-700/80">Orders over ₹499</span>
              </div>
              <div className="flex flex-col items-center border-x border-emerald-100/60 px-2">
                <svg className="h-5.5 w-5.5 text-emerald-800 mb-1.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 10.5 21a3.745 3.745 0 0 1-3.068-1.593 3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 13.5 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12z" />
                </svg>
                <span className="text-[10px] font-extrabold text-emerald-950 uppercase tracking-wider">100% Authentic</span>
                <span className="text-[9px] text-emerald-700/80">Direct from Brand</span>
              </div>
              <div className="flex flex-col items-center">
                <svg className="h-5.5 w-5.5 text-emerald-800 mb-1.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                <span className="text-[10px] font-extrabold text-emerald-950 uppercase tracking-wider">Easy Returns</span>
                <span className="text-[9px] text-emerald-700/80">7-Day Guarantee</span>
              </div>
            </div>

            {/* Interactive Details Accordion/Tabs */}
            {product && (product.metadata?.showDirections !== false || product.metadata?.showIngredients !== false) && (
              <div className="border-b border-border-brand/20 pb-4">

                {/* Tabs Navbar headers - Only show if both are active */}
                {product.metadata?.showDirections !== false && product.metadata?.showIngredients !== false && (
                  <div className="flex border-b border-border-brand/10 text-xs font-semibold uppercase tracking-wider text-muted-brand font-sans">
                    <button
                      onClick={() => setActiveTab("description")}
                      className={`pb-3 pr-6 border-b-2 transition-all cursor-pointer ${activeTab === "description" ? "border-foreground text-foreground" : "border-transparent hover:text-foreground"
                        }`}
                    >
                      How To Use
                    </button>
                    <button
                      onClick={() => setActiveTab("ingredients")}
                      className={`pb-3 px-6 border-b-2 transition-all cursor-pointer ${activeTab === "ingredients" ? "border-foreground text-foreground" : "border-transparent hover:text-foreground"
                        }`}
                    >
                      Ingredients
                    </button>
                  </div>
                )}

                {/* Dynamic Tabs content */}
                <div className="pt-4 min-h-[100px] text-xs sm:text-sm text-muted-brand leading-relaxed font-sans whitespace-pre-line">
                  {activeTab === "description" && product.metadata?.showDirections !== false ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formatRichText(product.directions || product.metadata?.directions || "Apply onto clean face and neck. Gently massage until fully absorbed.")
                      }}
                    />
                  ) : (
                    product.metadata?.showIngredients !== false && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: formatRichText(product.ingredients || product.metadata?.ingredients || "Please consult product cover label for direct active ingredients details.")
                        }}
                      />
                    )
                  )}
                </div>

              </div>
            )}

            {/* Cruelty free credentials footer callout */}
            <div className="mt-6 flex items-center gap-6 text-[10px] uppercase font-semibold text-muted-brand tracking-widest font-sans">
              <span className="flex items-center gap-2">✓ Cruelty-Free & Vegan</span>
              <span className="flex items-center gap-2">✓ Formulation Safety Checked</span>
            </div>

          </div>

        </div>

        {/* Recommended Products Grid */}
        <div className="border-t border-border-brand/40 pt-16">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground mb-12">
            Recommended For You
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map((rec) => (
              <div key={rec.id} className="w-full" data-aos="fade-up">
                <ProductCard
                  id={rec.id}
                  name={rec.name}
                  price={rec.price}
                  mrp={rec.mrp}
                  imageUrl={rec.imageUrl}
                  images={rec.metadata?.images || []}
                  marks={rec.marks || []}
                  badge={rec.badge}
                  description={rec.description}
                  quantity={rec.quantity || rec.metadata?.quantity}
                  unit={rec.unit || rec.metadata?.unit}
                  variants={rec.variants}
                  options={rec.options}
                  links={rec.links || []}
                  metadata={rec.metadata}
                />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Product Enquiry Modal */}
      {isEnquireOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsEnquireOpen(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl relative font-sans text-left border border-border-brand/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsEnquireOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Product Summary Header */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-neutral-100 pr-6">
              <div className="relative w-14 h-14 rounded-xl bg-neutral-50 overflow-hidden shrink-0 border border-neutral-100">
                <Image
                  src={selectedImage || product?.imageUrl || "/logo.webp"}
                  alt={product?.name || "Product"}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary-brand block">Direct Enquiry</span>
                <h4 className="text-sm font-bold text-foreground line-clamp-1">{product?.name}</h4>
                {selectedSize && <span className="text-[11px] text-muted-brand">{selectedSize}</span>}
              </div>
            </div>

            {enquirySubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h5 className="text-base font-bold text-foreground">Enquiry Received!</h5>
                <p className="text-xs text-muted-brand max-w-xs mx-auto">
                  Thank you for your interest in {product?.name}. Our team will get in touch with you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setEnquirySubmitted(false);
                    setIsEnquireOpen(false);
                  }}
                  className="mt-3 px-5 py-2 text-xs font-semibold bg-[#1a1a1a] text-white rounded-full hover:bg-primary-brand transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setEnquirySubmitted(true);
                }}
                className="mt-4 space-y-3"
              >
                {/* Quick WhatsApp Action */}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Hi Javeo Team, I would like to enquire about ${product?.name || "this product"}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.585 1.761.884 2.796.884 3.179 0 5.767-2.587 5.767-5.766.001-3.18-2.585-5.771-5.767-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.145.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-12.416c-5.514 0-10 4.486-10 10 0 1.83.498 3.546 1.365 5.023l-1.452 5.309 5.467-1.433c1.417.81 3.053 1.267 4.795 1.267 5.514 0 10-4.486 10-10s-4.486-10-10-10z" />
                  </svg>
                  <span>Enquire on WhatsApp</span>
                </a>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-neutral-200"></div>
                  <span className="flex-shrink mx-3 text-[10px] text-muted-brand uppercase tracking-wider font-semibold">Or Leave a Message</span>
                  <div className="flex-grow border-t border-neutral-200"></div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-foreground mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={enquiryForm.name}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full px-3.5 py-2 text-xs border border-border-brand/40 rounded-xl focus:outline-none focus:border-primary-brand"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-foreground mb-1">Phone Number or Email *</label>
                  <input
                    type="text"
                    required
                    value={enquiryForm.contact}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, contact: e.target.value })}
                    placeholder="+91 98765 43210 or email"
                    className="w-full px-3.5 py-2 text-xs border border-border-brand/40 rounded-xl focus:outline-none focus:border-primary-brand"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-foreground mb-1">Message</label>
                  <textarea
                    rows={2}
                    value={enquiryForm.message}
                    onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-border-brand/40 rounded-xl focus:outline-none focus:border-primary-brand resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#1a1a1a] hover:bg-primary-brand text-white rounded-full text-xs font-semibold transition-all shadow-sm cursor-pointer"
                >
                  Submit Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
