
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, ShoppingCart, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface MarketHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  totalCartCount: number;
}

export const MarketHeader = ({
  searchQuery,
  setSearchQuery,
  isMenuOpen,
  setIsMenuOpen,
  totalCartCount
}: MarketHeaderProps) => {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
    } else {
      navigate("/auth");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#032e64] text-white">
      <div className="container mx-auto px-4 py-2 md:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            {t("nexa")}
          </Link>

          {/* Search Bar - Full Width on Mobile */}
          <div className="flex-1 max-w-2xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <Input
                type="search"
                placeholder={t("searchPlaceholder")}
                className="w-full text-black bg-white placeholder:text-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit"
                variant="secondary"
                className="bg-[#721244] text-white hover:bg-[#5d0f37] whitespace-nowrap"
              >
                <Search className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">{t("search")}</span>
              </Button>
            </form>
          </div>

          {/* Right Section: Cart, Language, Menu */}
          <div className="flex items-center gap-4">
            <Link 
              to="/checkout" 
              className="flex items-center gap-2 hover:text-gray-200 transition-colors"
            >
              <div className="relative">
                <ShoppingCart className="h-6 w-6" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#721244] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline">
                {t("cart")}
              </span>
            </Link>
            
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as "en" | "fr")}
              className="bg-white text-gray-800 rounded px-2 py-1"
            >
              <option value="en">EN</option>
              <option value="fr">FR</option>
            </select>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-2 pb-2">
            <ul className="space-y-2">
              <li>
                <Link to="/" className="block py-2" onClick={() => setIsMenuOpen(false)}>
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link to="/deals" className="block py-2" onClick={() => setIsMenuOpen(false)}>
                  {t("deals")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="block py-2" onClick={() => setIsMenuOpen(false)}>
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default MarketHeader;

