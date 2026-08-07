"use client";

import React, { use, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import api from "@/utils/api";

const PRODUCT_CATALOG = [
  {
    id: 1,
    name: "Radiance Gold Serum",
    category: "Serums & Oils",
    price: 2499,
    imageUrl: "/serum.png",
    badge: "Best Seller",
    description: "Infused with 24k gold flakes and botanical oils to restore moisture and leave a radiant, healthy glow.",
    ingredients: "24k Gold Flakes, Jojoba Seed Oil, Rosehip Fruit Oil, Argan Kernel Oil, Squalane, Vitamin E.",
    directions: "Apply 2-3 drops onto clean, damp skin morning and night. Gently press into face and neck until fully absorbed.",
    sizes: ["30ml", "50ml"]
  },
  {
    id: 2,
    name: "Hydration Boost Fluid",
    category: "Serums & Oils",
    price: 1899,
    imageUrl: "/serum.png",
    badge: "Trending",
    description: "A lightweight, fast-absorbing fluid packed with hyaluronic acid for 24-hour deep hydration.",
    ingredients: "Multi-weight Hyaluronic Acid, Aloe Vera Juice, Panthenol (B5), Green Tea Extract, Glycerin.",
    directions: "Massage a small amount onto face and neck after cleansing. Follow with your favorite moisturizer to lock in fluid hydration.",
    sizes: ["50ml", "100ml"]
  },
  {
    id: 3,
    name: "Revitalize Cream",
    category: "Moisturizers",
    price: 2999,
    imageUrl: "/hero-banner.png",
    badge: "New",
    description: "Rich and velvety daily moisturizer formulated to smooth fine lines and improve skin elasticity.",
    ingredients: "Vegan Collagen, Shea Butter, Rosewater, Centella Asiatica, Peptides, Niacinamide.",
    directions: "Apply daily as the last step of your morning skincare routine. Smooth evenly over face, neck, and chest area.",
    sizes: ["50ml"]
  },
  {
    id: 4,
    name: "Night Recovery Mask",
    category: "Moisturizers",
    price: 3299,
    imageUrl: "/hero-banner.png",
    badge: "Limited",
    description: "An overnight sleeping mask that repairs skin barrier and locks in nutrients while you sleep.",
    ingredients: "Ceramides NP, Melatonin, Blue Tansy Oil, Chamomile Flower Extract, Allantoin.",
    directions: "Smooth a generous layer over face and neck as the final step of your night routine. Leave on overnight and rinse in the morning.",
    sizes: ["50ml", "75ml"]
  },
  {
    id: 5,
    name: "Soothing Milk Cleanser",
    category: "Cleansers",
    price: 1499,
    imageUrl: "/serum.png",
    badge: "Best Seller",
    description: "Gentle daily cleanser that removes impurities while maintaining natural moisture barrier.",
    ingredients: "Oat Beta-Glucan, Sweet Almond Oil, Chamomile Extract, Cucumber Extract, Decyl Glucoside.",
    directions: "Massage onto damp skin in circular motions. Rinse thoroughly with lukewarm water. Use morning and evening.",
    sizes: ["150ml", "200ml"]
  },
  {
    id: 6,
    name: "Restorative Eye Gel",
    category: "Treatments",
    price: 1799,
    imageUrl: "/hero-banner.png",
    badge: "New",
    description: "Cooling eye gel formulated with peptide complexes to reduce puffiness and dark circles.",
    ingredients: "Peptide Complex, Caffeine, Coenzyme Q10, Hyaluronic Acid, Licorice Root Extract.",
    directions: "Dab a tiny dot around the eye contour area morning and night. Gently pat with your ring finger until fully dry.",
    sizes: ["15ml"]
  },
  {
    id: 7,
    name: "Vitamin C Glow Drops",
    category: "Serums & Oils",
    price: 2199,
    imageUrl: "/category-hair.png",
    badge: "Best Seller",
    description: "Supercharged antioxidant cocktail to brighten complexions and boost collagen production.",
    ingredients: "L-Ascorbic Acid (15%), Ferulic Acid, Vitamin E, Citrus Extract, Hyaluronic Acid.",
    directions: "Apply 3-4 drops to dry face and neck in the morning after cleansing. Follow with sun protection.",
    sizes: ["30ml"]
  },
  {
    id: 8,
    name: "Squalane Barrier Cream",
    category: "Moisturizers",
    price: 2499,
    imageUrl: "/category-face.png",
    badge: "Trending",
    description: "Bio-identical emollient cream that repairs dry skin barrier and locks deep hydration.",
    ingredients: "Squalane (10%), Ceramide NP, Cholesterol, Phytosphingosine, Glycerin.",
    directions: "Warm a pea-sized amount between fingertips and pat gently onto clean skin until absorbed. Apply daily.",
    sizes: ["50ml"]
  },
  {
    id: 8, // Wait, Catalog had duplicate id 8 in previous page.js but it's fine, let's keep original database ids
    id: 9,
    name: "Purifying Clay Cleanser",
    category: "Cleansers",
    price: 1299,
    imageUrl: "/category-body.png",
    badge: "New",
    description: "Deeply cleanses pores, balances sebum production, and prevents breakouts without drying skin.",
    ingredients: "Kaolin Clay, Salicylic Acid (BHA 2%), Tea Tree Oil, Green Tea Leaves, Oat Kernel Extract.",
    directions: "Apply to damp skin and work into a lather. Massage gently over acne-prone zones. Rinse off completely.",
    sizes: ["120ml"]
  },
  {
    id: 10,
    name: "Brightening Treatment Toner",
    category: "Treatments",
    price: 1599,
    imageUrl: "/serum.png",
    badge: "New",
    description: "Exfoliating botanical treatment toner that clarifies, smooths texture, and balances pH.",
    ingredients: "Glycolic Acid (AHA), Lactic Acid, Witch Hazel, Niacinamide, Licorice Extract.",
    directions: "Saturate a cotton pad or pour into clean hands. Sweep gently over clean face and neck, avoiding eye zone.",
    sizes: ["150ml"]
  },
  {
    id: 11,
    name: "Smoothing Peptide Serum",
    category: "Serums & Oils",
    price: 2799,
    imageUrl: "/serum.png",
    badge: "Trending",
    description: "Multi-peptide cellular serum designed to target wrinkles and restore facial elasticity.",
    ingredients: "Argireline Peptide, Matrixyl 3000, Copper Tripeptide-1, Ginseng Extract, Centella Asiatica.",
    directions: "Smooth 2-3 pumps onto clean face and neck morning and night before heavier oils or creams.",
    sizes: ["30ml", "50ml"]
  },
  {
    id: 12,
    name: "Botanical Restoring Face Oil",
    category: "Serums & Oils",
    price: 3499,
    imageUrl: "/category-hair.png",
    badge: "Limited",
    description: "Luxurious pure cold-pressed botanical oils formulated to nourish dry, depleted skin barriers.",
    ingredients: "Squalane, Marula Seed Oil, Evening Primrose Oil, Rosehip Oil, Sea Buckthorn Berry Extract.",
    directions: "Warm 2-3 drops between your palms and gently press onto face as the last step of your evening routine.",
    sizes: ["30ml"]
  }
];

const formatRichText = (str) => {
  if (!str) return "";
  return str
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/__(.*?)__/g, '<u>$1</u>');
};

