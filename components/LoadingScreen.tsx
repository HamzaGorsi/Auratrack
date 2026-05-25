"use client";

export default function LoadingScreen() {
  return (
    <div
      className="
        fixed
        inset-0
        z-[999]
        flex
        items-center
        justify-center
        overflow-hidden
        bg-black/95
      "
    >
      {/* BACKGROUND GLOW */}
      <div
        className="
          absolute
          w-[500px]
          h-[500px]
          rounded-full
          bg-violet-600/20
          synced-pulse
        "
      />

      {/* LOADER */}
      <div className="relative z-10 flex items-center justify-center">
        {/* OUTER RING */}
        <div
          className="
            absolute
            w-44
            h-44
            rounded-full
            border
            border-violet-400/70
            shadow-[0_0_30px_rgba(139,92,246,0.35)]
            animate-spin
          "
          style={{
            animationDuration: "3s",
          }}
        />

        {/* MIDDLE RING */}
        <div
          className="
            absolute
            w-32
            h-32
            rounded-full
            border-2
            border-emerald-300/80
            shadow-[0_0_25px_rgba(52,211,153,0.35)]
            animate-spin
          "
          style={{
            animationDirection:
              "reverse",

            animationDuration: "2s",
          }}
        />

        {/* INNER GLOW */}
        <div
          className="
            absolute
            w-20
            h-20
            rounded-full
            bg-gradient-to-br
            from-violet-500
            to-emerald-400
            opacity-70
            synced-pulse
          "
        />

        {/* ENERGY CORE */}
        <div className="relative flex items-center justify-center">
          {/* CENTER GLOW */}
          <div
            className="
              absolute
              w-20
              h-20
              rounded-full
              bg-violet-500/30             
              synced-pulse
            "
          />

          {/* DIAMOND CORE */}
          <div
            className="
              relative
              w-10
              h-10
              rotate-45
              rounded-[10px]
              bg-gradient-to-br
              from-violet-400
              via-white
              to-emerald-400
              synced-pulse
            "
          />

          {/* ORBIT PARTICLES */}
          <div
            className="
              absolute
              w-28
              h-28
              animate-spin
            "
            style={{
              animationDuration: "2s",
            }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-violet-400 shadow-[0_0_15px_rgba(139,92,246,1)]" />

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,1)]" />
          </div>
        </div>
      </div>
    </div>
  );
}