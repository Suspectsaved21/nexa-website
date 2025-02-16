
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t, language, setLanguage } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-auto md:h-16 bg-[#032e64] text-white">
      <div className="container mx-auto px-4 py-2 md:py-0 flex flex-col md:flex-row md:h-full items-center justify-between gap-2 md:gap-4">
        <div className="relative w-full md:w-auto flex justify-between md:justify-start items-center">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 text-white bg-transparent border-none md:hidden"
          >
            <Menu className="h-6 w-6" />
            <span>{t("market.menu")}</span>
          </button>
          
          {isMenuOpen && (
            <nav className="absolute top-12 left-0 bg-white shadow-lg rounded-lg p-4 w-48 z-50">
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-800 hover:text-[#007bff] block" onClick={() => setIsMenuOpen(false)}>
                    {t("market.home")}
                  </Link>
                </li>
                <li>
                  <Link to="/deals" className="text-gray-800 hover:text-[#007bff] block" onClick={() => setIsMenuOpen(false)}>
                    {t("market.deals")}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-800 hover:text-[#007bff] block" onClick={() => setIsMenuOpen(false)}>
                    {t("market.contact")}
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>

        <nav className="hidden md:block">
          <ul className="flex gap-4">
            <li>
              <Link to="/" className="text-white hover:opacity-80">
                {t("market.home")}
              </Link>
            </li>
            <li>
              <Link to="/deals" className="text-white hover:opacity-80">
                {t("market.deals")}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white hover:opacity-80">
                {t("market.contact")}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 flex-1 md:flex-none">
            <Input
              type="search"
              placeholder={t("market.searchPlaceholder")}
              className="w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="secondary" className="bg-[#721244] text-white hover:bg-[#5d0f37] whitespace-nowrap">
              {t("market.search")}
            </Button>
          </div>
          
          <Button variant="secondary" className="bg-[#721244] text-white hover:bg-[#5d0f37] flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span>{t("market.cart")}({totalCartCount})</span>
          </Button>

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
    </header>
  );
};
