import React from "react";
import ProductDetailsClient from "./ProductDetailsClient";

const PRODUCT_CATALOG = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
  { id: 11 },
  { id: 12 }
];

export async function generateStaticParams() {
  return PRODUCT_CATALOG.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductDetailsPage({ params }) {
  return <ProductDetailsClient params={params} />;
}
