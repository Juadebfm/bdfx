"use client";

import NavBar from "@/components/HigherComponents/NavBar";
import "./globals.css";
import { AuthContextProvider } from "./context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-Lato text-base w-full h-full overflow-x-hidden">
        <AuthContextProvider>
          <NavBar />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
