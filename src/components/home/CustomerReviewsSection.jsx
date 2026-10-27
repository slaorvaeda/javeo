"use client";

import React, { useState } from "react";

const REVIEWS = [
  {
    name: "Aarohi M.",
    location: "Mumbai",
    skinProfile: "Dry & Reactive Skin",
    product: "Radiance Gold Serum",
    rating: 5,
    title: "Instant glow without any stickiness!",
    review:
      "My skin used to feel parched by 2 PM every day. After 10 days of the Radiance Gold Serum, my barrier feels deeply nourished and bouncy. It layers beautifully under sunscreen without pilling.",
  },
  {
    name: "Priya K.",
    location: "Bangalore",
    skinProfile: "Combination / Prone to Clogged Pores",
    product: "Soothing Milk Cleanser",
    rating: 5,
    title: "Leaves skin feeling like silk",
    review:
      "Every foaming cleanser I tried left my cheeks burning and stripped. This milky emulsion washes away pollution and eyeliner without a hint of tightness. A staple in my morning routine.",
  },
  {
    name: "Dr. Neha S.",
    location: "Delhi",
    skinProfile: "Board-Certified Dermatologist",
    product: "Revitalize Cream & Eye Gel",
    rating: 5,
    title: "Exceptional bio-lipid matrix",
    review:
      "I scrutinize formulations for a living. Javeo’s ceramide-to-squalane ratio mimics natural skin lipids with surgical precision. It delivers genuine physiological recovery without synthetic silicones.",
  },
  {
    name: "Rohan V.",
    location: "Pune",
    skinProfile: "Sensitive / Seasonal Redness",
    product: "Hydration Boost Fluid",
    rating: 5,
    title: "Completely calmed my seasonal redness",
    review:
      "I used to get severe itchy red patches around my nose when weather changed. 3 drops of this fluid morning and evening has completely eradicated my redness. Truly clean skincare that works.",
  },
];

export default function CustomerReviewsSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="reviews" className="bg-[#FAF8F5] py-20 border-t border-border-brand/40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
          <span className="text-[11px] font-bold tracking-widest uppercase text-primary-brand font-sans">
            Real Customer Voices
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-foreground mt-2">
            Loved by Skin Enthusiasts
          </h2>
          <div className="h-[1.5px] w-12 bg-primary-brand mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-muted-brand leading-relaxed font-sans">
            Over 10,000+ individuals restoring their daily skin confidence with pure clinical botanicals.
          </p>
        </div>

        {/* 4 Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((item, idx) => (
            <div
              key={item.name}
              className="bg-white rounded-[2rem] p-6 shadow-sm border border-border-brand/30 flex flex-col justify-between transition-all duration-300 hover:shadow-md"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div>
                {/* 5 Stars Rating */}
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Review Headline & Text */}
                <h3 className="font-sans text-sm font-bold text-foreground mb-2 leading-snug">
                  &ldquo;{item.title}&rdquo;
                </h3>
                <p className="text-xs text-muted-brand leading-relaxed font-sans mb-6">
                  {item.review}
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-neutral-100 mt-auto">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-foreground">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-muted-brand">
                      {item.skinProfile}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Verified</span>
                  </div>
                </div>

                <div className="text-[10px] text-primary-brand font-semibold mt-2">
                  Verified product: {item.product}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
