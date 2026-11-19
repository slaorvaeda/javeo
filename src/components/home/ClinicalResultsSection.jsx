"use client";

import React from "react";

const CLINICAL_STATS = [
  {
    percentage: "98%",
    title: "Barrier Restoration",
    detail: "Reported immediate reduction in tightness and visible redness after first application.",
  },
  {
    percentage: "94%",
    title: "24-Hour Hydration",
    detail: "Statistically verified surge in deep cellular moisture retention over 28 consecutive days.",
  },
  {
    percentage: "91%",
    title: "Luminous Clarity",
    detail: "Noticed enhanced radiance, smoother skin texture, and diminished appearance of fine pores.",
  },
  {
    percentage: "100%",
    title: "Pure Biocompatibility",
    detail: "Formulated without synthetic fragrances, micro-plastics, sulfates, or parabens.",
  },
];

export default function ClinicalResultsSection() {
  return (
    <section id="clinical-proof" className="bg-white py-20 border-t border-border-brand/40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
          <span className="text-[11px] font-bold tracking-widest uppercase text-primary-brand font-sans">
            Independent Clinical Testing
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-foreground mt-2">
            Proven by Science. Backed by Real Results.
          </h2>
          <div className="h-[1.5px] w-12 bg-primary-brand mx-auto mt-4 mb-4" />
          <p className="text-xs sm:text-sm text-muted-brand leading-relaxed font-sans">
            Results from independent 4-week clinical consumer trials across diverse skin types and sensitive profiles.
          </p>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLINICAL_STATS.map((item, idx) => (
            <div
              key={item.title}
              className="bg-[#FAF8F5] rounded-[2rem] p-7 border border-border-brand/30 flex flex-col justify-between transition-all duration-300 hover:shadow-sm hover:border-primary-brand/30"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div>
                <div className="font-serif text-5xl font-normal text-primary-brand tracking-tight mb-3">
                  {item.percentage}
                </div>
                <h3 className="font-sans text-base font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-brand leading-relaxed font-sans">
                  {item.detail}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border-brand/20 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-brand/80">
                <svg className="w-3.5 h-3.5 text-primary-brand shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Dermatologically Certified</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote Assurance */}
        <div className="mt-12 text-center text-[11px] text-muted-brand/70 font-sans" data-aos="fade-up">
          * Based on a 28-day perception and instrumental hydration evaluation conducted on 42 participants under dermatological supervision.
        </div>

      </div>
    </section>
  );
}
