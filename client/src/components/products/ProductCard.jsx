"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Loader2, ShoppingBag, Zap, Star, Plus } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { fetchApi, formatCurrency, cn } from "@/lib/utils";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";

/* ─────────────────────────────────────────────
   UTILS
 ───────────────────────────────────────────── */
const getImageUrl = (image) => {
  if (!image) return "/placeholder.jpg";
  if (image.startsWith("http")) return image;
  return `https://desirediv-storage.blr1.digitaloceanspaces.com/${image}`;
};

const calculateDiscountPercentage = (regularPrice, salePrice) => {
  if (!regularPrice || !salePrice || regularPrice <= salePrice) return 0;
  return Math.round(((regularPrice - salePrice) / regularPrice) * 100);
};

const parsePrice = (value) => {
  if (value === null || value === undefined) return null;
  if (value === 0) return 0;
  const parsed = typeof value === "string" ? parseFloat(value) : value;
  return isNaN(parsed) ? null : parsed;
};

/* ─────────────────────────────────────────────
   COMPONENT
 ───────────────────────────────────────────── */
export const ProductCard = ({ product, viewMode = "grid" }) => {
  const isList = viewMode === "list";
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const router = useRouter();

  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [wishlistItems, setWishlistItems] = useState({});
  const [isAddingToWishlist, setIsAddingToWishlist] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [priceSettings, setPriceSettings] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);

  /* ── Fetch wishlist ── */
  useEffect(() => {
    if (!isAuthenticated || typeof window === "undefined") return;
    fetchApi("/users/wishlist", { credentials: "include" })
      .then((res) => {
        const map = res.data?.wishlistItems?.reduce((acc, item) => {
          acc[item.productId] = true;
          return acc;
        }, {}) || {};
        setWishlistItems(map);
      })
      .catch(console.error);
  }, [isAuthenticated]);

  /* ── Fetch price visibility ── */
  useEffect(() => {
    fetchApi("/public/price-visibility-settings")
      .then((res) => { if (res.success) setPriceSettings(res.data); })
      .catch(() => setPriceSettings({ hidePricesForGuests: false }));
  }, []);

  /* ── All product images ── */
  const getAllProductImages = useMemo(() => {
    const images = [];
    const imageUrls = new Set();
    const push = (raw) => {
      const url = raw?.url || raw;
      if (!url) return;
      const full = getImageUrl(url);
      if (!imageUrls.has(full)) { imageUrls.add(full); images.push(full); }
    };
    product.variants?.forEach((v) => v.images?.forEach(push));
    product.images?.forEach(push);
    if (images.length === 0 && product.image) push(product.image);
    if (images.length === 0) images.push("/placeholder.jpg");
    return images;
  }, [product]);

  /* ── Auto-rotate on hover ── */
  useEffect(() => {
    if (!isHovered || getAllProductImages.length <= 1) { setCurrentImageIndex(0); return; }
    const t = setInterval(() => setCurrentImageIndex((p) => (p + 1) % getAllProductImages.length), 2000);
    return () => clearInterval(t);
  }, [isHovered, getAllProductImages.length]);

  /* ── Price logic ── */
  const basePriceField = parsePrice(product.basePrice);
  const regularPriceField = parsePrice(product.regularPrice);
  const priceField = parsePrice(product.price);
  const salePriceField = parsePrice(product.salePrice);

  const hasFlashSale = product.flashSale?.isActive === true;
  const flashSalePrice = hasFlashSale ? parsePrice(product.flashSale.flashSalePrice) : null;
  const flashSaleDiscountPercent = hasFlashSale ? product.flashSale.discountPercentage : 0;

  let hasSale = product.hasSale !== undefined && product.hasSale !== null ? Boolean(product.hasSale) : false;
  if (!hasSale && salePriceField !== null && salePriceField > 0) {
    if ((regularPriceField && salePriceField < regularPriceField) || (priceField && salePriceField < priceField))
      hasSale = true;
  }

  let originalPrice = null;
  let currentPrice = 0;

  if (basePriceField !== null && regularPriceField !== null) {
    currentPrice = basePriceField;
    originalPrice = hasSale && basePriceField < regularPriceField ? regularPriceField : null;
  } else if (salePriceField !== null && hasSale) {
    currentPrice = salePriceField;
    originalPrice = priceField || basePriceField || regularPriceField || null;
  } else {
    currentPrice = basePriceField || regularPriceField || priceField || salePriceField || 0;
  }

  if (!currentPrice || isNaN(currentPrice)) currentPrice = 0;

  let displayPrice = currentPrice;
  let showFlashSaleBadge = false;
  if (hasFlashSale && flashSalePrice !== null) {
    if (!originalPrice) originalPrice = currentPrice;
    displayPrice = flashSalePrice;
    showFlashSaleBadge = true;
  }

  const discountPercent = showFlashSaleBadge
    ? flashSaleDiscountPercent
    : hasSale && originalPrice && currentPrice
      ? calculateDiscountPercentage(originalPrice, currentPrice)
      : 0;

  const showPrice = !priceSettings?.hidePricesForGuests || isAuthenticated;

  /* ── Wishlist toggle ── */
  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) { router.push(`/auth?redirect=/products/${product.slug}`); return; }

    setIsAddingToWishlist((p) => ({ ...p, [product.id]: true }));
    try {
      if (wishlistItems[product.id]) {
        const res = await fetchApi("/users/wishlist", { credentials: "include" });
        const item = res.data?.wishlistItems?.find((i) => i.productId === product.id);
        if (item) {
          await fetchApi(`/users/wishlist/${item.id}`, { method: "DELETE", credentials: "include" });
          setWishlistItems((p) => { const n = { ...p }; delete n[product.id]; return n; });
        }
      } else {
        await fetchApi("/users/wishlist", {
          method: "POST", credentials: "include",
          body: JSON.stringify({ productId: product.id }),
        });
        setWishlistItems((p) => ({ ...p, [product.id]: true }));
      }
    } catch {
      toast.error("Failed to update wishlist");
    } finally {
      setIsAddingToWishlist((p) => ({ ...p, [product.id]: false }));
    }
  };

  /* ── Add to cart ── */
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!showPrice) { toast.error("Please login to purchase items"); return; }

    const variantId = product.variants?.[0]?.id;
    if (!variantId) {
      toast.error("Select options on product page");
      router.push(`/products/${product.slug}`);
      return;
    }

    setIsAddingToCart(true);
    try {
      await addToCart(variantId, 1);
      setAddedToCart(true);
      toast.success("Added to bag!");
      setTimeout(() => setAddedToCart(false), 2000);
    } catch (err) {
      console.error("Add to cart error:", err);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const inWishlist = wishlistItems[product.id];

  return (
    <div
      className={cn(
        "group relative bg-white rounded-xl overflow-hidden flex transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-gray-100",
        isList ? "flex-row w-full min-h-[160px] md:min-h-[180px]" : "flex-col h-full hover:-translate-y-2"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Image Area ── */}
      <Link
        href={`/products/${product.slug}`}
        className={cn(
          "block relative overflow-hidden bg-gray-50/50 flex-shrink-0",
          isList ? "w-32 sm:w-48 " : "w-full"
        )}
        style={!isList ? { aspectRatio: "1/1" } : {}}
      >
        {/* Badges */}
        <div className="absolute top-3 left-3 md:top-4 md:left-4 z-20 flex flex-col gap-2 pointer-events-none">
          {showFlashSaleBadge && (
            <div className="bg-orange-500 text-white px-2.5 py-1 rounded-full text-[10px] font-black italic shadow-lg flex items-center gap-1 animate-pulse">
              <Zap className="w-3 h-3 fill-white" />
              FLASH {discountPercent}% OFF
            </div>
          )}
          {!showFlashSaleBadge && discountPercent > 0 && (
            <div className="bg-primary text-white px-2.5 py-1 rounded-full text-[10px] font-black shadow-lg">
              {discountPercent}% OFF
            </div>
          )}
          {product.isNew && (
            <div className="bg-blue-600 text-white px-2.5 py-1 rounded-full text-[10px] font-black shadow-lg">
              NEW
            </div>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleAddToWishlist}
          disabled={isAddingToWishlist[product.id]}
          className={cn(
            "absolute top-3 right-3 md:top-4 md:right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md",
            inWishlist
              ? "bg-red-500 text-white"
              : "bg-white/80 backdrop-blur-md text-gray-400 hover:bg-white hover:text-red-500"
          )}
        >
          {isAddingToWishlist[product.id] ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
          )}
        </button>

        {/* Main Image */}
        <Image
          src={getAllProductImages[currentImageIndex] || "/placeholder.jpg"}
          alt={product.name}
          fill
          className={cn(
            "object-contain p-2 transition-transform duration-700",
            isHovered ? "scale-110" : "scale-100"
          )}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Dots */}
        {getAllProductImages.length > 1 && (
          <div className={cn(
            "absolute bottom-3 inset-x-0 flex justify-center gap-1.5 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            {getAllProductImages.map((_, idx) => (
              <div key={idx} className={cn(
                "h-1 rounded-full transition-all duration-300",
                idx === currentImageIndex ? "w-4 bg-primary" : "w-1 bg-gray-300"
              )} />
            ))}
          </div>
        )}


      </Link>

      {/* ── Info Area ── */}
      <div className={cn(
        "flex flex-col flex-grow p-3",
        isList ? "justify-center" : ""
      )}>
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px]  uppercase tracking-widest text-gray-400">
            {product.category?.name || "Premium Nutrition"}
          </span>
          {product.avgRating > 0 && (
            <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded-md">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-[10px] font-bold text-amber-700">{product.avgRating}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <Link href={`/products/${product.slug}`} className="block mb-1">
          <h3 className={cn(
            " text-gray-900 leading-tight transition-colors group-hover:text-primary",
            isList ? "text-lg" : "text-base line-clamp-2"
          )}>
            {product.name}
          </h3>
          {isList && product.description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2 max-w-xl">
              {product.description.replace(/<[^>]*>?/gm, '')}
            </p>
          )}
        </Link>

        {/* Pricing & Actions */}
        <div className={cn(
          "mt-auto flex items-end justify-between gap-4  border-t border-gray-50",
          isList ? "max-w-md" : ""
        )}>
          <div className="flex flex-col">
            {showPrice ? (
              <>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-sm md:text-lg ",
                    showFlashSaleBadge ? "text-orange-600" : "text-primary"
                  )}>
                    {formatCurrency(displayPrice)}
                  </span>
                  {originalPrice && (
                    <span className="text-xs md:text-sm text-gray-400 line-through">
                      {formatCurrency(originalPrice)}
                    </span>
                  )}
                </div>
                {discountPercent > 0 && (
                  <span className="text-[10px]  text-green-600 bg-green-50 px-2 py-0.5 rounded-md w-fit">
                    SAVE {formatCurrency(originalPrice - displayPrice)}
                  </span>
                )}
              </>
            ) : (
              <Link href="/auth" className="text-xs font-bold text-primary hover:underline">
                LOGIN FOR PRICE
              </Link>
            )}
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={!showPrice || isAddingToCart}
            className={cn(
              "relative flex items-center justify-center h-9 w-9  rounded-xl transition-all duration-300",
              addedToCart
                ? "bg-green-500 text-white"
                : "bg-gray-900 text-white hover:bg-primary shadow-lg shadow-gray-200"
            )}
          >
            {isAddingToCart ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : addedToCart ? (
              <Plus className="w-4 h-4 rotate-45 transition-transform" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;