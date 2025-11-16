import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

// --- SLIDE DATA ---
// NOTE: Using placehold.co for image placeholders.
const slides = [
  {
    title: "Welcome Best Sweets",
    subtitle: "Wide varieties of traditional sweets and delicacies. Explore the deliciousness that awaits you!",
    buttonText: "Shop Sweets",
    bgImageUrl: "https://tse3.mm.bing.net/th/id/OIP.mZc62RWBg-r7nJuoYpgxmgHaDe?pid=Api&P=0&h=180",
    productImageUrl: "https://cdn.pixabay.com/photo/2025/04/17/06/00/how-to-create-new-colour-9539269_1280.jpg",
    productAlt: "Gulab Jamun",
    productTextColor: 'text-amber-500',
  },
  {
    title: "Crispy & Flavorful Savories",
    subtitle: "Experience the irresistible crunch of our traditional South Indian snacks. Perfect for tea time!",
    buttonText: "Explore Savories",
    bgImageUrl: "https://tse1.mm.bing.net/th/id/OIP.0GMSA2X4GUtWkAZSrlWHKgHaEK?pid=Api&P=0&h=180",
    productImageUrl: "https://cdn.pixabay.com/photo/2024/03/17/01/56/ai-generated-8638164_1280.png",
    productAlt: "Siwaye",
    productTextColor: 'text-emerald-500',
  },
  {
    title: "Authentic Podi & Thokku",
    subtitle: "Add a punch of homemade flavor to your meals with our spice mixes and flavorful pickles.",
    buttonText: "Discover Podis",
    bgImageUrl: "https://tse4.mm.bing.net/th/id/OIP.RJAqe-XfdDTdh_1BR2JDGQHaEo?pid=Api&P=0&h=180",
    productImageUrl: "https://img.freepik.com/premium-photo/indulgent-chocolate-cake-presentation-tempting-treat-plate_1000124-6715.jpg",
    productAlt: "Cake",
    productTextColor: 'text-gray-400',
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const currentSlide = slides[currentIndex];
  const totalSlides = slides.length;

  // Function to handle moving to the next slide
  const handleNext = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
      setFade(false);
    }, 300); // Match this duration to the transition duration
  };

  // Function to handle moving to the previous slide
  const handlePrev = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
      setFade(false);
    }, 300); // Match this duration to the transition duration
  };

  // Optional: Auto-slide feature
  useEffect(() => {
    const slideInterval = setInterval(handleNext, 8000); // Change slide every 8 seconds
    return () => clearInterval(slideInterval);
  }, [currentIndex]); // Restart interval when currentIndex changes

  return (
    <div className="relative w-full h-[730px] overflow-hidden rounded-xl shadow-2xl bg-gray-900">
      {/* Background Image Container */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 bg-cover bg-center"
        style={{ backgroundImage: `url(${currentSlide.bgImageUrl})` }}
      >
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Content and Arrows Container */}
      <div className="relative z-10 h-full flex items-center justify-between p-4 sm:p-8 md:p-12">
        
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          className="p-3 bg-white/30 hover:bg-white/50 text-white rounded-full transition-all duration-300 backdrop-blur-sm shadow-lg focus:outline-none z-20"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Hero Content (Product Image and Text) */}
        <div 
          className={`flex flex-col md:flex-row items-center justify-center w-full max-w-7xl mx-auto 
          transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}
        >
          
          {/* Product Image Section (Left side on desktop) */}
          <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
              <img
                src={currentSlide.productImageUrl}
                alt={currentSlide.productAlt}
                className="w-full h-full object-cover rounded-full shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-transform duration-500 hover:scale-[1.02]"
                onError={(e) => {
                    // Fallback to a plain colored circle if the placeholder fails
                    e.target.style.display = 'none';
                    const parent = e.target.parentElement;
                    parent.innerHTML = `<div class="w-full h-full rounded-full ${currentSlide.productTextColor} bg-white/20 flex items-center justify-center border-4 border-white/70">
                                            <ShoppingCart size={80} />
                                        </div>`;
                }}
              />
              <div className={`absolute -bottom-2 -right-2 text-sm font-semibold p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-xl ${currentSlide.productTextColor}`}>
                 {currentSlide.productAlt.split(' ')[0]}
              </div>
            </div>
          </div>

          {/* Text Content Section (Right side on desktop) */}
          <div className="md:w-1/2 text-center md:text-left p-4">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-4 leading-tight">
              {currentSlide.title}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 mb-8 font-light max-w-md md:max-w-none mx-auto md:mx-0">
              {currentSlide.subtitle}
            </p>
            <button className="flex items-center justify-center md:justify-start mx-auto md:mx-0 px-8 py-3 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105">
              <ShoppingCart className="mr-2 w-5 h-5" />
              {currentSlide.buttonText}
            </button>
          </div>

        </div>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          className="p-3 bg-white/30 hover:bg-white/50 text-white rounded-full transition-all duration-300 backdrop-blur-sm shadow-lg focus:outline-none z-20"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      
      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
                setFade(true);
                setTimeout(() => {
                    setCurrentIndex(index);
                    setFade(false);
                }, 300);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-red-600 w-6' : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;