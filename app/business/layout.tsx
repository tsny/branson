import BNavbar from "../navbar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body>
      <BNavbar></BNavbar>
      <div className="mb-2"></div>
      {children}
    </body>
  );
}
