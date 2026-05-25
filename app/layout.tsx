import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import Navbar from "../components/Navbar";
import Providers from "@/components/Providers";
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AuraTrack",

  description:
   "Track Your Aura." ,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${spaceGrotesk.className} bg-black text-white`}>
        <Providers>
  <Navbar />

  {children}

  <Toaster
    richColors
    position="top-right"
  />
</Providers>
      </body>
    </html>
  );
}