"use client";
import { providers } from "@/lib/providers";
import {
  useRouter,
} from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaSteam,
  FaXbox,
  FaPlaystation,
} from "react-icons/fa";

import {
  SiEpicgames,
  SiRiotgames,
  SiBattledotnet,
  SiUbisoft,
  SiEa,
} from "react-icons/si";

export default function HomePage() {
  const [searchLoading, setSearchLoading] =
  useState(false);
const [
  recentSearches,
  setRecentSearches,
] = useState<any[]>([]);
const [searchError, setSearchError] =
  useState("");
  const [username, setUsername] = useState("");
  const [platform, setPlatform] = useState("EPIC");
  const router = useRouter();
 const [connectedAccounts, setConnectedAccounts] =
  useState<any[]>([]);
const [leaderboardPlayers, setLeaderboardPlayers] =
  useState<any[]>([]);
const [trendingPlayers, setTrendingPlayers] =
  useState<any[]>([]);
  const [homepageMatches, setHomepageMatches] =
  useState<any[]>([]);
  const [platformStats, setPlatformStats] =
  useState<any>(null);
  useEffect(() => {
  const savedUsername =
    sessionStorage.getItem(
      "lastUsername"
    );
  const savedPlatform =
    sessionStorage.getItem(
      "lastPlatform"
    );

  if (savedUsername) {
    setUsername(savedUsername);
  }

  if (savedPlatform) {
    setPlatform(savedPlatform);
  }

  const clearStorage = () => {
    sessionStorage.removeItem(
      "lastUsername"
    );

    sessionStorage.removeItem(
      "lastPlatform"
    );
  };

  window.addEventListener(
    "beforeunload",
    clearStorage
  );
const loadRecentSearches =
  async () => {
    try {
      const res = await fetch(
        "/api/recent-searches"
      );

      if (!res.ok) {
        return;
      }

      const data =
        await res.json();

      setRecentSearches(data);
    } catch {}
  };

loadRecentSearches();
async function loadLeaderboard() {
  try {
    const res = await fetch(
      "/api/leaderboard",
      {
        cache: "no-store",
      }
    );

    const data =
      await res.json();

    setLeaderboardPlayers(data);
  } catch {}
}
async function loadPlatformStats() {
  try {
    const res = await fetch(
      "/api/platform-stats",
      {
        cache: "no-store",
      }
    );

    const data =
      await res.json();

    setPlatformStats(data);
  } catch {}
}

loadPlatformStats();
loadLeaderboard();
async function loadHomepageMatches() {
  try {
    const res = await fetch(
      "/api/recent-searches"
    );

    if (!res.ok) return;

    const searches =
      await res.json();

    const riotSearch =
      searches.find(
        (search: any) =>
          search.platform === "RIOT"
      );

    if (!riotSearch) return;

    const provider =
      providers.RIOT;

    const matches =
      await provider.getMatches(
        riotSearch.username
      );

    setHomepageMatches(
      matches || []
    );
  } catch {}
}

loadHomepageMatches();
  return () => {
    window.removeEventListener(
      "beforeunload",
      clearStorage
    );
  };
}, []);

  const searchPlayer = async () => {
  if (!username.trim()) return;
setSearchLoading(true);

setSearchError("");
  try {
    await fetch("/api/search-history", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username,
        platform,
      }),
    });
  } catch (error) {
    console.error(error);
  }
  sessionStorage.setItem(
  "lastUsername",
  username
);

  sessionStorage.setItem(
  "lastPlatform",
  platform
);

const provider =
  providers[platform as keyof typeof providers];

