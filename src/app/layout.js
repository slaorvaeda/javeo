import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AOSInit from "@/components/common/AOSInit";

export const metadata = {
  title: "Javeo | Premium Skincare Routines & Products",
  description: "Discover clean, dermatologist-tested, premium skincare formulations. Take our skin quiz to find your perfect daily routine.",
  icons: {
    icon: "/logo.webp",
    apple: "/logo.webp",
  },
};

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Questrial&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <AuthProvider>
          <CartProvider>
            <AOSInit />
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}





