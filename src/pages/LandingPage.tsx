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
      name: "Suddenly Cotton Blue Eau de Parfum for Women 100ml EDP",
      price: 10.00,
      image: "/lovable-uploads/3dcdad9e-de18-4a65-9ca0-427fd3ac2025.png"
    },
    {
      id: 2,
      name: "plex care serum 4",
      price: 9.99,
      image: "/lovable-uploads/22960741-63be-49e8-8387-ced1020d4c2c.png"
    },
    {
      id: 3,
      name: "Nike Homme Air Force 1",
      price: 99.99,
      image: "/lovable-uploads/4239ebcc-9043-43e5-bdb8-d054263822e0.png"
    },
    {
      id: 4,
      name: "TANMESSO Y2K Women's Winter Autumn Fashion Long Sleeve Fleece Oversized Hoodie",
      price: 30.00,
      image: "/lovable-uploads/fe5a3d98-7db7-40cf-a4d2-72cef41789c6.png"
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