if (!provider) {
  console.error("Provider not found");
  return;
}
if (
  platform === "RIOT" &&
  !username.includes("#")
) {
  setSearchError(
    "Use Riot ID format: name#tag"
  );

  setSearchLoading(false);

  return;
}
if (platform === "RIOT") {
  const split =
    username.split("#");

  const gameName = split[0];
  const tagLine = split[1];

  const res = await fetch(
    `/api/riot/account?gameName=${encodeURIComponent(
      gameName
    )}&tagLine=${encodeURIComponent(
      tagLine
    )}`
  );

  if (!res.ok) {
    setSearchError(
      "Riot player not found"
    );

    setSearchLoading(false);

    return;
  }
}
  try {
  router.push(
    `/player/${platform}/${encodeURIComponent(
      username
    )}`
  );
} finally {
  setSearchLoading(false);
}
};
 return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <div className="fixed inset-0 bg-black -z-10" />
        <div className="w-full px-4 sm:px-6 lg:px-10 pt-10 sm:pt-16 pb-10 sm:pb-16">
          <div className="text-violet-300 text-sm font-semibold uppercase tracking-[2px]">
            Built For Competitive Players
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black leading-[0.95] mt-5 max-w-[900px]">
            Track Every Stat.
            <br />

            <span className="bg-gradient-to-r from-[#ffffff] via-[#d4d4d8] to-[#a1a1aa] bg-clip-text text-transparent">
              Dominate Every Match.
            </span>
          </h1>

          <p className="text-white/60 text-base sm:text-[17px] leading-7 sm:leading-8 mt-6 max-w-[700px] font-medium">
            Real-time analytics, competitive rankings, advanced match history,
            social systems, tournaments, and premium gaming intelligence.
          </p>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-14 items-stretch">
            <div className="min-h-0 xl:min-h-[760px] rounded-[20px] bg-white/[0.04]
backdrop-blur-3xl p-5 sm:p-8">
              <div>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={(e) => {
  if (e.key === "Enter") {
    searchPlayer();
  }
}}
                  placeholder={
  platform === "RIOT"
    ? "Enter Riot ID (name#tag)"
    : "Search player username..."
}
                  className="w-full h-16 px-6 text-center rounded-2xl bg-[#161616] border-0 outline-none text-lg"
                />

                <div className="mt-5 grid grid-cols-2 xl:grid-cols-4 gap-3">
                  {[
                    {
                      name: "EPIC",
                      icon: <SiEpicgames size={26} />,
                    },
                    {
                      name: "STEAM",
                      icon: <FaSteam size={26} />,
                    },
                    {
                      name: "PSN",
                      icon: <FaPlaystation size={26} />,
                    },
                    {
                      name: "XBOX",
                      icon: <FaXbox size={26} />,
                    },
                    {
                      name: "RIOT",
                      icon: <SiRiotgames size={24} />,
                    },
                    {
                      name: "BATTLE.NET",
                      icon: <SiBattledotnet size={24} />,
                    },
                    {
                      name: "EA",
                      icon: <SiEa size={24} />,
                    },
                    {
                      name: "UBISOFT",
                      icon: <SiUbisoft size={24} />,
                    },
                  ].map((item) => (
                    <button
  type="button"
  key={item.name}
  onClick={() => setPlatform(item.name)}
                      className={`min-h-[56px] rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-[1.03] border border-white/[0.04] ${
  item.name === "EPIC"
    ? platform === item.name
      ? "bg-white text-black"
      : "bg-white/10 text-white hover:bg-white/20"

    : item.name === "STEAM"
    ? platform === item.name
      ? "bg-sky-700 text-white"
      : "bg-sky-700/20 text-sky-300 hover:bg-sky-700/35"

    : item.name === "PSN"
    ? platform === item.name
      ? "bg-blue-700 text-white"
      : "bg-blue-700/20 text-blue-300 hover:bg-blue-700/35"

    : item.name === "XBOX"
    ? platform === item.name
      ? "bg-green-700 text-white"
      : "bg-green-700/20 text-green-300 hover:bg-green-700/35"

    : item.name === "RIOT"
    ? platform === item.name
      ? "bg-red-700 text-white"
      : "bg-red-700/20 text-white hover:bg-red-700/35"

    : item.name === "BATTLE.NET"
    ? platform === item.name
      ? "bg-indigo-700 text-white"
      : "bg-indigo-700/20 text-indigo-300 hover:bg-indigo-700/35"

    : item.name === "EA"
    ? platform === item.name
      ? "bg-orange-600 text-white"
      : "bg-orange-600/20 text-orange-300 hover:bg-orange-600/35"

    : item.name === "UBISOFT"
    ? platform === item.name
      ? "bg-violet-700 text-white"
      : "bg-violet-700/20 text-white hover:bg-violet-700/35"

    : "bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/[0.06]"
}`}
                    >
                      {item.icon}
                    </button>
                  ))}
                </div>

                <button
  type="button"
  disabled={searchLoading}
  onClick={searchPlayer}
                  className="
  mt-5
  w-full
  h-16
  rounded-2xl
  bg-violet-500/20
