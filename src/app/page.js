import React from "react";
import Hero from "@/components/home/Hero";
import CategorySection from "@/components/home/CategorySection";
import ProductSection from "@/components/home/ProductSection";
import RetinoidSection from "@/components/home/RetinoidSection";
import QuizBanner from "@/components/home/QuizBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <ProductSection />
      <RetinoidSection />
      <QuizBanner />
    </>
  );
}
