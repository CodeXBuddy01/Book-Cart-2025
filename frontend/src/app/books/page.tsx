'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { books, filters } from "@/lib/Constant";
import Link from "next/link";
import React, { useState } from "react";
import { formatDistanceToNow } from 'date-fns';
import BookLoader from "@/lib/BookLoader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Pagination from "../components/Pagination";
import NoData from "../components/NoData";
import { useRouter } from "next/navigation";

const page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCondition, setSelectedCondition] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [sortOption, setSelectedOption] = useState("newest");
  const bookPerPage = 6;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const toggleFilter = (section: string, item: string) => {
    const updateFilter = (prev: string[]) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item];

    switch (section) {
      case "condition":
        setSelectedCondition(updateFilter);
        break;
      case "classType":
        setSelectedType(updateFilter);
        break;
      case "category":
        setSelectedCategory(updateFilter);
        break;
      default:
        break;
    }
    setCurrentPage(1);
  };

  const filterBooks = books.filter((book) => {
    const conditionMatch =
      selectedCondition.length === 0 ||
      selectedCondition.map((cond) => cond.toLowerCase()).includes(book.condition.toLowerCase());

    const typeMatch =
      selectedType.length === 0 ||
      selectedType.map((cond) => cond.toLowerCase()).includes(book.classType.toLowerCase());

    const categoryMatch =
      selectedCategory.length === 0 ||
      selectedCategory.map((cond) => cond.toLowerCase()).includes(book.category.toLowerCase());

    return conditionMatch && typeMatch && categoryMatch;
  });

  const sortedBooks = [...filterBooks].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "price-low":
        return a.finalPrice - b.finalPrice;
      case "price-high":
        return b.finalPrice - a.finalPrice;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedBooks.length / bookPerPage);

  const paginatedBooks = sortedBooks.slice(
    (currentPage - 1) * bookPerPage,
    currentPage * bookPerPage
  );

  const handlePageChange = (page: number) => setCurrentPage(page);

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
    <div className="w-full px-4 md:px-10 lg:px-20 py-10 bg-white dark:bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 dark:text-gray-400">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <span>Books</span>
        </nav>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Find from over 1000s of used books online
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className="w-full lg:w-1/4 space-y-4">
            <Accordion type="multiple" className="w-full">
              {Object.entries(filters).map(([key, values]) => (
                <AccordionItem key={key} value={key}>
                  <AccordionTrigger className="text-base capitalize font-semibold text-gray-700 dark:text-white">
                    {key}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2 mt-2">
                      {values.map((value) => (
                        <div key={value} className="flex items-center gap-2">
                          <Checkbox
                            id={value}
                            checked={
                              key === "condition"
                                ? selectedCondition.includes(value)
                                : key === "classType"
                                ? selectedType.includes(value)
                                : selectedCategory.includes(value)
                            }
                            onCheckedChange={() => toggleFilter(key, value)}
                          />
                          <label htmlFor={value} className="text-sm text-gray-600 dark:text-gray-300">
                            {value}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Book List */}
          <div className="w-full lg:w-3/4 space-y-6">
            {isLoading ? (
              <BookLoader />
            ) : paginatedBooks.length ? (
              <>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-xl font-semibold text-gray-800 dark:text-white">
                    Buy Second Hand Books, Used Books Online In India
                  </div>
                  <Select onValueChange={(value) => setSelectedOption(value)} value={sortOption}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedBooks.map((book) => (
                    <motion.div
                      key={book._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, type: 'spring' }}
                    >
                      <Card className="relative overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                        <CardContent className="p-4 space-y-4">
                          <Link href={`/books/${book._id}`}>
                            <div className="relative">
                              <Image
                                src={book.images[0]}
                                alt={book.title}
                                width={400}
                                height={300}
                                className="rounded-lg object-cover w-full h-48"
                              />
                              {calculateDiscount(book.price, book.finalPrice) > 0 && (
                                <Badge className="absolute top-2 left-2 bg-green-600 text-white">
                                  {calculateDiscount(book.price, book.finalPrice)}% OFF
                                </Badge>
                              )}
                              <Button
                                size="icon"
                                variant="ghost"
                                className="absolute top-2 right-2"
                              >
                                <Heart />
                              </Button>
                            </div>

                            <div className="space-y-1 mt-2">
                              <h3 className="font-semibold text-gray-800 dark:text-white">
                                {book.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {book.author}
                              </p>
                              <div className="flex items-center gap-2 font-semibold">
                                <span className="text-orange-600">₹{book.finalPrice}</span>
                                {book.price && (
                                  <span className="line-through text-gray-500 text-sm">
                                    ₹{book.price}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-gray-500 flex justify-between">
                                <span>{formatDate(book.createdAt)}</span>
                                <span>{book.condition}</span>
                              </div>
                            </div>
                          </Link>
                        </CardContent>
                        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange-500/10 blur-2xl" />
                        <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-orange-500/10 blur-2xl" />
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                 />
              </>
            ) : (
              <NoData
              imageUrl="/images/no-book.jpg"
              message="No books available please try later."
              description="Try adjusting your filters or search criteria to find what you're looking for."
              onClick={() => router.push("/book-sell")}
              buttonText="Shell Your First Book"
            />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
