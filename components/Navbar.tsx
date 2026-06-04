"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/friends", label: "Social" },
];

function navLinkClass(pathname: string, href: string) {
  const active = pathname === href;
  return `
    h-11 px-6 rounded-xl flex items-center transition-all duration-200
    ${
      active
        ? "bg-violet-500/10 text-white border border-violet-400/10"
        : "text-white/65 hover:text-white"
    }
  `;
}

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        profileRef.current &&
        !profileRef.current.contains(target)
      ) {
        setProfileMenuOpen(false);
      }
      if (
        mobileRef.current &&
        !mobileRef.current.contains(target)
      ) {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () =>
      document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    setProfileMenuOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="relative z-[999] w-full px-4 sm:px-6 pt-4 sm:pt-5">
      <div
  ref={mobileRef}
  className="
    w-full
    min-h-[72px] sm:min-h-24
    rounded-[20px]
    border border-white/[0.04]
    bg-white/[0.05]
    backdrop-blur-3xl
    flex flex-col
    relative
    z-[999]
    overflow-visible
  "
>
        <div className="flex items-center justify-between px-4 md:px-8 py-3 sm:py-0 sm:min-h-24">
          {/* LEFT */}
          <div className="flex items-center gap-4 sm:gap-8 md:gap-12 min-w-0">
            <Link
              href="/"
              className="flex items-center gap-3 sm:gap-4 min-w-0"
            >
              <div
                className="
                  w-10 h-10 sm:w-12 sm:h-12
                  rounded-2xl bg-gradient-to-br
                  from-pink-500 via-[#1F2937] to-violet-600
                  flex items-center justify-center
                  font-black text-lg sm:text-xl
                  shadow-[0_0_40px_rgba(168,85,247,0.45)]
                  flex-shrink-0
                "
              >
                O
              </div>

              <div className="min-w-0">
                <div className="text-xl sm:text-2xl md:text-3xl font-black tracking-[2px] sm:tracking-[4px] uppercase text-white truncate">
                  AuraTrack
                </div>
                <div className="hidden sm:block text-[10px] text-white/45 uppercase tracking-[5px] font-semibold">
                  Track Your Aura.
                </div>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav
              className="
                hidden xl:flex items-center gap-10
                rounded-2xl border border-white/[0.04]
                bg-white/[0.03]
backdrop-blur-xl p-2
              "
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={navLinkClass(pathname, link.href)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2 sm:gap-5 flex-shrink-0">
            <button
              type="button"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="
                xl:hidden 
                h-11 
                sm:h-12 
                px-4 
                sm:px-5
                rounded-2xl border 
                border-white/[0.05]
                bg-white/[0.05]
                backdrop-blur-xl
                text-sm font-bold 
                text-white
              "
            >
              {mobileMenuOpen ? "Close" : "Menu"}
            </button>

            {status === "loading" ? null : session ? (
              <div
  className="
    relative
    rounded-[28px]

    bg-violet-500/10
    border-violet-400/20

    backdrop-blur-xl
    border

    transition-all
    duration-300
  "
  ref={profileRef}
>
                <button
                  type="button"
                  onClick={() =>
                    setProfileMenuOpen(!profileMenuOpen)
                  }
                  className="
                    h-11 sm:h-12 rounded-[26px] px-3 sm:px-5
                    flex items-center gap-2 sm:gap-3 font-bold
                  "
                >
                  <div
                    className="
                      w-8 h-8 rounded-xl bg-violet-500/10
                      border border-violet-400/10
                      flex items-center justify-center
                      text-sm font-black flex-shrink-0
                    "
                  >
                    {session.user?.username?.[0]?.toUpperCase()}
                  </div>

                  <span className="hidden sm:inline max-w-[120px] truncate">
                    {session.user?.username}
                  </span>

                  <span
                    className={`
                      ml-auto text-sm transition-transform duration-200
                      ${profileMenuOpen ? "rotate-180" : ""}
                    `}
                  >
                    ▼
                  </span>
                </button>

                <div
                  className={`
                    absolute right-0 top-full mt-1 w-48 sm:w-full min-w-[200px]
                    rounded-[20px] 
                    border border-white/[0.08]

                    bg-white/[0.06]
                    backdrop-blur-3xl

                    shadow-[0_0_40px_rgba(0,0,0,0.45)]
                    overflow-hidden 
                    transition-all 
                    duration-200
                    origin-top-right 
                    z-[9999]
                    ${
                      profileMenuOpen
                        ? "translate-y-0 opacity-100 pointer-events-auto"
                        : "-translate-y-2 opacity-0 pointer-events-none"
                    }
                  `}
                >
                  <div className="border-t border-white/[0.06] flex flex-col">
                    <Link
                      href="/profile"
                      className="
                        h-12 px-5 flex items-center text-white/80
                        hover:bg-violet-500/10 transition-all
                      "
                    >
                      Profile
                    </Link>

                    <Link
                      href="/settings"
                      className="
                        h-12 px-5 flex items-center text-white/80
                        hover:bg-violet-500/10 transition-all
                      "
                    >
                      Settings
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        signOut({ callbackUrl: "/" })
                      }
                      className="
                        w-full h-12 px-5 flex items-center text-red-300
                        hover:bg-red-500/10 transition-all
                      "
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="
  hidden sm:flex
  h-12
  min-w-[90px]
  px-5 sm:px-6

  rounded-2xl

  bg-violet-500/12
  backdrop-blur-xl

  border
  border-white/[0.12]

  items-center
  justify-center

  font-semibold
  text-white

  hover:border-violet-400/20

  transition-all
  duration-300
"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="
                    h-11 sm:h-12 px-4 sm:px-7 rounded-2xl
                    bg-violet-500/20
backdrop-blur-xl
border border-violet-400/20
hover:border-violet-300/40
                    flex items-center justify-center font-black text-white
                    hover:brightness-110 transition-all duration-300
                    shadow-[0_0_20px_rgba(99,102,241,0.25)] text-sm sm:text-base
                  "
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* MOBILE NAV PANEL */}
        <nav
          className={`
            xl:hidden overflow-hidden transition-all duration-200
            border-t border-white/[0.04]
            ${
              mobileMenuOpen
                ? "max-h-80 opacity-100"
                : "max-h-0 opacity-0 border-t-0"
            }
          `}
        >
          <div className="flex flex-col gap-1 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  h-12 px-5 rounded-xl flex items-center font-semibold
                  ${pathname === link.href ? "bg-white/[0.06] text-white" : "text-white/70 hover:bg-white/[0.04]"}
                `}
              >
                {link.label}
              </Link>
            ))}

            {!session && status !== "loading" && (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="
                  sm:hidden h-12 px-5 rounded-xl flex items-center
                  text-white/70 hover:bg-white/[0.04] font-semibold
                "
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}