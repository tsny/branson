import { Inter } from "next/font/google";
import BNavbar from "../navbar";
import BFooter from "../footer";

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
        <div className="sticky bottom-0 pb-2">
          <BFooter></BFooter>
        </div>
      </body>
    </html>
  );
}
