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
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchQuery(searchQuery);
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
    <header className="fixed top-0 left-0 right-0 z-50 h-auto md:h-16 bg-[#032e64] text-white">
      <div className="container mx-auto px-4 py-2 md:py-0 flex flex-col md:flex-row md:h-full items-center justify-between gap-2 md:gap-4">
        {/* Menu Button */}
        <div className={`relative w-full md:w-auto flex justify-between md:justify-start items-center ${isSearchExpanded ? 'hidden md:flex' : ''}`}>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 text-white bg-transparent border-none md:hidden"
          >
            <Menu className="h-6 w-6" />
            <span>{t("menu")}</span>
          </button>
          
          {isMenuOpen && (
            <nav className="absolute top-12 left-0 bg-white shadow-lg rounded-lg p-4 w-48 z-50">
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-800 hover:text-[#007bff] block" onClick={() => setIsMenuOpen(false)}>
                    {t("home")}
                  </Link>
                </li>
                <li>
                  <Link to="/deals" className="text-gray-800 hover:text-[#007bff] block" onClick={() => setIsMenuOpen(false)}>
                    {t("deals")}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-800 hover:text-[#007bff] block" onClick={() => setIsMenuOpen(false)}>
                    {t("contact")}
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>

        {/* Navigation Links */}
        <nav className={`hidden md:block ${isSearchExpanded ? 'md:hidden' : ''}`}>
          <ul className="flex gap-4">
            <li>
              <Link to="/" className="text-white hover:opacity-80">
                {t("home")}
              </Link>
            </li>
            <li>
              <Link to="/deals" className="text-white hover:opacity-80">
                {t("deals")}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white hover:opacity-80">
                {t("contact")}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Search and Cart */}
        <div className={`flex items-center gap-4 ${isSearchExpanded ? 'w-full' : 'w-full md:w-auto'}`}>
          <div className={`flex items-center gap-2 ${isSearchExpanded ? 'w-full' : 'flex-1 md:flex-none'}`}>
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full">
              <Input
                type="search"
                placeholder={t("searchPlaceholder")}
                className="w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchExpanded(true)}
              />
              <Button 
                type="submit"
                variant="secondary" 
                className="bg-[#721244] text-white hover:bg-[#5d0f37] whitespace-nowrap"
              >
                {t("search")}
              </Button>
            </form>
          </div>
          
          <div className={`${isSearchExpanded ? 'hidden md:flex' : 'flex'} items-center gap-4`}>
            <Link to="/checkout">
              <Button variant="secondary" className="bg-[#721244] text-white hover:bg-[#5d0f37] flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                <span>{t("cart")}({totalCartCount})</span>
              </Button>
            </Link>

            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as "en" | "fr")}
              className="bg-white text-gray-800 rounded border border-gray-300 px-2 py-1"
            >
              <option value="en">English</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MarketHeader;
