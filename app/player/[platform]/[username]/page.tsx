"use client";

import { use, useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import { useSession } from "next-auth/react";
import { getProvider } from "@/lib/providers/getProvider";
import PerformanceChart from "@/components/PerformanceChart";
import { toast } from "sonner";

const rankStyles: any = {
  Predator:
    "from-red-500 to-orange-500 text-white",

  Master:
    "from-pink-500 to-violet-500 text-white",

  Diamond:
    "from-cyan-400 to-blue-500 text-white",

  Platinum:
    "from-emerald-400 to-green-500 text-white",

  Gold:
    "from-yellow-400 to-orange-400 text-black",

  Silver:
    "from-gray-300 to-gray-500 text-black",

  Bronze:
    "from-orange-700 to-orange-900 text-white",

  Unranked:
    "from-zinc-600 to-zinc-800 text-white",
};

export default function PlayerPage({
  params,
}: {
  params: Promise<{
    platform: string;
    username: string;
  }>;
}) {
  const resolvedParams = use(params);
  const platform = resolvedParams.platform;

const username = decodeURIComponent(
  resolvedParams.username
);
const provider =
  getProvider(platform);

  const { data: session } =
    useSession();

  const [data, setData] =
    useState<any>(null);
const [providerProfile, setProviderProfile] =
  useState<any>(null);
  const [liveMatches, setLiveMatches] =
  useState<any[]>([]);
  const [loading, setLoading] =
    useState(true);

  const [notFound, setNotFound] =
    useState(false);

  const [kills, setKills] =
    useState("");

  const [deaths, setDeaths] =
    useState("");

  const [won, setWon] =
    useState(true);

  const [bio, setBio] =
    useState("");

  const [
    favoriteGame,
    setFavoriteGame,
  ] = useState("");

  const [bannerUrl, setBannerUrl] =
    useState("");

  async function loadPlayer() {
    setLoading(true);
    setNotFound(false);

    try {
      const res = await fetch(
        `/api/player/${resolvedParams.platform}/${encodeURIComponent(resolvedParams.username)}`,
        {
          cache: "no-store",
        }
      );

      let json: any;

      try {
        json = await res.json();
      } catch {
        setNotFound(true);
        return;
      }

      if (!res.ok || !json?.player) {
        toast.error(json?.error || "Player not found");
        setNotFound(true);
        return;
      }

      setData(json);

      if (platform === "RIOT") {
        setProviderProfile({
          username:
            json.player.username ?? username,
          platform: "RIOT",
          rank: json.player.rank ?? "Unranked",
          level: json.player.elo ?? 0,
          avatar: json.player.card ?? "",
          puuid: json.player.puuid ?? null,
        });

        setLiveMatches(json.matches ?? []);
      } else if (provider) {
        try {
          const profile =
            await provider.searchPlayer(
              username
            );

          setProviderProfile(profile);

          const providerMatches =
            await provider.getMatches(
              username
            );

          setLiveMatches(
            providerMatches?.length
              ? providerMatches
              : json.matches ?? []
          );
        } catch {
          setLiveMatches(json.matches ?? []);
        }
      }

      setBio(json.player.bio || "");
      setFavoriteGame(
        json.player.favoriteGame || ""
      );
      setBannerUrl(
        json.player.bannerUrl ||
          json.player.card ||
          ""
      );
    } catch (error) {
      console.error(error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }

  async function saveProfile() {
    await fetch("/api/profile", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username:
          resolvedParams.username,

        platform:
          resolvedParams.platform,

        bio,
        favoriteGame,
        bannerUrl,
      }),
    });

    loadPlayer();
  }

  async function addMatch() {
    const res = await fetch(
      "/api/match",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          username:
            resolvedParams.username,

          platform:
            resolvedParams.platform,

          kills: Number(kills),

          deaths: Number(deaths),

          wins: won ? 1 : 0,
        }),
      }
    );

    if (!res.ok) {
      toast.error("Failed to add match");
      return;
    }

    await fetch("/api/player", {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        username:
          resolvedParams.username,

        platform:
          resolvedParams.platform,

        kills: Number(kills),

        deaths: Number(deaths),

        wins: won ? 1 : 0,
      }),
    });

    setKills("");

    setDeaths("");

    loadPlayer();
  }

  useEffect(() => {
    loadPlayer();
  }, []);

  // LOADING
  if (loading) {
  return <LoadingScreen />;
}

  // NOT FOUND
  if (notFound) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6">
        <div className="max-w-[700px] text-center">
          <div className="text-5xl sm:text-8xl mb-6">🎮</div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black">
            Player Not Found
          </h1>

          <p className="text-white/45 text-base sm:text-xl mt-4 sm:mt-6 leading-relaxed">
            This player profile does not exist yet on the platform.
          </p>
        </div>
      </div>
    );
  }

  const { player, matches } = data;

