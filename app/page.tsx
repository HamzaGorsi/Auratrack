"use client";
import Image from "next/image";
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
import {
  FaUsers,
  FaChartLine,
  FaGamepad,
  FaShieldAlt,
} from "react-icons/fa";
export const dynamic = "force-dynamic";
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
  const [suggestions, setSuggestions] =
  useState<any[]>([]);
  const [platform, setPlatform] = useState("EPIC");
  const router = useRouter();
  async function deleteSearch(
  id: string
) {
  try {
    const res = await fetch(
  `/api/search-history/${id}`,
  {
    method: "DELETE",
  }
);

    if (!res.ok) return;

    setRecentSearches((prev) =>
      prev.filter(
        (search) =>
          search.id !== id
      )
    );
  } catch (error) {
    console.error(error);
  }
}
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
  const [news, setNews] =
  useState<any[]>([]);
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
async function loadTrendingPlayers() {
  try {
    const res = await fetch(
      "/api/trending",
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return;

    const data = await res.json();

    setTrendingPlayers(data);
  } catch {}
}

loadTrendingPlayers();
async function loadHomepageMatches() {
  try {
    const res = await fetch(
      "/api/recent-matches",
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return;

    const matches =
      await res.json();

    setHomepageMatches(matches);

  } catch {}
}
loadNews();
async function loadNews() {
  try {
    const res = await fetch("/api/news");

    const data = await res.json();

    if (Array.isArray(data)) {
      setNews(data);
      return;
    }

    if (Array.isArray(data?.results)) {
      setNews(data.results);
      return;
    }

    console.error("News API returned:", data);

    setNews([]);
  } catch (err) {
    console.error(err);
    setNews([]);
  }
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
  let detectedPlatform = platform;

if (username.includes("#")) {
  detectedPlatform = "RIOT";
}
else if (/^\d{17}$/.test(username)) {
  detectedPlatform = "STEAM";
}
else if (username.startsWith("epic:")) {
  detectedPlatform = "EPIC";
}
else if (username.startsWith("psn:")) {
  detectedPlatform = "PSN";
}
else if (username.startsWith("xbox:")) {
  detectedPlatform = "XBOX";
}
if (
  !username.includes("#") &&
  !/^\d{17}$/.test(username) &&
  !username.startsWith("epic:") &&
  !username.startsWith("psn:") &&
  !username.startsWith("xbox:")
) {
  router.push(
    `/search/${encodeURIComponent(
      username
    )}`
  );

  return;
}
setPlatform(detectedPlatform);
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
  platform: detectedPlatform,
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
  detectedPlatform
);

const provider =
  providers[
    detectedPlatform as keyof typeof providers
  ];

if (!provider) {
  console.error("Provider not found");
  return;
}
if (
  detectedPlatform === "RIOT" &&
  !username.includes("#")
) {
  setSearchError(
    "Use Riot ID format: name#tag"
  );

  setSearchLoading(false);

  return;
}
if (detectedPlatform === "RIOT") {
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
  `/player/${detectedPlatform}/${encodeURIComponent(
      username
    )}`
  );
} finally {
  setSearchLoading(false);
}
};
 return (
    <div className="relative min-h-screen overflow-x-hidden text-white">
        <div
  className="
    relative
    w-full
    px-4
    sm:px-6
    lg:px-10
    pt-10
    sm:pt-16
    pb-10
    sm:pb-16
  "
>
          <div
  className="
    relative

    min-h-[900px]

    grid
    lg:grid-cols-[1fr_1fr]

    items-center
  "
>
  <div className="relative z-10 max-w-[650px]">

    <div className="text-[#00AFFF] font-black tracking-[4px] uppercase">
      AuraTrack
    </div>

    <h1
  className="
  mt-4
  text-7xl
  md:text-[105px]
  font-black
  leading-[0.85]
"
>
      TRACK.
      <br />
      ANALYZE.
      <br />
      <span className="text-[#00AFFF]">
        DOMINATE.
      </span>
    </h1>

    <p
      className="
      mt-8
      text-xl
      text-white/70
      max-w-[500px]
    "
    >
      All your games.
      <br />
      All your stats.
      <br />
      One place.
    </p>

    <div className="flex gap-4 mt-8">

      <button
  onClick={() =>
    document
      .getElementById(
        "search-section"
      )
      ?.scrollIntoView({
        behavior: "smooth",
      })
  }
  className="
  h-14
  px-8
  rounded-2xl
  bg-[#00AFFF]
  shadow-[0_0_30px_rgba(0,175,255,.45)]
  hover:shadow-[0_0_45px_rgba(0,175,255,.75)]
  text-black
  font-black
  hover:scale-105
  transition-all
"
>
  Search Player
</button>

      <button
        className="
        h-14
        px-8
        rounded-2xl
        border
        border-white/10
        bg-white/5
        font-black
      "
      >
        Leaderboards
      </button>

    </div>

  </div>

  <div
   className="
    relative
    z-10

    flex
    justify-center
    items-center

    lg:-translate-y-15
    lg:-translate-x-31
  "
>
  <div
   className="
    relative
    w-[950px]
    h-[950px]

    flex
    items-center
    justify-center
  "
>
  {/* BIG GLOW */}
  <div
     className="
      absolute
      inset-0

      rounded-full

      bg-cyan-500/8

      blur-[180px]
    "
  />
{/* PORTAL SPACE */}
  <img
    src="/portal-space.png"
    alt=""
    className="
    absolute
    w-[640px]
    h-[640px]
    object-cover
    rounded-full
  "
  style={{
    filter:
      "brightness(0.55) contrast(1.35)",

    animation:
     "portalSpin 420s linear infinite"
  }}
/>
{/* CENTER LOGO */}
  <img
    src="/logo-center.png"
    alt="AuraTrack"

    className="
    absolute
    z-[2]

    w-[535px]
    h-auto

    object-contain
  "
/>
  {/* ROTATING RING */}
  <img
   src="/logo-ring.png"
   alt=""

   className="
    absolute
    z-[5]

    w-[800px]
    h-[800px]

    object-contain
    translate-x-[15px]
  "
  style={{
filter:
"brightness(.95) saturate(1.25)"
}}
  />
</div>

</div>

</div>
<div className="relative z-10 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4 mb-16">

  {[
    "VALORANT",
    "FORTNITE",
    "APEX",
    "CS2",
    "ROCKET LEAGUE",
    "R6 SIEGE",
    "VIEW ALL",
  ].map((game) => (
    <div
      key={game}
      className="
      rounded-[24px]
      border
      border-cyan-500/10

      bg-[#0D1728]

      hover:border-cyan-400/30
      hover:bg-[#122238]
      hover:shadow-[0_0_30px_rgba(0,175,255,0.15)]
      hover:-translate-y-1
      transition-all
      duration-300

      p-6
      cursor-pointer
    "
    >
      <div
      className="
      h-24
      w-full
      flex
      items-center
      justify-center
  "
>

  {game === "VALORANT" && (
    <img
      src="/games/valorant.svg"
      alt="Valorant"
      className="
      h-22
      w-auto
      opacity-90
      translate-y-[10px]
"
    />
  )}

  {game === "FORTNITE" && (
    <img
      src="/games/fortnite.svg"
      alt="Fortnite"
      className="
  h-35
  w-auto
  opacity-90
  translate-y-[10px]
"
    />
  )}

  {game === "APEX" && (
    <img
      src="/games/apex.svg"
      alt="Apex"
      className="
  h-20
  w-auto
  opacity-90
  translate-y-[10px]
"
    />
  )}

  {game === "CS2" && (
    <img
      src="/games/cs2.svg"
      alt="CS2"
      className="
  h-13
  w-auto
  opacity-90
  translate-y-[10px]
"
    />
  )}

  {game === "ROCKET LEAGUE" && (
    <img
      src="/games/rocketleague.svg"
      alt="Rocket League"
      className="
  h-35
  w-auto
  opacity-90
  translate-y-[10px]
"
    />
  )}

  {game === "R6 SIEGE" && (
    <img
      src="/games/rainbow6.svg"
      alt="Rainbow Six Siege"
      className="
  h-17
  w-auto
  opacity-90
  translate-y-[15px]
"
    />
  )}

  {game === "VIEW ALL" && (
  <div
    className="
      flex
      flex-col
      items-center
      justify-center

      h-full

      gap-4
    "
  >
    <div
      className="
        w-14
        h-14

        rounded-full

        bg-cyan-500/10
        border
        border-cyan-500/20

        flex
        items-center
        justify-center
      "
    >
      <span className="text-3xl">
        →
      </span>
    </div>

    <div
      className="
        text-sm
        uppercase
        tracking-[3px]
        text-white/80
        font-bold
      "
    >
      View All Games
    </div>
  </div>
)}

</div>
  <div
  className="
    text-[10px]
    uppercase
    tracking-[3px]
    text-white/30
    mt-4
  "
>
  Competitive Stats
</div>    
    </div>
  ))}
</div>
<div
  className="
    grid
    grid-cols-2
    lg:grid-cols-4
    gap-4
    mb-14
  "
>
  {[
    {
      label: "Players Tracked",
      value: platformStats?.trackedPlayers || 0,
    },
    {
      label: "Matches Analyzed",
      value: platformStats?.matchesAnalyzed || 0,
    },
    {
      label: "Games Supported",
      value: platformStats?.gamesSupported || 0,
    },
    {
      label: "Active Users",
      value: platformStats?.liveUsers || 0,
    },
  ].map((item) => (
    <div
      key={item.label}
      className="
        rounded-[24px]
        border
        border-cyan-500/10
        bg-[#08111D]
        p-8
      "
    >
      <div className="text-4xl font-black">
        {item.value.toLocaleString()}
      </div>

      <div className="text-white/50 mt-2">
        {item.label}
      </div>
    </div>
  ))}
</div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-14 items-stretch">
            <div
  id="search-section"
  className="
  min-h-0
  xl:min-h-[520px]

  rounded-[24px]

  border
  border-cyan-500/10

  bg-[#08111D]

  backdrop-blur-xl

  p-5
  sm:p-8

  shadow-[0_0_40px_rgba(0,175,255,0.08)]
"
>
              <div>
                <div className="mb-8">
  <div className="uppercase tracking-[4px] text-[#00AFFF] text-sm">
    Player Search
  </div>

  <h2 className="text-4xl font-black mt-3">
    Find Any Player
  </h2>

  <div className="text-white/50 mt-3">
    Search across supported games and platforms.
  </div>
</div>
                <input
                  value={username}
                  onChange={async (e) => {
  const value = e.target.value;

  setUsername(value);

  if (value.length < 3) {
    setSuggestions([]);
    return;
  }

  const res = await fetch(
    `/api/users/search?q=${encodeURIComponent(
      value
    )}`
  );

  const data = await res.json();

  setSuggestions(data);
}}
                  placeholder={
  platform === "RIOT"
    ? "Enter Riot ID (name#tag)"
    : "Search player username..."
}
                  className="w-full h-16 px-6 text-center rounded-2xl bg-[#0B1726] border-0 outline-none text-lg"
                />
{suggestions.length > 0 && (
  <div
    className="
      mt-3
      rounded-2xl
      border
      border-white/[0.04]
      bg-[#0B1726]
      overflow-hidden
    "
  >
    {suggestions.map((user) => (
      <button
        key={user.id}
        type="button"
        onClick={() => {
          setUsername(user.username);

          if (
            user.username.includes("#")
          ) {
            setPlatform("RIOT");
          }

          setSuggestions([]);
        }}
        className="
          w-full
          px-5
          py-4
          text-left
          hover:bg-white/[0.04]
          border-b
          border-white/[0.04]
        "
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="font-bold">
              {user.username}
            </div>

            <div className="text-xs text-white/40">
              {user.favoriteGame ||
                "Player"}
            </div>
          </div>
        </div>
      </button>
    ))}
  </div>
)}
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
className={`
min-h-[56px]
rounded-xl
flex
items-center
justify-center

transition-all
duration-300

border
border-cyan-500/10

${
  item.name === "EPIC"
    ? platform === item.name
      ? "bg-[#00AFFF] text-black"
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
      ? "bg-cyan-700 text-white"
      : "bg-cyan-700/20 text-cyan-300 hover:bg-cyan-700/35"

    : "bg-white/[0.03] text-white/60 hover:text-white hover:bg-white/[0.06]"
}
`}
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

  bg-[#00AFFF]

  text-black

  font-black
  text-lg

  hover:scale-[1.02]

  transition-all
  duration-300
 
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
      {recentSearches.map((search) => (
  <div
    key={search.id}
    className="relative"
  >
    <button
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

            : "bg-[#0B1726] border-white/[0.05]"
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

    <button
      onClick={(e) => {
        e.stopPropagation();
        deleteSearch(search.id);
      }}
      className="
        absolute
        -top-2
        -right-2

        w-6
        h-6

        rounded-full

        bg-red-500/20
        border
        border-red-500/20

        text-red-300
        text-xs
        font-black

        hover:bg-red-500/30
      "
    >
      ×
    </button>
  </div>
))}
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
    className="
rounded-[24px]

border
border-cyan-500/10

bg-[#08111D]

hover:border-cyan-400/30

transition-all
duration-300

p-5
"
  >
    <div className="text-[#00AFFF] text-xs uppercase tracking-[2px]">
      {item.label}
    </div>

    <div className="text-2xl sm:text-3xl font-black mt-3">
      {item.value}
    </div>
  </div>
))}
              </div>
            </div>

            <div
  className="
  min-h-0
  xl:min-h-[520px]

  rounded-[24px]

  border
  border-cyan-500/10

  bg-[#08111D]

  backdrop-blur-xl

  p-5
  sm:p-8

  shadow-[0_0_40px_rgba(0,175,255,0.08)]
"
>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="uppercase tracking-[4px] text-[#00AFFF] text-sm">
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
  bg-cyan-500/10
  text-[#00AFFF]
  border
  border-cyan-500/20
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
      border-cyan-500/10
      bg-[#08111D]
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
                      border-cyan-500/10
                      bg-[#08111D]
                      p-[14px]
                    `}
                  >
                    <div className="flex items-center gap-3 flex-wrap mb-4">
                      <div className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-[#00AFFF]">
                        {match.game}
                      </div>

                      <div className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs text-white/60">
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
            <div
  className="
  h-full

  rounded-[24px]

  border
  border-cyan-500/10

  bg-[#08111D]

  backdrop-blur-xl

  p-5
  sm:p-8

  shadow-[0_0_40px_rgba(0,175,255,0.08)]
"
>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="uppercase tracking-[4px] text-[#00AFFF] text-sm">
                    Esports & Gaming
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-3">
                    Latest News
                  </h2>
                </div>
              </div>

              <div className="space-y-5 max-h-[620px] overflow-y-auto pr-2">
                {(Array.isArray(news) ? news : []).slice(0, 6).map((article) => (
  <div
    key={article.link}
    className="
      rounded-[24px]
      border
      border-cyan-500/10
      bg-[#0B1626]
      backdrop-blur-xl
      p-5
      sm:p-6
      hover:border-cyan-400/30
      transition-all
      duration-300
    "
  >
    <div className="text-lg sm:text-2xl font-black leading-snug">
      {article.title}
    </div>

    <div className="text-white/65 leading-8 mt-5 text-[15px]">
      {article.description ||
        "No description available."}
    </div>

    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-block
        mt-5
        text-[#00AFFF]
        font-bold
        hover:underline
      "
    >
      Read Article →
    </a>
  </div>
))}
{news.length === 0 && (
  <div className="text-center py-10 text-white/40">
    No gaming news available.
  </div>
)}
              </div>
            </div>

            <div
  className="
  min-h-0
  xl:min-h-[760px]

  rounded-[24px]

  border
  border-cyan-500/10
  bg-[#08111D]
  backdrop-blur-xl

  p-5
  sm:p-8
"
>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 sm:mb-8">
                <div>
                  <div className="uppercase tracking-[4px] text-[#00AFFF] text-sm">
                    Competitive Events
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-3">
                    Tournaments
                  </h2>
                </div>

                <div className="h-11 px-4 rounded-2xl bg-cyan-500/10 text-[#00AFFF] border border-cyan-500/20 font-bold inline-flex items-center justify-center synced-pulse whitespace-nowrap">
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
                    className="
rounded-2xl
border
border-cyan-500/10
bg-[#0B1626]
backdrop-blur-xl

p-4
"
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

                      <div className="
px-5
py-3
rounded-2xl

bg-cyan-500/10
backdrop-blur-xl

border
border-cyan-500/20

font-black
">
                        {tournament.prize}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">
            <div
  className="
  rounded-[24px]

border
border-cyan-500/10

bg-[#08111D]
  backdrop-blur-xl

  p-5
  sm:p-8
"
>
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
    <div>
      <div className="uppercase tracking-[4px] text-[#00AFFF] text-sm">
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
  bg-cyan-500/10
text-[#00AFFF]

border
border-cyan-500/20
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
    {trendingPlayers.map((creator, i) => (
      <div
        key={i}
        className="
  rounded-2xl
  border
  border-cyan-500/10

bg-[#0B1626]
  backdrop-blur-xl

  p-5

  transition-all
  duration-300
"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xl sm:text-2xl font-black">
              {creator.username}
            </div>

            <div className="flex items-center gap-3 mt-2">
              <div className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-sm text-white font-bold">
                {creator.platform}
              </div>

              <div className="text-white/45">
                {`${creator._count.username} searches`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/[0.06] border border-white/[0.08]">
            <div className="w-3 h-3 rounded-full bg-emerald-400 synced-pulse" />

            <div className="text-white font-black">
              {"TRENDING"}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
            <div
  className="
  rounded-[24px]

border
border-cyan-500/10

bg-[#08111D]
  backdrop-blur-xl

  p-5
  sm:p-8
"
>
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
    <div>
      <div className="uppercase tracking-[4px] text-[#00AFFF] text-sm">
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
  bg-cyan-500/10
  text-[#00AFFF]
  border
  border-cyan-500/20
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
    <div className="overflow-hidden rounded-[24px] border border-cyan-500/10">
    <div className="grid grid-cols-[1.7fr_1.2fr_1fr_1fr] bg-[#0B1626] border-b border-white/[0.04] px-6 py-4 text-sm uppercase tracking-[3px] text-white/40 font-bold">
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