"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = Cookies.get("is_logged_in");

    if (isLoggedIn !== "true") {
      router.push("/auth"); 
    } else {
      // Fetch user data
      fetch("/api/user")
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
   
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Cover Header */}
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
          
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-6">
              {/* Profile Avatar */}
              <div className="w-24 h-24 bg-white rounded-2xl shadow-md p-1">
                <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all">
                Edit Profile
              </button>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
                <p className="text-gray-500">Member since {new Date(user?.joined_at).toLocaleDateString()}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-50">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                  <p className="text-gray-900 font-medium mt-1">{user?.email}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Account Status</label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <p className="text-gray-900 font-medium">Verified User</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {['My Orders', 'Address Book', 'Wishlist'].map((item) => (
            <div key={item} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-all cursor-pointer">
              <p className="font-bold text-gray-900">{item}</p>
              <p className="text-sm text-gray-500 mt-1">Manage your {item.toLowerCase()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}