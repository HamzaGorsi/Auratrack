"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function LeaderboardPage() {
  const [players, setPlayers] =
    useState<any[]>([]);

  async function loadLeaderboard() {
    const res = await fetch(
      "/api/leaderboard",
      {
        cache: "no-store",
      }
    );

    const data = await res.json();

    setPlayers(data);
  }

  useEffect(() => {
    loadLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <div className="border-b border-white/[0.04]">
        <div className="max-w-[1700px] mx-auto px-6 pt-36 pb-12">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm uppercase tracking-[4px] text-white/40">
                Competitive Rankings
              </div>

              <h1 className="text-6xl font-black mt-3">
                Global Leaderboard
              </h1>

              <p className="text-white/45 mt-5 text-lg max-w-[700px] leading-relaxed">
                Track the highest performing competitive players across all supported games and platforms.
              </p>
            </div>

            <div className="hidden xl:flex items-center gap-5">
              <div className="rounded-[20px] bg-white/[0.03] backdrop-blur-xl border border-white/[0.04] px-8 py-5">
                <div className="text-white/45 text-sm">
                  Total Players
                </div>

                <div className="text-4xl font-black mt-2">
                  {players.length}
                </div>
              </div>

              <div className="rounded-[20px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.04] px-8 py-5">
                <div className="text-white/45 text-sm">
                  Active Matches
                </div>

                <div className="text-4xl font-black mt-2">
                  248
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="max-w-[1700px] mx-auto px-6 py-10">
        <div className="rounded-[20px] overflow-hidden border border-white/[0.04] bg-white/[0.03]">
          {/* HEADERS */}
          <div className="grid grid-cols-6 px-8 py-6 border-b border-white/[0.04] text-white/40 font-semibold uppercase tracking-[2px] text-sm">
            <div>Rank</div>
            <div>Player</div>
            <div>KD</div>
            <div>Winrate</div>
            <div>Wins</div>
            <div>Games</div>
          </div>

          {/* ROWS */}
          {players.map((player, index) => (
            <Link
              key={player.id}
              href={`/player/${player.platform}/${player.username}`}
              className="grid grid-cols-6 px-8 py-7 border-b border-white/[0.04] items-center hover:bg-white/[0.04] transition duration-300 cursor-pointer"
            >
              {/* RANK */}
              <div>
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg ${
                    index === 0
                      ? "bg-yellow-400 text-black"
                      : index === 1
                      ? "bg-gray-300 text-black"
                      : index === 2
                      ? "bg-orange-500 text-black"
                      : "bg-white/10 text-white"
                  }`}
                >
                  #{index + 1}
                </div>
              </div>

              {/* PLAYER */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center text-xl font-black">
                  {player.username
                    .slice(0, 2)
                    .toUpperCase()}
                </div>

                <div>
                  <div className="text-xl font-bold">
                    {player.username}
                  </div>

                  <div className="text-white/45 text-sm mt-1 uppercase tracking-[2px]">
                    {player.platform}
                  </div>
                </div>
              </div>

              {/* KD */}
              <div className="text-3xl font-black">
                {player.kd}
              </div>

              {/* WR */}
              <div className="text-3xl font-black text-white">
                {player.winrate}%
              </div>

              {/* WINS */}
              <div className="text-3xl font-black">
                {player.wins}
              </div>

              {/* GAMES */}
              <div className="text-3xl font-black">
                {player.games}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}