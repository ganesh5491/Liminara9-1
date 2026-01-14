import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
    Sparkles, ShieldCheck, Star, Truck, ArrowRight, Leaf,
    ChevronLeft, ChevronRight
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// IMPORT YOUR BANNERS
// STATIC BANNER PATHS
const banner1 = "/banner/banner-1.jpg";
const banner2 = "/banner/banner-2.jpg";
const banner3 = "/banner/banner-3.jpg";

// SLIDE DATA
const bannerSlides = [
    {
        image: banner2,
        subtitle: "Glow Naturally",
        title: "Beauty Redefined",
        description: "Unlock your skin's natural radiance with dermatologist-approved rituals.",
    },
    {
        image: banner1,
        subtitle: "New Collection",
        title: "Radiance Skincare",
        description: "Premium serums and creams crafted for luminous, healthy skin.",
    },
    {
        image: banner3,
        subtitle: "Complete Care",
        title: "The Full Collection",
        description: "Everything your skin needs for a complete transformation.",
    },
];

const Hero = () => {

    /* ---------------- PARALLAX DEPTH MOTION ---------------- */
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            setMouseX((e.clientX / window.innerWidth) - 0.5);
            setMouseY((e.clientY / window.innerHeight) - 0.5);
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    /* ---------------- EMBLA CAROUSEL ---------------- */
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
        Autoplay({ delay: 5000, stopOnInteraction: false })
    ]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
        emblaApi.on("select", onSelect);
        onSelect();
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi]);

    /* ---------------- SCROLL TO PRODUCT SECTION ---------------- */
    const scrollToProducts = () => {
        document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative h-screen overflow-hidden">

            {/* ---------- BACKGROUND SLIDER ---------- */}
            <div className="absolute inset-0" ref={emblaRef}>
                <div className="flex h-full">
                    {bannerSlides.map((slide, i) => (
                        <div key={i} className="relative flex-[0_0_100%] min-w-0 h-screen overflow-hidden">

                            {/* BACKGROUND IMAGE WITH PARALLAX ZOOM */}
                            <div
                                className="absolute inset-0 bg-cover bg-[85%_center] sm:bg-center will-change-transform
                                transition-transform [transition-duration:3000ms] ease-out"
                                style={{
                                    backgroundImage: `url(${slide.image})`,
                                    transform: `scale(1.05) translate(${mouseX * 15}px, ${mouseY * 15}px)`
                                }}
                            />

                            {/* WHITE GLASS OVERLAY — same for all slides */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/40 to-transparent md:from-white/55 md:via-white/35" />
                        </div>
                    ))}
                </div>
            </div>

            {/* ---------- TEXT CONTENT LAYER ---------- */}
            <div className="relative z-10 h-screen flex items-center">
                <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32 py-12 md:py-20">
                    <div className="max-w-xl lg:max-w-2xl">

                        {/* SUBTITLE BADGE */}
                        <div className="hero-fade mb-4 md:mb-6" style={{ animationDelay: "150ms" }}>
                            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 md:px-5 md:py-2.5
                            bg-white/70 backdrop-blur-sm border shadow-sm">
                                <Sparkles className="h-4 text-[var(--primary)]" />
                                <span className="text-xs md:text-sm font-medium text-gray-700 tracking-wide">
                                    {bannerSlides[selectedIndex].subtitle}
                                </span>
                            </div>
                        </div>

                        {/* HEADINGS */}
                        <div className="hero-fade mb-4 md:mb-6" style={{ animationDelay: "300ms" }}>
                            <p className="text-[10px] md:text-sm uppercase tracking-[0.25em] text-gray-500 mb-2">
                                Liminara Cosmetics
                            </p>
                            <h1 className="font-serif">
                                <span className="block text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-tight">
                                    {bannerSlides[selectedIndex].title}
                                </span>
                            </h1>
                        </div>

                        {/* DESCRIPTION */}
                        <p className="hero-fade text-sm md:text-lg text-gray-600 max-w-lg mb-6 md:mb-8"
                            style={{ animationDelay: "450ms" }}>
                            {bannerSlides[selectedIndex].description}
                        </p>

                        {/* CTA BUTTONS */}
                        <div className="hero-fade flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-10" style={{ animationDelay: "600ms" }}>
                            <Button onClick={scrollToProducts}
                                className="rounded-full bg-black text-white px-6 py-5 md:px-8 md:py-6 text-sm md:text-base hover:bg-gray-900 flex items-center justify-center">
                                Explore Collection
                                <ArrowRight className="ml-2 h-4 md:h-5" />
                            </Button>

                            <Button variant="outline"
                                className="rounded-full border-2 px-6 py-5 md:px-8 md:py-6 text-sm md:text-base hover:bg-black/5 flex items-center justify-center">
                                Our Story
                            </Button>
                        </div>

                        {/* TRUST BADGES */}
                        <div className="hero-fade flex flex-wrap gap-2 md:gap-3" style={{ animationDelay: "750ms" }}>
                            <TrustBadge icon={<ShieldCheck className="w-4 h-4" />} text="Dermatologist-Tested" />
                            <TrustBadge icon={<Star className="w-4 h-4" />} text="4.9★ Rating" />
                            <TrustBadge icon={<Leaf className="w-4 h-4" />} text="Clean Beauty" />
                            <TrustBadge icon={<Truck className="w-4 h-4" />} text="Free Shipping" />
                        </div>
                    </div>
                </div>
            </div>

            {/* ---------- CAROUSEL CONTROLS ---------- */}
            <button onClick={scrollPrev} className="hero-arrow left hidden md:flex">
                <ChevronLeft className="icon" />
            </button>
            <button onClick={scrollNext} className="hero-arrow right hidden md:flex">
                <ChevronRight className="icon" />
            </button>

            {/* SLIDE INDICATORS */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {bannerSlides.map((_, i) => (
                    <button key={i} onClick={() => scrollTo(i)}
                        className={`dot ${i === selectedIndex ? "active" : ""}`} />
                ))}
            </div>
        </section>
    );
};

// Shared badge component
const TrustBadge = ({ icon, text }: { icon: any; text: string }) => (
    <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border shadow-sm">
        <span className="text-gray-700">{icon}</span>
        <span className="text-[10px] md:text-sm font-medium text-gray-700">{text}</span>
    </div>
);

export default Hero;
