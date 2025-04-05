// components/HowItWorks.tsx

import React from "react";
import { BookOpen, Search, ShoppingCart, ShieldCheck, SendHorizonal } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="h-8 w-8 text-blue-600" />,
      title: "Browse Used Books",
      description:
        "Search thousands of second-hand books listed by genuine sellers near you.",
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-green-600" />,
      title: "Choose & Connect",
      description:
        "Select the book you want and connect directly with the seller via our platform.",
    },
    {
      icon: <SendHorizonal className="h-8 w-8 text-yellow-600" />,
      title: "Negotiate & Finalize",
      description:
        "Chat, negotiate the price, and finalize your purchase securely.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-purple-600" />,
      title: "Secure Platform",
      description:
        "We ensure a secure and spam-free environment for both buyers and sellers.",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-red-600" />,
      title: "Happy Reading!",
      description:
        "Get your book, save money, and promote sustainable reading.",
    },
  ];

  return (
    <section className="bg-white py-16" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          BookKart connects book buyers and sellers through a safe, simple, and seamless platform.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 bg-gray-50"
            >
              <div className="mb-4 flex justify-center">{step.icon}</div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                {step.title}
              </h4>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
