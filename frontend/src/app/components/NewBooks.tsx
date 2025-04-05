'use client'

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { books } from '@/lib/Constant'
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const NewBooks = () => {
    const [currentBookSlide, setCurrentBookSlide] = useState(0);

      useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBookSlide((prev) => (prev + 1) % 3);
        }, 5000);
        return () => clearInterval(timer);
      }, []);

      const prevSlide = () => {
        setCurrentBookSlide((prev) => prev === 0? books.length - 1 : prev - 1);
      }

      const nextSlide = () => {
        setCurrentBookSlide((prev) => (prev + 1) % books.length);
      }

      const calculateDiscount = (price:number, finalPrice:number) :number => {
        if(price > finalPrice && price > 0) {
            return Math.round(((price - finalPrice)/price)* 100)
        }
        return 0;
      }

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 dark:text-white mb-16">
        📚 <span className="text-orange-600">Newly Added Books</span>
      </h2>
  
      {books.length > 0 ? (
        <>
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentBookSlide * 100}%)` }}
            >
              {[0, 1, 2].map((slideIndex) => (
                <div key={slideIndex} className="min-w-full flex justify-center gap-10">
                  {books
                    .slice(slideIndex * 3, slideIndex * 3 + 3)
                    .map((book) => (
                      <Card
                        key={book._id}
                        className="w-80 bg-white/70 dark:bg-white/10 backdrop-blur-md shadow-xl rounded-3xl hover:scale-[1.03] hover:shadow-2xl transition-all duration-300"
                      >
                        <CardContent className="p-6">
                          <Link href={`/book/${book._id}`}>
                            <div className="relative rounded-xl overflow-hidden">
                              <Image
                                src={book.images[0]}
                                alt={book.title}
                                width={250}
                                height={330}
                                className="rounded-xl object-cover mx-auto"
                              />
                              {calculateDiscount(book.price, book.finalPrice) > 0 && (
                                <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full shadow">
                                  {calculateDiscount(book.price, book.finalPrice)}% OFF
                                </span>
                              )}
                            </div>
  
                            <h3 className="mt-5 text-lg font-semibold text-center text-gray-800 dark:text-white line-clamp-2">
                              {book.title}
                            </h3>
  
                            <div className="mt-3 flex justify-between items-center text-sm text-gray-700 dark:text-gray-300">
                              <div className="space-x-2">
                                <span className="text-orange-600 font-bold text-base">
                                  ₹{book.finalPrice}
                                </span>
                                {book.price && (
                                  <span className="line-through text-gray-400">₹{book.price}</span>
                                )}
                              </div>
                              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs capitalize">
                                {book.condition}
                              </span>
                            </div>
  
                            <div className="mt-5 text-center">
                              <Button className="w-full bg-[#FF6F00] hover:bg-[#e65c00] text-white font-semibold tracking-wide rounded-lg shadow-md">
                                Buy Now
                              </Button>
                            </div>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              ))}
            </div>
  
            {/* Arrows */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-0 -translate-y-1/2 bg-white dark:bg-gray-700 p-3 rounded-full shadow-md hover:bg-orange-600 hover:text-white transition z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-0 -translate-y-1/2 bg-white dark:bg-gray-700 p-3 rounded-full shadow-md hover:bg-orange-600 hover:text-white transition z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
  
          {/* Dot Indicators */}
          <div className="flex justify-center mt-10 space-x-3">
            {[0, 1, 2].map((dot) => (
              <button
                key={dot}
                onClick={() => setCurrentBookSlide(dot)}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  currentBookSlide === dot ? 'bg-orange-600 w-5' : 'bg-gray-300'
                }`}
              ></button>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-300 text-lg">No Books to Display</p>
      )}
    </div>
  </section>
  
  )
}

export default NewBooks
