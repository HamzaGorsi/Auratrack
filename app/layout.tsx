import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import Navbar from "../components/Navbar";
import Providers from "@/components/Providers";
import Script from "next/script";
import ScrollToTop from "@/components/ScrollToTop";
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
      <body
  className={`${spaceGrotesk.className} bg-[#02060D] text-white`}
>
  {/* GLOBAL BACKGROUND */}
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
<img
  src="/hero-bg.jpg"
  alt=""
  className="
    absolute
    inset-0
    w-full
    h-full
    object-cover
    opacity-80
  "
/>
<div
  className="
    absolute
    inset-0
    bg-black/35
  "
/>
</div>

  <Providers>

  <ScrollToTop />

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