"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { FaAmazon } from "react-icons/fa6";

// Marketplace Icons
function FlipkartIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Flipkart">
      <circle cx="12" cy="12" r="11" fill="#2874F0" />
      <path d="M7.5 9.5h9l-1 8h-7l-1-8z" fill="#FFE11B" />
      <path
        d="M10 9.5V8c0-1.1.9-2 2-2s2 .9 2 2v1.5"
        stroke="#FFE11B"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M12.6 11.2h-1.4v1.1h1.2v.8h-1.2v2.7H10v-5.4h2.6v.8z"
        fill="#2874F0"
      />
    </svg>
  );
}

function MyntraIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Myntra">
      <circle cx="12" cy="12" r="11" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.8" />
      <path d="M5.5 8l3 5.5 2.8-5.5h2l-3.8 7.5v2.5h-1.8v-2.5L4 8h1.5zm6 0l2.8 5.5 3-5.5H19l-3.8 7.5v2.5h-1.8v-2.5L9.8 8h1.7z" fill="#FF3F6C" />
      <path d="M8.5 13.5l2.8-5.5h1.2l-3 5.5h-1zM14.5 13.5l2.8-5.5h1.2l-3 5.5h-1z" fill="#F26A35" />
    </svg>
  );
}

function NykaaIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Nykaa">
      <circle cx="12" cy="12" r="11" fill="#FC2779" />
      <path d="M7.5 7h2.2l4.8 6.8V7H16v10h-2.2L9 10.2V17H7.5V7z" fill="#FFFFFF" />
    </svg>
  );
}

function ExternalStoreIcon({ className = "w-4 h-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25c-.67 0-1.19-.578-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
  );
}

