
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Heart, ShoppingCart, User, Menu, X, LogIn, LogOut } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function Navigation({ onCartClick = () => {}, onWishlistClick = () => {} }) {
  const { user, loading: authLoading, logout, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const prevAuthRef = useRef(isAuthenticated);
  const location = useLocation();

  /* ---------------- CART + WISHLIST COUNTS ---------------- */
  const { data: apiCartItems = [] } = useQuery<any[]>({ queryKey: ["/api/cart"], retry: false, enabled: isAuthenticated });
  const { data: apiWishlistItems = [] } = useQuery<any[]>({ queryKey: ["/api/wishlist"], retry: false, enabled: isAuthenticated });

  const [localCartCount, setLocalCartCount] = useState(0);
  const [localWishlistCount, setLocalWishlistCount] = useState(0);

  useEffect(() => {
    if (prevAuthRef.current !== isAuthenticated) {
      if (isAuthenticated) {
        queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
        queryClient.invalidateQueries({ queryKey: ["/api/wishlist"] });
      } else {
        queryClient.removeQueries({ queryKey: ["/api/cart"] });
        queryClient.removeQueries({ queryKey: ["/api/wishlist"] });
      }
      prevAuthRef.current = isAuthenticated;
    }
  }, [isAuthenticated, queryClient]);

  useEffect(() => {
    const updateCounts = () => {
      const lc = JSON.parse(localStorage.getItem("localCart") || "[]");
      const lw = JSON.parse(localStorage.getItem("localWishlist") || "[]");
      setLocalCartCount(lc.reduce((s: number, i: any) => s + (i.quantity || 1), 0));
      setLocalWishlistCount(lw.length);
    };
    updateCounts();
    window.addEventListener("cartUpdated", updateCounts);
    window.addEventListener("localWishlistUpdate", updateCounts);
    return () => {
      window.removeEventListener("cartUpdated", updateCounts);
      window.removeEventListener("localWishlistUpdate", updateCounts);
    };
  }, []);

  const cartCount = isAuthenticated ? apiCartItems.reduce((s: number, i: any) => s + (i.quantity || 1), 0) : localCartCount;
  const wishlistCount = isAuthenticated ? apiWishlistItems.length : localWishlistCount;

  /* ---------------- LOGOUT FUNCTION ---------------- */
  const handleLogout = async () => {
    try { await fetch("/api/auth/logout", { method: "POST" }); } catch {}
    logout(); 
    window.location.replace(window.location.origin);
  };

  /* ---------------- NAV LINKS ---------------- */
  const navLinks = [
    { href: "/#cosmetics-section", name: "Home", isInternal: true },
    { href: "/#collection-section", name: "Collection", isInternal: true },
  ];

  const handleNavClick = (e:any,l:any)=>{
    if(l.isInternal && location.pathname==="/"){
      e.preventDefault();
      document.getElementById(l.href.replace("/#",""))?.scrollIntoView({behavior:"smooth"});
    }
  }

  /* ---------------- SCROLL STATE ---------------- */
  const [isScrolled,setIsScrolled]=useState(false);
  const [isMobileMenu,setIsMobileMenu]=useState(false);
  const isHomePage = location.pathname === "/";

  useEffect(()=>{
    const sc=()=>setIsScrolled(window.scrollY>50);
    window.addEventListener("scroll",sc);
    return ()=>window.removeEventListener("scroll",sc);
  },[]);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      (isScrolled || !isHomePage) 
        ? "bg-white/90 backdrop-blur-md shadow-sm py-3 md:py-4" 
        : "bg-transparent py-4 md:py-6"
    }`}>
      <nav className="max-w-7xl mx-auto px-4 md:px-10 flex justify-between items-center h-full">

        {/* -------- LOGO -------- */}
        <Link to="/" className="flex items-center gap-2 group h-8 md:h-12 relative z-[60]">
          <img
            src="/src/assets/logo.png"
            alt="Liminara Logo"
            className={`h-full w-auto object-contain transition-all duration-500 ${
              (isScrolled || !isHomePage) ? "brightness-0" : "brightness-0 invert md:brightness-0 md:invert-0"
            }`}
          />
        </Link>

        {/* -------- DESKTOP NAV -------- */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((l)=>
            <Link key={l.name} to={l.href}
              onClick={(e)=>handleNavClick(e,l)}
              className="text-sm font-medium bold text-gray-600 hover:text-black transition relative group"
            >
              {l.name}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black group-hover:w-full transition-all duration-300"/>
            </Link>
          )}
        </div>

        {/* -------- ACTION BUTTONS -------- */}
        <div className="flex items-center gap-1 md:gap-2 relative z-[60]">

          {/* Wishlist */}
          <Button variant="ghost" size="icon" onClick={onWishlistClick} className="relative h-9 w-9 md:h-10 md:w-10">
            <Heart className="w-4 md:w-5"/>
            {wishlistCount>0 && <span className="badge-count scale-75 md:scale-100">{wishlistCount}</span>}
          </Button>

          {/* Cart */}
          <Button variant="ghost" size="icon" onClick={onCartClick} className="relative h-9 w-9 md:h-10 md:w-10">
            <ShoppingCart className="w-4 md:w-5"/>
            {cartCount>0 && <span className="badge-count scale-75 md:scale-100">{cartCount}</span>}
          </Button>

          {/* -------- AUTH LOGIC -------- */}
          {!authLoading && (
            user ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost" size="icon" className="h-9 w-9 md:h-10 md:w-10">
                    <User className="w-4 md:w-5" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={handleLogout} className="h-9 w-9 md:h-10 md:w-10">
                  <LogOut className="text-red-600 w-4 md:w-5" />
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon" className="h-9 w-9 md:h-10 md:w-10">
                  <LogIn className="w-4 md:w-5" />
                </Button>
              </Link>
            )
          )}

          {/* Mobile Menu Toggle */}
          <Button variant="ghost" size="icon" className="md:hidden h-9 w-9" onClick={()=>setIsMobileMenu(!isMobileMenu)}>
            {isMobileMenu ? <X className="w-5 h-5"/>:<Menu className="w-5 h-5"/>}
          </Button>
        </div>
      </nav>

      {/* -------- MOBILE NAV -------- */}
      {isMobileMenu && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl shadow-xl p-6 space-y-4 animate-fade-in border-t">
          {navLinks.map((l)=>
            <Link key={l.name} to={l.href} onClick={()=>setIsMobileMenu(false)}
              className="block text-lg font-medium text-gray-800 hover:text-black hover:pl-2 transition-all duration-300"
            >{l.name}</Link>
          )}
          <div className="pt-4 border-t flex flex-col gap-3">
            {!authLoading && !user && (
              <Link to="/login" onClick={()=>setIsMobileMenu(false)}>
                <Button className="w-full justify-start gap-2" variant="ghost">
                  <LogIn className="w-5" /> Login
                </Button>
              </Link>
            )}
            {user && (
              <Link to="/profile" onClick={()=>setIsMobileMenu(false)}>
                <Button className="w-full justify-start gap-2" variant="ghost">
                  <User className="w-5" /> Profile
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
