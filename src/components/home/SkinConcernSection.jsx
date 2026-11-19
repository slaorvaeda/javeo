"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const CONCERNS = [
  {
    title: "Dryness & Barrier Repair",
    subtitle: "Ceramides, Pure Squalane & B5",
    description: "Deep cellular hydration that restores the intercellular lipid barrier for supple comfort.",
    link: "/shop?concern=hydration",
    imageUrl: "/IMG_8273.webp",
    tag: "Restorative",
  },
  {
    title: "Dullness & Radiance Glow",
    subtitle: "Colloidal Gold & Vitamin C",
    description: "Visibly fades uneven pigmentation, revitalizes fatigue, and imparts a glass-skin luminosity.",
    link: "/shop?concern=hyperpigmentation",
    imageUrl: "/IMG_6768.webp",
    tag: "Brightening",
  },
  {
    title: "Fine Lines & Renewal",
    subtitle: "Bio-Retinoid & Signal Peptides",
    description: "Accelerates cellular turnover and boosts natural collagen without redness or peeling.",
    link: "/shop?concern=anti-aging",
    imageUrl: "/IMG_8296.webp",
    tag: "Pro-Aging",
  },
  {
    title: "Pore Refining & Redness",
    subtitle: "Niacinamide & Centella Asiatica",
    description: "Clarifies congested pores, regulates excess sebum, and cools reactive skin inflammation.",
    link: "/shop?concern=pores",
    imageUrl: "/IMG_8283.webp",
    tag: "Calming",
  },
];

export default function SkinConcernSection() {
  return (
    <section id="skin-concerns" className="bg-white py-20 border-t border-border-brand/40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6" data-aos="fade-up">
          <div className="max-w-xl">
            <span className="text-[11px] font-bold tracking-widest uppercase text-primary-brand font-sans">
              Tailored Precision
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-foreground mt-2">
              Shop by Skin Concern
            </h2>
            <div className="h-[1.5px] w-12 bg-primary-brand mt-4" />
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold uppercase tracking-wider text-foreground hover:text-primary-brand flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>View All Formulas</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* 4 Concern Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CONCERNS.map((item, idx) => (
            <Link
              key={item.title}
              href={item.link}
              className="group relative flex flex-col justify-between bg-[#F5F5F3] rounded-[2.25rem] p-5 aspect-[1/1.25] overflow-hidden border border-border-brand/20 transition-all duration-500 hover:shadow-md hover:border-border-brand/60 cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              {/* Card Header */}
              <div className="z-10 flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/80 text-foreground shadow-2xs">
                    {item.tag}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-foreground mt-3 leading-snug group-hover:text-primary-brand transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] font-semibold text-muted-brand mt-1 font-sans">
                    {item.subtitle}
                  </p>
                </div>

                {/* Arrow Icon Button */}
                <div className="h-9 w-9 rounded-full bg-white text-foreground flex items-center justify-center shrink-0 shadow-2xs transition-all duration-300 group-hover:bg-[#1a1a1a] group-hover:text-white">
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </div>

              {/* Background Product Image */}
              <div className="relative w-full h-[55%] mt-auto rounded-[1.75rem] overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain object-bottom scale-110 transition-transform duration-700 ease-out group-hover:scale-125"
                />
              </div>

              {/* Description Reveal on Card */}
              <p className="text-[11px] text-muted-brand leading-relaxed mt-2 z-10 font-sans line-clamp-2">
                {item.description}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
