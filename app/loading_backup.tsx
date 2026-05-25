export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      <div className="relative flex flex-col items-center">
        {/* OUTER GLOW */}
        <div className="absolute w-44 h-44 rounded-full bg-violet-600/20" />

        {/* ROTATING RING */}
        <div
          className="
            w-32
            h-32
            rounded-full
            border-[3px]
            border-violet-500/20
            border-t-violet-400
            animate-spin
          "
          style={{
            animationDuration: "2.5s",
          }}
        />

        {/* INNER RING */}
        <div
          className="
            absolute
            w-20
            h-20
            rounded-full
            border
            border-violet-400/20
          "
        />

        {/* LOGO */}
        <div className="
  mt-10
  text-6xl
  font-black
  tracking-[10px]
  uppercase
  text-white
">
          AURATRACK
        </div>

        {/* SLOGAN */}
        <div className="mt-4 text-white/45 tracking-[6px] uppercase text-[11px] font-semibold">
          Track Your Aura.
        </div>
      </div>
    </div>
  );
}