"use client";

import Link from "next/link";
import { use } from "react";

export default function GamePage({
  params,
}: {
  params: Promise<{
    game: string;
  }>;
}) {
  const { game } = use(params);

  const topPlayers = [
    "Shadow",
    "Vortex",
    "Reaper",
    "Nova",
    "Phantom",
    "Ares",
    "Zenith",
  ];

  const matches = new Array(6).fill(0);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <div className="relative border-b border-white/[0.04] overflow-hidden">
        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-black">
  {/* TOP BLUE GLOW */}
  <div
    className="
      absolute
      top-[-200px]
      left-[-200px]
      w-[700px]
      h-[700px]
      rounded-full
      bg-blue-500
    "
  />

  {/* BOTTOM EMERALD GLOW */}
  <div
    className="
      absolute
      bottom-[-250px]
      right-[-250px]
      w-[700px]
      h-[700px]
      rounded-full
      bg-emerald-500
    "
  />

  {/* GRID */}
  <div
    className="
      absolute
      inset-0
      opacity-10
    "
    style={{
      backgroundImage:
        "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
      backgroundSize: "80px 80px",
    }}
  />
</div>
        {/* CONTENT */}
        <div className="relative z-10 max-w-[1700px] mx-auto px-6 py-20">
          <div className="max-w-[900px]">
            <div className="uppercase tracking-[4px] text-white/40 text-sm">
              Competitive Game Hub
            </div>

            <h1 className="text-8xl font-black mt-5 capitalize leading-none">
              {game}
            </h1>

            <p className="text-white/60 text-xl mt-8 leading-relaxed max-w-[700px]">
              Explore live statistics, leaderboards,
              tournaments, esports events, and
              competitive insights for {game}.
            </p>

            {/* BUTTONS */}
            <div className="flex items-center gap-5 mt-10">
              <button className="h-14 px-8 rounded-2xl bg-gradient-to-r from-[#18181b] to-black font-bold hover:scale-[1.03] transition">
                View Leaderboards
              </button>

              <button className="h-14 px-8 rounded-2xl border border-white/[0.04] bg-white/[0.03] hover:bg-white/[0.06] transition">
                Live Matches
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-[1700px] mx-auto px-6 py-10">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-8">
          {/* LEFT */}
          <div className="space-y-8">
            {/* LIVE MATCHES */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-4xl font-black">
                  Live Matches
                </h2>

                <div className="text-white/45">
                  24 Active
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {matches.map((_, index) => (
                  <div
                    key={index}
                    className="rounded-[20px] overflow-hidden border border-white/[0.04] bg-white/[0.03]"
                  >
                    {/* IMAGE */}
                    <div className="relative h-[220px]">
                      <img
                        src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop"
                        alt="match"
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute top-4 left-4 px-3 py-1 rounded-xl bg-red-500 text-sm font-black">
                        LIVE
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-black">
                            Team Alpha
                          </div>

                          <div className="text-white/45 mt-1">
                            Championship Series
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-3xl font-black">
                            13
                          </div>

                          <div className="text-white/45 text-sm">
                            Score
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-5 text-white/60 text-sm">
                        <span>120K Viewers</span>

                        <span>Round 18</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* TOURNAMENTS */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-4xl font-black">
                  Featured Tournaments
                </h2>
              </div>

              <div className="space-y-5">
                {new Array(4).fill(0).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-[20px] border border-white/[0.04] bg-white/[0.03] p-6 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-3xl font-black">
                        Global Championship
                      </div>

                      <div className="text-white/45 mt-2">
                        Starting in 2 days
                      </div>
                    </div>

                    <button className="h-12 px-6 rounded-2xl bg-violet-600 hover:bg-violet-500 transition font-bold">
                      View Event
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT */}
          <div className="space-y-8">
            {/* TOP PLAYERS */}
            <section className="rounded-[20px] border border-white/[0.04] bg-white/[0.03] p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-black">
                  Top Players
                </h2>
              </div>

              <div className="space-y-4">
                {topPlayers.map((player, index) => (
                  <Link
                    key={index}
                    href={`/player/RIOT/${player}`}
                    className="flex items-center justify-between rounded-2xl bg-white/[0.03] border border-white/[0.04] p-4 hover:bg-white/[0.06] transition"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${
                          index === 0
                            ? "bg-yellow-400 text-black"
                            : index === 1
                            ? "bg-gray-300 text-black"
                            : index === 2
                            ? "bg-orange-500 text-black"
                            : "bg-white/10"
                        }`}
                      >
                        #{index + 1}
                      </div>

                      <div>
                        <div className="font-bold text-lg">
                          {player}
                        </div>

                        <div className="text-white/45 text-sm">
                          Ranked Competitive
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-black">
                        5.{index}
                      </div>

                      <div className="text-white/45 text-xs">
                        KD
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* META */}
            <section className="rounded-[20px] border border-white/[0.04] bg-white/[0.03] p-6">
              <h2 className="text-3xl font-black mb-6">
                Current Meta
              </h2>

              <div className="space-y-5">
                {[
                  "Top Weapon Usage",
                  "Most Picked Agents",
                  "Best Ranked Strategies",
                  "Fastest Rising Players",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-white/[0.03] border border-white/[0.04] p-5"
                  >
                    <div className="font-bold text-lg">
                      {item}
                    </div>

                    <div className="text-white/45 mt-2 text-sm leading-relaxed">
                      Updated competitive insights and
                      trending strategies from top-level
                      ranked gameplay.
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}