"use client";

import React from "react";
import Image from "next/image";
import Button from "../ui/Button";

export default function QuizBanner() {
  return (
    <section id="routine-builder" className="w-full bg-white overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px] md:min-h-[500px] p-4 ">

        {/* Left Column (Text & CTA) */}
        <div
          className="flex flex-col justify-center bg-[#f0b59e] p-10 sm:p-14 lg:p-20 xl:p-28 text-white rounded-l-2xl"
          data-aos="fade-right"
        >
          <div className="max-w-md mx-auto md:ml-auto md:mr-12 xl:mr-20">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white">
              Skincare,<br />
              thoughtfully<br />
              designed.
            </h2>

            <p className="text-xs sm:text-sm text-white/95 mt-6 mb-10 leading-relaxed font-sans max-w-xs sm:max-w-sm">
              Gentle essentials created to support balance, comfort, and long-term skin health.
            </p>

            <button
              type="button"
              className="inline-flex items-center justify-center font-sans text-xs uppercase tracking-widest font-bold bg-white text-[#1a1a1a] hover:bg-neutral-100 border-none rounded-full px-8 py-4 w-fit transition-all duration-300 shadow-sm cursor-pointer"
              onClick={() => alert("Redirecting to routine creator...")}
            >
              Create Your Routine
            </button>
          </div>
        </div>

        {/* Right Column (Product + Stones Image) */}
        <div
          className="relative min-h-[350px] md:min-h-full bg-neutral-100 rounded-r-2xl"
          data-aos="fade-left"
        >
          <Image
            src="/routine-banner.webp"
            alt="Hydra-Barrier Skincare Cream Jar resting on stones"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center rounded-r-2xl"
          />
        </div>

      </div>
    </section>
  );
}
