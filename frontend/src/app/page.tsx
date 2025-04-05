"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Camera,
  CreditCard,
  Library,
  Search,
  ShoppingBag,
  Store,
  Tag,
  Truck,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import NewBooks from "./components/NewBooks";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const bannerImages = [
    "/images/book1.jpg",
    "/images/book2.jpg",
    "/images/book3.jpg",
  ];

  const blogPosts = [
    {
      imageSrc:
        "https://images.unsplash.com/photo-1604866830893-c13cafa515d5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b25saW5lJTIwc2VsbCUyMGJvb2tzfGVufDB8fDB8fHww",
      title: "Where and how to sell old books online?",
      description:
        "Get started with selling your used books online and earn money from your old books.",
      icon: <BookOpen className="w-6 h-6 text-primary" />,
    },
    {
      imageSrc:
        "https://media.istockphoto.com/id/910384920/photo/kid-reading-near-locked-door.webp?a=1&b=1&s=612x612&w=0&k=20&c=J3FL4ZVORItw_bkLzlVo4WO-xUy22S7Qqbuq2xusNnc=",
      title: "What to do with old books?",
      description:
        "Learn about different ways to make use of your old books and get value from them.",
      icon: <Library className="w-6 h-6 text-primary" />,
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1492539438225-2666b2a98f93?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG9sZCUyMCUyMGJvb2tzfGVufDB8fDB8fHww",
      title: "What is BookKart?",
      description:
        "Discover how BookKart helps you buy and sell used books online easily.",
      icon: <Store className="w-6 h-6 text-primary" />,
    },
  ];

  const sellSteps = [
    {
      step: "Step 1",
      title: "Post an ad for selling used books",
      description:
        "Post an ad on BookKart describing your book details to sell your old books online.",
      icon: <Camera className="h-8 w-8 text-primary" />,
    },
    {
      step: "Step 2",
      title: "Set the selling price for your books",
      description:
        "Set the price for your books at which you want to sell them.",
      icon: <Tag className="h-8 w-8 text-primary" />,
    },
    {
      step: "Step 3",
      title: "Get paid into your UPI/Bank account",
      description:
        "You will get money into your account once you receive an order for your book.",
      icon: <Wallet className="h-8 w-8 text-primary" />,
    },
  ];

  const buySteps = [
    {
      step: "Step 1",
      title: "Select the used books you want",
      description:
        "Search from over thousands of used books listed on BookKart.",
      icon: <Search className="h-8 w-8 text-primary" />,
    },
    {
      step: "Step 2",
      title: "Place the order by making payment",
      description:
        "Then simply place the order by clicking on the 'Buy Now' button.",
      icon: <CreditCard className="h-8 w-8 text-primary" />,
    },
    {
      step: "Step 3",
      title: "Get the books delivered at your doorstep",
      description: "The books will be delivered to you at your doorstep!",
      icon: <Truck className="h-8 w-8 text-primary" />,
    },
  ];

  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen">
      <section className="relative h-[600px] overflow-hidden">
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentImage === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              fill
              alt="Book banner"
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ))}

        <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            Buy and Sell Old Books Online in India
          </h1>
          <div className="flex flex-col sm:flex-row gap-6">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-6 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <Link href="/books">
                  <div className="text-left">
                    <div className="text-sm opacity-90">Start Shopping</div>
                    <div className="font-semibold">Buy Used Books</div>
                  </div>
                </Link>
              </div>
            </Button>
            <Button
              size="lg"
              className="group bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-8 py-6 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="bg-black/20 p-2 rounded-lg group-hover:bg-black/30 transition-colors">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <Link href="/book-sell">
                  <div className="text-left">
                    <div className="text-sm opacity-90">Start Selling</div>
                    <div className="font-semibold">Sell Old Books</div>
                  </div>
                </Link>
              </div>
            </Button>
          </div>
        </div>
      </section>

      <NewBooks />

      <Button
        size="lg"
        className="flex mt-10 mb-10 mx-auto bg-yellow-500 px-8 py-6 rounded-xl"
      >
        <Link href="/book-sell">
          <div className="text-sm opacity-90">Explore All Books</div>
        </Link>
      </Button>

      {/* How to Sell Section */}
      <section className="py-16 bg-amber-50 dark:bg-gray-900">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            How to SELL your old books online on BookKart?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Earning money by selling your old books is just 3 steps away from
            you :)
          </p>
        </div>

        <div className="mt-16 max-w-6xl mx-auto px-4">
          <div className="grid gap-10 md:grid-cols-3">
            {sellSteps.map((step, index) => (
              <div
                key={index}
                className="relative bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
              >
                {/* Step Badge */}
                <div className="absolute top-2 left-14 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="text-5xl text-blue-500 mb-4">{step.icon}</div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Buy Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-whit">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          How to BUY second hand books online on BookKart?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
          Saving some good amount of money by buying used books is just 3 steps away from you :)
          </p>
        </div>

        <div className="mt-16 max-w-6xl mx-auto px-4">
          <div className="grid gap-10 md:grid-cols-3">
            {buySteps.map((step, index) => (
              <div
                key={index}
                className="relative bg-yellow-400 dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
              >
                {/* Step Badge */}
                <div className="absolute top-2 bg-white left-14 -translate-x-1/2 text-gray-900 px-4 py-1 rounded-full">
                  {step.step}
                </div>

                {/* Icon */}
                <div className="text-5xl text-blue-500 mb-4">{step.icon}</div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Blog Post */}
<section className="py-16 bg-white dark:bg-gray-900">
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
      Read from our <span className="text-blue-600">Blog</span>
    </h2>
  </div>

  <div className="max-w-7xl mx-auto px-4 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
    {blogPosts.map((post, index) => (
      <Card key={index} className="overflow-hidden shadow-md rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition duration-300">
        <CardContent className="p-0">
          {/* Blog Image */}
          <div className="relative h-48 w-full">
            <Image
              src={post.imageSrc}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-xl"
            />
          </div>

          {/* Blog Content */}
          <div className="p-6">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-white mb-2">
              <span className="text-blue-500 text-2xl">{post.icon}</span>
              <span>{post.title}</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {post.description}
            </p>
            <Button className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800">
              Read More <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
</section>

    </main>
  );
}
