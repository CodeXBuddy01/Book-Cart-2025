// components/Footer.tsx

import {
  Clock,
  Facebook,
  Github,
  HeadphonesIcon,
  Instagram,
  Shield,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700 pb-10">
        {/* About */}
        <div>
          <h3 className="text-xl font-semibold mb-4">ABOUT US</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about-us" className="hover:text-blue-400">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact-us" className="hover:text-blue-400">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">USEFUL LINKS</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/how-it-works" className="hover:text-blue-400">
                How it Works?
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="hover:text-blue-400">
                Blogs
              </Link>
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-xl font-semibold mb-4">POLICIES</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/terms-of-use" className="hover:text-blue-400">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-blue-400">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Stay Connected */}
        <div>
          <h3 className="text-xl font-semibold mb-4">STAY CONNECTED</h3>
          <div className="flex space-x-4 mb-4">
            <Link href="#" className="hover:text-blue-400">
              <Twitter />
            </Link>
            <Link href="#" className="hover:text-pink-400">
              <Instagram />
            </Link>
            <Link href="#" className="hover:text-red-500">
              <Youtube />
            </Link>
            <Link href="#" className="hover:text-white">
              <Github />
            </Link>
          </div>
          <p className="text-sm text-gray-400">
            BookKart is a free platform where you can buy second-hand books at very cheap prices. Buy used books online like college books, school books & much more near you.
          </p>
        </div>
      </div>

      {/* Feature Section */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Secure Payment */}
          <div className="flex items-start gap-4">
            <div className="bg-blue-600 p-2 rounded-full">
              <Shield className="text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Secure Payment</h4>
              <p className="text-gray-400 text-sm">
                100% Secure Online Transaction
              </p>
            </div>
          </div>

          {/* BookKart Trust */}
          <div className="flex items-start gap-4">
            <div className="bg-green-600 p-2 rounded-full">
              <Clock className="text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">BookKart Trust</h4>
              <p className="text-gray-400 text-sm">
                Money transferred safely after confirmation
              </p>
            </div>
          </div>

          {/* Support */}
          <div className="flex items-start gap-4">
            <div className="bg-yellow-600 p-2 rounded-full">
              <HeadphonesIcon className="text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Customer Support</h4>
              <p className="text-gray-400 text-sm">Friendly customer support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Strip */}
      <div className="bg-gray-800 py-4 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} BookKart. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Image src="/icons/visa.svg" alt="visa" height={30} width={50} />
            <Image src="/icons/rupay.svg" alt="rupay" height={30} width={50} />
            <Image src="/icons/paytm.svg" alt="paytm" height={30} width={50} />
            <Image src="/icons/upi.svg" alt="upi" height={30} width={50} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
