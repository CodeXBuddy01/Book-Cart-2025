"use client";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const params = useParams();
  const id = params.id;
  const [selectedImage, setSelectedImage] = useState(0);
  const router = useRouter();
  const [isAddToCart, setIsAddToCart] = useState(false);

  const book = {
    _id: "1",
    images: [
      'https://m.media-amazon.com/images/I/61PIpidSThL.jpg',
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1556036622i/44525305.jpg'
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
      "A philosophical book about a shepherd's journey to realize his dreams.",
    finalPrice: 250,
    shippingCharge: 50,
    paymentMode: "UPI",
    paymentDetails: {
      upiId: "example@upi",
    },
    createdAt: new Date("2024-01-01"),
    seller: { name: "John Doe", contact: "1234567890" },
  };

  const handleAddToCart = {};

  const handleAddToWishlist = {};

  const bookImage = book?.images || [];

  const calculateDiscount = (price: number, finalPrice: number): number => {
    if (price > finalPrice && price > 0) {
      return Math.round(((price - finalPrice) / price) * 100);
    }
    return 0;
  };

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div>
      <div>
        <nav>
          <Link href="/"> Home </Link>
          <span>/</span>
          <Link href="/books">Books</Link>
          <span>/</span>
          <span>{book.category}</span>
          <span>/</span>
          <span>{book.title}</span>
        </nav>

        <div>
          <div>
            <div>
              <Image
              src={bookImage[selectedImage]}
              alt={book.title}
              fill
               />
               {calculateDiscount(book.price, book.finalPrice) > 0 && (
                <span>
                  {calculateDiscount(book.price, book.finalPrice)}% off
                </span>
               )}
            </div>

            <div>
              {bookImage.map((images, index) => (
                <button
                key={index}
                onClick={() => setSelectedImage(index)}
                >
                  <Image
                  src={images}
                  alt={`${book.title} ${index+1}`}
                  fill
                   />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
