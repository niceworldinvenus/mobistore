"use client";




export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-white">
 
      
      <main className="max-w-4xl mx-auto px-6 py-20">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Shipping Policy</h1>
          <p className="text-gray-500">Last updated: March 18, 2026</p>
        </header>

        <div className="space-y-12">
          
          {/* Section: Processing Times */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Shipment Processing Time</h2>
            <div className="prose prose-indigo text-gray-600">
              <p>
                All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.
              </p>
              <p className="mt-2">
                If MobiStore is experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery. In case of significant delays, contact will be made via email.
              </p>
            </div>
          </section>

          {/* Section: Rates & Estimates */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Shipping Rates & Delivery Estimates</h2>
            <div className="overflow-x-auto border border-gray-100 rounded-2xl">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="px-6 py-4">Shipping Method</th>
                    <th className="px-6 py-4">Estimated Delivery</th>
                    <th className="px-6 py-4">Shipping Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Standard</td>
                    <td className="px-6 py-4 text-gray-600">3-5 Business Days</td>
                    <td className="px-6 py-4 text-indigo-600 font-bold">Free</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Express</td>
                    <td className="px-6 py-4 text-gray-600">1-2 Business Days</td>
                    <td className="px-6 py-4 text-gray-900 font-bold">$15.00</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Overnight</td>
                    <td className="px-6 py-4 text-gray-600">Next Business Day</td>
                    <td className="px-6 py-4 text-gray-900 font-bold">$25.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section: Confirmation & Tracking */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Shipment Confirmation & Tracking</h2>
            <p className="text-gray-600 leading-relaxed">
              A Shipment Confirmation email containing tracking numbers will be sent once the order has shipped. Tracking numbers will be active within 24 hours of shipment.
            </p>
          </section>

          {/* Section: Customs & Duties */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Customs, Duties, and Taxes</h2>
            <p className="text-gray-600 leading-relaxed">
              MobiStore is not responsible for any customs and taxes applied to the order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).
            </p>
          </section>

          {/* Section: Damages */}
          <section className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100">
            <h2 className="text-xl font-bold text-indigo-900 mb-4">5. Damages & Issues</h2>
            <p className="text-indigo-800 leading-relaxed">
              MobiStore is not liable for any products damaged or lost during shipping. If the order is received damaged, please contact the shipment carrier to file a claim. Save all packaging materials and damaged goods before filing a claim.
            </p>
          </section>

        </div>
      </main>

  
    </div>
  );
}