"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  
  const dropdownRef = useRef(null);
  const router = useRouter();

  // --- AUTH & DROPDOWN LOGIC ---
  useEffect(() => {
    // Check if the user has a valid login cookie on mount
    const loggedIn = Cookies.get("is_logged_in");
    setIsLoggedIn(loggedIn === "true");

    // This closes the profile menu ifclicked anywhere else on the screen
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- CART SYNC LOGIC ---
  useEffect(() => {
    const syncCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      // Sum up all quantities 
      const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(totalItems);
    };

    // Initial check when the page loads
    syncCart();

   
    
    window.addEventListener("cart-updated", syncCart);
    return () => window.removeEventListener("cart-updated", syncCart);
  }, []);

  const handleLogout = () => {
    // Clean up all auth data
    Cookies.remove("is_logged_in");
    Cookies.remove("user_id");
    
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    
    // Send them back to login and force a refresh to clear any stale state
    router.push("/auth");
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
      
      {/* Brand Logo & Nav Links */}
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex items-center justify-center w-9 h-9 font-black text-white text-sm bg-indigo-600 rounded-xl group-hover:rotate-12 transition-transform">
            M
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">MobiStore</span>
        </Link>
        
        <Link href="/products" className="hidden md:block text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
          Browse Mobiles
        </Link>
      </div>

      {/* Right Side: Cart & User Profile */}
      <div className="flex items-center gap-4">
        
        {/* Cart Icon with Dynamic Badge */}
        <Link href="/cart" className="relative p-2.5 text-gray-600 rounded-full hover:bg-gray-50 transition-colors">
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-indigo-600 rounded-full border-2 border-white">
              {cartCount}
            </span>
          )}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </Link>

        {/* User Auth Section */}
        {isLoggedIn ? (
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center hover:bg-gray-200 transition-colors">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-50">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Manage</p>
                </div>
                
                <Link 
                  href="/profile" 
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  My Profile
                </Link>
                
                <Link 
                  href="/orders" 
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  Order History
                </Link>

                <div className="border-t border-gray-50 mt-1">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 font-bold"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link 
            href="/auth" 
            className="px-6 py-2 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}