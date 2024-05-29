import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DarkThemeToggle, Flowbite, ThemeModeScript } from "flowbite-react";

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
      <head>
        <ThemeModeScript mode="dark" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
