"use client";




export default function ReturnsPolicy() {
  return (
    <div className="min-h-screen bg-white">
 
      
      <main className="max-w-4xl mx-auto px-6 py-20">
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Returns & Refunds</h1>
          <p className="text-gray-500">Last updated: March 18, 2026</p>
        </header>

        <div className="space-y-12">
          
          {/* Section: Return Window */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Return Window</h2>
            <p className="text-gray-600 leading-relaxed">
              MobiStore offers a <span className="font-bold text-gray-900">30-day return policy</span>. Requests for returns must be initiated within 30 days of the delivery date. If 30 days have passed since the purchase was delivered, a refund or exchange cannot be offered.
            </p>
          </section>

          {/* Section: Eligibility */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Eligibility for Returns</h2>
            <div className="prose prose-indigo text-gray-600">
              <p>To qualify for a return, the item must meet the following criteria:</p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>Device must be in the same condition as received.</li>
                <li>Device must be unworn or unused.</li>
                <li>Original tags and packaging must be intact.</li>
                <li>Proof of purchase (receipt or order number) is mandatory.</li>
              </ul>
            </div>
          </section>

          {/* Section: Non-Returnable Items */}
          <section className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Non-Returnable Items</h2>
            <p className="text-gray-600 text-sm">
              Certain types of items cannot be returned, including:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 text-sm text-gray-500 font-medium">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                Downloadable software products
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                Gift cards
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                Personalized/Customized devices
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                Items on final clearance
              </li>
            </ul>
          </section>

          {/* Section: Refund Process */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Refund Process</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Once the return is received and inspected, an email notification regarding the approval or rejection of the refund will be sent.
              </p>
              <p>
                If approved, the refund will be processed and a credit will automatically be applied to the original method of payment within <span className="font-bold text-gray-900">7-10 business days</span>.
              </p>
            </div>
          </section>

          {/* Section: Shipping Costs */}
          <section className="bg-rose-50 p-8 rounded-3xl border border-rose-100">
            <h2 className="text-xl font-bold text-rose-900 mb-4">5. Return Shipping</h2>
            <p className="text-rose-800 leading-relaxed text-sm">
              Customers are responsible for paying for the shipping costs for returning items. Shipping costs are non-refundable. If a refund is issued, the cost of return shipping will be deducted from the final refund amount.
            </p>
          </section>

          {/* Section: Contact */}
          <section className="text-center py-12 border-t border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 mb-4">Need help?</h2>
            <p className="text-gray-500 mb-6">Contact the support team for questions related to refunds and returns.</p>
            <button 
              onClick={() => window.location.href = 'mailto:support@mobistore.com'}
              className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-100"
            >
              Contact Support
            </button>
          </section>

        </div>
      </main>

     
    </div>
  );
}