"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function ProductCard({ product }) {
  const router = useRouter();

  const handleAddToCart = () => {
    // 1. Check user is signed in using cookie
    const isLoggedIn = Cookies.get("is_logged_in");

    if (isLoggedIn !== "true") {
      // Redirect to auth if not logged 
      alert("Please sign in to add items to your cart!");
      router.push("/auth");
      return;
    }

    // 2. Get existing cart from localStorage or start with empty array
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // 3. Check if product is already in the cart
    const itemIndex = existingCart.findIndex((item) => item.id === product.id);

    if (itemIndex > -1) {
      // If  exists, just increase the quantity
      existingCart[itemIndex].quantity += 1;
    } else {
      // If it's new, add the product with quantity 1
      existingCart.push({ ...product, quantity: 1 });
    }

    // 4. Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));

  
    window.dispatchEvent(new Event("cart-updated"));
    
    // Optional: Small feedback for the user
    console.log(`${product.name} added to cart!`);
  };

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-xl transition-all duration-300">
      
      {/* Image Container */}
      <div className="aspect-square bg-gray-50 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
        <img 
          src={`/m-images/id-${product.id}.webp`} 
          alt={product.name}
          className="w-40 h-40 object-contain group-hover:scale-110 transition-transform"
          onError={(e) => { 
            e.currentTarget.src = 'https://via.placeholder.com/150?text=Mobile'; 
          }}
        />
      </div>
      
      {/* Product Info */}
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
          {product.brand}
        </span>
        <h3 className="font-semibold text-gray-900 truncate">
          {product.name}
        </h3>
        
        {/* Specs Badges */}
        <div className="flex gap-2 py-2">
          <div className="text-[10px] px-2 py-1 bg-gray-100 rounded text-gray-600 font-medium">
            {product.ram_gb}GB RAM
          </div>
          <div className="text-[10px] px-2 py-1 bg-gray-100 rounded text-gray-600 font-medium">
            {product.storage_gb}GB Storage
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>
          <button 
            onClick={handleAddToCart} 
            className="cursor-pointer p-2 bg-gray-900 text-white rounded-lg hover:bg-indigo-600 active:scale-90 transition-all"
            title="Add to Cart"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 4v16m8-8H4" 
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}