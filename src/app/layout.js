import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "BDFX",
  description:
    "Explore real-time business day exchange rates and seamlessly convert currencies with our powerful FX converter tool. Stay updated on global currency markets and make informed financial decisions. Your go-to destination for accurate and up-to-date currency exchange information.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-latoFont text-[16px]">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
