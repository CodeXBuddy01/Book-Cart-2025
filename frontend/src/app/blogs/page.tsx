// app/blogs/page.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";

type Blog = {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string;
  date: string;
};

const blogs: Blog[] = [
  {
    id: 1,
    title: "Top 5 Benefits of Buying Second-Hand Books",
    description:
      "Buying used books not only saves money but also supports sustainability. Learn how you contribute to the environment.",
    image: "/blogs/used-books.jpg",
    slug: "benefits-of-buying-used-books",
    date: "April 3, 2025",
  },
  {
    id: 2,
    title: "How to Sell Your Old Books Online Easily",
    description:
      "Selling old books is easier than ever. Here's a step-by-step guide to get started with BookKart.",
    image: "/blogs/sell-books.jpg",
    slug: "how-to-sell-old-books",
    date: "March 28, 2025",
  },
  {
    id: 3,
    title: "Why Reusing Books is the Future of Learning",
    description:
      "Find out how second-hand books are changing education and promoting budget-friendly learning.",
    image: "/blogs/reuse-books.jpg",
    slug: "reusing-books-future",
    date: "March 15, 2025",
  },
];

const BlogsPage = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Our Blogs</h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
        Explore useful tips, guides, and stories about book selling, sustainable reading, and student life.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blogs/${blog.slug}`}
            className="group block rounded-lg shadow-md hover:shadow-xl transition"
          >
            <div className="relative h-56 w-full">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <div className="p-4 bg-white rounded-b-lg">
              <p className="text-xs text-gray-500">{blog.date}</p>
              <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 mt-2">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-600 mt-1">{blog.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogsPage;
