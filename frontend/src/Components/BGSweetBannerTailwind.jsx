import React from 'react';
import sweetsImage from '../assets/img.jpg';


// NOTE: You must replace 'path/to/your/sweets-image.jpg' with the actual path
// where you store the image in your project.
// const sweetsImage = './assets/img.png';
//const logoImage = './assets/img.png';
 // Assuming a separate path for the circular logo

const BGSweetBannerTailwind = () => {
  return (
    <div className="flex justify-center p-12">
      {/* Main Banner Container: 
        - 'group' class is essential to enable 'group-hover' utilities on children.
        - 'bg-gradient-to-r' creates the red/orange background.
        - 'shadow-xl' for initial depth.
        - 'transition-all duration-500' for smooth effect.
        - 'hover:shadow-[0_0_35px_10px_rgba(255,165,0,0.7)]' is a custom utility 
          to create the strong orange glow on hover (Lighting effect).
      */}
      <div 
        className="group flex items-center w-full max-w-8xl h-80 rounded-xl overflow-hidden 
                   bg-gradient-to-r from-red-900 via-red-700 to-red-900 
                   shadow-xl transition-all duration-500 ease-in-out 
                   hover:scale-[1.01] hover:shadow-[0_0_35px_10px_rgba(255,165,0,0.7),_0_4px_20px_rgba(0,0,0,0.6)]"
      >
        
        {/* --- Left Side: Sweet Image and Logo (Occupies approx 40%) --- */}
        {/* We use the image directly and position the logo absolutely on top */}
        <div className="relative w-2/5 h-full">
       <img 
    src={sweetsImage} 
    className="w-full h-full object-cover scale-x-[-1]" 
    alt="Sweets"
  />

          {/* Circular Logo - positioned based on the original image layout */}
          {/* <div className="absolute top-4 left-1/3 p-2 bg-white rounded-full shadow-lg">
             <img src={logoImage} alt="BG Naidu Logo" className="w-16 h-16 object-contain" />
          </div> */}
        </div>

        {/* --- Right Side: Text and Button (Occupies approx 60%) --- */}
        <div className="w-3/5 p-10 text-white text-left">
          <h1 className="text-4xl font-extrabold mb-3 leading-tight">
            Bring Home the Sweetness <br /> of <span className="text-amber-200">Sweet treats!</span>
          </h1>
          <p className="text-base font-light mb-6">
            Lovingly Handcrafted, Our Elegant Confections Await Your Treat. Place Your Order by 6 PM for Same-Day Delivery in Trichy and Delight in the Timeless Tradition of Freshness.
          </p>
          
          {/* Shop Now Button - Uses a bright gradient */}
          <a
            href="#shop"
            className="inline-block py-3 px-8 rounded-lg text-lg font-semibold text-white 
                       bg-gradient-to-r from-pink-500 to-orange-500 
                       hover:from-pink-400 hover:to-orange-400 
                       transition-all duration-300 ease-out 
                       shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            role="button"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default BGSweetBannerTailwind;