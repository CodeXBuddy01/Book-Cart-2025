"use client";

import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const params = useParams();
  const id = params.id;

  const [selectedImage, setSelectedImage] = useState(0);

  const book = {
    _id: "1",
    images: [
      "https://m.media-amazon.com/images/I/61PIpidSThL.jpg",
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1556036622i/44525305.jpg",
    ],
    title: "The Lean Startup",
    category: "Business & Startup Books",
    condition: "Excellent",
    classType: "M.Tech",
    subject: "Entrepreneurship",
    price: 299,
    finalPrice: 250,
    edition: "2015",
    author: "Eric Ries",
    description: "The Lean Startup teaches a systematic, scientific approach for creating and managing successful startups in an age when companies must innovate more than ever.",
    shippingCharge: 0,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    seller: {
      name: "Rakesh Kumar",
      location: "Ghaziabad, UP",
      isVerified: true,
    },
  };

  const discount = book.price > book.finalPrice
    ? Math.round(((book.price - book.finalPrice) / book.price) * 100)
    : 0;

  return (
    <div className="bg-gray-50 min-h-screen px-4 md:px-16 py-10">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:underline">Home</Link> / 
        <Link href="/books" className="hover:underline ml-1">Books</Link> /
        <span className="ml-1 text-black font-medium">{book.title}</span>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-lg rounded-xl p-6">
        {/* Images */}
        <div>
          <div className="relative w-full h-[420px] border rounded-lg overflow-hidden">
            <Image
              src={book.images[selectedImage]}
              alt={book.title}
              fill
              className="object-contain"
            />
            {discount > 0 && (
              <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
                {discount}% OFF
              </span>
            )}
          </div>

          <div className="flex gap-2 mt-4">
            {book.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-16 h-16 border rounded-md overflow-hidden ${selectedImage === i ? 'ring-2 ring-blue-500' : 'border-gray-300'}`}
              >
                <Image src={img} alt={`thumb-${i}`} width={64} height={64} className="object-cover w-full h-full" />
              </button>
            ))}
          </div>
        </div>

        {/* Book Info */}
        <div className="flex flex-col justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">{book.title}</h1>
            <p className="text-sm text-gray-500">Posted {formatDistanceToNow(book.createdAt, { addSuffix: true })}</p>

            <div className="text-green-600 text-2xl font-semibold mt-2">
              ₹{book.finalPrice}
              {discount > 0 && (
                <span className="text-gray-400 line-through ml-3 text-lg">₹{book.price}</span>
              )}
            </div>

            <div className="mt-4 space-y-1 text-sm text-gray-700">
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Edition:</strong> {book.edition}</p>
              <p><strong>Condition:</strong> {book.condition}</p>
              <p><strong>Category:</strong> {book.category}</p>
              <p><strong>Course:</strong> {book.classType}</p>
              <p><strong>Subject:</strong> {book.subject}</p>
              <p><strong>Shipping:</strong> Free Delivery</p>
            </div>

            <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow">
              🛒 Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Description & Seller Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-2">📘 Description</h2>
          <p className="text-sm text-gray-700">{book.description}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-3">👤 Seller Info</h2>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-semibold text-blue-600">
              {book.seller.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium">{book.seller.name}
                {book.seller.isVerified && (
                  <span className="text-green-600 text-xs bg-green-100 px-2 py-0.5 ml-2 rounded-full">✔ Verified</span>
                )}
              </p>
              <p className="text-sm text-gray-500">{book.seller.location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="mt-10 bg-blue-50 p-6 rounded-lg text-center shadow-sm">
        <h3 className="text-xl font-semibold mb-2 text-blue-700">🌟 Our Community</h3>
        <p className="text-sm text-gray-600">
          We’re not just a book-selling site. We’re a community of students and readers who support each other with budget-friendly knowledge!
        </p>
        <p className="mt-2 text-xs text-gray-500">Ad ID: #67e508f5 • Posted {formatDistanceToNow(book.createdAt)} ago</p>
      </div>
    </div>
  );
};

export default Page;
