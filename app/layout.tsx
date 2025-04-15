// app/layout.tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { auth } from "./lib/auth";
import { Providers } from "./components/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kids Manager - Liber Mall",
  description: "Sistema de gerenciamento do espaço Kids do Liber Mall",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth();

  return (
    <html lang="pt-BR" className="h-full" suppressHydrationWarning>
      <body className={`${poppins.className} bg-[#0A0A0B] text-white antialiased min-h-screen flex flex-col`}>
        <Providers session={session}>
          <Navbar />
          <div className="flex-1 flex flex-col pt-16">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}