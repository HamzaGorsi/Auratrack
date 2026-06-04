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
  {/* GLOBAL BACKGROUND */}
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute top-[-350px] left-[-350px] w-[1000px] h-[1000px] rounded-full bg-violet-500/10 blur-[240px]" />

    <div className="absolute bottom-[-350px] right-[-350px] w-[1000px] h-[1000px] rounded-full bg-cyan-500/10 blur-[240px]" />

    <div
      className="absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
        backgroundSize: "90px 90px",
      }}
    />
  </div>

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