const displayedMatches =
  liveMatches.length > 0
    ? liveMatches
    : matches;

  const achievements =
    player.achievements || [];

  const isOwner =
    session?.user?.username ===
    player.username;

  return (
  <div className="min-h-screen overflow-x-hidden text-white">
    {/* BACKGROUND */}
<div className="fixed inset-0 z-0 overflow-hidden">
  {/* TOP BLUE GLOW */}
  <div
    className="
      absolute
      top-[-200px]
      left-[-200px]
      w-[700px]
      h-[700px]
      rounded-full
      bg-blue-900/20
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
      bg-emerald-900/20
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
    <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-10">
      {/* PLAYER HERO */}
      <div
        className="
          relative
          overflow-hidden
          rounded-[32px]
          border
          border-white/[0.04]
          bg-black
          p-5 sm:p-8
          mb-8
        "
      >
        {/* BACKGROUND GLOW */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#18181b]/10 via-transparent to-black/10" />

        <div className="relative z-10">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
            {/* LEFT */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 min-w-0">
              {/* AVATAR */}
              <div
                className="
                  w-24 h-24 sm:w-32 sm:h-32
                  flex-shrink-0
                  rounded-[28px]
                  bg-gradient-to-br
                  from-[#18181b]
                  via-[#1F2937]
                  to-pink-500
                  flex
                  items-center
                  justify-center
                  text-3xl sm:text-5xl
                  font-black
                  shadow-[0_0_40px_rgba(99,102,241,0.45)]
                "
              >
                {player.username?.charAt(0)}
              </div>

              {/* INFO */}
              <div className="min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 synced-pulse" />

                  <div className="text-white font-bold uppercase tracking-[3px] text-sm">
                    ONLINE
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black leading-none break-words">
                  {providerProfile?.username ||
  player.username}
                </h1>

                <div className="flex items-center gap-4 mt-4">
                  <div
                    className="
                      px-4
                      py-2
                      rounded-2xl
                      bg-white/5
                      border
                      border-white/[0.04]
                      text-white/60
                      font-semibold
                    "
                  >
                    {player.platform}
                  </div>

                  <div
                    className="
                      px-4
                      py-2
                      rounded-2xl
                      bg-gradient-to-r
                      from-[#18181b]
                      to-black
                      font-bold
                    "
                  >
                    Current Rank
                    {providerProfile?.rank ||
  player.rank ||
  "Unranked"}

{providerProfile?.level
  ? ` • ${providerProfile.level} RR`
  : ""}
                  </div>
                </div>

                {/* BIO */}
                {bio && (
                  <div className="mt-5 max-w-[700px] text-white/60 text-lg">
                    {bio}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT */}
<div className="w-full xl:min-w-[340px]">
  {/* SOCIAL ACTIONS */}
  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-5">
    <button
  onClick={async () => {
    if (!session?.user?.username) {
      toast.error("Please log in first");
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
            player.username,
        }),
      }
    );

    const data =
      await res.json();

    if (!res.ok) {
      toast.error(
        data.error ||
          "Failed to send request"
      );
      return;
    }

    toast.success("Friend request sent!");
  }}
  className="
    flex-1
    h-14
    rounded-2xl
    bg-gradient-to-r
    from-[#18181b]
    to-black
    font-black
    hover:scale-[1.02]
    transition-all
    duration-300
  "
>
  Add Friend
</button>

    <button
      className="
        flex-1
        h-14
        rounded-2xl
        border
        border-white/[0.08]
        bg-white/[0.03]
        font-bold
        text-white/80
        hover:bg-white/[0.05]
        transition-all
        duration-300
      "
    >
      Follow
    </button>
  </div>

  <div className="grid grid-cols-2 gap-5">
              <div
                className="
                  rounded-[20px]
                  border
                  border-white/[0.04]
                  bg-[#161616]
                  p-4 sm:p-6
                "
              >
                <div className="text-white/40 text-sm uppercase tracking-[3px]">
                  KD Ratio
                </div>

                <div className="text-3xl sm:text-5xl font-black mt-3">
                  {player.kd}
                </div>
              </div>

              <div
                className="
                  rounded-[20px]
                  border
                  border-white/[0.04]
                  bg-[#161616]
                  p-4 sm:p-6
                "
              >
                <div className="text-white/40 text-sm uppercase tracking-[3px]">
                  Win Rate
                </div>

                <div className="text-3xl sm:text-5xl font-black mt-3 text-white">
                  {player.winrate}%
                </div>
              </div>

              <div
                className="
                  rounded-[20px]
                  border
                  border-white/[0.04]
                  bg-[#161616]
                  p-4 sm:p-6
                "
              >
                <div className="text-white/40 text-sm uppercase tracking-[3px]">
                  Matches
                </div>

                <div className="text-3xl sm:text-5xl font-black mt-3">
                  {player.matches || 0}
                </div>
              </div>

              <div
                className="
                  rounded-[20px]
                  border
                  border-white/[0.04]
                  bg-[#161616]
                  p-4 sm:p-6
                "
              >
                <div className="text-white/40 text-sm uppercase tracking-[3px]">
                  Accuracy
                </div>

                <div className="text-3xl sm:text-5xl font-black mt-3 text-slate-300">
                  {player.accuracy || 92}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ACHIEVEMENTS */}
<div
  className="
    mt-10
    rounded-[32px]
    border
    border-white/[0.04]
    bg-black
    p-5 sm:p-8
  "
>
  <div>
    <div className="uppercase tracking-[4px] text-white/40 text-sm">
      Progression
    </div>

    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-3">
      Achievements
    </h2>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
    {achievements.length > 0 ? (
      achievements.map(
        (achievement: any) => (
          <div
            key={achievement.id}
            className="
              rounded-[20px]
              border
              border-white/[0.04]
              bg-black/80
              p-6
            "
          >
            <div className="text-5xl">
              {achievement.icon}
            </div>

            <div className="text-2xl font-black mt-5">
              {achievement.title}
            </div>

            <div className="text-white/50 mt-3 leading-7">
              {achievement.description}
            </div>
          </div>
        )
      )
    ) : (
      <div className="text-white/40">
        No achievements unlocked yet.
      </div>
    )}
  </div>
</div>
      {/* EXTRA PLAYER INFO */}
<div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
  {[
    {
  label: "Peak Rank",
  value:
    providerProfile?.rank ||
    player.rank ||
    "Unranked",
},

    {
      label: "Main Game",
      value:
        platform === "RIOT"
          ? "Valorant"
          : "Competitive",
    },

    {
      label: "Current Streak",
      value:
        player.winrate > 60
          ? "W4"
          : "L2",
    },

    {
      label: "Last Match",
      value: "2h ago",
    },
  ].map((item) => (
    <div
      key={item.label}
      className="
        rounded-[20px]
        border
        border-white/[0.04]
        bg-black/80
        p-5
      "
    >
      <div className="text-white/35 uppercase tracking-[3px] text-xs">
        {item.label}
      </div>

      <div className="text-2xl font-black mt-3">
        {item.value}
      </div>
    </div>
  ))}
</div>
</div>
      {/* MATCHES */}
<div
  className="
  mt-10
    rounded-[32px]
    border
    border-white/[0.04]
    bg-black
    p-5 sm:p-8
  "
>
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
    <div>
      <div className="uppercase tracking-[4px] text-white/40 text-sm">
        Competitive History
      </div>

      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-3">
        Recent Matches
      </h2>
    </div>
  </div>

  <div className="space-y-4">
    {displayedMatches.map(
      (match: any) => (
        <div
          key={match.id}
          className={`
            relative
            overflow-hidden
            rounded-[28px]
            border
            border-white/[0.04]
            p-6
            transition-all
            duration-300
            hover:scale-[1.01]
            hover:border-white/20

            ${
              match.result === "VICTORY"
                ? "bg-emerald-500/[0.08]"
                : "bg-red-500/[0.08]"
            }
          `}
        >
          {/* SIDE GLOW */}
          <div
            className={`
              absolute
              left-0
              top-0
              bottom-0
              w-1

              ${
                match.result === "VICTORY"
                  ? "bg-emerald-400"
                  : "bg-red-400"
              }
            `}
          />

          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
            {/* LEFT */}
            <div className="flex items-center gap-5">
              {/* GAME ICON */}
              <div
                className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-gradient-to-br
                  from-[#18181b]
                  to-black
                  flex
                  items-center
                  justify-center
                  text-2xl
                  font-black
                  shadow-[0_0_25px_rgba(99,102,241,0.35)]
                "
              >
                {match.gameMode
                  ?.charAt(0) ||
                  "R"}
              </div>

              {/* INFO */}
              <div>
                <div className="text-2xl font-black">
                  {match.gameMode ||
                    "Ranked"}
                </div>

                <div className="text-white/45 mt-2">
                  {match.map ||
                    "Unknown Map"}
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <div
                    className={`
                      px-3
                      py-1
                      rounded-xl
                      text-sm
                      font-bold

                      ${
                        match.result === "VICTORY"
                          ? "bg-green-500/20 text-white"
                          : "bg-white/[0.06] text-white"
                      }
                    `}
                  >
                    {match.result}
                  </div>

                  <div className="text-white/30 text-sm">
                    {match.createdAt
                      ? new Date(
                          match.createdAt
                        ).toLocaleDateString()
                      : "Recently"}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-white/40 text-xs uppercase tracking-[3px]">
                  KILLS
                </div>

                <div className="text-4xl font-black mt-2">
                  {match.kills}
                </div>
              </div>

              <div className="text-center">
                <div className="text-white/40 text-xs uppercase tracking-[3px]">
                  DEATHS
                </div>

                <div className="text-4xl font-black mt-2">
                  {match.deaths}
                </div>
              </div>
              <div className="text-center">
  <div className="text-white/40 text-xs uppercase tracking-[3px]">
    ASSISTS
  </div>

  <div className="text-4xl font-black mt-2">
    {match.assists || 0}
  </div>
</div>

              <div className="text-center">
                <div className="text-white/40 text-xs uppercase tracking-[3px]">
                  KD
                </div>

                <div className="text-4xl font-black mt-2 text-slate-300">
                  {`${match.kills}/${match.deaths}/${match.assists || 0}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    )}
  </div>
</div>
    </div>
  </div>
);
}