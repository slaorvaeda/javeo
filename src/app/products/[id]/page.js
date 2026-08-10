import React from "react";
import ProductDetailsClient from "./ProductDetailsClient";

export async function generateStaticParams() {
  const urls = [
    process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/products?storeId=javeo-store-uuid-3333-4444` : null,
    "http://localhost:8085/api/products?storeId=javeo-store-uuid-3333-4444",
    "https://api.clickkarte.com/api/products?storeId=javeo-store-uuid-3333-4444"
  ].filter(Boolean);

  for (const url of urls) {
    try {
      const res = await fetch(url);
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const body = await res.json();
        if (body.success && Array.isArray(body.data)) {
          return body.data.map((product) => ({
            id: product.id.toString(),
          }));
        }
      }
    } catch (err) {
      // Fail silently and try next URL
    }
  }

  // Fallback range of IDs (1 to 500) to ensure all newly created product IDs pre-render
  return Array.from({ length: 500 }, (_, i) => ({
    id: (i + 1).toString(),
  }));
}

export default async function ProductDetailsPage({ params }) {
  const resolvedParams = await params;
  return <ProductDetailsClient id={resolvedParams.id} />;
}

