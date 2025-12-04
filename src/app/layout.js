import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuraBadge from "@/components/AuraBadge";
import ChatWidget from "@/components/ChatWidget";
import CartWidget from "@/components/CartWidget";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Aura Beauty Premium",
  description: "Beleza arquitetada. Luxo silencioso.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${playfair.variable} ${inter.variable} antialiased flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
        <AuraBadge />
        <ChatWidget />
        <CartWidget />
      </body>
    </html>
  );
}
