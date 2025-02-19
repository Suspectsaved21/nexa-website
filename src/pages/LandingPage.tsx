
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MarketHeader } from "@/components/market/MarketHeader";
import { MarketHero } from "@/components/market/MarketHero";
import { MarketCategories } from "@/components/market/MarketCategories";
import { MarketVideoSection } from "@/components/market/MarketVideoSection";
import { MarketDeals } from "@/components/market/MarketDeals";
import { MarketFooter } from "@/components/market/MarketFooter";
import { useCart } from "@/hooks/useCart";

const LandingPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems, addToCart, updateQuantity, getCartTotal } = useCart();

  const categories = [
    {
      name: "Electronics",
      link: "electronics",
      image: "/lovable-uploads/af68aec7-4213-409b-9e64-6ac17ade8a4b.png"
    },
    {
      name: "Fashion",
      link: "fashion",
      image: "/lovable-uploads/2e1336e4-f9d9-4456-9b43-b0d6d4f2386f.png"
    },
    {
      name: "Furniture",
      link: "furniture",
      image: "/lovable-uploads/cd8156df-b27f-4f5a-85bc-d8953311e8d2.png"
    },
    {
      name: "Beauty",
      link: "beauty",
      image: "/lovable-uploads/c5c6c645-396c-4ebd-ad5b-237d295eb2d9.png"
    }
  ];

  const deals = [
    {
      id: 1,
      name: "Intermediate size basketball for men",
      price: 29.99,
      image: "/lovable-uploads/60120fed-7730-46e6-8340-5f0f49df8aa2.png"
    },
    {
      id: 2,
      name: "Unisex Loudon Lite Backpack",
      price: 32.95,
      image: "/lovable-uploads/af68aec7-4213-409b-9e64-6ac17ade8a4b.png"
    },
    {
      id: 3,
      name: "iPhone 14",
      price: 399,
      image: "/lovable-uploads/54a95ad7-85b3-4455-a167-c94194096831.png"
    },
    {
      id: 4,
      name: "Long sleeves shirt for women",
      price: 32.95,
      image: "/lovable-uploads/2e1336e4-f9d9-4456-9b43-b0d6d4f2386f.png"
    }
  ];

  const incrementItem = (dealId: number) => {
    const item = cartItems.find(item => item.product_id === dealId);
    if (item) {
      updateQuantity(item.id, item.quantity + 1);
    } else {
      addToCart(dealId);
    }
  };

  const decrementItem = (dealId: number) => {
    const item = cartItems.find(item => item.product_id === dealId);
    if (item && item.quantity > 0) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="relative min-h-screen">
      <MarketHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        totalCartCount={getCartTotal()}
      />
      
      <div className="relative pt-16 md:pt-16">
        <MarketHero />
        <MarketCategories categories={categories} />
        <MarketVideoSection categories={categories} />
        <MarketDeals
          deals={deals}
          cartItems={cartItems}
          incrementItem={incrementItem}
          decrementItem={decrementItem}
        />
      </div>

      <MarketFooter />
    </div>
  );
};

export default LandingPage;
