// app/layout.tsx or pages/_app.tsx depending on your structure

import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "CV Lab",
  description:
    "Create ATS-friendly CVs and professional cover letters tailored to any job description in seconds.",
  other: {
    "google-site-verification": (
      <meta
        name="google-site-verification"
        content="QP8HEgTBsXlbFlXtMDa1cJUSIKl88k_viEwHrktNBLU"
      />
    ),
  },
};
    



export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.className} scroll-smooth`}>
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
