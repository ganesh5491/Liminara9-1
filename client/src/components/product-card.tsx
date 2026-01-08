import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { parsePrice, formatPrice } from "@/lib/priceUtils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  showDealBadge?: boolean;
}

export default function ProductCard({ product, showDealBadge = false }: ProductCardProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [cartCooldown, setCartCooldown] = useState(false);

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      if (isAuthenticated) {
        const res = await fetch("/api/cart", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: product.id, quantity: 1 })
        });
        if (res.ok) return { success: true, localStorage: false };
        throw new Error("Failed to add to cart");
      }

      const localCart = JSON.parse(localStorage.getItem('localCart') || '[]');
      const existingItemIndex = localCart.findIndex((item: any) => item.productId === product.id);

      if (existingItemIndex !== -1) {
        localCart[existingItemIndex].quantity = (localCart[existingItemIndex].quantity || 1) + 1;
      } else {
        localCart.push({
          id: `local-${product.id}-${Date.now()}`,
          productId: product.id,
          quantity: 1,
          product: product
        });
      }
      localStorage.setItem('localCart', JSON.stringify(localCart));
      window.dispatchEvent(new Event('cartUpdated'));
      return { success: true, localStorage: true };
    },
    onSuccess: (result) => {
      if (result && !result.localStorage) {
        queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      }
      window.dispatchEvent(new Event('cartUpdated'));
      setCartCooldown(true);
      setTimeout(() => setCartCooldown(false), 1000);
      toast({ title: "Added to cart", description: `${product.name} added.` });
    }
  });

  const addToWishlistMutation = useMutation({
    mutationFn: async () => {
      try {
        if (isInWishlist) {
          await apiRequest("DELETE", `/api/wishlist/${product.id}`);
        } else {
          await apiRequest("POST", "/api/wishlist", { productId: product.id });
        }
      } catch (error: any) {
        if (error.message?.includes('401')) {
          const localWishlist = JSON.parse(localStorage.getItem('localWishlist') || '[]');
          if (isInWishlist) {
            const updated = localWishlist.filter((item: any) => item.productId !== product.id);
            localStorage.setItem('localWishlist', JSON.stringify(updated));
          } else {
            localWishlist.push({ productId: product.id, product });
            localStorage.setItem('localWishlist', JSON.stringify(localWishlist));
          }
          window.dispatchEvent(new CustomEvent('localWishlistUpdate'));
          return;
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist"] });
      window.dispatchEvent(new CustomEvent('localWishlistUpdate'));
      setIsInWishlist(!isInWishlist);
      toast({ title: isInWishlist ? "Removed" : "Added", description: product.name });
    }
  });

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem('checkoutProductId', product.id.toString());
      navigate('/auth');
      return;
    }
    const priceValue = parsePrice(displayPrice);
    const item = { productId: product.id, quantity: 1, price: priceValue, total: priceValue, product };
    sessionStorage.setItem('buyNowItem', JSON.stringify(item));
    localStorage.setItem('checkoutType', 'direct');
    localStorage.setItem('buyNowItem', JSON.stringify(item));
    navigate('/checkout');
  };

  const displayPrice = product.isDeal && product.dealPrice ? product.dealPrice : product.price;
  const formattedDisplayPrice = formatPrice(displayPrice);
  const formattedOriginalPrice = formatPrice(product.originalPrice);
  const hasDiscount = product.originalPrice && parsePrice(product.originalPrice) > parsePrice(displayPrice);

  return (
    <div className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm md:shadow-lg hover:shadow-md md:hover-lift transition-all group relative h-full flex flex-col border border-[#F5D7B0]/30 md:border-amber-100/50">
      {showDealBadge && product.isDeal && (
        <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-[#4B3A2F] text-white px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-sm font-bold z-10">
          DEAL
        </div>
      )}

      <Link to={`/product/${product.id}`} className="block relative aspect-square md:aspect-w-16 md:aspect-h-12 overflow-hidden cursor-pointer bg-gray-50">
        <img
          src={product.imageUrl || ""}
          alt={product.name}
          className="w-full h-full md:h-64 object-cover group-hover:scale-105 transition-transform duration-500 md:duration-300"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => { e.preventDefault(); addToWishlistMutation.mutate(); }}
          className={`absolute top-2 right-2 md:top-4 md:right-4 h-8 w-8 md:h-10 md:w-10 rounded-full bg-white/90 backdrop-blur-sm shadow-sm ${isInWishlist ? "text-red-500" : "text-gray-400"} hover:text-red-500 transition-colors`}
        >
          <Heart className={`h-4 w-4 md:h-5 md:w-5 ${isInWishlist ? "fill-current" : ""}`} />
        </Button>
      </Link>

      <div className="p-3 md:p-6 flex flex-col flex-1">
        <Link to={`/product/${product.id}`} className="block mb-1 md:mb-2 hover:no-underline">
          <h3 className="text-sm md:text-xl font-display font-bold text-[#3B2D25] line-clamp-2 md:line-clamp-1 hover:text-[#4B3A2F] transition-colors cursor-pointer" data-testid={`product-name-${product.id}`}>
            {product.name}
          </h3>
        </Link>
        
        <p className="text-[10px] md:text-sm text-gray-500 mb-3 md:mb-4 line-clamp-2" data-testid={`product-description-${product.id}`}>
          {product.description || "No description available"}
        </p>

        <div className="flex items-center md:items-start justify-between mb-3 md:mb-5">
          <div className="flex flex-row items-center space-x-1.5 md:space-x-2">
            <span className="text-base md:text-2xl font-bold text-[#4B3A2F]" data-testid={`product-price-${product.id}`}>
              ₹{formattedDisplayPrice}
            </span>
            {hasDiscount && (
              <span className="text-[10px] md:text-lg text-gray-400 line-through" data-testid={`product-original-price-${product.id}`}>
                ₹{formattedOriginalPrice}
              </span>
            )}
          </div>
          <button 
            onClick={(e) => { e.preventDefault(); addToWishlistMutation.mutate(); }}
            className="md:hidden text-gray-400 hover:text-red-500"
          >
            <Heart className={`h-4 w-4 ${isInWishlist ? "text-red-500 fill-current" : ""}`} />
          </button>
        </div>

        <div className="mt-auto flex gap-2">
          <Button
            size="sm"
            onClick={() => addToCartMutation.mutate()}
            disabled={addToCartMutation.isPending || cartCooldown}
            variant="outline"
            className="flex-1 border-[#4B3A2F] text-[#4B3A2F] hover:bg-[#4B3A2F] hover:text-white h-8 md:h-11 text-[10px] md:text-sm px-1 md:px-4 rounded-lg md:rounded-xl transition-all duration-300"
          >
            <ShoppingCart className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
            <span>{cartCooldown ? "Added" : "Add to Cart"}</span>
          </Button>
          <Button
            size="sm"
            onClick={handleBuyNow}
            disabled={addToCartMutation.isPending}
            className="flex-1 bg-[#4B3A2F] text-white hover:bg-[#3B2D25] h-8 md:h-11 text-[10px] md:text-sm px-1 md:px-4 rounded-lg md:rounded-xl transition-all duration-300 shadow-sm"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
