"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductDetailsClient from "./[id]/ProductDetailsClient";

function ProductDetailsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (!id) {
    return (
      <div className="flex h-screen items-center justify-center font-sans text-sm text-muted-brand bg-white">
        Product ID is missing. Please go back to the shop page.
      </div>
    );
  }

  return <ProductDetailsClient id={id} />;
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center font-sans text-sm text-muted-brand bg-white animate-pulse">
        Loading product details...
      </div>
    }>
      <ProductDetailsContent />
    </Suspense>
  );
}
