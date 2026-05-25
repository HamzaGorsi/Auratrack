"use client";

import { useSession } from "next-auth/react";

import { useState } from "react";

export default function FriendsPage() {
  const { data: session } =
    useSession();

  const [username, setUsername] =
    useState("");

  async function sendRequest() {
    if (!session?.user?.username) {
      alert("Login required");
      return;
    }

    const res = await fetch(
      "/api/friends/request",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          senderUsername:
            session.user.username,

          receiverUsername:
            username,
        }),
      }
    );

    if (res.ok) {
      alert(
        "Friend request sent"
      );

      setUsername("");
    } else {
      alert("Failed");
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[900px] mx-auto px-6 py-12">
        {/* HEADER */}
        <div className="mb-10">
          <div className="uppercase tracking-[4px] text-white/40 text-sm">
            Social System
          </div>

          <h1 className="text-6xl font-black mt-3">
            Friends
          </h1>

          <p className="text-white/45 mt-5 text-lg">
            Connect with competitive players
            and build your network.
          </p>
        </div>

        {/* SEND REQUEST */}
        <div className="rounded-[20px] border border-white/[0.04] bg-white/[0.03] p-8">
          <h2 className="text-3xl font-black mb-6">
            Send Friend Request
          </h2>

          <div className="flex gap-4">
            <input
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              placeholder="Enter username..."
              className="flex-1 h-14 px-5 rounded-2xl bg-[#161616] border border-white/[0.04] outline-none"
            />

            <button
              onClick={sendRequest}
              className="h-14 px-8 rounded-2xl bg-gradient-to-r from-[#18181b] to-black font-black"
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}