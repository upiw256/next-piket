import { Inter } from "next/font/google";
import Menu from "./menu";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "APLIKASI ABSEN",
  description: "Aplikasi Absensi untuk merekap data",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Menu />
        {children}
      </body>
    </html>
  );
}