const getPlatformMeta = (link) => {
  const name = (link.platformName || link.platform?.name || link.name || "").toLowerCase();
  const url = (link.url || "").toLowerCase();

  if (name.includes("amazon") || url.includes("amazon")) {
    return {
      name: "Amazon",
      title: "Buy on Amazon",
      badgeColor: "text-[#FF9900] border-neutral-200 hover:border-[#FF9900] hover:bg-[#FFF8ED]",
      Icon: FaAmazon,
      logoUrl: link.platformLogoUrl || link.logoUrl,
    };
  }
  if (name.includes("flipkart") || name.includes("flip kart") || name.includes("flip-kart") || url.includes("flipkart")) {
    return {
      name: "Flipkart",
      title: "Buy on Flipkart",
      badgeColor: "text-[#2874F0] border-neutral-200 hover:border-[#2874F0] hover:bg-[#F0F5FF]",
      Icon: FlipkartIcon,
      logoUrl: link.platformLogoUrl || link.logoUrl,
    };
  }
  if (name.includes("myntra") || url.includes("myntra")) {
    return {
      name: "Myntra",
      title: "Buy on Myntra",
      badgeColor: "text-[#FF3F6C] border-neutral-200 hover:border-[#FF3F6C] hover:bg-[#FFF0F4]",
      Icon: MyntraIcon,
      logoUrl: link.platformLogoUrl || link.logoUrl,
    };
  }
  if (name.includes("nykaa") || url.includes("nykaa")) {
    return {
      name: "Nykaa",
      title: "Buy on Nykaa",
      badgeColor: "text-[#FC2779] border-neutral-200 hover:border-[#FC2779] hover:bg-[#FFF0F6]",
      Icon: NykaaIcon,
      logoUrl: link.platformLogoUrl || link.logoUrl,
    };
  }
  return {
    name: link.platformName || "Store",
    title: `Buy on ${link.platformName || "Store"}`,
    badgeColor: "text-foreground border-neutral-200 hover:border-primary-brand hover:text-primary-brand hover:bg-neutral-50",
    Icon: ExternalStoreIcon,
    logoUrl: link.platformLogoUrl || link.logoUrl,
  };
};

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
  marks = [],
  onAddToCart,
  onEnquire,
  quantity,
  unit,
  variants = [],
  options = [],
  links = [],
  metadata = {},
}) {
  const { addToCart, actionLoadingId } = useCart();
  const [liked, setLiked] = useState(false);
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    contact: "",
    message: `Hi, I would like to enquire about ${name}.`,
  });

  const isAdding = actionLoadingId === id;

  // Extract external marketplace links
  const allRawLinks = Array.isArray(links) && links.length > 0
    ? [...links]
    : (Array.isArray(metadata?.links) ? [...metadata.links] : []);

  let resolvedLinks = allRawLinks.filter(
    (l) => l && typeof l.url === "string" && l.url.trim() !== ""
  );

  // If metadata has individual marketplace URLs, add them
  if (metadata?.amazonUrl && !resolvedLinks.some(l => (l.platformName || l.name || l.url || "").toLowerCase().includes("amazon"))) {
    resolvedLinks.push({ platformName: "Amazon", url: metadata.amazonUrl });
  }
  if (metadata?.flipkartUrl && !resolvedLinks.some(l => (l.platformName || l.name || l.url || "").toLowerCase().includes("flipkart"))) {
    resolvedLinks.push({ platformName: "Flipkart", url: metadata.flipkartUrl });
  }
  if (metadata?.myntraUrl && !resolvedLinks.some(l => (l.platformName || l.name || l.url || "").toLowerCase().includes("myntra"))) {
    resolvedLinks.push({ platformName: "Myntra", url: metadata.myntraUrl });
  }
  if (metadata?.nykaaUrl && !resolvedLinks.some(l => (l.platformName || l.name || l.url || "").toLowerCase().includes("nykaa"))) {
    resolvedLinks.push({ platformName: "Nykaa", url: metadata.nykaaUrl });
  }

  const handleCardAddToCart = (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    if (onAddToCart) {
      onAddToCart(id);
    } else {
      addToCart(id, 1);
    }
  };

  const handleEnquireClick = (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    if (onEnquire) {
      onEnquire({ id, name, imageUrl, links: resolvedLinks });
    } else {
      setIsEnquireOpen(true);
    }
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    setEnquirySubmitted(true);
  };

  // Extract displayed quantity/unit label
  const getQuantityLabel = () => {
    if (quantity && unit) {
      return `${quantity} ${unit}`;
    }
    if (quantity) {
      return `${quantity}`;
    }
    // Fallback: Check options or variants (e.g. 200ml, 1000ml)
    if (Array.isArray(options) && options.length > 0 && options[0].values && options[0].values.length > 0) {
      return options[0].values[0];
    }
    if (Array.isArray(variants) && variants.length > 0 && variants[0].title) {
      return variants[0].title;
    }
    return null;
  };

  const quantityLabel = getQuantityLabel();

  // Compute hover image (accurately displays the 2nd image after the cover image)
  const getSecondaryImage = () => {
    if (secondaryImageUrl && secondaryImageUrl !== imageUrl) {
      return secondaryImageUrl;
    }

    // Combine cover image and gallery images in sequential order
    const allImages = [
      imageUrl,
      ...(Array.isArray(images) ? images : [])
    ].filter(Boolean);

    // Deduplicate while preserving exact order
    const uniqueImages = allImages.filter(
      (img, index) => allImages.indexOf(img) === index
    );

    // If a distinct 2nd image exists after the cover, display it on hover
    if (uniqueImages.length > 1) {
      return uniqueImages[1];
    }
    
    // No distinct second image exists - return null so the primary image displays on hover
    return null;
  };

  const hoverImg = getSecondaryImage();
  const hasSecondaryImage = Boolean(hoverImg && hoverImg !== imageUrl);

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
        href={`/products?id=${id}`} 
        className="relative aspect-square w-full overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-[#F3ECE0]/30 to-[#FAF8F5] cursor-pointer block"
      >
        {/* Primary Image */}
        <Image
          src={imageUrl || "/logo.webp"}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className={`object-contain object-center p-4 transition-all duration-700 ease-out group-hover:scale-105 ${
            hasSecondaryImage ? "group-hover:opacity-0" : ""
          }`}
        />

        {/* Secondary Hover Image (only if distinct 2nd image exists) */}
        {hasSecondaryImage && (
          <Image
            src={hoverImg}
            alt={`${name} Texture`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover object-center absolute inset-0 w-full h-full opacity-0 scale-95 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-100"
          />
        )}

        {/* Badge / Marks (Top Left of Card) */}
        {Array.isArray(marks) && marks.length > 0 ? (
          <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-1.5 max-w-[70%]">
            {marks.map((mark) => (
              <span
                key={mark.id || mark.name}
                className="text-white text-[10px] font-bold tracking-wider px-3 py-1 rounded-full shadow-sm uppercase backdrop-blur-md"
                style={{
                  backgroundColor: mark.color || "#16a34a",
                }}
              >
                {mark.name}
              </span>
            ))}
          </div>
        ) : badge ? (
          <span className="absolute top-4 left-4 z-10 bg-[#16a34a] text-white text-[10px] font-semibold tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
            {badge}
          </span>
        ) : null}
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
      <div className="flex flex-1 flex-col pt-4 px-1 pb-1">
        <Link href={`/products?id=${id}`} className="hover:text-primary-brand transition-colors duration-300 cursor-pointer">
          <h3 className="text-[13px] sm:text-sm font-bold tracking-tight text-foreground mb-2 leading-snug line-clamp-2 min-h-[38px] sm:min-h-[40px]">
            {name}
          </h3>
        </Link>

        {description ? (
          <p className="text-xs text-muted-brand leading-relaxed mb-4 font-sans line-clamp-2 min-h-[32px]">
            {description}
          </p>
        ) : null}

        {/* Quantity and Unit Label */}
        {quantityLabel && (
          <span className="text-[11px] font-semibold text-muted-brand/80 block font-sans">
            {quantityLabel}
          </span>
        )}

        {/* Bottom bar with Enquire button and Marketplace Links */}
        <div className="mt-auto flex items-center gap-1.5 sm:gap-2 pt-2">
          {/* Selling Price & MRP hidden for brand reveal */}
          {/*
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 flex-wrap">
            <span className="text-base font-bold text-foreground">
              ₹{parseFloat(price).toLocaleString("en-IN")}
            </span>
            {mrp && parseFloat(mrp) > parseFloat(price) && (
              <>
                <span className="text-xs text-neutral-400 line-through font-normal">
                  ₹{parseFloat(mrp).toLocaleString("en-IN")}
                </span>
                {Math.round(((parseFloat(mrp) - parseFloat(price)) / parseFloat(mrp)) * 100) > 0 && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60 font-sans">
                    {Math.round(((parseFloat(mrp) - parseFloat(price)) / parseFloat(mrp)) * 100)}% OFF
                  </span>
                )}
              </>
            )}
          </div>
          */}
          <button
            type="button"
            onClick={handleEnquireClick}
            className="flex-1 min-w-[70px] justify-center bg-[#1a1a1a] hover:bg-primary-brand text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm cursor-pointer flex items-center gap-1"
          >
            <span>Enquire</span>
          </button>

          {/* External Marketplace Icons (Amazon, Flipkart, Myntra, Nykaa, etc.) */}
          {resolvedLinks.length > 0 && (
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              {resolvedLinks.map((link, idx) => {
                const meta = getPlatformMeta(link);
                return (
                  <a
                    key={link.id || link.url || idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    title={meta.title}
                    aria-label={meta.title}
                    className={`w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full border bg-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-2xs ${meta.badgeColor}`}
                  >
                    {meta.logoUrl ? (
                      <img src={meta.logoUrl} alt={meta.name} className="w-4 h-4 object-contain rounded-full" />
                    ) : (
                      <meta.Icon className="w-4 h-4" />
                    )}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Product Enquiry Modal */}
      {isEnquireOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={(e) => {
            e.stopPropagation();
            setIsEnquireOpen(false);
          }}
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
                  src={imageUrl || "/logo.webp"}
                  alt={name}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary-brand block">Product Enquiry</span>
                <h4 className="text-sm font-bold text-foreground line-clamp-1">{name}</h4>
                {quantityLabel && <span className="text-[11px] text-muted-brand">{quantityLabel}</span>}
              </div>
            </div>

            {enquirySubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h5 className="text-base font-bold text-foreground">Enquiry Sent!</h5>
                <p className="text-xs text-muted-brand max-w-xs mx-auto">
                  Thank you for your interest in {name}. Our team will get back to you shortly.
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
              <form onSubmit={handleEnquirySubmit} className="mt-4 space-y-3">
                {/* Quick WhatsApp Action */}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Hi Javeo Team, I would like to enquire about ${name}.`)}`}
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

            {/* Link to view product page */}
            <div className="mt-4 pt-3 border-t border-neutral-100 text-center">
              <Link
                href={`/products?id=${id}`}
                onClick={() => setIsEnquireOpen(false)}
                className="text-xs font-semibold text-primary-brand hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Product Page</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
