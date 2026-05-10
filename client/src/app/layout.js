import "./globals.css";
import { Navbar } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/lib/auth-context";

export const metadata = {
  title: "Genuine Grocery | Pure Nutritional Products & Fresh Grocery",
  description: "Premium nutritional products from Genuine Grocery. Fresh essentials, organic products, and more delivered fresh from farms. Trusted quality for your family.",
  keywords: "Genuine Grocery, grocery products, fresh essentials, organic nutrition, farm direct delivery, premium grocery India",
  authors: [{ name: "Genuine Grocery" }],
  openGraph: {
    title: "Genuine Grocery | Pure Nutritional Products & Fresh Grocery",
    description: "Premium nutritional products from Genuine Grocery. Fresh essentials, organic products, and more delivered fresh from farms.",
    type: "website",
    locale: "en_IN",
    siteName: "Genuine Grocery",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />

          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
