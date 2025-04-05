// app/about-us/page.tsx
import Image from "next/image";
import React from "react";

const AboutUsPage = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16 text-gray-800">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">About BookKart</h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Connecting book lovers and learners by making second-hand books accessible, affordable, and sustainable.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <Image
            src="/images/about-us.jpg"
            alt="About BookKart"
            width={600}
            height={400}
            className="rounded-lg shadow-md object-cover w-full"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            At BookKart, we believe that knowledge should never be expensive. Our mission is to make education accessible to everyone by connecting students and readers who want to buy and sell used books at fair prices.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Why BookKart?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Eco-friendly: Reduce waste by reusing books</li>
            <li>Affordable: Buy and sell books at reasonable prices</li>
            <li>Reliable: Verified users and safe transactions</li>
            <li>Community Driven: Built for students, by students</li>
          </ul>
        </div>
      </div>

      {/* Team Section */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Meet the Team</h2>
        <p className="text-gray-600 mt-2">Passionate minds behind BookKart</p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <Image
            src="/images/team1.jpg"
            alt="Team Member"
            width={150}
            height={150}
            className="rounded-full mx-auto mb-4 object-cover"
          />
          <h3 className="text-lg font-semibold">Ravi Kumar</h3>
          <p className="text-sm text-gray-500">Founder & Developer</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <Image
            src="/images/team2.jpg"
            alt="Team Member"
            width={150}
            height={150}
            className="rounded-full mx-auto mb-4 object-cover"
          />
          <h3 className="text-lg font-semibold">Simran Patel</h3>
          <p className="text-sm text-gray-500">Marketing & Outreach</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
          <Image
            src="/images/team3.jpg"
            alt="Team Member"
            width={150}
            height={150}
            className="rounded-full mx-auto mb-4 object-cover"
          />
          <h3 className="text-lg font-semibold">Aman Verma</h3>
          <p className="text-sm text-gray-500">Product Design</p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-20">
        <h3 className="text-2xl font-semibold mb-2">Join our mission today</h3>
        <p className="text-gray-600 mb-4">Have questions or want to contribute? We’d love to hear from you!</p>
        <a
          href="/contact-us"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
};

export default AboutUsPage;
