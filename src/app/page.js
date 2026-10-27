import React from "react";
import Hero from "@/components/home/Hero";
import CategorySection from "@/components/home/CategorySection";
import ProductSection from "@/components/home/ProductSection";
import BleachSection from "@/components/home/BleachSection";
import RetinoidSection from "@/components/home/RetinoidSection";
import ClinicalResultsSection from "@/components/home/ClinicalResultsSection";
import CleanPromise from "@/components/home/CleanPromise";
import CustomerReviewsSection from "@/components/home/CustomerReviewsSection";
import QuizBanner from "@/components/home/QuizBanner";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <>
      {/* 1. Hero Banner Slider (Existing) */}
      <Hero />

      {/* 2. Shop by Category (Existing) */}
      <CategorySection />

      {/* 3. Best Sellers Carousel (Existing) */}
      <ProductSection />
      
      {/* 4. High-Definition Shinier Bleach Collection */}
      <BleachSection />

      {/* 6. Interactive Retinoid & Ingredients Bottle Spotlight (Existing) */}
      <RetinoidSection />


      {/* 8. [NEW] Clinical Proof & Independent Consumer Trial Stats */}
      <ClinicalResultsSection />

      {/* 9. Clean Promise & Dermatologist Trust Badges (Existing) */}
      <CleanPromise />

      {/* 10. [NEW] Verified Customer Reviews & Testimonials Carousel */}
      <CustomerReviewsSection />

      {/* 11. Skincare Routine Quiz Banner (Existing) */}
      <QuizBanner />

      {/* 12. [NEW] VIP Skincare Club & 10% Off First Order Newsletter */}
      <NewsletterSection />
    </>
  );
}
