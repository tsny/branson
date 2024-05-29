import BNavbar from "../navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <BNavbar></BNavbar>
        <div className="mb-2"></div>
        {children}
      </body>
    </html>
  );
}
