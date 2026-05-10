import CategoriesCarousel from "@/components/sections/CategoriesCarousel";
import HeroSection from "@/components/sections/HeroSection";
import { FlashSaleSection } from "@/components/sections/FlashSaleSection";
import AnnouncementBanner from "@/components/sections/AnnouncementBanner";
import BrandCarousel from "@/components/sections/BrandCarousel";
import HomePageContent from "@/components/sections/HomePageContent";
import { WhyBuySection } from "@/components/sections/WhyBuySection";
import { TrustSection } from "@/components/sections/TrustSection";
import { SocialMediaSection } from "@/components/sections/SocialMediaSection";


export const metadata = {
  title: "Genuine Grocery | Pure Nutritional Products & Fresh Grocery",
  description: "Shop fresh products, organic essentials, and premium nutritional grocery at Genuine Grocery. Pure quality delivered from farm to your home.",
};

export default function Home() {
  return (
    <>
      <main>
        {/* ── Top Section ── */}
        <CategoriesCarousel />
        <HeroSection />
        <AnnouncementBanner />

        {/* ── Brand Showcase ── */}
        <BrandCarousel tag="TOP" title="TOP BRANDS" />

        {/* ── Flash Sale ── */}
        <FlashSaleSection />

        {/* ── All Product Sections + HOT BRANDS (client-side, API driven) ── */}
        <HomePageContent />



        {/* ── Trust & Social ── */}
        <WhyBuySection />
        <TrustSection />
        <SocialMediaSection />
      </main>
    </>
  );
}
