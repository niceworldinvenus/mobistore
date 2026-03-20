"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function CartPage() {
  const backendUrl = process.env.BACKEND_URL;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const router = useRouter();

  // Verify auth status and load cart from local storage
  useEffect(() => {
    const authStatus = Cookies.get("is_logged_in");
    if (authStatus !== "true") {
      router.push("/auth");
    } else {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setItems(savedCart);
      setLoading(false);
    }
  }, [router]);

  // Adjust product quantity and update persistence
  const updateQty = (id, delta) => {
    const updated = items.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    });
    setItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cart-updated"));
  };

  // Remove item from cart and storage
  const removeItem = (id) => {
    const filtered = items.filter((item) => item.id !== id);
    setItems(filtered);
    localStorage.setItem("cart", JSON.stringify(filtered));
    window.dispatchEvent(new Event("cart-updated"));
  };

  // Calculate order total
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Send checkout payload to backend
 
  const handleCheckout = async () => {
    const userId = Cookies.get("user_id");
    if (!userId) {
      router.push("/auth");
      return;
    }

    const payload = {
      user_id: parseInt(userId),
      total_amount: total,
      items: items.map((item) => ({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    try {
      // Call local API route handler
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Expected data format: { order_id: 123 }
        setOrderId(data.order_id);
        setIsSuccess(true);
        
        // Clear cart and sync navbar
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("cart-updated"));
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Checkout failed");
      }
    } catch (err) {
      console.error("Client fetch error:", err);
      alert("Network error. Check server logs.");
    }
  };

  if (loading) return null;

  // Post-purchase receipt view
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
    
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-indigo-600 p-8 text-center text-white">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-black">Payment Successful!</h1>
            </div>
            <div className="p-8">
              <div className="flex justify-between mb-8 pb-8 border-b">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Order ID</p>
                  <p className="font-mono font-bold">#MS-{orderId}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-400 uppercase">Date</p>
                  <p className="font-bold">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="font-medium text-gray-700">{item.name} (x{item.quantity})</span>
                    <span className="font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 flex justify-between items-center">
                <span className="text-gray-600 font-bold">Total Paid</span>
                <span className="text-3xl font-black text-indigo-600">${total.toFixed(2)}</span>
              </div>
              <div className="flex gap-4 mt-8">
                <button onClick={() => router.push("/orders")} className="cursor-pointer flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100">View Orders</button>
                <button onClick={() => window.print()} className="cursor-pointer px-6 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold">Print</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Shopping cart list view
  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-black text-gray-900 mb-8">My Cart</h1>
        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed">
            <button onClick={() => router.push("/products")} className="cursor-pointer bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold">Shop Now</button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-2xl flex items-center gap-6 border border-gray-100 shadow-sm">
                  <img src={`/m-images/id-${item.id}.webp`} className="w-24 h-24 object-contain" alt={item.name} />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <div className="flex items-center gap-3 mt-3">
                      <button onClick={() => updateQty(item.id, -1)} className="cursor-pointer w-8 h-8 rounded-lg bg-gray-100 font-bold hover:bg-gray-200 transition-colors">-</button>
                      <span className="font-bold">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="cursor-pointer w-8 h-8 rounded-lg bg-gray-100 font-bold hover:bg-gray-200 transition-colors">+</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-indigo-600">${(item.price * item.quantity).toFixed(2)}</p>
                    <button onClick={() => removeItem(item.id)} className="cursor-pointer text-xs text-rose-500 font-bold mt-2 hover:underline">Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white p-6 rounded-3xl h-fit shadow-xl border border-gray-50">
              <h2 className="text-xl font-bold mb-6">Summary</h2>
              <div className="flex justify-between mb-4 text-gray-500"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
              <div className="flex justify-between mb-6 border-t pt-4"><span className="text-lg font-bold text-gray-900">Total</span><span className="text-2xl font-black text-indigo-600">${total.toFixed(2)}</span></div>
              <button onClick={handleCheckout} className="cursor-pointer w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 active:scale-95 transition-all">Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}