"use client";

import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";

import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");
    const [rememberMe, setRememberMe] =
  useState(false);

  async function login() {
    const res = await signIn(
      "credentials",
      {
        email,
        password,
rememberMe,
        redirect: false,
      }
    );

    if (res?.ok) {
      router.push("/");
    } else {
      alert("Invalid login");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">
      {/* BACKGROUND */}
<div className="absolute inset-0 overflow-hidden">
  <div
    className="
      absolute
      top-[-200px]
      left-[-200px]
      w-[600px]
      h-[600px]
      rounded-full
      bg-blue-900/20
    "
  />

  <div
    className="
      absolute
      bottom-[-250px]
      right-[-250px]
      w-[600px]
      h-[600px]
      rounded-full
      bg-emerald-900/20
    "
  />

  <div
    className="
      absolute
      inset-0
      opacity-[0.04]
    "
    style={{
      backgroundImage:
        "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
      backgroundSize: "80px 80px",
    }}
  />
</div>
      <div className="
  relative
  z-10
  w-full
  max-w-[520px]
  rounded-[32px]
  border
  border-white/[0.08]
  bg-black
  p-10
">
        <h1 className="text-6xl font-black tracking-tight">
  Welcome Back!
</h1>
<div className="mt-4 text-white/45 leading-7">
  Login to continue tracking your competitive aura.
</div>
        <div className="space-y-5 mt-8">
          <input
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Email"
            className="
  w-full
  h-14
  px-5
  rounded-2xl
  bg-black/80
  border
  border-white/[0.08]
  outline-none
  text-white
  focus:border-emerald-500/40
  transition-all
"
          />

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Password"
            className="
  w-full
  h-14
  px-5
  rounded-2xl
  bg-black/80
  border
  border-white/[0.08]
  outline-none
  text-white
  focus:border-emerald-500/40
  transition-all
"
          />
          <label
  className="
    flex
    items-center
    gap-3
    mt-5
    text-white/70
    text-sm
    cursor-pointer
  "
>
  <input
    type="checkbox"
    checked={rememberMe}
    onChange={(e) =>
      setRememberMe(
        e.target.checked
      )
    }
    className="
      w-4
      h-4
      rounded
      accent-indigo-500
    "
  />

  Remember Me
</label>

          <button
            onClick={login}
            className="
  h-11
  px-6
  rounded-2xl
  bg-[#1a1a1a]
  border
  border-white/[0.08]
  text-white
  font-bold
  transition-all
  duration-300
  hover:bg-[#222222]
"
          >
            LOGIN
          </button>
          <div className="mt-6 text-center text-white/45">
  Don&apos;t have an account?{" "}

  <span
    onClick={() => router.push("/signup")}
    className="
      text-white
      cursor-pointer
      hover:text-emerald-200
      transition-colors
    "
  >
    Create one
  </span>
</div>
        </div>
      </div>
    </div>
  );
}