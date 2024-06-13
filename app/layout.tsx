import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BNavbar from "./navbar";
import BFooter from "./footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "branson brason branson",
  description: "Branson Boy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BNavbar></BNavbar>
        {children}
        <BFooter></BFooter>
      </body>
    </html>
  );
}
