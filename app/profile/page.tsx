"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import PageWrapper from "@/components/PageWrapper";
export default function ProfilePage() {
    const [history, setHistory] = useState<any[]>([]);
    const { data: session } = useSession();
    const [editing, setEditing] =
  useState(false);

const [saving, setSaving] =
  useState(false)
  const [saved, setSaved] =
  useState(false);
  const [loading, setLoading] =
  useState(true);

const [bio, setBio] =
  useState(
    "Competitive player • AuraTrack Member"
  );

const [favoriteGame, setFavoriteGame] =
  useState("Valorant");

const [avatarUrl, setAvatarUrl] =
  useState("");

const [bannerUrl, setBannerUrl] =
  useState("");
  const [riotName, setRiotName] =
  useState("");

const [riotTag, setRiotTag] =
  useState("");
const [showRiotConnect, setShowRiotConnect] =
  useState(false);
const [connectingRiot, setConnectingRiot] =
  useState(false);
  const [connectedAccounts, setConnectedAccounts] =
  useState<any[]>([]);
  const [riotConnected, setRiotConnected] =
  useState(false);
    useEffect(() => {
  async function loadHistory() {
    const res = await fetch(
      "/api/profile/search-history"
    );
    const data = await res.json();

    setHistory(data);
  }

  loadHistory();
}, []);
useEffect(() => {
  async function loadProfile() {
    try {
      const res = await fetch(
        "/api/profile/me"
      );

      const data =
        await res.json();

      if (!data) {
        setLoading(false);
        return;
      }

      setBio(data.bio || "");

      setFavoriteGame(
        data.favoriteGame || ""
      );

      setAvatarUrl(
        data.avatarUrl || ""
      );

      setBannerUrl(
        data.bannerUrl || ""
      );

      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  loadProfile();
}, []);
useEffect(() => {
  async function loadAccounts() {
    const res = await fetch(
      "/api/profile/accounts"
    );

    const data =
      await res.json();

    setConnectedAccounts(data);
  }

  loadAccounts();
}, []);
async function saveProfile() {
  setSaving(true);
  const res = await fetch(
    "/api/profile/update",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        bio,
        favoriteGame,
        avatarUrl,
        bannerUrl,
      }),
    }
  );

  if (!res.ok) {
    toast.error(
  "Failed to save profile"
);

    return;
  }

  setTimeout(() => {
  setSaving(false);

  toast.success(
  "Profile updated!"
);

  setSaved(true);

  setTimeout(() => {
    setSaved(false);

    setEditing(false);
  }, 1000);
}, 1200);
}
if (loading) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-12 sm:pb-16">

        <div
          className="
            h-56
            rounded-[32px]
            bg-white/[0.03]
            synced-pulse
          "
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mt-6 sm:mt-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="
                h-40
                rounded-[20px]
                bg-white/[0.03]
                synced-pulse
              "
            />
          ))}
        </div>
      </div>
    </div>
  );
}
async function connectRiot() {
  if (!riotName || !riotTag) {
    toast.error(
      "Enter Riot ID"
    );

    return;
  }

  try {
    setConnectingRiot(true);

    const res = await fetch(
      `/api/riot/account?gameName=${riotName}&tagLine=${riotTag}`
    );

    const data =
      await res.json();

    if (!res.ok) {
      toast.error(
        data.error ||
          "Failed to connect Riot"
      );

      return;
    }

    setRiotConnected(true);
const refreshed =
  await fetch(
    "/api/profile/accounts"
  );

const refreshedData =
  await refreshed.json();

setConnectedAccounts(
  refreshedData
);
setTimeout(() => {
  setShowRiotConnect(false);

  setRiotConnected(false);

  setRiotName("");

    setRiotTag("");
}, 2500);

    toast.success("Riot account connected!");
  } catch {
    toast.error(
      "Connection failed"
    );
  } finally {
    setConnectingRiot(false);
  }
}
  return (
  <PageWrapper>
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
     <div className="absolute top-[-250px] left-[-250px] w-[700px] h-[700px] rounded-full bg-violet-500/10 blur-[180px]" />
<div className="absolute bottom-[-250px] right-[-250px] w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-[180px]" /> 
      <div className="relative z-10 w-full px-4 sm:px-6 pt-28 sm:pt-36 pb-12 sm:pb-16 overflow-x-hidden">
        {/* BACKGROUND GLOWS */}
<div
  className="
    h-72
    rounded-[36px]
    overflow-hidden
    border
    border-white/[0.08]
    bg-black
    relative
    mb-[-60px]
  "
>
  {bannerUrl ? (
    <img
      src={bannerUrl}
      alt="Banner"
      className="
        w-full
        h-full
        object-cover
      "
    />
  ) : (
    <div
      className="
        w-full
        h-full
        bg-gradient-to-br
        from-[#18181b]
        via-[#050505]
        to-black
      "
    />
  )}
  {/* GRADIENT OVERLAY */}
  <div
    className="
      absolute
      inset-0
      bg-gradient-to-t
      from-black
      via-black/50
      to-transparent
    "
  />
</div>
        {/* HERO */}
        <div
          className="
          relative 
          z-10
            rounded-[32px]
            border
            border-white/[0.08]
            bg-white/[0.06]
backdrop-blur-3xl
shadow-[0_8px_40px_rgba(255,255,255,0.03)]
            p-5 sm:p-8
          "
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

            <div className="flex items-center gap-4 sm:gap-5 min-w-0">
  {/* AVATAR */}
  <div
    className="
      w-20 h-20 sm:w-28 sm:h-28
      rounded-[20px]
      overflow-hidden
      bg-gradient-to-br
      from-violet-500/30
to-cyan-500/30
      flex
      items-center
      justify-center
      flex-shrink-0
    "
  >
    {avatarUrl ? (
      <img
        src={avatarUrl}
        alt="Avatar"
        className="
          w-full
          h-full
          object-cover
        "
      />
    ) : (
      <div className="text-4xl font-black">
        {session?.user?.username?.[0]?.toUpperCase() || "P"}
      </div>
    )}
  </div>
{/* USER INFO */}
  <div className="min-w-0">
    <div className="text-white/40 uppercase tracking-[4px] text-sm">
      AuraTrack Profile
    </div>

    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-2 leading-none break-words">
      {session?.user?.username}
    </h1>

    <div className="mt-2 text-white/50">
      {bio}
    </div>
  </div>
</div>
<button
  onClick={() =>
    setEditing(!editing)
  }
  className="
    w-full sm:w-auto
    h-12 sm:h-14
    px-6 sm:px-8
    rounded-2xl
    bg-violet-500/20
border
border-violet-400/20
backdrop-blur-xl
    font-black
    hover:bg-violet-500/30
hover:scale-[1.02]
    transition-all
    duration-300
  "
>
  {editing
    ? "Close Editor"
    : "Edit Profile"}
</button>
          </div>
        </div>
{editing && (
  <div
    className="
      mt-6
      rounded-[32px]
      border
      border-white/[0.08]
      bg-white/[0.04] backdrop-blur-3xl
      p-5 sm:p-8
    "
  >
    <div className="text-white/40 uppercase tracking-[4px] text-sm">
      Profile Customization
    </div>

    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-3">
      Edit Your Profile
    </h2>

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
      <div>
        <div className="text-white/40 text-sm mb-3">
          Bio
        </div>

        <textarea
          value={bio}
          onChange={(e) =>
            setBio(e.target.value)
          }
          className="
            w-full
            h-36
            rounded-2xl
            bg-white/[0.02]
            border
            border-white/[0.08]
            px-5
            py-4
            outline-none
            resize-none
          "
        />
      </div>

      <div className="space-y-5">
        <div>
          <div className="text-white/40 text-sm mb-3">
            Favorite Game
          </div>

          <input
            value={favoriteGame}
            onChange={(e) =>
              setFavoriteGame(
                e.target.value
              )
            }
            className="
              w-full
              h-14
              rounded-2xl
              bg-white/[0.02]
              border
              border-white/[0.08]
              px-5
              outline-none
            "
          />
        </div>

        <div>
          <div className="text-white/40 text-sm mb-3">
            Profile Picture
          </div>

          <input
            value={avatarUrl}
            onChange={(e) =>
              setAvatarUrl(
                e.target.value
              )
            }
            className="
              w-full
              h-14
              rounded-2xl
              bg-white/[0.02]
              border
              border-white/[0.08]
              px-5
              outline-none
            "
          />
          {avatarUrl && (
  <img
    src={avatarUrl}
    alt="Preview"
    className="
      w-20
      h-20
      rounded-2xl
      object-cover
      mt-4
      border
      border-white/[0.08]
    "
  />
)}
        </div>

        <div>
          <div className="text-white/40 text-sm mb-3">
            Banner URL
          </div>

          <input
            value={bannerUrl}
            onChange={(e) =>
              setBannerUrl(
                e.target.value
              )
            }
            className="
              w-full
              h-14
              rounded-2xl
              bg-white/[0.02]
              border
              border-white/[0.08]
              px-5
              outline-none
            "
          />
        </div>
      </div>
    </div>

    <button
  onClick={saveProfile}
  disabled={saving}
  className={`
    mt-8
    h-14
    px-8
    rounded-2xl
    font-black
    transition-all
    duration-300
    ${
      saving
  ? "bg-emerald-500/20 border border-emerald-400/20 backdrop-blur-xl scale-95 opacity-80"
  : saved
  ? "bg-emerald-500/20 border border-emerald-400/20 backdrop-blur-xl scale-[1.02]"
  : "bg-violet-500/20 border border-violet-400/20 backdrop-blur-xl hover:bg-violet-500/30 hover:scale-[1.02]"
    }
  `}
>
  {saving
  ? "Saving..."
  : saved
  ? "✓ Saved"
  : "Save Changes"}
</button>
  </div>
)}
        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mt-6 sm:mt-8">
          {[
            {
              label: "Tracked Accounts",
              value: "4",
            },
            {
              label: "Matches Analyzed",
              value: "1,284",
            },
            {
              label: "Favorite Game",
              value: favoriteGame,
            },
            {
              label: "Win Rate",
              value: "64%",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="
  rounded-[20px]
  border
  border-white/[0.08]
  bg-white/[0.05]
backdrop-blur-xl
shadow-[0_4px_20px_rgba(255,255,255,0.02)]
  p-6
  transition-all
  duration-300
  hover:border-white/[0.18]
  hover:shadow-[0_0_30px_rgba(99,102,241,0.12)]
"
            >
              <div className="text-white/40 uppercase tracking-[3px] text-xs">
                {item.label}
              </div>

              <div className="text-2xl sm:text-4xl font-black mt-3 sm:mt-4">
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-8">

          {/* CONNECTED ACCOUNTS */}
          <div
            className="
              rounded-[32px]
              border
              border-white/[0.08]
              bg-white/[0.05]
backdrop-blur-2xl
shadow-[0_8px_30px_rgba(255,255,255,0.02)]
              p-5 sm:p-8
            "
          >
            <div className="text-white/40 uppercase tracking-[4px] text-sm">
              Connected Platforms
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-3">
              Accounts
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:gap-4 mt-6 sm:mt-8">

  {[
  {
    key: "RIOT",
    label: "Riot Games",
    accent: "text-red-400",
    badge: "R",
  },
  {
    key: "STEAM",
    label: "Steam",
    accent: "text-sky-400",
    badge: "S",
  },
  {
    key: "EPIC",
    label: "Epic Games",
    accent: "text-white",
    badge: "E",
  },
].map((platform) => {

    const linkedAccount =
      connectedAccounts.find(
        (acc) =>
          acc.platform ===
platform.key
      );

    return (
      <div
        key={platform.key}
        className="
          min-h-16
          rounded-2xl
          border
          border-white/[0.08]
          bg-white/[0.04]
backdrop-blur-3xl
hover:border-white/[0.14]
transition-all
duration-300
          px-4 sm:px-6
          py-4
          flex
          flex-col
          sm:flex-row
          sm:items-center
          gap-3
          sm:justify-between
        "
      >
     <div className="flex items-center gap-3 min-w-0">
  <div
    className={`
      w-10 h-10 rounded-xl
      bg-white/[0.04] border border-white/[0.06]
      flex items-center justify-center
      font-black text-sm flex-shrink-0
      ${platform.accent}
    `}
  >
    {platform.badge}
  </div>

  <div className="min-w-0">
    <div className="font-bold text-white/90 truncate">
      {platform.label}
    </div>

    {linkedAccount ? (
      <div className="text-sm text-white/50 truncate mt-0.5">
        {linkedAccount.username}
        {linkedAccount.tagline
          ? `#${linkedAccount.tagline}`
          : ""}
      </div>
    ) : (
      <div className="text-sm text-white/30 mt-0.5">
        Not connected
      </div>
    )}
  </div>
</div>

        {linkedAccount ? (
          <button
            type="button"
            onClick={async () => {

              const res =
                await fetch(
                  "/api/profile/unlink",
                  {
                    method: "POST",

                    headers: {
                      "Content-Type":
                        "application/json",
                    },

                    body: JSON.stringify({
                      id:
                        linkedAccount.id,
                    }),
                  }
                );

              if (!res.ok) {
                toast.error(
                  "Failed to unlink"
                );

                return;
              }

              setConnectedAccounts(
                connectedAccounts.filter(
                  (acc) =>
                    acc.id !==
                    linkedAccount.id
                )
              );

              toast.success(
                "Account unlinked"
              );
            }}
            className="
              w-full sm:w-auto
              h-9
              px-4
              rounded-xl
              bg-red-500/10
              text-red-400
              hover:bg-red-500/20
              text-sm
              transition-all
              duration-300
            "
          >
            Unlink
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              if (
                platform.key ===
"RIOT"
              ) {
                setShowRiotConnect(
                  true
                );
              }
            }}
            className="
              w-full sm:w-auto
              h-10
              px-5
              rounded-xl
              bg-violet-500/20
border
border-violet-400/20
backdrop-blur-xl
hover:bg-violet-500/30
hover:scale-[1.02]
              text-sm
              font-bold
              transition-all
              duration-300
              disabled:opacity-40
            "
            disabled={platform.key !== "RIOT"}
          >
            {platform.key === "RIOT" ? "Link" : "Soon"}
          </button>
        )}
      </div>
    );
  })}
</div>
</div>
{/* RECENT ACTIVITY */}
          <div
            className="
              rounded-[32px]
              border
              border-white/[0.08]
              bg-white/[0.05]
backdrop-blur-2xl
shadow-[0_8px_30px_rgba(255,255,255,0.02)]
              p-5 sm:p-8
            "
          >
            <div className="text-white/40 uppercase tracking-[4px] text-sm">
            Games played
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-3">
              Library
            </h2>
<div className="space-y-4 mt-8">
  {[
  {
    game: "Valorant",
    platform: "RIOT",
  },
  {
    game: "Counter-Strike 2",
    platform: "STEAM",
  },
  {
    game: "Fortnite",
    platform: "EPIC",
  },
].map((game, i) => (
  <div
  key={i}
  className="
    h-16
    rounded-2xl
    border
    border-white/[0.08]
    bg-white/[0.03]
    backdrop-blur-xl
    px-5
    flex
    items-center
    justify-between
    text-white/70
    transition-all
    duration-300
    hover:border-white/[0.18]
    hover:bg-white/[0.05]
  "
>
    <div>
      {game.game}
    </div>

    <div className="text-white/30 text-sm">
      {game.platform}
    </div>
  </div>
))}
</div>
            
          </div>
        </div>
      </div>
        </div>
        {showRiotConnect && (
  <div
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/70
      backdrop-blur-md
      p-4
    "
  >
    <div
      className="
        w-full
        max-w-xl
        rounded-[32px]
        border
        border-white/[0.08]
        bg-white/[0.04] backdrop-blur-3xl
        p-5 sm:p-8
      "
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-white/40 uppercase tracking-[4px] text-sm">
            Riot Integration
          </div>

          <h2 className="text-2xl sm:text-4xl font-black mt-2">
            Connect Account
          </h2>
        </div>

        <button
          type="button"
          onClick={() =>
            setShowRiotConnect(
              false
            )
          }
          className="
            w-10
            h-10
            rounded-xl
            bg-white/[0.05]
            hover:bg-white/[0.08]
            transition-all
            duration-300
          "
        >
          ✕
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 sm:mt-8">
        <input
          placeholder="Riot Name"
          value={riotName}
          onChange={(e) =>
            setRiotName(
              e.target.value
            )
          }
          className="
            h-14
            rounded-2xl
            bg-white/[0.02]
            border
            border-white/[0.08]
            px-5
            outline-none
          "
        />

        <input
          placeholder="Tag"
          value={riotTag}
          onChange={(e) =>
            setRiotTag(
              e.target.value
            )
          }
          className="
            h-14
            rounded-2xl
            bg-white/[0.02]
            border
            border-white/[0.08]
            px-5
            outline-none
          "
        />
      </div>

      <button
        onClick={connectRiot}
        disabled={connectingRiot}
        className="
          mt-6
          w-full
          h-14
          rounded-2xl
          bg-violet-500/20
border
border-violet-400/20
backdrop-blur-xl
hover:bg-violet-500/30
          font-black
hover:scale-[1.02]
          transition-all
          duration-300
        "
      >
        {connectingRiot
          ? "Connecting..."
          : "Connect Riot"}
      </button>
    </div>
  </div>
)}
  </PageWrapper>
);
} 