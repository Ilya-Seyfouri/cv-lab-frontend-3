// app/layout.tsx or pages/_app.tsx depending on your structure

import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Your App Name",
  description: "Your description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.className} scroll-smooth`}>
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
