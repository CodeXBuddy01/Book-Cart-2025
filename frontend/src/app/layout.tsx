import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "./globals.css";

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: 'swap'
});

export const metadata: Metadata = {
  title: "Book Kart",
  description: "This is E-Commerce platform wherer you can buy or cell your books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={roboto_mono.className}
      >
        {children}
      </body>
    </html>
  );
}
