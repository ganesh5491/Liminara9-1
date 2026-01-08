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
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-warmWhite border-none">
        <div className="flex flex-col md:flex-row h-full max-h-[90vh] overflow-y-auto">
          {/* Image Section */}
          <div className="w-full md:w-1/2 bg-cream flex items-center justify-center p-8">
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={product.imageUrl || product.images?.[0]}
              alt={product.name}
              className="w-full h-auto max-h-[500px] object-contain drop-shadow-2xl rounded-2xl"
            />
          </div>

          {/* Details Section */}
          <div className="w-full md:w-1/2 p-8 space-y-6 flex flex-col justify-center">
            <div className="space-y-2">
              <Badge className="bg-gold/20 text-gold-dark border-gold/30 hover:bg-gold/30">
                {product.subcategory}
              </Badge>
              <DialogTitle className="text-3xl font-display font-bold text-espresso leading-tight">
                {product.name}
              </DialogTitle>
              <p className="text-espresso/60 font-medium">By {product.brand}</p>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gold-dark">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through opacity-50">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            <div className="space-y-4">
              <DialogDescription className="text-espresso/80 leading-relaxed text-base">
                {product.description}
              </DialogDescription>

              {product.specifications && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  {Object.entries(product.specifications).map(([key, value]: [string, any]) => (
                    <div key={key} className="space-y-1">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">{key}</p>
                      <p className="text-sm font-medium text-espresso">{value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-6 flex gap-3">
              <Button size="lg" className="flex-1 bg-espresso hover:bg-espresso/90 text-white rounded-xl h-14 text-lg font-semibold group">
                Add to Cart
                <ShoppingCart className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="icon" variant="outline" className="h-14 w-14 rounded-xl border-2 border-border hover:border-gold hover:bg-cream transition-all duration-300">
                <Heart className="h-6 w-6 text-espresso" />
              </Button>
            </div>
            
            {product.careGuide && (
              <div className="p-4 bg-cream/30 rounded-xl border border-gold/10">
                <p className="text-xs font-bold text-gold-dark uppercase tracking-widest mb-1">Care Guide</p>
                <p className="text-xs text-espresso/70 italic">{product.careGuide}</p>
              </div>
            )}
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
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                              src={product.imageUrl || product.images?.[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-white/90 backdrop-blur-md text-espresso border-none font-bold text-[10px] tracking-widest px-3 py-1.5 shadow-sm">
                                {product.subcategory}
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
                                {product.shortDescription || product.description}
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
