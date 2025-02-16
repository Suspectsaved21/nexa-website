
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const LandingPage = () => {
  const { t, language, setLanguage } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

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

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#032e64] text-white">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Menu Button */}
          <div className="relative">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 text-white bg-transparent border-none"
            >
              <Menu className="h-6 w-6" />
              <span>Menu</span>
            </button>
            
            {isMenuOpen && (
              <nav className="absolute top-12 left-0 bg-white shadow-lg rounded-lg p-4 w-48">
                <ul className="space-y-2">
                  <li>
                    <Link to="/" className="text-gray-800 hover:text-[#007bff] block">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/deals" className="text-gray-800 hover:text-[#007bff] block">
                      Deals
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-gray-800 hover:text-[#007bff] block">
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:block">
            <ul className="flex gap-4">
              <li>
                <Link to="/" className="text-white hover:opacity-80">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/deals" className="text-white hover:opacity-80">
                  Deals
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white hover:opacity-80">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Input
                type="search"
                placeholder="Search products..."
                className="w-48 md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="secondary" className="bg-[#721244] text-white hover:bg-[#5d0f37]">
                Search
              </Button>
            </div>
            
            <Button variant="secondary" className="bg-[#721244] text-white hover:bg-[#5d0f37] flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              <span>Cart({cartCount})</span>
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

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center mt-16 bg-cover bg-center" style={{
        backgroundImage: `url('/lovable-uploads/54a95ad7-85b3-4455-a167-c94194096831.png')`
      }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">
            Welcome to Nexa
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white">
            Your one-stop online shop for everything!
          </p>
          <Button size="lg" className="bg-[#721244] hover:bg-[#5d0f37] text-white">
            Shop Now
          </Button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={`/shop?category=${category.link}`}
                className="transform transition-transform hover:scale-105"
              >
                <div className="bg-white p-6 rounded-lg shadow-md hover:bg-purple-600 hover:text-white transition-colors">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold text-center">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section with Scrollable Products */}
      <section className="relative h-[500px] overflow-hidden">
        <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 h-full">
          <div className="container mx-auto px-4 py-8 h-full">
            <div className="flex overflow-x-auto gap-6 h-full items-center scrollbar-thin scrollbar-thumb-[#d7263d] scrollbar-track-transparent">
              {categories.map((category) => (
                <div key={category.name} className="flex-none w-48">
                  <div className="bg-white p-4 rounded-lg shadow-md transform transition-transform hover:scale-110">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-32 object-cover rounded-md mb-3"
                    />
                    <p className="text-center font-semibold">{category.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deals Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Hot Deals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {deals.map((deal) => (
              <div key={deal.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <img 
                  src={deal.image} 
                  alt={deal.name}
                  className="w-full h-40 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{deal.name}</h3>
                <p className="text-xl font-bold text-[#721244] mb-4">${deal.price}</p>
                <div className="flex items-center justify-between gap-2">
                  <button className="px-2 py-1 bg-[#530a46] text-white rounded hover:bg-[#3d0733]">-</button>
                  <Button className="flex-1 bg-[#530a46] hover:bg-[#3d0733] text-white">
                    Add to Cart
                  </Button>
                  <button className="px-2 py-1 bg-[#530a46] text-white rounded hover:bg-[#3d0733]">+</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#232f3e] text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Nexa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
