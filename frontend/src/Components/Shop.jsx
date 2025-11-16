import React, { useState } from 'react';
import { ShoppingCart, Heart, Minus, Plus } from 'lucide-react';

// --- DATA STRUCTURE ---
// Represents a single product
const productTemplate = (id, category, name, weight, price, imageText) => ({
  id: `${category.toLowerCase()}-${id}`,
  category: category,
  name: name,
  weight: weight,
  price: price,
  imageUrl: `https://placehold.co/300x300/ffedc4/d97706?text=${imageText.replace(/ /g, '+')}`,
});

// Mock Product Data
const ALL_PRODUCTS = [
  // Sweets
  productTemplate(1, 'Sweets', 'Mysore Pak', '500GMS', 250.00, 'Mysore+Pak'),
  productTemplate(2, 'Sweets', 'Kaju Katli', '250GMS', 450.00, 'Kaju+Katli'),
  productTemplate(3, 'Sweets', 'Gulab Jamun', '750GMS', 300.00, 'Gulab+Jamun'),
  // Savouries
  productTemplate(1, 'Savouries', 'Spicy Mixture', '200GMS', 120.00, 'Spicy+Mixture'),
  productTemplate(2, 'Savouries', 'Chakli Murukku', '300GMS', 150.00, 'Chakli+Murukku'),
  // Bakes (From the uploaded image)
  productTemplate(1, 'Bakes', 'Ghee Cake', '75GMS', 50.00, 'Ghee+Cake'),
  productTemplate(2, 'Bakes', 'Bun Butter Jam', '2PC', 60.00, 'Bun+Butter+Jam'),
  productTemplate(3, 'Bakes', 'Jam Roll', '230GMS', 90.00, 'Jam+Roll'),
  productTemplate(4, 'Bakes', 'Salt Cookies', '150GMS', 70.00, 'Salt+Cookies'),
  productTemplate(5, 'Bakes', 'Cup Cake', '50GMS', 48.00, 'Cup+Cake'),
  // Podi & Thokku
  productTemplate(1, 'Podi & Thokku', 'Idli Podi', '150GMS', 180.00, 'Idli+Podi'),
  productTemplate(2, 'Podi & Thokku', 'Tomato Thokku', '200GMS', 220.00, 'Tomato+Thokku'),
  // Gifts
  productTemplate(1, 'Gifts', 'Sweet Sampler Box', '1KG', 999.00, 'Gift+Box'),
  productTemplate(2, 'Gifts', 'Dry Fruit Hamper', '500GMS', 1200.00, 'Dry+Fruit+Hamper'),
];

// List of available categories
const CATEGORIES = ['Sweets', 'Savouries', 'Bakes', 'Podi & Thokku', 'Gifts'];

/**
 * Product Card component
 */
const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleUpdateQuantity = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="relative p-4 bg-yellow-50/50">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-contain transition-transform duration-500 group-hover:scale-105"
        />
        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`absolute top-4 right-4 p-2 rounded-full shadow-md transition-colors duration-200 ${
            isFavorite ? 'text-red-500 bg-white' : 'text-gray-400 bg-white/80 hover:text-red-500'
          }`}
          aria-label="Add to Favorites"
        >
          <Heart className="w-5 h-5 fill-current" />
        </button>
      </div>

      <div className="p-4 text-center">
        <p className="text-sm text-gray-500 mb-1 font-medium">{product.weight}</p>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-2xl font-bold text-red-600 mb-4">
          ₹{product.price.toFixed(2)}
        </p>

        {/* Quantity and Add to Cart */}
        <div className=" justify-center items-center space-x-2 mb-4">
          <div className="flex items-center m-2 border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => handleUpdateQuantity(-1)}
              className="p-2 text-gray-600 hover:bg-gray-100 transition-colors duration-150"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-3 font-semibold text-gray-800 w-10 text-center">{quantity}</span>
            <button
              onClick={() => handleUpdateQuantity(1)}
              className="p-2 text-gray-600 hover:bg-gray-100 transition-colors duration-150"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <button
            className="flex-grow flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 text-sm"
            onClick={() => console.log(`Added ${quantity} x ${product.name} to cart`)}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};


/**
 * Main Shop Component
 */
const Shop = () => {
  // Initialize state with the first category or 'All'
  const [activeCategory, setActiveCategory] = useState('Bakes'); // Defaulting to 'Bakes' based on the image

  // Filter products based on the active category
  const filteredProducts = activeCategory === 'All'
    ? ALL_PRODUCTS
    : ALL_PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-4 sm:p-8 md:p-12">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Categories Products</h1>
        <p className="text-xl text-gray-600">Explore the delicious range </p>
      </header>

      {/* Category Tabs Section */}
      <div className="flex justify-end mb-8">
        <div className="flex space-x-2 sm:space-x-4 p-1 bg-white rounded-full shadow-lg overflow-x-auto">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-semibold rounded-full whitespace-nowrap transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
          {/* Add an "All" option if desired */}
          {/* <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
              activeCategory === 'All'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            All
          </button> */}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full p-12 text-center bg-white rounded-xl shadow-lg">
            <p className="text-xl font-medium text-gray-500">
              No products found in the <span className="font-bold text-red-600">"{activeCategory}"</span> category yet.
            </p>
          </div>
        )}
      </div>

      
    </div>
  );
};

export default Shop;