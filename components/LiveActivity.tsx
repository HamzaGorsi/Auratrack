"use client";

const activities = [
  {
    player: "ShadowX",
    action:
      "won a ranked Valorant match",
    rank: "+28 RR",
  },

  {
    player: "Nova",
    action:
      "reached Global Elite in CS2",
    rank: "TOP 1%",
  },

  {
    player: "Vortex",
    action:
      "started a Fortnite tournament",
    rank: "$2,000 Prize Pool",
  },

  {
    player: "Blaze",
    action:
      "achieved a 4.8 KD streak",
    rank: "12 Matches",
  },

  {
    player: "Phantom",
    action:
      "joined competitive queue",
    rank: "LIVE",
  },
];

export default function LiveActivity() {
  return (
    <div
      className="
        rounded-[20px]
        border
        border-white/[0.04]
        bg-white/[0.04] backdrop-blur-2xl
        p-5 sm:p-8
      "
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <div className="uppercase tracking-[4px] text-white/40 text-sm">
            Real-Time Platform Activity
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mt-3">
            Live Activity
          </h2>
        </div>

        <div
          className="
            flex
            items-center
            gap-3
            px-4
            py-2
            rounded-2xl
            bg-green-500/10
            border
            border-green-500/20
          "
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 synced-pulse" />

          <div className="text-white font-bold text-sm">
            LIVE
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {activities.map(
          (activity, index) => (
            <div
              key={index}
              className="
                rounded-2xl
                border
                border-white/[0.04]
                bg-white/[0.03]
backdrop-blur-xl
                p-4 sm:p-5
                hover:bg-white/[0.03]
                transition-all
                duration-300
              "
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="font-black text-lg">
                    {
                      activity.player
                    }
                  </div>

                  <div className="text-white/45 mt-1">
                    {
                      activity.action
                    }
                  </div>
                </div>

                <div
                  className="
                    px-4
                    py-2
                    rounded-xl
                    bg-gradient-to-r
                    bg-violet-500/15
border border-violet-400/20
                    text-sm
                    font-bold
                  "
                >
                  {activity.rank}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}