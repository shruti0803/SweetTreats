import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart, Heart, Minus, Plus, X } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


  

const ProductCard = ({ product, onBuy }) => {
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
          <button
  onClick={() => onBuy({ ...product, selectedQuantity: quantity })}
  className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
>
  Buy Now
</button>

        </div>
      </div>
    </div>
  );
};

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Sweets");
  const [modalProduct, setModalProduct] = useState(null);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
const { user, token } = useContext(AuthContext); // <- Add this
  const CATEGORIES = ["Sweets", "Savouries", "Bakes", "Podi & Thokku", "Gifts"];

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/sweets/getAllsweets");
      setProducts(res.data.sweets || res.data);
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

const handlePurchase = async (product, quantity) => {
  if (!user || !token) {
    return alert("You must log in as a user to make a purchase!");
  }

  setPurchaseLoading(true);
  try {
    await axios.post(
      `http://localhost:5000/api/sweets/${product._id}/purchase`,
      { quantity }, // <-- send quantity!
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Purchase successful!");
    setModalProduct(null);
  } catch (err) {
    console.error("Purchase failed:", err.response?.data || err);
    alert("Purchase failed. Try again!");
  }
  setPurchaseLoading(false);
};



  const filteredProducts = products.filter(p => !activeCategory || p.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-8 md:p-12">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
              activeCategory === cat ? "bg-red-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts.map(p => (
          <ProductCard key={p._id} product={p} onBuy={setModalProduct} />
        ))}
      </div>

      {/* Buy Now Modal */}
      {modalProduct && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => setModalProduct(null)}
            ><X /></button>
            <img
              src={modalProduct.image || `https://placehold.co/300x300/ffedc4/d97706?text=${modalProduct.name.replace(/ /g, '+')}`}
              alt={modalProduct.name}
              className="w-full h-48 object-contain mb-4 rounded"
            />
            <h2 className="text-xl font-bold mb-2">{modalProduct.name}</h2>
            <p className="text-gray-500 mb-2">{modalProduct.description || "No description available."}</p>
            <p className="text-red-600 font-bold text-lg mb-2">₹{modalProduct.price}</p>
            <p className="text-gray-600 mb-4">{modalProduct.quantity} in stock</p>
         <button
  onClick={() => handlePurchase(modalProduct, modalProduct.selectedQuantity || 1)}
  disabled={purchaseLoading}
  className={`w-full py-2 rounded text-white font-semibold ${purchaseLoading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
>
  {purchaseLoading ? "Processing..." : "Buy Now"}
</button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
