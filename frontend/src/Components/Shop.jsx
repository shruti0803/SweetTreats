import React, { useEffect, useState } from "react"; 
import axios from "axios";
import { Heart } from "lucide-react";
import Swal from "sweetalert2";

// Product Card Component
const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(product.quantity);
  const [loading, setLoading] = useState(false);

  const handleUpdateQuantity = (delta) => setQuantity(prev => Math.max(1, prev + delta));

  const handlePurchase = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      Swal.fire("Login Required", "You must log in first!", "warning");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `https://sweettreats-3.onrender.com/api/sweets/${product._id}/purchase`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire("Success", res.data.message, "success");

      // Update stock immediately
      setStock(prev => Math.max(prev - quantity, 0));
      setQuantity(1); // reset quantity after purchase
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Purchase failed", "error");
    } finally {
      setLoading(false);
    }
  };

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
          className={`absolute top-4 right-4 p-2 rounded-full shadow-md transition-colors duration-200 ${isFavorite ? 'text-red-500 bg-white' : 'text-gray-400 bg-white/80 hover:text-red-500'}`}
        >
          <Heart className="w-5 h-5 fill-current" />
        </button>
      </div>

      <div className="p-4 text-center">
        <p className="text-sm text-gray-500 mb-1 font-medium">{stock} in stock</p>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-2xl font-bold text-red-600 mb-4">₹{product.price}</p>

        <div className="flex items-center justify-center gap-2 mb-4">
          <button onClick={() => handleUpdateQuantity(-1)} className="px-3 py-1 border rounded-l hover:bg-gray-100">-</button>
          <span className="px-4 py-1 border-t border-b">{quantity}</span>
          <button onClick={() => handleUpdateQuantity(1)} className="px-3 py-1 border rounded-r hover:bg-gray-100">+</button>
        </div>

        <button
          onClick={handlePurchase}
          disabled={loading || stock === 0}
          className={`w-full py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors ${loading || stock === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Processing..." : `Buy Now × ${quantity}`}
        </button>
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

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://sweettreats-3.onrender.com/api/sweets/getAllsweets");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  };

  const handleSearch = async () => {
    try {
      const params = {};
      if (searchQuery) params.name = searchQuery;
      if (activeCategory) params.category = activeCategory;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      const res = await axios.get("https://sweettreats-3.onrender.com/api/sweets/search", { params });
      setProducts(res.data);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => !activeCategory || p.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-8 md:p-12">
      <header className="mb-10 flex flex-wrap justify-between items-center mb-6 space-y-2 sm:space-y-0 ">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Categories Products</h1>
          <p className="text-xl text-gray-600">Explore the delicious range</p>
        </div>
        <div className="flex gap-2">
          <input type="text" placeholder="Search name" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="input" />
          <input type="number" placeholder="Min Price" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="input w-24" />
          <input type="number" placeholder="Max Price" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="input w-24" />
          <button onClick={handleSearch} className="px-4 py-2 bg-red-600 text-white rounded">Search</button>
        </div>
      </header>

      <div className="flex flex-wrap justify-center items-center mb-6 space-y-2 sm:space-y-0">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${activeCategory === cat ? "bg-red-600 text-white shadow-md" : "bg-white text-gray-600 hover:bg-gray-100"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

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