export default function ProductDetailsClient({ params }) {
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [liked, setLiked] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState({});

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
      setSelectedOptions(initial);
    }
  }, [product]);

  // Sync main image when variant image changes
  useEffect(() => {
    if (matchedVariant && matchedVariant.imageUrl) {
      setSelectedImage(matchedVariant.imageUrl);
    }
  }, [matchedVariant]);

  // Set initial active tab based on visibility metadata
  useEffect(() => {
    if (product) {
      const directionsVis = product.metadata?.showDirections !== false;
      const ingredientsVis = product.metadata?.showIngredients !== false;
      if (!directionsVis && ingredientsVis) {
        setActiveTab("ingredients");
      } else if (directionsVis) {
        setActiveTab("description");
      }
    }
  }, [product]);

  // Fetch product from DB / API with fallback
  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        setLoading(true);
        const body = await api.get(`/products/${productId}`);
        
        if (body.success && body.data) {
          setProduct(body.data);
          setSelectedImage(body.data.imageUrl);
        } else {
          // Fallback to static catalog item
          const fallback = PRODUCT_CATALOG.find(p => p.id === productId);
          setProduct(fallback || null);
          setSelectedImage(fallback?.imageUrl || "");
        }
      } catch (err) {
        console.error('Failed to load from API, falling back to static catalog:', err);
        const fallback = PRODUCT_CATALOG.find(p => p.id === productId);
        setProduct(fallback || null);
        setSelectedImage(fallback?.imageUrl || "");
      } finally {
        setLoading(false);
      }
    };

    loadProductDetails();
  }, [productId]);

  // Sync size list
  const sizes = useMemo(() => {
    if (!product) return [];
    if (product.sizes) return product.sizes;
    if (product.metadata?.sizes) {
      return Array.isArray(product.metadata.sizes) ? product.metadata.sizes : [product.metadata.sizes];
    }
    return ["30ml", "50ml"];
  }, [product]);

  useEffect(() => {
    if (sizes.length > 0) {
      setSelectedSize(sizes[0]);
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

  const handleAddToCart = () => {
    if (!product) return;
    if (product.hasVariants) {
      if (matchedVariant) {
        alert(`Added "${product.name}" (${matchedVariant.title}) to cart!`);
      } else {
        alert('Please select a valid variant combination.');
      }
    } else {
      alert(`Added "${product.name}" (${selectedSize}) to cart!`);
    }
  };

  // Get recommended products (excluding current)
  const recommendations = useMemo(() => {
    if (!product) return [];
    return PRODUCT_CATALOG
      .filter((p) => p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white py-32">
        <div className="h-8 w-8 border-4 border-indigo-650 border-t-transparent rounded-full animate-spin" />
      </div>
    );
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
            <div className="relative aspect-[4/3.8] w-full overflow-hidden rounded-[2.25rem] bg-gradient-to-b from-[#F3ECE0]/30 to-[#FAF8F5] border border-border-brand/40 shadow-sm">
              <Image
                src={selectedImage || "/serum.png"}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center scale-[0.95] rounded-2xl transition-transform duration-500 ease-in-out hover:scale-[1.05] cursor-pointer"
              />
              
              {/* Product Badge */}
              {product.badge && (
                <span className="absolute top-6 left-6 z-10 bg-[#16a34a] text-white text-[10px] font-semibold tracking-wider px-3.5 py-1.5 rounded-full shadow-sm uppercase">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Gallery Thumbnail Row */}
            {imagesList.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {imagesList.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                      selectedImage === img ? 'border-[#1a1a1a] scale-102 shadow-sm' : 'border-zinc-200 hover:border-zinc-400'
                    }`}
                  >
                    <Image src={img} alt={`Thumbnail ${i+1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column (Product Details & Purchasing Panel) */}
          <div className="lg:col-span-6 w-full flex flex-col" data-aos="fade-left">
            
            {/* Category and Rating */}
            <div className="flex items-center gap-4 mb-3">
              <span className="text-xs font-bold text-primary-brand tracking-widest uppercase font-sans">
                {product.category}
              </span>
            </div>

            {/* Product Title */}
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mb-6 font-sans">
              <span className="text-2xl font-bold text-foreground">
                ₹{(matchedVariant ? matchedVariant.price : product.price).toLocaleString("en-IN")}
              </span>
              {((matchedVariant ? matchedVariant.mrp : product.mrp)) && parseFloat(matchedVariant ? matchedVariant.mrp : product.mrp) > parseFloat(matchedVariant ? matchedVariant.price : product.price) && (
                <span className="text-base text-neutral-400 line-through font-normal">
                  ₹{parseFloat(matchedVariant ? matchedVariant.mrp : product.mrp).toLocaleString("en-IN")}
                </span>
              )}
            </div>

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
                        className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider font-sans transition-all duration-300 cursor-pointer ${
                          isSelected
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
                      className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider font-sans transition-all duration-300 cursor-pointer ${
                        selectedSize === sz
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

            {/* Purchase CTA buttons */}
            <div className="flex gap-4 mb-8 border-y border-border-brand/20 py-6">
              
              {/* Add to Cart button */}
              {product.metadata?.isActive === false ? (
                <button
                  disabled
                  className="flex-1 bg-neutral-100 border border-neutral-200 text-neutral-400 py-4 rounded-full text-xs font-semibold uppercase tracking-widest cursor-not-allowed transition-all duration-300"
                >
                  Unavailable
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#1a1a1a] hover:bg-primary-brand text-white py-4 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-sm cursor-pointer hover:shadow-md active:scale-98"
                >
                  Add To Cart
                </button>
              )}

              {/* Wishlist Heart button */}
              <button
                onClick={handleLikeToggle}
                type="button"
                className="flex items-center justify-center border border-border-brand bg-white hover:bg-neutral-50 px-4 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                aria-label="Add to wishlist"
              >
                <svg
                  className={`h-5 w-5 transition-colors duration-300 ${
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

            </div>

            {/* Interactive Details Accordion/Tabs */}
            {product && (product.metadata?.showDirections !== false || product.metadata?.showIngredients !== false) && (
              <div className="border-b border-border-brand/20 pb-4">
                
                {/* Tabs Navbar headers - Only show if both are active */}
                {product.metadata?.showDirections !== false && product.metadata?.showIngredients !== false && (
                  <div className="flex border-b border-border-brand/10 text-xs font-semibold uppercase tracking-wider text-muted-brand font-sans">
                    <button
                      onClick={() => setActiveTab("description")}
                      className={`pb-3 pr-6 border-b-2 transition-all cursor-pointer ${
                        activeTab === "description" ? "border-foreground text-foreground" : "border-transparent hover:text-foreground"
                      }`}
                    >
                      How To Use
                    </button>
                    <button
                      onClick={() => setActiveTab("ingredients")}
                      className={`pb-3 px-6 border-b-2 transition-all cursor-pointer ${
                        activeTab === "ingredients" ? "border-foreground text-foreground" : "border-transparent hover:text-foreground"
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
                  badge={rec.badge}
                  description={rec.description}
                  onAddToCart={handleAddToCart}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
