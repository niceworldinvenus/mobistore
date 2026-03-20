"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

import ProductCard from '@/components/ProductCard';

export default function ProductsPage() {
  const [mobiles, setMobiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  
  const observer = useRef(null);

  // Intersection Observer Logic for Infinite Scroll
  const lastElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setSkip(prevSkip => prevSkip + 10);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // Data Fetching Logic
  useEffect(() => {
    const fetchMobiles = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/products?skip=${skip}&limit=10`);
        const data = await response.json();

        if (Array.isArray(data)) {
        
          if (data.length < 10) {
            setHasMore(false);
          }

          setMobiles(prev => {
            
          
            const existingIds = new Set(prev.map(p => p.id));
          
            const uniqueNewItems = data.filter(item => !existingIds.has(item.id));
            
            return [...prev, ...uniqueNewItems];
          });
        } else {
          console.error("API Error: Received non-array data", data);
          setHasMore(false);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMobiles();
  }, [skip]);

  return (
    <div className="min-h-screen bg-gray-50">

      
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            All Mobiles
          </h1>
          <p className="text-gray-500 mt-2">
            Showing the latest flagships and budget-friendly smartphones.
          </p>
        </header>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mobiles.map((phone) => (
            <ProductCard key={phone.id} product={phone} />
          ))}
        </div>

        {/* Loading / Sentinel State */}
        <div 
          ref={lastElementRef} 
          className="mt-16 py-10 flex flex-col items-center justify-center border-t border-gray-100"
        >
          {loading && (
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-100 border-t-indigo-600"></div>
              <p className="text-sm font-medium text-gray-500">Loading more mobiles...</p>
            </div>
          )}

          {!hasMore && mobiles.length > 0 && (
            <div className="text-center">
              <div className="inline-block px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
                <p className="text-sm font-bold text-gray-400">
                  ✨ You've seen all our products
                </p>
              </div>
            </div>
          )}
          
          {mobiles.length === 0 && !loading && (
            <p className="text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}