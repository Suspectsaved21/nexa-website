import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const categories = [
    {
      name: "Electronics",
      link: "electronics",
      image: "/lovable-uploads/1722e92e-a100-4aad-8b40-f32d19077504.png"
    },
    {
      name: "Fashion",
      link: "fashion",
      image: "/lovable-uploads/e72d34fb-ac4a-4ee2-a038-c0d48d24baa5.png"
    },
    {
      name: "Furniture",
      link: "furniture",
      image: "/lovable-uploads/0f839c5f-af78-436e-bb31-2dd9d13c6a2c.png"
    },
    {
      name: "Beauty",
      link: "beauty",
      image: "/lovable-uploads/e446caf7-15d8-4892-9481-b3c6c8289301.png"
    }
  ];

  const deals = [
    {
      id: 1,
      name: "Intermediate Size Basketball",
      price: 29.99,
      image: "/lovable-uploads/ab7d24b3-7846-4467-a424-f5aa94764e0b.png"
    },
    {
      id: 2,
      name: "Unisex Loudon Lite Backpack",
      price: 32.95,
      image: "/lovable-uploads/381338d8-1507-4f7c-a2a9-eaa9d6af90d7.png"
    },
    {
      id: 3,
      name: "iPhone 14",
      price: 399,
      image: "/lovable-uploads/e72d34fb-ac4a-4ee2-a038-c0d48d24baa5.png"
    }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Latest Fashion Trends 2024",
      excerpt: "Discover the hottest fashion trends for the upcoming season...",
      image: "/lovable-uploads/e72d34fb-ac4a-4ee2-a038-c0d48d24baa5.png"
    },
    {
      id: 2,
      title: "Tech Gadgets Review",
      excerpt: "An in-depth look at the latest tech gadgets in the market...",
      image: "/lovable-uploads/1722e92e-a100-4aad-8b40-f32d19077504.png"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-nexa-primary">
              Nexa
            </Link>
            <div className="hidden md:flex items-center space-x-12">
              <Link to="/" className="text-gray-600 hover:text-nexa-primary">Home</Link>
              <Link to="/shop" className="text-gray-600 hover:text-nexa-primary">Shop</Link>
              <Link to="/blog" className="text-gray-600 hover:text-nexa-primary">Blog</Link>
            </div>
            <div className="flex items-center space-x-4">
              <form className="hidden md:flex items-center">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
              </form>
              <Button variant="outline" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center mt-16">
        <img 
          src="/lovable-uploads/d8e71c37-83cd-4f24-9782-a884ca1aa993.png" 
          alt="Nexa Fashion Collection" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">Welcome to Nexa</h1>
          <p className="text-xl md:text-2xl mb-8 text-white">Your one-stop online shop for everything!</p>
          <Button size="lg" className="bg-nexa-primary hover:bg-nexa-dark text-white text-lg px-8 py-6">
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
                <div className="bg-white p-6 rounded-lg shadow-md">
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

      {/* Hot Deals Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Hot Deals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {deals.map((deal) => (
              <div key={deal.id} className="bg-white p-6 rounded-lg shadow-md">
                <img 
                  src={deal.image} 
                  alt={deal.name}
                  className="w-full h-48 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{deal.name}</h3>
                <p className="text-2xl font-bold text-nexa-primary mb-4">${deal.price}</p>
                <Button className="w-full">Add to Cart</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Latest Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Button variant="outline">Read More</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <Link to="/" className="text-2xl font-bold text-nexa-primary">
                Nexa
              </Link>
              <p className="mt-4 text-gray-600">
                Your one-stop shop for everything digital.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/shop" className="text-gray-600 hover:text-nexa-primary">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-600 hover:text-nexa-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-nexa-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link 
                      to={`/shop?category=${category.link}`}
                      className="text-gray-600 hover:text-nexa-primary"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-600">Email: info@nexa.com</li>
                <li className="text-gray-600">Phone: (555) 123-4567</li>
                <li className="text-gray-600">Address: 123 Nexa Street</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-500">
              © {new Date().getFullYear()} Nexa. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;