border border-violet-400/20
backdrop-blur-xl
hover:bg-violet-500/30
  hover:bg-[#232323]
  transition-all
  duration-300
  font-black
  text-lg
  disabled:opacity-50
  disabled:cursor-not-allowed
"
                >
                  {searchLoading
  ? "SEARCHING..."
  : "SEARCH PLAYER"}
                </button>
              </div>
              {searchError && (
  <div className="mt-4 text-red-400 font-bold">
    {searchError}
  </div>
)}
{recentSearches.length > 0 && (
  <div className="mt-8">
    <div className="text-white/40 text-xs uppercase tracking-[3px] mb-4">
      Recent Searches
    </div>

    <div className="flex flex-wrap gap-3">
      {recentSearches.map(
        (search, i) => (
          <button
            key={i}
            onClick={() => {
  setUsername(search.username);
  setPlatform(search.platform);

  router.push(
    `/player/${search.platform}/${encodeURIComponent(
      search.username
    )}`
  );
}}
            className={`
  px-4
  py-3
  rounded-2xl
  border
  transition-all
  duration-300
  hover:scale-[1.03]

  ${
    search.platform === "RIOT"
      ? "bg-red-700/15 border-red-500/20 hover:bg-red-700/25"

    : search.platform === "STEAM"
      ? "bg-sky-700/15 border-sky-500/20 hover:bg-sky-700/25"

    : search.platform === "EPIC"
      ? "bg-white/10 border-white/[0.08] hover:bg-white/15"

    : search.platform === "PSN"
      ? "bg-blue-700/15 border-blue-500/20 hover:bg-blue-700/25"

    : search.platform === "XBOX"
      ? "bg-green-700/15 border-green-500/20 hover:bg-green-700/25"

    : "bg-[#161616] border-white/[0.05]"
  }
`}
          >
            <div className="text-sm font-black">
              {search.username}
            </div>

            <div className="text-xs text-white/40 mt-1">
              {search.platform}
            </div>
          </button>
        )
      )}
    </div>
  </div>
)}
{recentSearches.length === 0 && (
  <div className="mt-8 text-white/35 text-sm">
    No recent searches yet.
  </div>
)}
              <div className="grid grid-cols-2 gap-4 mt-8 auto-rows-fr">
              {[
  {
    label: "Tracked Players",
    value:
      platformStats
        ?.trackedPlayers || 0,
  },

  {
    label: "Matches Analyzed",
    value:
      platformStats
        ?.matchesAnalyzed || 0,
  },

  {
    label: "Live Users",
    value:
      platformStats
        ?.liveUsers || 0,
  },

  {
    label: "Games Supported",
    value:
      platformStats
        ?.gamesSupported || 0,
  },

  {
    label: "Daily Matches",
    value:
      platformStats
        ?.dailyMatches || 0,
  },

  {
    label: "Tournaments",
    value:
      platformStats
        ?.tournaments || 0,
  },
].map((item) => (
  <div
    key={item.label}
    className="rounded-2xl border border-white/[0.04] bg-[#161616] p-5"
  >
    <div className="text-white/40 text-xs uppercase tracking-[2px]">
      {item.label}
    </div>

    <div className="text-2xl sm:text-3xl font-black mt-3">
      {item.value}
    </div>
  </div>
))}
              </div>
            </div>

            <div className="min-h-0 xl:min-h-[760px] rounded-[20px] bg-[#111111] p-5 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="uppercase tracking-[4px] text-white/40 text-sm">
                    Competitive Performance
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-3">
                    Recent Match History
                  </h2>
                </div>

                <div
  className="
  h-11
  px-4
  rounded-2xl
  bg-white/[0.04]
  text-green-400
  font-bold
  inline-flex
  items-center
  justify-center
  synced-pulse
"
>
  LIVE DATA
</div>
              </div>

              <div className="space-y-3 max-h-[620px] pr-2">
                {homepageMatches.length === 0 && (
  <div
    className="
      h-[420px]
      rounded-2xl
      border
      border-white/[0.04]
      bg-[#151515]
      flex
      items-center
      justify-center
      text-center
      px-6
    "
  >
    <div>
      <div className="text-2xl font-black text-white/70">
        No Match Data Yet
      </div>

      <div className="text-white/35 mt-3 leading-7 max-w-[420px]">
        Search a Riot player to load
        real competitive match history
        and live performance analytics.
      </div>
    </div>
  </div>
)}

{homepageMatches.map(
  (match, i) => (
                  <div
                    key={i}
                    className={`
                      rounded-2xl
                      border
                      border-white/[0.04]
                      bg-[#151515]
                      p-[14px]
                    `}
                  >
                    <div className="flex items-center gap-3 flex-wrap mb-4">
                      <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/[0.04] text-xs font-bold text-white">
                        {match.game}
                      </div>

                      <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/[0.04] text-xs text-white/60">
                        {match.platform}
                      </div>

                      <div
                        className={`
                          px-3
                          py-1
                          rounded-lg
                          text-xs
                          font-black

                          ${
                            match.result === "VICTORY"
                              ? "bg-white/[0.06] text-white"
                              : "bg-white/[0.06] text-white"
                          }
                        `}
                      >
                        {match.result}
                      </div>
                    </div>

                    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
                      <div>
                        <div className="text-2xl font-black">
                          {match.score}
                        </div>

                        <div className="text-white/45 mt-1 text-sm">
                          {match.mode}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-6">
                        <div>
                          <div className="text-white/40 text-xs uppercase tracking-[2px]">
                            Score
                          </div>

                          <div className="text-2xl font-black mt-1">
                            {match.score}
                          </div>
                        </div>

                        <div>
                          <div className="text-white/40 text-xs uppercase tracking-[2px]">
                            K / D / A
                          </div>

                          <div className="text-xl font-black mt-1">
                            {match.kills} / {match.deaths} / {match.assists}
                          </div>
                        </div>

                        <div>
                          <div className="text-white/40 text-xs uppercase tracking-[2px]">
                            Rank
                          </div>

                          <div className="text-2xl font-black mt-1 text-white">
                            {match.result}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8 items-start">
            <div className="h-full rounded-[20px] border border-white/[0.04] bg-[#111111] p-5 sm:p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="uppercase tracking-[4px] text-white/40 text-sm">
                    Esports & Gaming
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-3">
                    Latest News
                  </h2>
                </div>
              </div>

              <div className="space-y-5 max-h-[620px] overflow-y-auto pr-2">
                {[
                  {
                    title: "Valorant Champions Finals Break Viewership Records",
                    description:
                      "The 2026 Valorant Champions event surpassed previous esports records.",
                  },
                  {
                    title: "Rocket League Adds New Ranked Rewards",
                    description:
                      "Epic Games introduced new competitive rewards for Rocket League.",
                  },
                  {
                    title: "Fortnite Competitive Season Announced",
                    description:
                      "Epic revealed the roadmap for the next FNCS season.",
                  },
                  {
                    title: "CS2 Major Prize Pool Increased",
                    description:
                      "Valve increased the Counter-Strike Major prize pool.",
                  },
                  {
                    title: "Apex Legends Ranked Changes Released",
                    description:
                      "Respawn deployed major ranked balancing updates.",
                  },
                ].map((news) => (
                  <div
                    key={news.title}
                    className="rounded-[20px] border border-white/[0.04] bg-[#161616] p-5 sm:p-6"
                  >
                    <div className="text-lg sm:text-2xl font-black leading-snug">
                      {news.title}
                    </div>

                    <div className="text-white/65 leading-8 mt-5 text-[15px]">
                      {news.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="min-h-0 xl:min-h-[760px] rounded-[20px] border border-white/[0.04] bg-[#111111] p-5 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 sm:mb-8">
                <div>
                  <div className="uppercase tracking-[4px] text-white/40 text-sm">
                    Competitive Events
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-3">
                    Tournaments
                  </h2>
                </div>

                <div className="h-11 px-4 rounded-2xl bg-white/[0.04] text-green-400 font-bold inline-flex items-center justify-center synced-pulse whitespace-nowrap">
                  ONGOING / UPCOMING
                </div>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    name: "Valorant Champions",
                    prize: "$25,000",
                  },
                  {
                    name: "Rocket League Cup",
                    prize: "$10,000",
                  },
                  {
                    name: "CS2 Masters",
                    prize: "$18,000",
                  },
                  {
  name: "Apex Predator Cup",
  prize: "$22,000",
},
{
  name: "Rainbow Six Major",
  prize: "$35,000",
},
{
  name: "FNCS Global Finals",
  prize: "$75,000",
},
                ].map((tournament) => (
                  <div
                    key={tournament.name}
                    className="rounded-2xl border border-white/[0.04] bg-[#161616] p-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-lg sm:text-xl font-black break-words">
                          {tournament.name}
                        </div>

                        <div className="text-white/45 mt-2">
                          Prize Pool
                        </div>
                      </div>

                      <div className="px-5 py-3 rounded-2xl bg-[#1a1a1a] border border-white/[0.08] font-black">
                        {tournament.prize}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
            <div className="rounded-[20px] border border-white/[0.04] bg-[#111111] p-5 sm:p-8">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
    <div>
      <div className="uppercase tracking-[4px] text-white/40 text-sm">
        Gaming Community
      </div>

      <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black mt-3">
        Featured Creators
      </h2>
    </div>
<div
  className="
  h-11
  px-4
  rounded-2xl
  bg-white/[0.04]
  text-red-400
  font-bold
  inline-flex
  items-center
  justify-center
  synced-pulse
"
>
  LIVE STREAMS
</div>
    </div>
  <div className="space-y-4">
    {[
  {
    name: "Tarik",
    game: "Valorant",
    viewers: "128K viewers",
    status: "LIVE",
  },

  {
    name: "Clix",
    game: "Fortnite",
    viewers: "84K viewers",
    status: "LIVE",
  },

  {
    name: "iiTzTimmy",
    game: "Apex Legends",
    viewers: "59K viewers",
    status: "LIVE",
  },

  {
    name: "Jynxzi",
    game: "Rainbow Six Siege",
    viewers: "92K viewers",
    status: "LIVE",
  },

  {
    name: "Zen",
    game: "Rocket League",
    viewers: "31K viewers",
    status: "LIVE",
  },
    ].map((creator, i) => (
      <div
        key={i}
        className="
          rounded-2xl
          border
          border-white/[0.04]
          bg-[#111111]
          p-5
          hover:bg-white/[0.03]
          transition-all
          duration-300
        "
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xl sm:text-2xl font-black">
              {creator.name}
            </div>

            <div className="flex items-center gap-3 mt-2">
              <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/[0.04] text-sm text-white font-bold">
                {creator.game}
              </div>

              <div className="text-white/45">
                {creator.viewers}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/[0.06] border border-white/[0.08]">
            <div className="w-3 h-3 rounded-full bg-emerald-400 synced-pulse" />

            <div className="text-white font-black">
              {creator.status}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
            <div className="rounded-[20px] border border-white/[0.04] bg-[#111111] p-5 sm:p-8">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
    <div>
      <div className="uppercase tracking-[4px] text-white/40 text-sm">
        Global Competitive Rankings
      </div>

      <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black mt-3">
        Top Players Leaderboard
      </h2>
    </div>
<div
  className="
  h-11
  px-4
  rounded-2xl
  bg-white/[0.04]
  text-green-400
  font-bold
  inline-flex
  items-center
  justify-center
  synced-pulse
"
>
  UPDATED LIVE
</div>
    </div>
    <div className="overflow-hidden rounded-[20px] border border-white/[0.04]">
    <div className="grid grid-cols-[1.7fr_1.2fr_1fr_1fr] bg-white/[0.03] border-b border-white/[0.04] px-6 py-4 text-sm uppercase tracking-[3px] text-white/40 font-bold">
      <div>Player</div>
      <div>Game</div>
      <div>Rank Tier</div>
      <div>Win Rate</div>
    </div>

    {leaderboardPlayers.map(
  (player, i) => (
      <div
        key={i}
        className="
          grid
          grid-cols-[1.7fr_1.2fr_1fr_1fr]
          items-center
          px-6
          py-5
          border-b
          border-white/[0.04]
          hover:bg-white/[0.03]
          transition-all
          duration-300
        "
      >
        <div className="text-2xl font-black text-white">
          {player.username}
        </div>

        <div
  className={`
    text-lg
    font-black

    ${
      player.game === "Valorant"
        ? "text-red-300"

      : player.game === "CS2"
        ? "text-orange-300"

      : player.game === "Fortnite"
        ? "text-cyan-300"

      : player.game === "Rocket League"
        ? "text-blue-300"

      : player.game === "Apex Legends"
        ? "text-violet-300"

      : player.game === "Call of Duty"
        ? "text-green-300"

      : player.game === "Rainbow Six Siege"
        ? "text-yellow-300"

      : player.game === "League of Legends"
        ? "text-blue-400"

      : "text-white"
    }
  `}
>
  {player.game}
</div>

        
         <div className="text-white font-black">
  {player.rank}
</div>
        <div className="text-white font-black">
          {player.winrate}
        </div>
      </div>
                    ))}
  </div>
</div>

</div>

</div>

</div>
  );
}