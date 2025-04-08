"use client";

import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const params = useParams();
  const id = params.id;

  const [selectedImage, setSelectedImage] = useState(0);

  const book = {
    _id: "1",
    images: [
      "https://m.media-amazon.com/images/I/61PIpidSThL.jpg",
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1556036622i/44525305.jpg",
    ],
    title: "The Alchemist",
    category: "Reading Books (Novels)",
    condition: "Excellent",
    classType: "B.Com",
    subject: "Fiction",
    price: 300,
    author: "Paulo Coelho",
    edition: "25th Anniversary Edition",
    description:
      "A magical fable about following your dreams. The story of Santiago’s journey is packed with wisdom and inspiration.",
    finalPrice: 250,
    shippingCharge: 50,
    paymentMode: "UPI",
    paymentDetails: {
      upiId: "example@upi",
    },
    createdAt: new Date("2024-01-01"),
    seller: {
      name: "John Doe",
      contact: "1234567890",
    },
  };

  const calculateDiscount = (price: number, finalPrice: number) => {
    return price > finalPrice ? Math.round(((price - finalPrice) / price) * 100) : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-20">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:underline">Home</Link> /
        <Link href="/books" className="hover:underline ml-1">Books</Link> /
        <span className="ml-1 text-black">{book.title}</span>
      </div>

      {/* Layout */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Images */}
        <div className="md:w-1/2 space-y-4">
          <div className="relative w-full h-[450px] border rounded-xl overflow-hidden shadow">
            <Image
              src={book.images[selectedImage]}
              alt={book.title}
              fill
              className="object-contain"
            />
            {calculateDiscount(book.price, book.finalPrice) > 0 && (
              <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 text-sm rounded">
                {calculateDiscount(book.price, book.finalPrice)}% OFF
              </div>
            )}
          </div>
          <div className="flex gap-3">
            {book.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`border rounded-xl w-20 h-20 overflow-hidden ${selectedImage === i ? "ring-2 ring-blue-500" : "border-gray-300"}`}
              >
                <Image src={img} alt={`img-${i}`} width={80} height={80} className="object-contain w-full h-full" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{book.title}</h1>
          <p className="text-sm text-gray-500">{book.category}</p>

          {/* Pricing */}
          <div className="text-2xl font-semibold text-green-600">
            ₹{book.finalPrice}
            {book.price > book.finalPrice && (
              <span className="text-gray-400 text-lg line-through ml-3">₹{book.price}</span>
            )}
          </div>

          <div className="text-sm text-gray-600">
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Edition:</strong> {book.edition}</p>
            <p><strong>Condition:</strong> {book.condition}</p>
            <p><strong>Class:</strong> {book.classType}</p>
            <p><strong>Subject:</strong> {book.subject}</p>
            <p><strong>Shipping:</strong> ₹{book.shippingCharge}</p>
            <p><strong>Payment:</strong> {book.paymentMode} ({book.paymentDetails.upiId})</p>
          </div>

          {/* Description */}
          <div className="text-gray-700 leading-relaxed">
            {book.description}
          </div>

          {/* Seller Info */}
          <div className="bg-gray-100 rounded-xl p-4 text-sm">
            <p><strong>Seller:</strong> {book.seller.name}</p>
            <p><strong>Contact:</strong> {book.seller.contact}</p>
            <p><strong>Posted:</strong> {formatDistanceToNow(book.createdAt, { addSuffix: true })}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium">
              Add to Cart
            </button>
            <button className="border border-gray-400 text-gray-700 hover:bg-gray-100 px-5 py-2 rounded-lg font-medium">
              Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
