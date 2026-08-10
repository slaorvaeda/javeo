"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const IMAGES = [
  "/hero-banner2.webp",
  "/hero-banner3.webp",
  "/hero-banner5.webp",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGES.length);
    }, 4500); // Cycle every 4.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full aspect-[21/9] min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] overflow-hidden bg-accent-brand-light">
      {/* Images container with fade transition */}
      {IMAGES.map((src, idx) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
        >
          <Image
            src={src}
            alt={`Javeo Hero Banner ${idx + 1}`}
            fill
            priority={idx === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      ))}

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 cursor-pointer ${idx === currentIndex ? "bg-white w-6" : "bg-white/40 hover:bg-white/70"
              }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
