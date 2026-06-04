"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

export default function FriendsPage() {
  const { data: session } = useSession();
  const [username, setUsername] = useState("");

  async function sendRequest() {
    if (!session?.user?.username) {
      toast.error("Please log in first");
      return;
    }

    if (!username.trim()) {
      toast.error("Enter a username");
      return;
    }

    const res = await fetch("/api/friends/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senderUsername: session.user.username,
        receiverUsername: username.trim(),
      }),
    });

    const data = await res.json().catch(() => null);

    if (res.ok) {
      toast.success("Friend request sent");
      setUsername("");
    } else {
      toast.error(data?.error || "Failed to send request");
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="mb-8 sm:mb-10">
          <div className="uppercase tracking-[4px] text-white/40 text-sm">
            Social System
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mt-3">
            Friends
          </h1>

          <p className="text-white/45 mt-4 sm:mt-5 text-base sm:text-lg">
            Connect with competitive players and build your network.
          </p>
        </div>

        <div className="rounded-[20px] border border-white/[0.04] bg-white/[0.03]
backdrop-blur-xl p-5 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-black mb-6">
            Send Friend Request
          </h2>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendRequest();
              }}
              placeholder="Enter username..."
              className="flex-1 h-14 px-5 rounded-2xl bg-[#161616] border border-white/[0.04] outline-none"
            />

            <button
              type="button"
              onClick={sendRequest}
              className="
h-14
px-8
rounded-2xl

bg-gradient-to-r
from-violet-600/30
to-cyan-500/20

border
border-violet-400/30

backdrop-blur-xl

text-white
font-black

hover:border-violet-300/50

transition-all
duration-300

whitespace-nowrap
"
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
