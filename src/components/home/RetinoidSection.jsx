"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PRODUCTS_DATA = [
  {
    id: 1,
    heading: "Granactive Retinoid — The Future of Skincare Innovation",
    description: "Clinically backed ingredients designed for visible results and healthier skin.",
    imageUrl: "/IMG_6768.webp",
    viewLink: "#retinoid-details",
    ingredients: [
      { title: "Peptides (3%)", desc: "Improves firmness, boosts elasticity, strengthens skin, enhances smooth youthful appearance." },
      { title: "Niacinamide", desc: "Minimizes pores, brightens tone, controls oil, improves overall skin clarity and texture balance." },
      { title: "Hyaluronic Acid", desc: "Deeply hydrates skin, locks moisture, keeps texture soft, smooth, refreshed, healthy, radiant, balanced." },
      { title: "Retinol (0.5%)", desc: "Reduces wrinkles, improves texture, promotes renewal, reveals smoother youthful skin." }
    ]
  },
  {
    id: 2,
    heading: "Vitamin C Glow — Radiance & Dark Spot Correction",
    description: "Supercharged antioxidant cocktail to brighten complexions and boost collagen production.",
    imageUrl: "/IMG_8296.webp",
    viewLink: "#vit-c-details",
    ingredients: [
      { title: "L-Ascorbic Acid (15%)", desc: "Neutralizes free radicals and brightens skin tone, fading dark spots and hyperpigmentation." },
      { title: "Ferulic Acid", desc: "Stabilizes Vitamin C and doubles its photoprotective efficacy against UV damage." },
      { title: "Vitamin E", desc: "Deeply nourishes lipid barrier and works synergistically to enhance hydration." },
      { title: "Citrus Extract", desc: "Provides natural alpha-hydroxy acids for gentle surface renewal and fresh glow." }
    ]
  },
  {
    id: 3,
    heading: "Squalane Barrier — Ultimate Skin Defense & Repair",
    description: "Rich lipid-replenishing formula to restore dry, compromised skin barriers.",
    imageUrl: "/IMG_8273.webp",
    viewLink: "#squalane-details",
    ingredients: [
      { title: "Squalane (10%)", desc: "Bio-identical emollient that locks in moisture without clogging pores or leaving grease." },
      { title: "Ceramides NP/AP", desc: "Restores the intercellular lipid matrix to strengthen and repair the skin shield." },
      { title: "Centella Asiatica", desc: "Visibly calms irritation, reduces redness, and accelerates cellular healing." },
      { title: "Panthenol (B5)", desc: "Draws water deep into cells for immediate plumpness and soothing relief." }
    ]
  },
  {
    id: 4,
    heading: "Luminous Milky Cleanser — Cleanse Without Stripping",
    description: "Hydrating milk emulsion that dissolves makeup and pollution while calming skin.",
    imageUrl: "/IMG_8283.webp",
    viewLink: "#cleanser-details",
    ingredients: [
      { title: "Oat Beta-Glucan", desc: "Soothes dry/itchy inflammation and forms a weightless protective moisture veil." },
      { title: "Glycerin (20%)", desc: "Powerful natural humectant that keeps skin soft and hydrated during cleansing." },
      { title: "Chamomile Extract", desc: "Visibly calms redness and sensitive skin profiles during active washing." },
      { title: "Sweet Almond Oil", desc: "Gently lifts oil-soluble impurities while feeding essential fatty acids." }
    ]
  }
];

