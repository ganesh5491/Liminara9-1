import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
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
} from "lucide-react";

const productData = {
    id: 1,
    name: "Vitamin C Brightening Serum",
    tagline: "Radiance Booster & Pigmentation Reducer",
    price: 1000,
    originalPrice: 1500,
    discount: "Save ₹500.00",
    description: "Stable vitamin C formula to even skin tone and boost radiance. 20% ethyl ascorbic acid with ferulic acid and vitamin E for enhanced stability and brightening power.",
    keyFeatures: [
        "Premium grade teak wood construction",
        "Handcrafted by master artisans",
        "Lifetime warranty coverage",
        "Expert installation included"
    ],
    images: [
        "/placeholder-product-1.jpg",
        "/placeholder-product-2.jpg",
        "/placeholder-product-3.jpg",
    ],
    rating: 4.8,
    reviewCount: 342,
    inStock: true,
};

export default function ProductDetailPage() {
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (delta: number) => {
        setQuantity(Math.max(1, quantity + delta));
    };

    return (
        <div className="min-h-screen bg-[#FFFAF5]">
            {/* Navigation / Header */}
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
                    <Link to="/collection" className="hover:text-[#4B3A2F]">Collection</Link>
                </div>
                <div className="flex items-center gap-6">
                    <button className="text-[#4B3A2F] hover:opacity-70"><Heart className="h-5 w-5" /></button>
                    <button className="text-[#4B3A2F] hover:opacity-70"><ShoppingCart className="h-5 w-5" /></button>
                    <button className="text-[#4B3A2F] hover:opacity-70"><Plus className="h-5 w-5 rotate-45" /></button>
                </div>
            </header>

            {/* Section 1: Product Hero */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Left Column: Images */}
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative aspect-square bg-white rounded-[2.5rem] shadow-sm border border-[#E3C7A0]/20 flex items-center justify-center overflow-hidden group"
                            >
                                <img
                                    src={productData.images[selectedImage]}
                                    alt={productData.name}
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
                                        {selectedImage + 1}/{productData.images.length}
                                    </Badge>
                                </div>
                                <div className="absolute top-8 right-8 flex flex-col gap-3">
                                    <button className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md text-[#4B3A2F] hover:scale-110 transition-transform"><Heart className="h-5 w-5" /></button>
                                    <button className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md text-[#4B3A2F] hover:scale-110 transition-transform"><Plus className="h-5 w-5 rotate-45" /></button>
                                </div>
                                <div className="absolute bottom-8 right-8">
                                    <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm border-[#4B3A2F]/20 text-[#4B3A2F] rounded-full px-6 font-bold h-10">
                                        <Plus className="h-4 w-4 mr-2" />
                                        360° View
                                    </Button>
                                </div>
                            </motion.div>

                            <div className="flex gap-4">
                                {productData.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`w-24 h-24 rounded-2xl bg-white border-2 transition-all flex items-center justify-center p-4 overflow-hidden shadow-sm ${selectedImage === idx ? "border-[#D4B590] scale-105" : "border-[#E3C7A0]/20 opacity-50 hover:opacity-100"}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-contain" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Info */}
                        <div className="pt-4">
                            <h1 className="text-5xl font-display font-black text-[#3B2D25] mb-4 leading-tight">
                                {productData.name}
                            </h1>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 fill-[#D4B590] text-[#D4B590]" />)}
                                </div>
                                <span className="text-sm font-bold text-[#4B3A2F]/60">
                                    (4.9 out of 5 stars) {productData.reviewCount} reviews
                                </span>
                            </div>

                            <div className="flex items-baseline gap-4 mb-2">
                                <span className="text-5xl font-display font-black text-[#3B2D25]">₹{productData.price}.00</span>
                                <span className="text-2xl text-[#4B3A2F]/30 line-through font-medium">₹{productData.originalPrice}.00</span>
                                <Badge className="bg-[#E11D48] text-white border-none font-bold px-3 py-1 text-xs rounded-lg">
                                    {productData.discount}
                                </Badge>
                            </div>
                            <p className="text-sm font-bold text-green-600 flex items-center gap-2 mb-10 uppercase tracking-widest">
                                <CheckCircle2 className="h-4 w-4" />
                                In Stock
                            </p>

                            <div className="grid grid-cols-2 gap-4 mb-10">
                                <div className="p-6 rounded-[2rem] bg-[#FFF4E8] border border-[#D4B590]/30 shadow-sm flex items-center gap-4 group hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#D4B590] shadow-sm"><Award className="h-6 w-6" /></div>
                                    <div>
                                        <p className="text-sm font-bold text-[#3B2D25]">Lifetime Warranty</p>
                                        <p className="text-[10px] text-[#4B3A2F]/60 font-medium">Premium quality assured</p>
                                    </div>
                                </div>
                                <div className="p-6 rounded-[2rem] bg-[#FFF4E8] border border-[#D4B590]/30 shadow-sm flex items-center gap-4 group hover:shadow-md transition-shadow">
                                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#D4B590] shadow-sm"><Download className="h-6 w-6 rotate-180" /></div>
                                    <div>
                                        <p className="text-sm font-bold text-[#3B2D25]">Free Delivery</p>
                                        <p className="text-[10px] text-[#4B3A2F]/60 font-medium">7-15 days nationwide</p>
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

            {/* Section 2: Tabs */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Tabs defaultValue="description" className="w-full">
                        <TabsList className="w-full bg-[#FFF4E8] rounded-[2rem] h-20 p-2 gap-4 border border-[#D4B590]/20 shadow-sm">
                            {["Description", "Specifications", "Care Guide", "Reviews", "Q&A"].map((tab) => (
                                <TabsTrigger
                                    key={tab}
                                    value={tab.toLowerCase().replace(" ", "")}
                                    className="flex-1 rounded-2xl h-full data-[state=active]:bg-white data-[state=active]:text-[#3B2D25] data-[state=active]:shadow-md text-sm font-bold text-[#4B3A2F]/40 transition-all"
                                >
                                    {tab}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        <div className="mt-8">
                            <TabsContent value="description">
                                <Card className="p-12 rounded-[3rem] bg-white shadow-soft border border-[#E3C7A0]/20">
                                    <div className="flex items-center gap-3 mb-8">
                                        <Plus className="h-6 w-6 text-[#D4B590] rotate-45" />
                                        <h2 className="text-3xl font-display font-black text-[#3B2D25]">Product Description</h2>
                                    </div>
                                    <p className="text-lg text-[#4B3A2F]/80 leading-relaxed mb-12 font-medium italic">
                                        {productData.description}
                                    </p>
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-bold text-[#3B2D25] uppercase tracking-widest mb-4">Key Features:</h3>
                                        <div className="space-y-4">
                                            {productData.keyFeatures.map((feature, i) => (
                                                <div key={i} className="flex items-center gap-4 group">
                                                    <div className="w-10 h-10 rounded-2xl bg-[#FFF4E8] flex items-center justify-center text-[#D4B590] group-hover:scale-110 transition-transform shadow-sm">
                                                        {i === 0 ? <Award className="h-5 w-5" /> : i === 1 ? <CheckCircle2 className="h-5 w-5" /> : i === 2 ? <Plus className="h-5 w-5 rotate-45" /> : <Plus className="h-5 w-5 rotate-45" />}
                                                    </div>
                                                    <span className="text-lg text-[#4B3A2F] font-bold">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Card>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </section>

            {/* You Might Also Like */}
            <section className="py-24 bg-[#FFF4E8]/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-display font-black text-[#3B2D25] mb-12">You Might Also Like</h2>
                    <Button variant="outline" className="bg-[#4B3A2F] hover:bg-[#3B2D25] text-[#F5D7B0] border-none px-12 h-14 rounded-xl font-black text-sm uppercase tracking-widest shadow-xl transition-all">
                        View All Products
                    </Button>
                </div>
            </section>
        </div>
    );
}
