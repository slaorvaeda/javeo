import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AOSInit from "@/components/common/AOSInit";

export const metadata = {
  title: "Javeo | Premium Skincare Routines & Products",
  description: "Discover clean, dermatologist-tested, premium skincare formulations. Take our skin quiz to find your perfect daily routine.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <AOSInit />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}





