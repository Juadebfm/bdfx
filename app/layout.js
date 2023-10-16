import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata = {
  title: "BusinessDay FX",
  description:
    "Business day is a leader in financial and forex business news, insight and informed commentary plusall that matters in the financial affairs of West Africa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="text-[16.4px] !overflow-x-hidden">
        <main className="max-w-10xl mx-auto">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
