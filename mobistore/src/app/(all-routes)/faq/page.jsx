"use client";

import { useState } from "react";


export default function FAQPage() {
  // Manage accordion state with index tracking
  const [openIndex, setOpenIndex] = useState(null);

  // FAQ data source
  const faqs = [
    {
      question: "How can I track my order?",
      answer: "Once the order is shipped, a confirmation email with a tracking number is sent. Use this number on the 'My Orders' page or the carrier's website to monitor delivery progress."
    },
    {
      question: "What payment methods are accepted?",
      answer: "MobiStore currently supports all major credit cards (Visa, MasterCard, American Express) and digital wallets. Secure payment processing is handled via encrypted gateways."
    },
    {
      question: "Do devices come with a warranty?",
      answer: "All flagship devices include a 1-year manufacturer warranty covering hardware defects. Extended MobiCare protection plans are available at checkout."
    },
    {
      question: "Can I change my shipping address after placing an order?",
      answer: "Address modifications are only possible if the order has not entered the processing stage (usually within 2 hours of placement). Contact support immediately for urgent changes."
    },
    {
      question: "Is international shipping available?",
      answer: "Yes, MobiStore ships to over 50 countries. Shipping rates and delivery times vary by region. Detailed information is available on the Shipping Policy page."
    },
    {
      question: "What happens if a device arrives damaged?",
      answer: "Inspect the package upon arrival. If damage is visible, document the condition with photos and contact support within 24 hours to initiate a replacement claim."
    }
  ];

  // Toggle accordion visibility
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
 

      <main className="max-w-3xl mx-auto px-6 py-20">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-black text-gray-900 mb-4">FAQs</h1>
          <p className="text-gray-500">Find quick answers to common questions about MobiStore.</p>
        </header>

        {/* Accordion Container */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border rounded-2xl transition-all duration-200 ${
                openIndex === index ? 'border-indigo-600 bg-indigo-50/30' : 'border-gray-100 bg-white'
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`font-bold transition-colors ${
                  openIndex === index ? 'text-indigo-600' : 'text-gray-900'
                }`}>
                  {faq.question}
                </span>
                <svg 
                  className={`w-5 h-5 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180 text-indigo-600' : 'text-gray-400'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Content Panel */}
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-600 leading-relaxed text-sm">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <section className="mt-20 p-10 bg-gray-900 rounded-[2.5rem] text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
          <p className="text-gray-400 mb-8 text-sm">Support team is available 24/7 to assist with technical or order issues.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all">
              Chat with Support
            </button>
            <button className="px-8 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all">
              Email Us
            </button>
          </div>
        </section>
      </main>

   
    </div>
  );
}