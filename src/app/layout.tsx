import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavbarAdmin from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CopLink",
  description: "CopLink",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavbarAdmin>{children}</NavbarAdmin>
      </body>
    </html>
  );
}
