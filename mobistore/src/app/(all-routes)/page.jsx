"use client";


import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export default function Home() {
 
  const mobiles = [
    { id: 1, name: "iPhone 16 Pro Max", brand: "Apple", ram_gb: 8, storage_gb: 256, price: 1199 },
    { id: 2, name: "iPhone 16 Pro", brand: "Apple", ram_gb: 8, storage_gb: 128, price: 999 },
    { id: 3, name: "iPhone 16 Plus", brand: "Apple", ram_gb: 12, storage_gb: 128, price: 899 },
    { id: 4, name: "iPhone 15", brand: "Apple", ram_gb: 16, storage_gb: 512, price: 799 },
  ];

  return (
    <div className="min-h-screen bg-white">
     
      
      {/* Hero Section */}
      <header className="px-6 py-12 md:py-20 max-w-7xl mx-auto">
        <div className="relative bg-indigo-50 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between overflow-hidden">
          <div className="max-w-xl text-center md:text-left z-10">
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
              The Future of <span className="text-indigo-600">Mobile</span> is Here.
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              Explore the latest smartphones from top brands with flagship performance and professional cameras.
            </p>
            
            <Link href="/products" className="inline-block mt-8">
              <div className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95">
                Shop All Deals
              </div>
            </Link>
          </div>

          {/* Abstract Hero Background Decoration */}
          <div className="mt-12 md:mt-0 w-64 h-64 bg-indigo-200 rounded-full blur-3xl opacity-50 absolute right-10 top-1/2 -translate-y-1/2"></div>
        </div>
      </header>

      {/* Product List Section */}
      <section className="px-6 pb-20 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-gray-900">Featured Smartphones</h2>
          <Link 
            href="/products" 
            className="text-indigo-600 font-semibold text-sm hover:underline"
          >
            View All
          </Link>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mobiles.map((phone) => (
            <ProductCard key={phone.id} product={phone} />
          ))}
        </div>
      </section>
    </div>
  );
}