import { Inter } from "next/font/google";
import BNavbar from "../navbar";

const inter = Inter({ subsets: ["latin"] });

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
      </body>
    </html>
  );
}
