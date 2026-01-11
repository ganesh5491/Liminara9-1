import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    ShoppingCart,
    Heart,
    Award,
    Star,
    ChevronLeft,
    Download,
    Minus,
    Plus,
    CheckCircle2,
    Sparkles,
    MessageCircle,
    HelpCircle,
} from "lucide-react";
import type { Product, ProductReview, ProductQuestion } from "@shared/schema";

export default function ProductDetailPage() {
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const { data: product, isLoading: productLoading } = useQuery<Product>({
        queryKey: [`/api/products/${id}`],
    });

    const { data: reviews = [], isLoading: reviewsLoading } = useQuery<ProductReview[]>({
        queryKey: [`/api/products/${id}/reviews`],
    });

    const { data: questions = [], isLoading: questionsLoading } = useQuery<ProductQuestion[]>({
        queryKey: [`/api/products/${id}/questions`],
    });

    const handleQuantityChange = (delta: number) => {
        setQuantity(Math.max(1, quantity + delta));
    };

    if (productLoading) {
        return (
            <div className="min-h-screen bg-[#FFFAF5] flex items-center justify-center">
                <div className="animate-pulse text-[#4B3A2F] font-display text-2xl">Loading luxury care...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-[#FFFAF5] flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-display font-bold text-[#3B2D25] mb-4">Product Not Found</h2>
                    <Link to="/cosmetics">
                        <Button className="bg-[#4B3A2F] text-white">Back to Collection</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const images = product.images && product.images.length > 0 ? product.images : [product.imageUrl || "/placeholder-product.jpg"];
    const originalPrice = parseFloat(product.originalPrice || "0");
    const currentPrice = parseFloat(product.price || "0");
    const hasDiscount = originalPrice > currentPrice;
    const discountText = hasDiscount ? `Save ₹${(originalPrice - currentPrice).toFixed(2)}` : null;

    const specs = typeof product.specifications === 'string' 
        ? JSON.parse(product.specifications) 
        : product.specifications || {};

    const keyFeatures = Array.isArray(product.tags) ? product.tags : [];

    return (
        <div className="min-h-screen bg-[#FFFAF5]">
            <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/cosmetics" className="flex items-center gap-2 text-sm font-bold text-[#4B3A2F] hover:opacity-70 transition-opacity">
                        <ChevronLeft className="h-4 w-4" />
                        Back to Products
                    </Link>
                    <div className="h-4 w-px bg-[#E3C7A0]/30" />
                    <span className="text-xl font-display font-black tracking-tighter text-[#3B2D25]">LIMINARA</span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm font-bold text-[#4B3A2F]/60">
                    <Link to="/" className="hover:text-[#4B3A2F]">Home</Link>
                    <Link to="/cosmetics" className="hover:text-[#4B3A2F]">Collection</Link>
                </div>
                <div className="flex items-center gap-6">
                    <button className="text-[#4B3A2F] hover:opacity-70"><Heart className="h-5 w-5" /></button>
                    <button className="text-[#4B3A2F] hover:opacity-70"><ShoppingCart className="h-5 w-5" /></button>
                </div>
            </header>

            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative aspect-square bg-white rounded-[2.5rem] shadow-sm border border-[#E3C7A0]/20 flex items-center justify-center overflow-hidden group"
                            >
                                <img
                                    src={images[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-full object-contain p-12 drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-8 left-8">
                                    <Badge className="bg-[#D4B590] text-white border-none font-bold tracking-widest text-[10px] px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
                                        <Star className="h-3 w-3 fill-white" />
                                        Featured
                                    </Badge>
                                </div>
                                <div className="absolute bottom-8 left-8">
                                    <Badge className="bg-[#4B3A2F] text-white border-none font-bold text-[10px] px-3 py-1.5 rounded-lg shadow-sm">
                                        {selectedImage + 1}/{images.length}
                                    </Badge>
                                </div>
                            </motion.div>

                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`w-24 h-24 flex-shrink-0 rounded-2xl bg-white border-2 transition-all flex items-center justify-center p-4 overflow-hidden shadow-sm ${selectedImage === idx ? "border-[#D4B590] scale-105" : "border-[#E3C7A0]/20 opacity-50 hover:opacity-100"}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-contain" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4">
                            <h1 className="text-5xl font-display font-black text-[#3B2D25] mb-4 leading-tight">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 fill-[#D4B590] text-[#D4B590]" />)}
                                </div>
                                <span className="text-sm font-bold text-[#4B3A2F]/60">
                                    (4.9 out of 5 stars) {reviews.length > 0 ? reviews.length : "234"} reviews
                                </span>
                            </div>

                            <div className="flex items-baseline gap-4 mb-2">
                                <span className="text-5xl font-display font-black text-[#3B2D25]">₹{product.price}</span>
                                {hasDiscount && (
                                    <span className="text-2xl text-[#4B3A2F]/30 line-through font-medium">₹{product.originalPrice}</span>
                                )}
                                {discountText && (
                                    <Badge className="bg-[#E11D48] text-white border-none font-bold px-3 py-1 text-xs rounded-lg">
                                        {discountText}
                                    </Badge>
                                )}
                            </div>
                            <p className={`text-sm font-bold flex items-center gap-2 mb-10 uppercase tracking-widest ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                                {product.inStock ? <CheckCircle2 className="h-4 w-4" /> : null}
                                {product.inStock ? "In Stock" : "Out of Stock"}
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-10">
                                <div className="p-6 rounded-[2rem] bg-[#FFF4E8] border border-[#D4B590]/30 shadow-sm flex items-center gap-4 group hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#D4B590] shadow-sm"><Award className="h-6 w-6" /></div>
                                    <div>
                                        <p className="text-sm font-bold text-[#3B2D25]">Authentic Product</p>
                                        <p className="text-[10px] text-[#4B3A2F]/60 font-medium">100% Genuine</p>
                                    </div>
                                </div>
                                <div className="p-6 rounded-[2rem] bg-[#FFF4E8] border border-[#D4B590]/30 shadow-sm flex items-center gap-4 group hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#D4B590] shadow-sm"><Download className="h-6 w-6 rotate-180" /></div>
                                    <div>
                                        <p className="text-sm font-bold text-[#3B2D25]">Free Delivery</p>
                                        <p className="text-[10px] text-[#4B3A2F]/60 font-medium">Above ₹999</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 mb-10">
                                <span className="text-sm font-bold text-[#3B2D25] uppercase tracking-widest">Quantity:</span>
                                <div className="flex items-center bg-[#FFF4E8] rounded-xl p-1 border border-[#D4B590]/20 shadow-sm">
                                    <button onClick={() => handleQuantityChange(-1)} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-colors"><Minus className="h-4 w-4" /></button>
                                    <span className="w-12 text-center font-bold text-[#3B2D25]">{quantity}</span>
                                    <button onClick={() => handleQuantityChange(1)} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-lg transition-colors"><Plus className="h-4 w-4" /></button>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button className="flex-1 h-16 rounded-2xl bg-[#4B3A2F] hover:bg-[#3B2D25] text-[#F5D7B0] font-black text-lg uppercase tracking-widest shadow-xl transition-all active:scale-[0.98]">
                                    <ShoppingCart className="mr-3 h-5 w-5" />
                                    Add to Cart
                                </Button>
                                <Button className="flex-1 h-16 rounded-2xl bg-white border-2 border-[#4B3A2F] text-[#4B3A2F] font-black text-lg uppercase tracking-widest hover:bg-[#4B3A2F]/5 transition-all active:scale-[0.98]">
                                    <Plus className="mr-3 h-5 w-5" />
                                    Buy Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Tabs defaultValue="description" className="w-full">
                        <TabsList className="w-full bg-[#FFF4E8] rounded-[2rem] h-20 p-2 gap-2 overflow-x-auto flex flex-nowrap border border-[#D4B590]/20 shadow-sm">
                            {["Description", "Specifications", "Care Guide", "Reviews", "Q&A"].map((tab) => (
                                <TabsTrigger
                                    key={tab}
                                    value={tab.toLowerCase().replace(" ", "").replace("&", "")}
                                    className="flex-1 min-w-[100px] rounded-2xl h-full data-[state=active]:bg-white data-[state=active]:text-[#3B2D25] data-[state=active]:shadow-md text-xs sm:text-sm font-bold text-[#4B3A2F]/40 transition-all"
                                >
                                    {tab}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <div className="mt-8">
                            <TabsContent value="description">
                                <Card className="p-8 sm:p-12 rounded-[3rem] bg-white shadow-soft border border-[#E3C7A0]/20">
                                    <div className="flex items-center gap-3 mb-8">
                                        <Plus className="h-6 w-6 text-[#D4B590] rotate-45" />
                                        <h2 className="text-3xl font-display font-black text-[#3B2D25]">Product Description</h2>
                                    </div>
                                    <div className="prose prose-stone max-w-none text-lg text-[#4B3A2F]/80 leading-relaxed mb-12 font-medium" 
                                         dangerouslySetInnerHTML={{ __html: product.fullDescription || product.description || "" }} 
                                    />
                                    {keyFeatures.length > 0 && (
                                        <div className="space-y-6">
                                            <h3 className="text-xl font-bold text-[#3B2D25] uppercase tracking-widest mb-4">Key Features:</h3>
                                            <div className="space-y-4">
                                                {keyFeatures.map((feature, i) => (
                                                    <div key={i} className="flex items-center gap-4 group">
                                                        <div className="w-10 h-10 rounded-2xl bg-[#FFF4E8] flex items-center justify-center text-[#D4B590] group-hover:scale-110 transition-transform shadow-sm">
                                                            <CheckCircle2 className="h-5 w-5" />
                                                        </div>
                                                        <span className="text-lg text-[#4B3A2F] font-bold">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </Card>
                            </TabsContent>
                            <TabsContent value="specifications">
                                <Card className="p-8 sm:p-12 rounded-[3rem] bg-white shadow-soft border border-[#E3C7A0]/20">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {Object.entries(specs).map(([key, value]) => (
                                            <div key={key} className="border-b border-[#E3C7A0]/20 pb-4">
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4B590] mb-1">{key}</p>
                                                <p className="text-lg font-bold text-[#3B2D25]">{String(value)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </TabsContent>
                            <TabsContent value="careguide">
                                <Card className="p-8 sm:p-12 rounded-[3rem] bg-white shadow-soft border border-[#E3C7A0]/20">
                                    <div className="flex items-center gap-3 mb-8">
                                        <Sparkles className="h-6 w-6 text-[#D4B590]" />
                                        <h2 className="text-3xl font-display font-black text-[#3B2D25]">Care & Usage</h2>
                                    </div>
                                    <p className="text-lg text-[#4B3A2F]/80 leading-relaxed font-medium">
                                        {product.careGuide || "Use daily for best results. Apply to clean skin."}
                                    </p>
                                </Card>
                            </TabsContent>
                            <TabsContent value="reviews">
                                <Card className="p-8 sm:p-12 rounded-[3rem] bg-white shadow-soft border border-[#E3C7A0]/20">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-3">
                                            <MessageCircle className="h-6 w-6 text-[#D4B590]" />
                                            <h2 className="text-3xl font-display font-black text-[#3B2D25]">Customer Reviews</h2>
                                        </div>
                                        <Button className="bg-[#4B3A2F] text-[#F5D7B0] rounded-full px-6">Write Review</Button>
                                    </div>
                                    <div className="space-y-8">
                                        {reviews.length > 0 ? reviews.map((review) => (
                                            <div key={review.id} className="border-b border-[#E3C7A0]/10 pb-8 last:border-0">
                                                <div className="flex items-center justify-between mb-2">
                                                    <p className="font-bold text-[#3B2D25]">{review.userName}</p>
                                                    <p className="text-xs text-[#4B3A2F]/40">{new Date(review.createdAt || "").toLocaleDateString()}</p>
                                                </div>
                                                <div className="flex gap-0.5 mb-3">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-[#D4B590] text-[#D4B590]" : "text-[#E3C7A0]/30"}`} />
                                                    ))}
                                                </div>
                                                <p className="text-[#4B3A2F]/80 font-medium leading-relaxed">{review.comment}</p>
                                            </div>
                                        )) : (
                                            <p className="text-[#4B3A2F]/60 text-center py-12">No reviews yet for this product.</p>
                                        )}
                                    </div>
                                </Card>
                            </TabsContent>
                            <TabsContent value="qa">
                                <Card className="p-8 sm:p-12 rounded-[3rem] bg-white shadow-soft border border-[#E3C7A0]/20">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-3">
                                            <HelpCircle className="h-6 w-6 text-[#D4B590]" />
                                            <h2 className="text-3xl font-display font-black text-[#3B2D25]">Product Q&A</h2>
                                        </div>
                                        <Button className="bg-[#4B3A2F] text-[#F5D7B0] rounded-full px-6">Ask Question</Button>
                                    </div>
                                    <div className="space-y-8">
                                        {questions.length > 0 ? questions.map((q) => (
                                            <div key={q.id} className="space-y-4 p-6 rounded-2xl bg-[#FFF4E8]/50 border border-[#E3C7A0]/10">
                                                <div className="flex gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-[#4B3A2F] text-[#F5D7B0] flex items-center justify-center font-black text-xs flex-shrink-0">Q</div>
                                                    <p className="font-bold text-[#3B2D25]">{q.question}</p>
                                                </div>
                                                {q.answer && (
                                                    <div className="flex gap-3 pl-4 border-l-2 border-[#D4B590]/30">
                                                        <div className="w-8 h-8 rounded-full bg-[#D4B590] text-white flex items-center justify-center font-black text-xs flex-shrink-0">A</div>
                                                        <p className="text-[#4B3A2F]/80 font-medium">{q.answer}</p>
                                                    </div>
                                                )}
                                            </div>
                                        )) : (
                                            <p className="text-[#4B3A2F]/60 text-center py-12">No questions asked yet.</p>
                                        )}
                                    </div>
                                </Card>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </section>

            <section className="py-24 bg-[#FFF4E8]/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-display font-black text-[#3B2D25] mb-12">Related Products</h2>
                    <Link to="/cosmetics">
                        <Button variant="outline" className="bg-[#4B3A2F] hover:bg-[#3B2D25] text-[#F5D7B0] border-none px-12 h-14 rounded-xl font-black text-sm uppercase tracking-widest shadow-xl transition-all">
                            View All Products
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
