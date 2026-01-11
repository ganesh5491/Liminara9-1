import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InteractiveCard } from "@/components/ui/InteractiveCard";
import { Slider } from "@/components/ui/slider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Sparkles,
  Search,
  Heart,
  ShoppingCart,
  Eye,
  ArrowRight,
  Droplets,
  Flower2,
  Beaker,
  Filter,
  X,
  Star,
  MessageCircle,
  HelpCircle,
} from "lucide-react";
import productsData from "../../../data/products.json";

/* ------------------------------------
   Skin Finder Quiz
------------------------------------ */
function SkinFinderQuiz({ onComplete }: { onComplete: (filters: any) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      question: "What's your primary skin concern?",
      options: ["Dryness", "Oiliness", "Aging", "Pigmentation", "Sensitivity"],
      icon: Flower2,
    },
    {
      question: "How does your skin feel by midday?",
      options: ["Tight & Dry", "Oily T-zone", "Balanced", "Flaky patches"],
      icon: Droplets,
    },
    {
      question: "How often do you experience breakouts?",
      options: ["Rarely", "Occasionally", "Frequently", "Never"],
      icon: Beaker,
    },
  ];

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [`q${step}`]: answer };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      const filters: any = { concerns: [], skinType: "", sensitive: false, ingredient: [] };
      const primary = newAnswers.q0;

      if (primary === "Dryness") {
        filters.concerns.push("Dryness");
        filters.ingredient.push("Hyaluronic Acid");
      } else if (primary === "Oiliness") {
        filters.skinType = "oily";
        filters.ingredient.push("Niacinamide (Vitamin B3)");
      } else if (primary === "Aging") {
        filters.concerns.push("Fine Lines");
        filters.ingredient.push("Retinol", "Peptides");
      } else if (primary === "Pigmentation") {
        filters.concerns.push("Pigmentation", "Dullness");
        filters.ingredient.push("Vitamin C", "Niacinamide (Vitamin B3)");
      } else if (primary === "Sensitivity") {
        filters.concerns.push("Sensitivity", "Redness");
        filters.sensitive = true;
      }

      const mid = newAnswers.q1;
      if (mid === "Tight & Dry") filters.skinType = "dry";
      if (mid === "Oily T-zone") filters.skinType = "combination";
      if (mid === "Balanced") filters.skinType = "normal";
      if (mid === "Flaky patches") filters.skinType = "dry";

      onComplete(filters);
    }
  };

  const Icon = questions[step]?.icon || Sparkles;

  return (
    <div className="space-y-6 w-full">
      <AnimatePresence mode="wait">
        {step < questions.length ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <div className="flex gap-2 mb-4">
                {questions.map((_, i) => (
                  <motion.div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i <= step ? "bg-gold" : "bg-border"}`}
                    initial={i === step ? { scaleX: 0 } : {}}
                    animate={i === step ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.5 }}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Step {step + 1} of {questions.length}
              </p>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-cream">
                <Icon className="h-6 w-6 text-espresso" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground">
                {questions[step].question}
              </h3>
            </div>

            <div className="grid gap-3">
              {questions[step].options.map((option, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-4 px-5 border-2 border-border hover:border-gold hover:bg-cream/50 rounded-xl transition-all duration-300 group"
                    onClick={() => handleAnswer(option)}
                  >
                    <span className="w-6 h-6 rounded-full border-2 border-muted-foreground/30 mr-3 flex items-center justify-center group-hover:border-gold group-hover:bg-gold/20 transition-all duration-300">
                      <span className="w-2 h-2 rounded-full bg-transparent group-hover:bg-gold transition-all duration-300" />
                    </span>
                    {option}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center"
            >
              <Sparkles className="h-10 w-10 text-espresso" />
            </motion.div>
            <h3 className="text-2xl font-display font-bold text-foreground mb-2">
              Analyzing Your Profile
            </h3>
            <p className="text-muted-foreground">
              Finding the perfect products for your skin...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------
   Precision Sidebar
------------------------------------ */
function PrecisionSidebar({ onChange, onClose }: { onChange?: (filters: any) => void; onClose?: () => void }) {
  const concernsOptions = ["Dullness", "Fine Lines", "Dryness", "Pigmentation", "Sensitivity", "Redness"];
  const ingredients = ["Niacinamide (Vitamin B3)", "Vitamin C", "Hyaluronic Acid", "Retinol", "Peptides"];

  const textures = [
    { id: "serum", label: "Serum", icon: Droplets },
    { id: "cream", label: "Cream", icon: Flower2 },
    { id: "gel", label: "Gel", icon: Beaker },
    { id: "oil", label: "Oil", icon: Sparkles },
  ];

  const [selectedConcerns, setSelectedConcerns] = useState<Set<string>>(new Set());
  const [skinType, setSkinType] = useState("");
  const [sensitive, setSensitive] = useState(false);
  const [texture, setTexture] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState<string[]>([]);
  const [skinTypeValue, setSkinTypeValue] = useState([50]);

  const filters = useMemo(
    () => ({
      concerns: Array.from(selectedConcerns),
      skinType,
      sensitive,
      texture,
      ingredient: selectedIngredient,
    }),
    [selectedConcerns, skinType, sensitive, texture, selectedIngredient]
  );

  React.useEffect(() => onChange && onChange(filters), [filters, onChange]);

  function skinTypeFromValue(v: number) {
    if (v <= 24) return "dry";
    if (v <= 49) return "normal";
    if (v <= 74) return "combination";
    return "oily";
  }

  const clearAll = () => {
    setSelectedConcerns(new Set());
    setSkinType("");
    setTexture("");
    setSensitive(false);
    setSelectedIngredient([]);
    setSkinTypeValue([50]);
  };

  return (
    <div className="w-full lg:w-80 lg:sticky lg:top-24">
      <div className="glass rounded-2xl p-6 shadow-medium">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gold-dark" />
            <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground">
              Precision Filters
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearAll}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear All
            </button>
            {onClose && (
              <button onClick={onClose} className="lg:hidden p-1 hover:bg-muted rounded-md">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Concerns */}
        <section className="mb-6 pb-6 border-b border-border">
          <h4 className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wide">
            Shop By Concern
          </h4>
          <div className="flex flex-wrap gap-2">
            {concernsOptions.map((c) => (
              <button
                key={c}
                onClick={() => {
                  const newSet = new Set(selectedConcerns);
                  newSet.has(c) ? newSet.delete(c) : newSet.add(c);
                  setSelectedConcerns(newSet);
                }}
                className={`text-xs px-3 py-2 rounded-full border transition-all duration-300 ${selectedConcerns.has(c)
                  ? "bg-espresso text-primary-foreground border-espresso"
                  : "bg-background text-foreground border-border hover:border-gold hover:bg-cream/50"
                  }`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        {/* Skin Type Slider */}
        <section className="mb-6 pb-6 border-b border-border">
          <h4 className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wide">
            Skin Type
          </h4>
          <Slider
            value={skinTypeValue}
            onValueChange={(v) => {
              setSkinTypeValue(v);
              setSkinType(skinTypeFromValue(v[0]));
            }}
            max={100}
            step={1}
            className="mb-4"
          />
          <div className="flex justify-between text-xs">
            {["Dry", "Normal", "Combo", "Oily"].map((type, i) => (
              <span
                key={type}
                className={`px-2 py-1 rounded-md transition-all duration-300 ${skinType === type.toLowerCase() || (type === "Combo" && skinType === "combination")
                  ? "bg-cream-dark text-espresso font-medium"
                  : "text-muted-foreground"
                  }`}
              >
                {type}
              </span>
            ))}
          </div>

          <label className="flex items-center justify-between mt-4 pt-4 border-t border-border cursor-pointer group">
            <span className="text-sm text-foreground">Sensitive Skin</span>
            <div
              onClick={() => setSensitive(!sensitive)}
              className={`w-10 h-6 rounded-full transition-all duration-300 flex items-center px-1 cursor-pointer ${sensitive ? "bg-gold" : "bg-muted"
                }`}
            >
              <motion.div
                animate={{ x: sensitive ? 16 : 0 }}
                className="w-4 h-4 bg-card rounded-full shadow-sm"
              />
            </div>
          </label>
        </section>

        {/* Texture */}
        <section className="mb-6 pb-6 border-b border-border">
          <h4 className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wide">
            Texture Preference
          </h4>
          <div className="grid grid-cols-4 gap-2">
            {textures.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTexture(texture === t.id ? "" : t.id)}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-1 ${texture === t.id
                    ? "border-gold bg-cream text-espresso"
                    : "border-border bg-background text-muted-foreground hover:border-gold/50 hover:bg-cream/30"
                    }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-[10px] font-medium">{t.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Ingredients */}
        <section>
          <h4 className="text-xs font-medium text-muted-foreground mb-4 uppercase tracking-wide">
            Active Ingredients
          </h4>
          <div className="space-y-2">
            {ingredients.map((ing) => (
              <label
                key={ing}
                className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-cream/50 transition-colors"
              >
                <div
                  onClick={() => {
                    const updated = new Set(selectedIngredient);
                    updated.has(ing) ? updated.delete(ing) : updated.add(ing);
                    setSelectedIngredient(Array.from(updated));
                  }}
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-300 cursor-pointer ${selectedIngredient.includes(ing)
                    ? "bg-espresso border-espresso"
                    : "border-border group-hover:border-gold"
                    }`}
                >
                  {selectedIngredient.includes(ing) && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 text-primary-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </motion.svg>
                  )}
                </div>
                <span className="text-sm text-foreground">{ing}</span>
              </label>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ------------------------------------
   Product Detail Modal
------------------------------------ */
function ProductDetailModal({ product, isOpen, onClose }: { product: any; isOpen: boolean; onClose: () => void }) {
  const [isLiked, setIsLiked] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      if (!product) return;
      if (isAuthenticated) {
        await apiRequest("POST", "/api/cart", { productId: String(product.id), quantity: 1 });
        return { success: true, localStorage: false };
      }
      const localCart = JSON.parse(localStorage.getItem('localCart') || '[]');
      const existingItemIndex = localCart.findIndex((item: any) => item.productId === String(product.id));
      if (existingItemIndex !== -1) {
        localCart[existingItemIndex].quantity = (localCart[existingItemIndex].quantity || 1) + 1;
      } else {
        localCart.push({
          id: `local-${product.id}-${Date.now()}`,
          productId: String(product.id),
          quantity: 1,
          product: {
            ...product,
            id: String(product.id),
            name: product.name,
            description: product.description,
            price: String(product.price),
            imageUrl: product.imageUrl || product.images?.[0],
            images: product.images || [product.imageUrl]
          }
        });
      }
      localStorage.setItem('localCart', JSON.stringify(localCart));
      return { success: true, localStorage: true };
    },
    onSuccess: (result) => {
      if (!product) return;
      if (result && !result.localStorage) {
        queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      }
      window.dispatchEvent(new Event('cartUpdated'));
      toast({ title: "Added to cart", description: `${product.name} has been added to your cart.` });
    }
  });

  const addToWishlistMutation = useMutation({
    mutationFn: async () => {
      if (!product) return;
      if (isAuthenticated) {
        if (isLiked) await apiRequest("DELETE", `/api/wishlist/${product.id}`);
        else await apiRequest("POST", "/api/wishlist", { productId: String(product.id) });
        return;
      }
      const localWishlist = JSON.parse(localStorage.getItem('localWishlist') || '[]');
      if (isLiked) {
        const updated = localWishlist.filter((item: any) => item.productId !== String(product.id));
        localStorage.setItem('localWishlist', JSON.stringify(updated));
      } else {
        localWishlist.push({
          productId: String(product.id),
          product: {
            ...product,
            id: String(product.id),
            name: product.name,
            description: product.description,
            price: String(product.price),
            imageUrl: product.imageUrl || product.images?.[0],
            images: product.images || [product.imageUrl]
          }
        });
        localStorage.setItem('localWishlist', JSON.stringify(localWishlist));
      }
      window.dispatchEvent(new CustomEvent('localWishlistUpdate'));
    },
    onSuccess: () => {
      if (!product) return;
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist"] });
      setIsLiked(!isLiked);
      toast({ title: isLiked ? "Removed from wishlist" : "Added to wishlist", description: `${product.name} has been ${isLiked ? "removed from" : "added to"} your wishlist.` });
    }
  });

  if (!product) return null;

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem('checkoutProductId', product.id.toString());
      navigate('/auth');
      return;
    }
    const item = {
      productId: String(product.id),
      quantity: 1,
      price: product.price,
      total: product.price,
      product: {
        ...product,
        id: String(product.id),
        name: product.name,
        description: product.description,
        price: String(product.price),
        imageUrl: product.imageUrl || product.images?.[0],
        images: product.images || [product.imageUrl]
      }
    };
    sessionStorage.setItem('buyNowItem', JSON.stringify(item));
    localStorage.setItem('checkoutType', 'direct');
    localStorage.setItem('buyNowItem', JSON.stringify(item));
    navigate('/checkout');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl p-0 overflow-hidden bg-[#FFFAF5] border-none shadow-2xl rounded-3xl">
        <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto">
          {/* Left Column: Media & Core Info */}
          <div className="w-full md:w-1/2 bg-[#F5D7B0]/10 p-8 md:p-12 space-y-8 border-r border-[#E3C7A0]/20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative aspect-square w-full bg-white rounded-3xl p-10 shadow-sm border border-[#E3C7A0]/20 flex items-center justify-center overflow-hidden"
            >
              <img
                src={product.imageUrl || product.images?.[0]}
                alt={product.name}
                className="w-full h-full object-contain drop-shadow-xl"
              />
              <div className="absolute top-6 left-6">
                <Badge className="bg-[#4B3A2F] text-[#F5D7B0] border-none font-bold tracking-widest text-[10px] px-3 py-1.5 rounded-full">
                  {product.subcategory}
                </Badge>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => addToWishlistMutation.mutate()}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Heart
                  className={`h-6 w-6 transition-colors duration-300 ${isLiked ? "fill-[#E11D48] text-[#E11D48]" : "text-[#4B3A2F]"}`}
                />
              </motion.button>
            </motion.div>

            <div className="space-y-6">
              <div className="flex items-center gap-6 p-6 bg-white/50 rounded-2xl border border-[#E3C7A0]/20 shadow-sm">
                <div className="text-center border-r border-[#E3C7A0]/20 pr-6">
                  <p className="text-4xl font-display font-black text-[#3B2D25]">{product.rating || "4.8"}</p>
                  <div className="flex gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} className="h-3 w-3 fill-[#8B7355] text-[#8B7355]" />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#3B2D25]">High Performance</p>
                  <p className="text-xs text-[#4B3A2F]/60 font-medium">Verified pharmaceutical grade</p>
                </div>
              </div>

              {product.careGuide && (
                <div className="p-6 bg-[#4B3A2F] rounded-3xl text-white shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <Sparkles className="h-16 w-16 text-[#F5D7B0]" />
                  </div>
                  <div className="flex gap-4 items-start relative z-10">
                    <div className="h-10 w-10 rounded-2xl bg-[#F5D7B0] flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-5 w-5 text-[#4B3A2F]" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-[#F5D7B0] uppercase tracking-widest">Expert Tip</p>
                      <p className="text-xs text-white/80 leading-relaxed font-medium italic">{product.careGuide}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Detailed Tabs & Actions */}
          <div className="w-full md:w-1/2 flex flex-col h-full bg-[#FFFAF5] relative">
            <div className="p-8 md:p-12 pb-0 flex-1 overflow-y-auto">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold tracking-[0.3em] text-[#8B7355] uppercase block">
                    {product.brand} • {product.category}
                  </span>
                  <DialogTitle className="text-4xl md:text-5xl font-display font-black text-[#3B2D25] leading-[1.1] tracking-tight">
                    {product.name}
                  </DialogTitle>
                  <div className="flex items-center gap-4 pt-2">
                    <span className="text-4xl font-bold text-[#4B3A2F]">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xl text-[#4B3A2F]/30 line-through font-medium">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="w-full justify-start bg-transparent border-b border-[#E3C7A0]/20 h-auto p-0 rounded-none gap-8">
                    <TabsTrigger value="overview" className="bg-transparent border-none text-[#4B3A2F]/40 data-[state=active]:text-[#4B3A2F] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#8B7355] h-12 rounded-none px-0 text-xs font-bold uppercase tracking-widest transition-all">Overview</TabsTrigger>
                    <TabsTrigger value="details" className="bg-transparent border-none text-[#4B3A2F]/40 data-[state=active]:text-[#4B3A2F] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#8B7355] h-12 rounded-none px-0 text-xs font-bold uppercase tracking-widest transition-all">Specs</TabsTrigger>
                    <TabsTrigger value="reviews" className="bg-transparent border-none text-[#4B3A2F]/40 data-[state=active]:text-[#4B3A2F] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#8B7355] h-12 rounded-none px-0 text-xs font-bold uppercase tracking-widest transition-all">Reviews</TabsTrigger>
                    <TabsTrigger value="qa" className="bg-transparent border-none text-[#4B3A2F]/40 data-[state=active]:text-[#4B3A2F] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#8B7355] h-12 rounded-none px-0 text-xs font-bold uppercase tracking-widest transition-all">Q&A</TabsTrigger>
                  </TabsList>

                  <div className="py-8 min-h-[300px]">
                    <TabsContent value="overview" className="mt-0 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-[#4B3A2F]/40">Product Narrative</h4>
                        <DialogDescription className="text-[#4B3A2F]/80 leading-relaxed text-lg font-medium">
                          {product.description}
                        </DialogDescription>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-[#F5D7B0]/20 rounded-2xl border border-[#E3C7A0]/10">
                          <p className="text-[10px] uppercase font-black text-[#8B7355] mb-1">Texture</p>
                          <p className="text-sm font-bold text-[#3B2D25]">{product.specifications?.Texture || "Pharmaceutical Grade"}</p>
                        </div>
                        <div className="p-4 bg-[#F5D7B0]/20 rounded-2xl border border-[#E3C7A0]/10">
                          <p className="text-[10px] uppercase font-black text-[#8B7355] mb-1">Ethics</p>
                          <p className="text-sm font-bold text-[#3B2D25]">Dermatologist Tested</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="details" className="mt-0 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <div className="grid grid-cols-1 gap-4">
                        {product.specifications && Object.entries(product.specifications).map(([key, value]: [string, any]) => (
                          <div key={key} className="flex justify-between items-center py-3 border-b border-[#E3C7A0]/10">
                            <span className="text-xs font-bold text-[#4B3A2F]/40 uppercase tracking-widest">{key}</span>
                            <span className="text-sm font-bold text-[#3B2D25]">{value}</span>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="reviews" className="mt-0 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-[#4B3A2F]/40">Verified Feedback</h4>
                        <Button variant="ghost" size="sm" className="text-xs font-bold text-[#8B7355]">Write Review</Button>
                      </div>
                      {[
                        { name: "S. Kapoor", text: "Exceptional clinical results after just 1 week. My skin's moisture barrier is significantly improved.", stars: 5 },
                        { name: "Dr. Mehta", text: "As a professional, I'm impressed by the ingredient purity and clinical efficacy of this formulation.", stars: 5 }
                      ].map((rev, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-white border border-[#E3C7A0]/10 shadow-sm space-y-2">
                          <div className="flex justify-between items-center">
                            <p className="text-xs font-bold text-[#3B2D25]">{rev.name}</p>
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-2.5 w-2.5 fill-[#8B7355] text-[#8B7355]" />)}
                            </div>
                          </div>
                          <p className="text-xs text-[#4B3A2F]/70 leading-relaxed font-medium italic">"{rev.text}"</p>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="qa" className="mt-0 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#4B3A2F]/40 mb-4">Common Inquiries</h4>
                      {[
                        { q: "Is this suitable for post-procedure skin?", a: "Yes, our gentle formulation is designed to soothe and repair, making it ideal for recovery." },
                        { q: "Does it contain artificial fragrances?", a: "No. Liminara products are 100% free from synthetic fragrances and harmful additives." }
                      ].map((item, i) => (
                        <div key={i} className="space-y-2 p-4 rounded-2xl bg-white border border-[#E3C7A0]/10 shadow-sm">
                          <p className="text-xs font-bold text-[#3B2D25] flex gap-2">
                            <HelpCircle className="h-3.5 w-3.5 text-[#8B7355]" />
                            {item.q}
                          </p>
                          <p className="text-xs text-[#4B3A2F]/60 font-medium leading-relaxed pl-5">
                            {item.a}
                          </p>
                        </div>
                      ))}
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>

            {/* Fixed Footer Actions */}
            <div className="p-8 md:p-12 pt-8 bg-white border-t border-[#E3C7A0]/20 sticky bottom-0 z-10">
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  onClick={() => addToCartMutation.mutate()}
                  className="flex-[2] bg-[#4B3A2F] hover:bg-[#3B2D25] text-[#F5D7B0] rounded-2xl h-16 text-lg font-black group shadow-xl transition-all active:scale-[0.98] min-w-[180px]"
                >
                  <ShoppingCart className="mr-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  Add to Collection
                </Button>
                <Button 
                  size="lg"
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#F5D7B0] hover:bg-[#E3C7A0] text-[#4B3A2F] rounded-2xl h-16 text-lg font-black shadow-xl transition-all active:scale-[0.98] min-w-[140px]"
                >
                  Buy Now
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedProduct(null);
                    navigate(`/product-liminara/${product.id}`);
                  }}
                  className="flex-1 h-16 rounded-2xl border-2 border-[#8B7355] text-[#8B7355] font-black text-lg uppercase tracking-widest hover:bg-[#8B7355]/5 transition-all min-w-[140px]"
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------
   Cosmetics Products Main
------------------------------------ */
export default function CosmeticsProducts() {
  const [selectedFilters, setSelectedFilters] = useState<any>({
    concerns: [],
    skinType: "",
    sensitive: false,
    texture: "",
    ingredient: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Filter products locally from the imported JSON
  const filteredProducts = useMemo(() => {
    return productsData.filter((product: any) => {
      if (product.category !== "cosmetic") return false;

      const searchMatch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      if (!searchMatch) return false;

      if (selectedFilters.concerns.length > 0) {
        const productConcern = product.specifications?.Concern || "";
        const hasConcern = selectedFilters.concerns.some((c: string) => 
          productConcern.toLowerCase().includes(c.toLowerCase())
        );
        if (!hasConcern) return false;
      }

      if (selectedFilters.skinType) {
        const productSkinType = product.specifications?.["Skin Type"] || "";
        if (!productSkinType.toLowerCase().includes(selectedFilters.skinType.toLowerCase()) && 
            !productSkinType.toLowerCase().includes("all skin types")) {
          return false;
        }
      }

      if (selectedFilters.texture) {
        const productTexture = product.specifications?.Texture || "";
        if (!productTexture.toLowerCase().includes(selectedFilters.texture.toLowerCase())) {
          return false;
        }
      }

      if (selectedFilters.ingredient.length > 0) {
        const productIngredients = product.specifications?.["Key Ingredients"] || "";
        const hasIngredient = selectedFilters.ingredient.some((i: string) => 
          productIngredients.toLowerCase().includes(i.toLowerCase())
        );
        if (!hasIngredient) return false;
      }

      return true;
    });
  }, [searchQuery, selectedFilters]);

  return (
    <div className="min-h-screen bg-warmWhite py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream-dark text-espresso-light mb-4"
          >
            <Sparkles className="h-4 w-4 text-gold" />
            <span className="text-xs font-bold tracking-widest uppercase">Clinical Precision</span>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl lg:text-6xl font-display font-bold text-espresso mb-4 tracking-tight">
                Skin-Smart Cosmetics
              </h1>
              <p className="text-lg text-espresso/60 max-w-2xl font-medium">
                {filteredProducts.length} curated products for your unique skin needs.
              </p>
            </div>
            
            <Dialog open={showQuiz} onOpenChange={setShowQuiz}>
              <DialogTrigger asChild>
                <Button className="bg-espresso hover:bg-espresso/90 text-white rounded-xl h-14 px-8 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
                  <Eye className="mr-2 h-5 w-5" />
                  Skin Finder Quiz
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md bg-warmWhite border-none shadow-2xl rounded-3xl p-8">
                <DialogHeader className="mb-4">
                  <DialogTitle className="text-3xl font-display font-bold text-espresso">Skin Profile Quiz</DialogTitle>
                </DialogHeader>
                <SkinFinderQuiz onComplete={(filters) => {
                  setSelectedFilters(filters);
                  setShowQuiz(false);
                }} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <PrecisionSidebar onChange={setSelectedFilters} />

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="relative mb-10 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-gold transition-colors" />
              <Input
                placeholder="Search products, ingredients, or concerns..."
                className="pl-14 h-16 bg-white border-2 border-border focus:border-gold rounded-2xl text-lg shadow-soft focus:shadow-medium transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Results Grid */}
            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                <motion.div 
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
                >
                  {filteredProducts.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => setSelectedProduct(product)}
                      className="cursor-pointer group"
                    >
                      <InteractiveCard
                        InteractiveColor="hsl(38 55% 70%)"
                        tailwindBgClass="bg-white"
                        className="h-full border-none shadow-soft hover:shadow-xl transition-all duration-500 overflow-hidden"
                        borderRadius="24px"
                        rotationFactor={0.15}
                      >
                        <div className="flex flex-col h-full">
                          {/* Image */}
                          <div className="relative aspect-[4/5] bg-cream overflow-hidden">
                            <motion.img
                              whileHover={{ scale: 1.1, rotate: 1 }}
                              transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                              src={product.imageUrl || product.images?.[0]}
                              alt={product.name}
                              className="w-full h-full object-cover transition-all duration-500 group-hover:brightness-105"
                            />
                            <motion.div 
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              className="absolute inset-0 bg-espresso/5 pointer-events-none transition-opacity duration-500"
                            />
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-white/90 backdrop-blur-md text-espresso border-none font-bold text-[10px] tracking-widest px-3 py-1.5 shadow-sm">
                                {product.subcategoryId}
                              </Badge>
                            </div>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-espresso hover:text-rose-500 transition-colors shadow-sm"
                            >
                              <Heart className="h-5 w-5" />
                            </button>
                          </div>

                          {/* Content */}
                          <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-display font-bold text-espresso leading-tight group-hover:text-gold-dark transition-colors line-clamp-2">
                                  {product.name}
                                </h3>
                                <span className="text-xl font-bold text-espresso ml-2">₹{product.price}</span>
                              </div>
                              <p className="text-sm text-espresso/60 line-clamp-2 font-medium leading-relaxed">
                                {product.description}
                              </p>
                            </div>

                            <div className="pt-4 flex items-center justify-between border-t border-cream-dark/50">
                              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-gold-dark">
                                View Details
                              </span>
                              <div className="h-10 w-10 rounded-full bg-cream flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
                                <ArrowRight className="h-5 w-5 text-espresso group-hover:text-white transition-colors" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </InteractiveCard>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-32 bg-white rounded-[32px] border-2 border-dashed border-border"
                >
                  <div className="bg-cream w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="h-10 w-10 text-espresso/30" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-espresso mb-2">No products found</h3>
                  <p className="text-espresso/50 mb-8 max-w-sm mx-auto font-medium">
                    Try adjusting your filters or search query to discover more products.
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-2 border-border hover:border-gold hover:bg-cream rounded-xl px-8 h-12 font-bold transition-all"
                    onClick={() => {
                      setSelectedFilters({
                        concerns: [],
                        skinType: "",
                        sensitive: false,
                        texture: "",
                        ingredient: [],
                      });
                      setSearchQuery("");
                    }}
                  >
                    Clear All Filters
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </div>
  );
}
