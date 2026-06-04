"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [username, setUsername] =
    useState("");

  async function register() {
    const res = await fetch(
      "/api/register",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          email,
          password,
          username,
        }),
      }
    );

    if (res.ok) {
      toast.success("Account created! Please log in.");
      router.push("/login");
    } else {
      const data = await res.json().catch(() => null);
      toast.error(data?.error || "Registration failed");
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
      bg-violet-600/20
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
      bg-cyan-600/20
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
  bg-white/[0.04] backdrop-blur-3xl  
  p-6 sm:p-10
">
        <h1 className="text-5xl font-black">
          Create Account
        </h1>
        <div className="mt-4 text-white/45 leading-7">
  Create your AuraTrack account and enter the competitive ecosystem.
</div>

        <div className="space-y-5 mt-8">
          <input
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            placeholder="Username"
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
  h-11
  px-6
  rounded-2xl
  bg-[#1f1f23]
  text-white
  font-black
  border
  border-white/[0.08]
  transition-colors
  duration-200
  hover:bg-[#2a2a2f]
  shadow-none
  outline-none
  focus:outline-none
  focus:ring-0
"
          />

          <button
            onClick={register}
            className="
  h-11
  px-6
  rounded-2xl
  bg-violet-500/20
border-violet-400/20
text-white
backdrop-blur-xl
  text-black
  font-black
  border
  border-white/[0.08]
  transition-colors
  duration-200
  hover:bg-[#e4e4e7]
"
          >
            CREATE ACCOUNT
          </button>
          <div className="mt-6 flex items-center justify-center gap-1 text-white/45 text-sm">
  Already have an account?

  <span
    onClick={() => router.push("/login")}
    className="
      text-white
      cursor-pointer
      hover:text-emerald-200
      transition-colors
    "
  >
    Login
  </span>
</div>
        </div>
      </div>
    </div>
  );
}