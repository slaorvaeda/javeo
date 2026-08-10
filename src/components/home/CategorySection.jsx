"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  {
    label: "Body care",
    imageUrl: "/category-body.webp",
    link: "#body-care",
    objectFit: "object-contain p-4",
  },
  {
    label: "Face care",
    imageUrl: "/category-face.webp",
    link: "#face-care",
    objectFit: "object-contain p-4",
  },
  {
    label: "Hair care",
    imageUrl: "/category-hair.webp",
    link: "#hair-care",
    objectFit: "object-contain p-4",
  },
  {
    label: "Essentials",
    imageUrl: "/category-essentials.webp",
    link: "#essentials",
    objectFit: "object-cover",
  },
];

export default function CategorySection() {
  const [loadedImages, setLoadedImages] = React.useState({});

  return (
    <section className="bg-white py-16 border-t border-border-brand/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground mb-12" data-aos="fade-up">
          Shop by Category
        </h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.link}
              className="relative group overflow-hidden bg-[#f5f5f3] rounded-[2.25rem] p-2 flex flex-col justify-between aspect-[1/1.1] transition-all duration-500 hover:shadow-md border border-transparent hover:border-border-brand/20 cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              {/* Card Top Row */}
              <div className="flex justify-between items-center z-10 px-4 py-2">
                <span className="text-[14px] font-semibold tracking-wider text-muted-brand font-sans">
                  {cat.label}
                </span>

                {/* Arrow Icon */}
                <div className="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-white text-foreground shadow-sm transition-all duration-300 group-hover:bg-[#1a1a1a] group-hover:text-white">
                  <svg
                    className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </div>

              {/* Card Image Container */}
              <div className="flex-1 flex items-center justify-center relative overflow-hidden mt-1 rounded-[1.5rem]">
                {/* Image loading skeleton overlay */}
                {!loadedImages[idx] && (
                  <div className="absolute inset-0 bg-neutral-200/80 animate-pulse rounded-[1.5rem]" />
                )}
                <Image
                  src={cat.imageUrl}
                  alt={`Shop ${cat.label.replace(/[()]/g, "")}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  onLoad={() => setLoadedImages(prev => ({ ...prev, [idx]: true }))}
                  className={`object-center transition-all duration-700 ease-out rounded-xl scale-130 group-hover:scale-[1.5] brightness-80 group-hover:brightness-100 ${cat.objectFit} ${loadedImages[idx] ? 'opacity-100' : 'opacity-0'}`}
                />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
