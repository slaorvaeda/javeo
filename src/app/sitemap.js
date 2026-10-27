export const dynamic = "force-static";

export default async function sitemap() {
  const baseUrl = "https://javeo.in";

  // Base static routes
  const routes = [
    "",
    "/shop",
    "/wishlist",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Fetch dynamic product routes from DB/API
  try {
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
            const productRoutes = body.data.map((product) => ({
              url: `${baseUrl}/products?id=${product.id}`,
              lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
              changeFrequency: "weekly",
              priority: 0.6,
            }));
            return [...routes, ...productRoutes];
          }
        }
      } catch (err) {
        // Fail silently and try next URL
      }
    }
  } catch (err) {
    console.error("Failed to generate dynamic sitemap routes:", err);
  }

  return routes;
}
