"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { href: "/search", label: "Search" },
  { href: "/games", label: "Games" },
  { href: "/leaderboard", label: "Leaderboards" },
  { href: "/matches", label: "Matches" },
  { href: "/analytics", label: "Analytics" },
];

function navLinkClass(pathname: string, href: string) {
  const active = pathname === href;
  return `
    h-9 px-5 rounded-lg flex items-center transition-all duration-200
    ${
      active
  ? "bg-cyan-500/10 border border-cyan-500/20 text-white"
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
    h-[78px]
rounded-[16px]
    border border-cyan-500/15
    bg-white/[0.03]
backdrop-blur-xl
shadow-[0_0_30px_rgba(0,175,255,0.12)]
    flex flex-col
    relative
    z-[999]
    overflow-visible
  "
>
        <div className="flex items-center justify-between px-6 h-full">
          {/* LEFT */}
          <div className="flex items-center gap-5 min-w-0">
            <Link
              href="/"
              className="flex items-center gap-2 min-w-0"
            >
              <div
  className="
    relative
    w-12 h-12 sm:w-18 sm:h-18
    flex-shrink-0
  "
>
  <img
    src="/logo-at.png"
    alt="AuraTrack"
    className="
      w-full
      h-full
      object-contain
    "
  />
</div>

              <div className="min-w-0">
                <div className="text-[16px] font-black text-white leading-none">
                  AuraTrack
                </div>
                <div className="hidden sm:block text-[8px] text-white/45 uppercase tracking-[2px] font-semibold">
                  Track Your Aura.
                </div>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <nav
  className="
    hidden xl:flex
    items-center
    gap-1

    rounded-xl

    border
    border-cyan-500/15

    bg-[#07111D]/90

    px-2
    py-1
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

    bg-white/[0.05]
border-white/[0.08]
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
                      w-8 h-8 rounded-xl bg-white/[0.05]
border border-white/[0.08]
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
                        hover:bg-white/[0.06] transition-all
                      "
                    >
                      Profile
                    </Link>

                    <Link
                      href="/settings"
                      className="
                        h-12 px-5 flex items-center text-white/80
                        hover:bg-white/[0.06] transition-all
                      "
                    >
                      Settings
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
  sessionStorage.clear();

  signOut({
    callbackUrl: "/",
  });
}}
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
  h-10
min-w-[72px]
  px-5 sm:px-6

  rounded-xl

  bg-cyan-500/12
  backdrop-blur-xl

  border
  border-white/[0.12]

  items-center
  justify-center

  font-semibold
  text-white

  hover:border-cyan-400/20

  transition-all
  duration-300
"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="
  h-10
  min-w-[72px]
  px-5

  rounded-xl

  bg-cyan-500/12
  backdrop-blur-xl

  border
  border-white/[0.12]

  flex
  items-center
  justify-center

  font-semibold
  text-white

  hover:border-cyan-400/20

  transition-all
  duration-300
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
                  ${pathname === link.href ? "bg-cyan-500/15 text-white border border-cyan-500/20 " : "text-white/70 hover:bg-white/[0.04]"}
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