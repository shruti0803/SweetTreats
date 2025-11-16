import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart, Heart, Minus, Plus } from "lucide-react";

// Product Card Component
const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleUpdateQuantity = (delta) => setQuantity(prev => Math.max(1, prev + delta));

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="relative p-4 bg-yellow-50/50">
        <img
          src={product.image || `https://placehold.co/300x300/ffedc4/d97706?text=${product.name.replace(/ /g, '+')}`}
          alt={product.name}
          className="w-full h-48 object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`absolute top-4 right-4 p-2 rounded-full shadow-md transition-colors duration-200 ${
            isFavorite ? 'text-red-500 bg-white' : 'text-gray-400 bg-white/80 hover:text-red-500'
          }`}
        >
          <Heart className="w-5 h-5 fill-current" />
        </button>
      </div>

      <div className="p-4 text-center">
        <p className="text-sm text-gray-500 mb-1 font-medium">{product.quantity} in stock</p>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-2xl font-bold text-red-600 mb-4">₹{product.price}</p>

        <div className="flex justify-center items-center space-x-2 mb-4">
          <div className="flex items-center m-2 border border-gray-300 rounded-lg overflow-hidden">
            <button onClick={() => handleUpdateQuantity(-1)} className="p-2 text-gray-600 hover:bg-gray-100"><Minus className="w-4 h-4" /></button>
            <span className="px-3 font-semibold text-gray-800 w-10 text-center">{quantity}</span>
            <button onClick={() => handleUpdateQuantity(1)} className="p-2 text-gray-600 hover:bg-gray-100"><Plus className="w-4 h-4" /></button>
          </div>
          <button className="flex-grow flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 text-sm">
            <ShoppingCart className="w-4 h-4 mr-1" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Shop Component
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Sweets");
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const CATEGORIES = ["Sweets", "Savouries", "Bakes", "Podi & Thokku", "Gifts"];

  // Fetch all sweets
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/sweets/getAllsweets");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  };

  // Search with filters
  const handleSearch = async () => {
    try {
      const params = {};
      if (searchQuery) params.name = searchQuery;
      if (activeCategory) params.category = activeCategory;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      const res = await axios.get("http://localhost:5000/api/sweets/search", { params });
      setProducts(res.data);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter by category locally
  const filteredProducts = products.filter(p => !activeCategory || p.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-8 md:p-12">
      <header className="mb-10 flex flex-wrap justify-between items-center mb-6 space-y-2 sm:space-y-0 ">
       <div> <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Categories Products</h1>
        <p className="text-xl text-gray-600">Explore the delicious range</p>
        </div>
         <div className="flex gap-2">
          <input type="text" placeholder="Search name" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="input" />
          <input type="number" placeholder="Min Price" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="input w-24" />
          <input type="number" placeholder="Max Price" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="input w-24" />
          <button onClick={handleSearch} className="px-4 py-2 bg-red-600 text-white rounded">Search</button>
        </div>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap justify-center items-center mb-6 space-y-2 sm:space-y-0">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-red-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

       
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(p => <ProductCard key={p._id} product={p} />)
        ) : (
          <div className="col-span-full p-12 text-center bg-white rounded-xl shadow-lg">
            <p className="text-xl font-medium text-gray-500">
              No products found in the <span className="font-bold text-red-600">{activeCategory}</span> category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
