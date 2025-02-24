
import { useLocation } from "react-router-dom";
import { MarketHeader } from "@/components/market/MarketHeader";
import { MarketFooter } from "@/components/market/MarketFooter";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SearchResultsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState(query);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems, addToCart, updateQuantity, getCartTotal } = useCart();

  // Define all products (same as in LandingPage)
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

  const allProducts = [...specials, ...deals];
  
  const searchResults = allProducts.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const incrementItem = (productId: number) => {
    const item = cartItems.find(item => item.product_id === productId);
    if (item) {
      updateQuantity(item.id, item.quantity + 1);
    } else {
      addToCart(productId);
    }
  };

  const decrementItem = (productId: number) => {
    const item = cartItems.find(item => item.product_id === productId);
    if (item && item.quantity > 0) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const getItemQuantity = (productId: number) => {
    const item = cartItems.find(item => item.product_id === productId);
    return item?.quantity || 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MarketHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        totalCartCount={getCartTotal()}
      />
      
      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-2xl font-bold mb-6">
          {t("Search Results")}: "{query}"
        </h1>
        
        {searchResults.length === 0 ? (
          <p className="text-center text-gray-600 py-8">No products found matching your search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <div 
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
              >
                <div className="aspect-square mb-4 relative">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 line-clamp-2 h-12">{product.name}</h3>
                <p className="text-lg font-bold text-[#721244] mb-4">€{product.price.toFixed(2)}</p>
                <div className="flex items-center justify-between gap-2">
                  <button 
                    onClick={() => decrementItem(product.id)}
                    className="p-2 bg-[#530a46] text-white rounded hover:bg-[#3d0733]"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <Button 
                    onClick={() => incrementItem(product.id)}
                    className="flex-1 bg-[#530a46] hover:bg-[#3d0733] text-white"
                  >
                    {t("addToCart")} ({getItemQuantity(product.id)})
                  </Button>
                  <button 
                    onClick={() => incrementItem(product.id)}
                    className="p-2 bg-[#530a46] text-white rounded hover:bg-[#3d0733]"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <MarketFooter />
    </div>
  );
};

export default SearchResultsPage;
