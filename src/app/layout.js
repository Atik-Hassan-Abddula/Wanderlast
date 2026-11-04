
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "My Next App",
  description: "My Next.js application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${josefinSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
       <Navbar></Navbar>
        {children}
         <Footer></Footer>
      </body>
    </html>
  );
}
