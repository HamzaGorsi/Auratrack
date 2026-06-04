"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

export default function TrendingPlayers() {
  const [players, setPlayers] =
    useState<any[]>([]);

  async function loadTrending() {
    const res = await fetch(
      "/api/trending",
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    setPlayers(data);
  }

  useEffect(() => {
    loadTrending();
  }, []);

  return (
    <div
      className="
        rounded-[32px]
        border
        border-white/[0.04]
        bg-white/[0.04] backdrop-blur-2xl
        p-5 sm:p-8
      "
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <div className="uppercase tracking-[4px] text-white/40 text-sm">
            Trending
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-3">
            Hot Players
          </h2>
        </div>

        <div
          className="
            px-4
            py-2
            rounded-2xl
            bg-orange-500/20
            border
            border-orange-500/30
            text-orange-300
            font-bold
          "
        >
          LIVE
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {players.map((player) => (
          <Link
            key={`${player.platform}-${player.username}`}
            href={`/player/${player.platform}/${encodeURIComponent(player.username)}`}
            className="
              relative
              overflow-hidden
              rounded-[28px]
              border
              border-white/[0.04]
              bg-white/[0.03]
backdrop-blur-xl
              p-5
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:border-white/15
            "
          >
            <div
              className="
                absolute
                inset-0
                opacity-0
                hover:opacity-100
                transition-opacity
                duration-300
                bg-gradient-to-r
                from-[#18181b]/10
                to-black/10
              "
            />

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-gradient-to-br
                    from-violet-500/30
to-cyan-500/30
                    flex
                    items-center
                    justify-center
                    font-black
                    text-xl
                  "
                >
                  {player.username
                    ?.charAt(0)
                    ?.toUpperCase()}
                </div>

                <div>
                  <div className="text-2xl font-black text-white">
                    {player.username}
                  </div>

                  <div className="text-white/40 mt-1">
                    {player.platform}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-white/40 text-sm uppercase tracking-[3px]">
                  Searches
                </div>

                <div className="text-3xl font-black mt-1">
                  {player._count.username}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}