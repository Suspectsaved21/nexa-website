import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MarketHeader } from "@/components/market/MarketHeader";
import { MarketHero } from "@/components/market/MarketHero";
import { MarketDeals } from "@/components/market/MarketDeals";
import { MarketSpecials } from "@/components/market/MarketSpecials";
import { MarketFooter } from "@/components/market/MarketFooter";
import { useCart } from "@/hooks/useCart";

const LandingPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems, addToCart, updateQuantity, getCartTotal } = useCart();

  const specials = [
    {
      id: 101,
      name: "iPhone 14",
      price: 500.00,
      image: "/lovable-uploads/417323af-6908-4ad4-a593-0471728e8f22.png"
    },
    {
      id: 102,
      name: "WHOME T-TOOL Skateboard for Adult/Kids Girls/Boys Beginner 31\" x 8\" Alpine Maple Deck with ABEC-9 Bearings",
      price: 20.00,
      image: "/lovable-uploads/7fca3272-ac16-4b81-ae76-37c9809e20d2.png"
    },
    {
      id: 103,
      name: "Never Lie: From the Sunday Times Bestselling Author of The Housemaid",
      price: 9.99,
      image: "/lovable-uploads/256306c6-e36b-4a6b-a41f-e56b1fa9306d.png"
    },
    {
      id: 104,
      name: "Emotional Intelligence: 25th Anniversary Edition English edition",
      price: 9.99,
      image: "/lovable-uploads/6410deb4-412c-44f4-8418-1990ea9929e0.png"
    },
    {
      id: 105,
      name: "Fishing Hats Wide Brim UV Protection Fishing Hats Windproof Boonie Hat for Men Women",
      price: 12.00,
      image: "/lovable-uploads/242a4c1f-2870-4767-b542-33233992ff0e.png"
    },
    {
      id: 106,
      name: "UOHHBOE Portable Bluetooth Wireless Speaker 24 Hours Runtime Waterproof and Dustproof",
      price: 25.00,
      image: "/lovable-uploads/bb5d09f8-c491-4bcb-b89e-0583aa81f0c5.png"
    },
    {
      id: 107,
      name: "IRON JIA'S Heated Motorcycle Gloves for Men Winter with USB Charging Port 3000mAh",
      price: 80.00,
      image: "/lovable-uploads/9143698c-c6ed-46f6-a9a8-19dd5c2c49cf.png"
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

  const allProducts = useMemo(() => [
    ...specials.map(item => ({ ...item, type: 'special' })),
    ...deals.map(item => ({ ...item, type: 'deal' }))
  ], []);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return { filteredSpecials: specials, filteredDeals: deals };

    const searchTerms = searchQuery.toLowerCase().split(' ');
    const matchesSearch = (name: string) => 
      searchTerms.every(term => name.toLowerCase().includes(term));

    const filteredSpecials = specials.filter(item => matchesSearch(item.name));
    const filteredDeals = deals.filter(item => matchesSearch(item.name));

    return { filteredSpecials, filteredDeals };
  }, [searchQuery, specials, deals]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

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
        setSearchQuery={handleSearch}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        totalCartCount={getCartTotal()}
      />
      
      <div className="relative pt-16 md:pt-16">
        <MarketHero />
        <MarketSpecials 
          specials={filteredProducts.filteredSpecials}
          cartItems={cartItems}
          incrementItem={incrementItem}
          decrementItem={decrementItem}
        />
        <MarketDeals
          deals={filteredProducts.filteredDeals}
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
