"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const MEGAMENU_COLUMNS = [
  {
    title: "Concerns",
    links: [
      { label: "Hyperpigmentation", href: "/shop?concern=hyperpigmentation" },
      { label: "Pore Solutions", href: "/shop?concern=pores" },
      { label: "Acne", href: "/shop?concern=acne" },
      { label: "Anti-Aging", href: "/shop?concern=anti-aging" }
    ]
  },
  {
    title: "Face",
    links: [
      { label: "Cleanser", href: "/shop?category=Cleansers" },
      { label: "Toners", href: "/shop?category=Treatments" },
      { label: "Serums", href: "/shop?category=Serums%20%26%20Oils" },
      { label: "Moisturizers", href: "/shop?category=Moisturizers" },
      { label: "Lips", href: "/shop?category=Treatments" },
      { label: "Masks", href: "/shop?category=Moisturizers" }
    ]
  },
  {
    title: "Body",
    links: [
      { label: "Intimate", href: "/shop?category=Cleansers" },
      { label: "Scrubs", href: "/shop?category=Cleansers" },
      { label: "Washes + Soaps", href: "/shop?category=Cleansers" },
      { label: "Lotions + Buttas", href: "/shop?category=Moisturizers" },
      { label: "Treatments", href: "/shop?category=Treatments" }
    ]
  },
  {
    title: "Bundles",
    links: [
      { label: "Build Your Bundle", href: "/#routine-builder" },
      { label: "Shop All Bundles", href: "/shop" }
    ]
  },
  {
    title: "Extras",
    links: [
      { label: "For Men", href: "/shop" },
      { label: "Subscriptions", href: "/shop" },
      { label: "Tools", href: "/shop" },
      { label: "Trial Size", href: "/shop" }
    ]
  }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileCatalogOpen, setMobileCatalogOpen] = useState(false);
  const [mobileCatalogSection, setMobileCatalogSection] = useState("");

  // Handle scroll event to change styling slightly (optional premium feel)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle wishlist count updates from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const updateCount = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlistCount(wishlist.length);
    };
    updateCount();
    window.addEventListener("wishlist-updated", updateCount);
    return () => window.removeEventListener("wishlist-updated", updateCount);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full bg-white transition-all duration-300 ${
      scrolled ? "border-b border-border-brand shadow-sm" : "border-b border-border-brand/50"
    }`}>
      {/* Promo/Flash announcement bar */}
      <div className="bg-[#1b1b19] text-[#fbfaf8] text-[10px] font-medium py-2.5 px-4 text-center tracking-widest uppercase border-b border-[#2d2d2a]">
        Free shipping on orders over ₹1,999 &bull; Take 15% off with code <span className="text-[#d8c3a5] font-bold">GLOW15</span>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          
          {/* Left section: Nav links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8 text-[13px] font-medium tracking-wider relative">
            <Link 
              href="/shop" 
              className="text-foreground hover:text-[#b38f5f] transition-colors duration-300"
            >
              Shop
            </Link>

            {/* Catalog Link with Hover/Click Dropdown */}
            <div 
              className="py-4"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 text-[#b38f5f] hover:text-[#9c7b50] transition-colors duration-300 font-semibold cursor-pointer focus:outline-none"
              >
                <span>Catalog</span>
                <svg className={`h-3 w-3 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>

            <Link 
              href="/#best-sellers" 
              className="text-foreground hover:text-[#b38f5f] transition-colors duration-300"
            >
              Best Sellers
            </Link>
          </nav>

          {/* Left section: Mobile Hamburger Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 text-foreground hover:text-[#b38f5f] focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                // Close Icon
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger Icon
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>

          {/* Center section: Logo (exact brand representation) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-shrink-0 items-center justify-center">
            <Link href="/" className="relative flex items-center justify-center w-[160px] h-[50px] transition-transform duration-300 hover:scale-[1.02]">
              <Image
                src="/logo.png"
                alt="Cosmira Skincare Logo"
                fill
                priority
                sizes="160px"
                className="object-contain"
              />
            </Link>
          </div>

          {/* Right section: Icons (Desktop & Mobile) */}
          <div className="flex items-center space-x-6">
            {/* Account Icon */}
            <Link href="#account" className="text-foreground hover:text-[#b38f5f] transition-colors duration-300" aria-label="Account">
              <svg className="h-[22px] w-[22px] stroke-[1.25]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Link>

            {/* Wishlist Heart Icon */}
            <Link href="/wishlist" className="relative text-foreground hover:text-[#b38f5f] transition-colors duration-300" aria-label="Wishlist">
              <svg className="h-[22px] w-[22px] stroke-[1.25]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Search Icon */}
            <button className="text-foreground hover:text-[#b38f5f] transition-colors duration-300 focus:outline-none cursor-pointer" aria-label="Search">
              <svg className="h-[22px] w-[22px] stroke-[1.25]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>

            {/* Shopping Bag Icon */}
            <Link href="#cart" className="relative text-foreground hover:text-[#b38f5f] transition-colors duration-300" aria-label="Cart">
              <svg className="h-[22px] w-[22px] stroke-[1.25]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
              {/* Badge for items in cart */}
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#b38f5f] text-[9px] font-bold text-white">
                0
              </span>
            </Link>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-60 border-t border-border-brand" : "max-h-0"
        }`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-4 pt-2 pb-4 bg-white text-[13px] font-medium tracking-wider">
          <Link
            href="/shop"
            onClick={() => setIsOpen(false)}
            className="block rounded-md px-3 py-2 text-foreground hover:bg-neutral-50"
          >
            Shop
          </Link>
          
          {/* Mobile Catalog Expandable */}
          <div className="rounded-md">
            <button
              onClick={() => setMobileCatalogOpen(!mobileCatalogOpen)}
              className="w-full text-left rounded-md px-3 py-2 text-[#b38f5f] hover:bg-neutral-50 font-semibold flex items-center justify-between focus:outline-none cursor-pointer text-[13px]"
            >
              <span>Catalog</span>
              <svg className={`h-4 w-4 transition-transform duration-300 ${mobileCatalogOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {mobileCatalogOpen && (
              <div className="pl-4 pr-3 py-2 bg-neutral-50/50 rounded-2xl mt-1 space-y-2">
                {MEGAMENU_COLUMNS.map((col) => (
                  <div key={col.title} className="border-b border-neutral-100 last:border-none pb-1.5 pt-0.5">
                    <button
                      onClick={() => setMobileCatalogSection(mobileCatalogSection === col.title ? "" : col.title)}
                      className="w-full flex items-center justify-between text-xs font-bold text-foreground py-1 focus:outline-none cursor-pointer"
                    >
                      <span>{col.title}</span>
                      <svg className={`h-3 w-3 text-neutral-400 transition-transform duration-200 ${mobileCatalogSection === col.title ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                    {mobileCatalogSection === col.title && (
                      <ul className="pl-2 pr-2 py-1.5 space-y-2 mt-1">
                        {col.links.map((link) => (
                          <li key={link.label}>
                            <Link
                              href={link.href}
                              onClick={() => {
                                setMobileCatalogOpen(false);
                                setIsOpen(false);
                              }}
                              className="block text-xs text-muted-brand hover:text-primary-brand transition-colors duration-200"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Link
            href="/#best-sellers"
            onClick={() => setIsOpen(false)}
            className="block rounded-md px-3 py-2 text-foreground hover:bg-neutral-50"
          >
            Best Sellers
          </Link>
          <Link
            href="/wishlist"
            onClick={() => setIsOpen(false)}
            className="block rounded-md px-3 py-2 text-foreground hover:bg-neutral-50 flex items-center justify-between"
          >
            <span>Wishlist</span>
            {wishlistCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Full-width Megamenu Dropdown Container */}
      {dropdownOpen && (
        <div 
          className="absolute top-full left-0 right-0 w-full bg-white border-b border-border-brand/20 shadow-xl py-12 z-40 transition-all duration-300 animate-fadeIn"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-6 gap-8">
             {/* Column 1: Shop By Category (displayed in circular frames) */}
             <div className="flex flex-col border-r border-border-brand/10 pr-6">
               <h4 className="font-sans text-[11px] font-bold tracking-widest text-foreground uppercase mb-5 pb-2 border-b border-border-brand/10">
                 Shop By Category
               </h4>
               <div className="space-y-4">
                 {[
                   { name: "Cleansers", query: "Cleansers", image: "/category-face.png" },
                   { name: "Serums & Oils", query: "Serums & Oils", image: "/category-hair.png" },
                   { name: "Moisturizers", query: "Moisturizers", image: "/category-body.png" },
                   { name: "Treatments", query: "Treatments", image: "/category-essentials.png" }
                 ].map((cat) => (
                   <Link 
                     key={cat.name}
                     href={`/shop?category=${encodeURIComponent(cat.query)}`}
                     onClick={() => setDropdownOpen(false)}
                     className="group flex items-center gap-3.5 cursor-pointer"
                   >
                     {/* Circular Image Container */}
                     <div className="relative w-11 h-11 rounded-full overflow-hidden border border-border-brand/20 bg-[#FAF8F5] transition-all duration-300 group-hover:scale-105 group-hover:border-[#b38f5f] shadow-sm flex-shrink-0">
                       <Image
                         src={cat.image}
                         alt={cat.name}
                         fill
                         sizes="44px"
                         className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                       />
                     </div>
                     <span className="text-[11px] font-bold text-[#6e6e6a] group-hover:text-[#b38f5f] transition-colors font-sans whitespace-nowrap">
                       {cat.name}
                     </span>
                   </Link>
                 ))}
               </div>
             </div>

             {/* Other 5 Columns */}
             {MEGAMENU_COLUMNS.map((col) => (
               <div key={col.title} className="flex flex-col">
                 <h4 className="font-sans text-[11px] font-bold tracking-widest text-foreground uppercase mb-5 pb-2 border-b border-border-brand/10">
                   {col.title}
                 </h4>
                 <ul className="space-y-3">
                   {col.links.map((link) => (
                     <li key={link.label}>
                       <Link 
                         href={link.href}
                         onClick={() => setDropdownOpen(false)}
                         className="text-xs text-[#6e6e6a] hover:text-[#b38f5f] transition-colors duration-200 block font-medium"
                       >
                         {link.label}
                       </Link>
                     </li>
                   ))}
                 </ul>
               </div>
             ))}
          </div>
        </div>
      )}
    </header>
  );
}
