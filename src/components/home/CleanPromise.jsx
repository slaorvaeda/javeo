"use client";

import React from "react";
import Image from "next/image";

const BADGES = [
  {
    title: "No Synthetic Fragrance",
    imageUrl: "/badge-fragrance-free.png"
  },
  {
    title: "No Synthetic Formulas",
    imageUrl: "/badge-clean-formula.png"
  },
  {
    title: "Organic Botanicals",
    imageUrl: "/badge-botanical-organic.png"
  },
  {
    title: "100% Natural",
    imageUrl: "/badge-natural.png"
  },
  {
    title: "Cruelty Free & Vegan",
    imageUrl: "/badge-vegan.png"
  },
  {
    title: "Dermatologist Tested",
    imageUrl: "/badge-dermatologist.png"
  },
  {
    title: "Paraben & Sulfate Free",
    imageUrl: "/badge-paraben-free.png"
  }
];

export default function CleanPromise() {
  return (
    <section className="py-12 border-t border-border-brand/40 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">

        {/* 7 Circular Badges Row Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-x-1 gap-y-2 justify-items-center items-start">
          {BADGES.map((item, idx) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center max-w-[120px]"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              {/* Circular Badge Frame */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-3 transition-transform duration-500 hover:scale-105 shadow-sm rounded-full bg-white border border-border-brand/10 p-1 flex items-center justify-center">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 96px, 112px"
                  className="object-contain p-2 rounded-full"
                />
              </div>

              <h3 className="font-sans text-[11px] sm:text-xs font-bold leading-snug text-foreground tracking-wide mt-1 uppercase">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
