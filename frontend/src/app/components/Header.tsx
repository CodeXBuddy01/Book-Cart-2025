"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { toggleLoginDialog } from "@/store/slice/userSlice";
import { RootState } from "@/store/store";
import {
  BookLock,
  ChevronRight,
  FileTerminal,
  Heart,
  HelpCircle,
  Lock,
  LogOut,
  Menu,
  Package,
  PiggyBank,
  Search,
  ShoppingCart,
  User,
  User2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoginOpen = useSelector(
    (state: RootState) => state.user.isLoginDialogOpen
  );
  const user = {
    profilePicture: "",
    name: "Rakesh Kumar",
    email: "raka@gmail.com",
  };
  const userPlaceholder = "";

  const handleLoginClick = () => {
    // TODO: Implement login/signup logic
    dispatch(toggleLoginDialog());
    setIsDropdownOpen(false);
  };

  const handleProtectionNavigation = (href: string) => {
    // TODO: Implement protection navigation logic\
    if (user) {
      router.push(href);
      setIsDropdownOpen(false);
    } else {
      dispatch(toggleLoginDialog());
      setIsDropdownOpen(false);
    }
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log("Logout clicked");
  };

  const menuItems = [
    ...(user && user
      ? [
          {
            href: "account/profile",
            content: (
              <div className="flex space-x-4 items-center p-2 border-b">
                <Avatar className="w-12 h-12 -ml-2 rounded-full">
                  {user?.profilePicture ? (
                    <AvatarImage alt="user_image" />
                  ) : (
                    <AvatarFallback className="text-xs font-medium text-gray-600 bg-gray-100">
                      {userPlaceholder}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold text-md">{user.name}</span>
                  <span className="text-xs text-gray-500">{user.email}</span>
                </div>
              </div>
            ),
          },
        ]
      : [
          {
            icon: <Lock className="h-5 w-5" />,
            lable: "Login/Signup",
            onclick: handleLoginClick,
          },
        ]),
    {
      icon: <User className="h-5 w-5" />,
      lable: "My Profile",
      onclick: () => handleProtectionNavigation("/account/profile"),
    },
    {
      icon: <Package className="h-5 w-5" />,
      lable: "My Orders",
      onclick: () => handleProtectionNavigation("/account/orders"),
    },
    {
      icon: <PiggyBank className="h-5 w-5" />,
      lable: "My Selling Orders",
      onclick: () => handleProtectionNavigation("/account/selling-products"),
    },
    {
      icon: <ShoppingCart className="h-5 w-5" />,
      lable: "Cart",
      onclick: () => handleProtectionNavigation("/checkout/cart"),
    },
    {
      icon: <Heart className="h-5 w-5" />,
      lable: "My Wishlist",
      onclick: () => handleProtectionNavigation("account/profile"),
    },
    {
      icon: <User2 className="h-5 w-5" />,
      lable: "About Us",
      href: "/about-us",
    },
    {
      icon: <FileTerminal className="h-5 w-5" />,
      lable: "Terms & Use",
      href: "/terms-of-use",
    },
    {
      icon: <BookLock className="h-5 w-5" />,
      lable: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      icon: <HelpCircle className="h-5 w-5" />,
      lable: "Help",
      href: "/how-it-works",
    },
    ...(user && [
      {
        icon: <LogOut className="h-5 w-5" />,
        lable: "Logout",
        onclick: handleLogout,
      },
    ]),
  ];

  const MenuItems = ({ className = "" }) => (
    <div className={className}>
      {menuItems?.map((item, index) =>
        item?.href ? (
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 text-sm rounded-lg hover:bg-gray-200"
            onClick={() => setIsDropdownOpen(false)}
          >
            {item.icon}
            <span>{item?.lable}</span>
            {item?.content && <div className="mt-1">{item?.content}</div>}
            <ChevronRight className="w-4 h-4 ml-auto" />
          </Link>
        ) : (
          <button
            key={index}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm rounded-lg hover:bg-gray-200"
            onClick={item.onclick}
          >
            {item.icon}
            <span>{item?.lable}</span>
            <ChevronRight className="w-4 h-4 ml-auto" />
          </button>
        )
      )}
    </div>
  );

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      {/* Desktop header */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 gap-6">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/web-logo.png"
            width={450}
            height={100}
            alt="desktop-logo"
            className="w-40 md:w-56 object-contain"
          />
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all bg-gray-50">
            <Input
              type="text"
              placeholder="Book Name / Author / Subject Publisher"
              value=""
              // onChange={() => {}}
              className="flex-1 text-sm bg-transparent outline-none placeholder-gray-500"
            />
            <Button
              size="icon"
              variant="ghost"
              className="text-gray-600 hover:text-black"
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Right side options */}
        <div className="flex items-center gap-4">
          {/* Sell Used Book Button */}
          <Link href="/book-sell">
            <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-md">
              Sell Used Book
            </Button>
          </Link>

          {/* User Avatar / Dropdown */}
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 hover:border-gray-300 rounded-full transition-all text-sm font-medium text-gray-700 hover:text-black"
              >
                <Avatar className="w-8 h-8 rounded-full">
                  {user?.profilePicture ? (
                    <AvatarImage alt="user_image"></AvatarImage>
                  ) : userPlaceholder ? (
                    <AvatarFallback className="text-xs font-medium text-gray-600 bg-gray-100">
                      {userPlaceholder}
                    </AvatarFallback>
                  ) : (
                    <User className="ml-2 mt-2" />
                  )}
                </Avatar>
                <span>My Account</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-2">
              <MenuItems />
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/checkout/cart">
            <div className="relative">
              <Button variant="ghost" className="relative">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart
              </Button>
              {user && (
                <span className="absolute top-2 left-5 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full px-1 text-xs"></span>
              )}
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="container mx-auto flex lg:hidden items-center justify-between p-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className='h-6 w-6' />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="sr-only"></SheetTitle>
            </SheetHeader>
            <div className="border-b p-4">
              <Link href='/'>
            <Image
            src="/images/web-logo.png"
            width={150}
            height={40}
            alt="mobile-logo"
            className="h-10 w-auto"
          />
          </Link>
            </div>
            <MenuItems className="py-2" />
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/web-logo.png"
            width={450}
            height={100}
            alt="desktop-logo"
            className="h-6 md:h-10 w-20 md:w-auto"
          />
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all bg-gray-50">
            <Input
              type="text"
              placeholder="Search Products..."
              value=""
              // onChange={() => {}}
              className="flex-1 text-sm bg-transparent outline-none placeholder-gray-500"
            />
            <Button
              size="icon"
              variant="ghost"
              className="text-gray-600 hover:text-black"
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <Link href="/checkout/cart">
            <div className="relative">
              <Button variant="ghost" className="relative">
                <ShoppingCart className="h-5 w-5 mr-2" />
              </Button>
              {user && (
                <span className="absolute top-2 left-5 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full px-1 text-xs"></span>
              )}
            </div>
          </Link>
      </div>

    </header>
  );
};

export default Header;