export default function RetinoidSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const bottleRef = useRef(null);

  // Set up GSAP scroll-trigger pinning on desktop
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Desktop layout (width >= 1024px) pins and scrubs active index
    mm.add("(min-width: 1024px)", () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          // progress ranges from 0 to 1
          const index = Math.min(
            Math.floor(self.progress * PRODUCTS_DATA.length),
            PRODUCTS_DATA.length - 1
          );
          setActiveIndex(index);
        }
      });
    });

    return () => mm.revert();
  }, []);

  // Trigger GSAP transition animations when product index changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Animate central product bottle mockup
    gsap.fromTo(
      bottleRef.current,
      { scale: 0.8, opacity: 0.4, rotation: -20 },
      { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: "back.out(1.3)" }
    );

    // Animate texts and ingredients cards
    gsap.fromTo(
      ".product-text",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );

    gsap.fromTo(
      ".ingredient-card",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );
  }, [activeIndex]);

  const activeProduct = PRODUCTS_DATA[activeIndex];

  return (
    <div ref={containerRef} className="relative w-full lg:h-[350vh]">

      {/* Sticky Panel Container */}
      <section className="bg-white lg:pt-16 lg:py-0 border-t border-border-brand/40 lg:sticky lg:top-20 lg:h-[calc(100vh-120px)] lg:flex lg:flex-col lg:justify-center overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">

          {/* Header text blocks */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="product-text font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight min-h-[80px]">
              {activeProduct.heading}
            </h2>
            <p className="product-text text-xs text-muted-brand mt-4 leading-relaxed max-w-md mx-auto font-sans min-h-[40px]">
              {activeProduct.description}
            </p>
          </div>

          {/* Core Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Column Ingredients */}
            <div className="lg:col-span-4 flex flex-col gap-5 order-2 lg:order-1">
              {activeProduct.ingredients.slice(0, 2).map((ing, idx) => (
                <div
                  key={idx}
                  className="ingredient-card bg-[#f5f5f3] rounded-[1.75rem] p-6 border border-border-brand/10 transition-all duration-300 hover:shadow-sm"
                >
                  <h3 className="font-sans text-sm sm:text-base font-bold text-foreground mb-2">
                    {ing.title}
                  </h3>
                  <p className="text-xs text-muted-brand leading-relaxed font-sans">
                    {ing.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Center Column Product Bottle */}
            <div className="lg:col-span-4 flex justify-center items-center order-1 lg:order-2 py-4">
              <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] lg:w-[360px] lg:h-[360px] flex items-center justify-center">

                {/* Visual ring */}
                <div className="absolute w-[250px] h-[250px] sm:w-[280px] sm:h-[280px] lg:w-[320px] lg:h-[320px] rounded-full border border-neutral-200/80 pointer-events-none" />

                {/* Node dots */}
                <div className="absolute w-2 h-2 rounded-full border border-neutral-400 bg-white top-[15%] left-[15%] z-10" />
                <div className="absolute w-2 h-2 rounded-full border border-neutral-400 bg-white bottom-[25%] left-[6%] z-10" />
                <div className="absolute w-2 h-2 rounded-full border border-neutral-400 bg-white top-[15%] right-[15%] z-10" />
                <div className="absolute w-2 h-2 rounded-full border border-neutral-400 bg-white bottom-[25%] right-[6%] z-10" />

                {/* Central Image Container */}
                <div className="relative w-[250px] h-[250px] sm:w-[290px] sm:h-[290px] lg:w-[335px] lg:h-[335px] z-20 scale-[1.3]">
                  <Image
                    ref={bottleRef}
                    src={activeProduct.imageUrl}
                    alt={activeProduct.heading}
                    fill
                    priority
                    sizes="(max-width: 768px) 250px, 335px"
                    className="object-contain object-center scale-[1.1]"
                  />
                </div>
              </div>
            </div>

            {/* Right Column Ingredients */}
            <div className="lg:col-span-4 flex flex-col gap-5 order-3">
              {activeProduct.ingredients.slice(2, 4).map((ing, idx) => (
                <div
                  key={idx}
                  className="ingredient-card bg-[#f5f5f3] rounded-[1.75rem] p-6 border border-border-brand/10 transition-all duration-300 hover:shadow-sm"
                >
                  <h3 className="font-sans text-sm sm:text-base font-bold text-foreground mb-2">
                    {ing.title}
                  </h3>
                  <p className="text-xs text-muted-brand leading-relaxed font-sans">
                    {ing.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>



          {/* Tap navigation dot triggers (visible on mobile/tablet) */}
          <div className="flex lg:hidden justify-center gap-2.5 mt-8">
            {PRODUCTS_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 cursor-pointer ${idx === activeIndex ? "bg-[#1a1a1a] w-6" : "bg-neutral-300 hover:bg-neutral-400"
                  }`}
                aria-label={`Show product ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
