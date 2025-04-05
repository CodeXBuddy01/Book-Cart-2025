// app/contact-us/page.tsx
"use client";
import React, { useState } from "react";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can send data to backend / email service here
    console.log("Form Data:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
        <p className="text-gray-600 mt-2">We'd love to hear from you! Fill the form below to reach out.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm font-medium">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Type your message here..."
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
          >
            Send Message
          </button>

          {submitted && (
            <p className="text-green-600 text-sm">Thanks! We will get back to you soon.</p>
          )}
        </form>

        {/* Contact Info */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">📍 Address</h3>
            <p className="text-gray-600">123 Book Street, Knowledge City, India</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">📞 Phone</h3>
            <p className="text-gray-600">+91 98765 43210</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">📧 Email</h3>
            <p className="text-gray-600">support@bookkart.in</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">🌐 Follow Us</h3>
            <div className="flex gap-4 mt-2">
              <a href="#" className="hover:text-blue-600">Twitter</a>
              <a href="#" className="hover:text-pink-500">Instagram</a>
              <a href="#" className="hover:text-red-600">YouTube</a>
              <a href="#" className="hover:text-gray-800">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;
