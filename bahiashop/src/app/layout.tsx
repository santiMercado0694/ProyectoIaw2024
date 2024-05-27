import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { AppProvider } from "@/context/StoreProvider";
import SessionWrapper from "@/context/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bahia Shop",
  description: "Tienda de productos tecnologicos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <AppProvider>
        <html lang="en" className="h-full">
          <body 
            className={cn(
              "relative h-full font-sans antialiased",
              inter.className
            )}>
            <main className="relative flex flex-col min-h-screen"> 
              <Navbar/>
              <div className="flex flex-col grow h-full">
                {children}
              </div>
            </main>
          </body>
        </html>
      </AppProvider>
    </SessionWrapper>
  );
}
