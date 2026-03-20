"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const backendUrl = process.env.BACKEND_URL;

  const handleDownloadInvoice = (order) => {
    //  Initialize jsPDF
    const doc = new jsPDF();
    
    // Header / Branding
    doc.setFontSize(22);
    doc.setTextColor(79, 70, 229); // MobiStore Indigo
    doc.text("MobiStore Invoice", 14, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Order ID: #MS-${order.id}`, 14, 30);
    doc.text(`Date: ${order.created_at}`, 14, 35);
    doc.text(`Status: ${order.status}`, 14, 40);

    // Table Data
    const tableData = order.items.map(item => [
      `Product ID: ${item.product_id}`,
      item.quantity,
      `$${item.price.toFixed(2)}`,
      `$${(item.price * item.quantity).toFixed(2)}`
    ]);

    //  Generate Table
    autoTable(doc, {
      startY: 50,
      head: [['Product Info', 'Qty', 'Unit Price', 'Subtotal']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [79, 70, 229] },
      margin: { left: 14, right: 14 }
    });


    const finalY = doc.lastAutoTable.finalY + 15;
    
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.text(`Total Amount Paid: $${order.total_amount.toFixed(2)}`, 120, finalY);

    //  Save File
    doc.save(`MobiStore_Order_#${order.id}.pdf`);
  };

  useEffect(() => {
    const isLoggedIn = Cookies.get("is_logged_in");
    const userId = Cookies.get("user_id");

    if (isLoggedIn !== "true" || !userId) {
      router.push("/auth");
      return;
    }

    const fetchOrders = async () => {
      try {
      
        const response = await fetch(`/api/orders?userId=${userId}`);
        
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error("Response not OK");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
   

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black">Order History</h1>
          <span className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold">
            {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
          </span>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-500 font-medium">Retrieving your purchases...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center border border-gray-100 shadow-sm">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">No orders yet</h2>
            <p className="text-gray-500 mt-2 mb-6">You haven't placed any orders yet.</p>
            <button onClick={() => router.push("/products")} className="cursor-pointer bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold">
              Browse Products
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                
                <div className="bg-gray-50/50 px-6 py-4 flex flex-wrap justify-between items-center gap-4 border-b border-gray-100">
                  <div className="flex gap-6">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Order ID</p>
                      <p className="text-sm font-mono font-bold">#MS-{order.id}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Placed On</p>
                      <p className="text-sm font-semibold">{order.created_at}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                    order.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {order.status}
                  </span>
                </div>

                <div className="p-6">
                  <div className="divide-y divide-gray-50">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-4 flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                             <img 
                               src={`/m-images/id-${item.product_id}.webp`} 
                               className="w-8 h-8 object-contain"
                               onError={(e) => e.target.src = 'https://via.placeholder.com/50'}
                               alt="Product"
                             />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">Product ID: {item.product_id}</p>
                            <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-bold text-gray-900">${item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
                    <button 
                      onClick={() => handleDownloadInvoice(order)} 
                      className="cursor-pointer text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
                    >
                      Download Invoice
                    </button>
                    <div className="text-right">
                      <p className="text-xs font-bold text-gray-400 uppercase">Total Paid</p>
                      <p className="text-2xl font-black text-indigo-600">${order.total_amount.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}