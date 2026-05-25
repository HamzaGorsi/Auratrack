export default function LivePage() {
  const matches = new Array(8).fill(0);

  return (
    <div className="min-h-screen bg-blacktext-white">
      <div className="max-w-[1700px] mx-auto px-6 py-10">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-6xl font-black">
            Live Matches
          </h1>

          <p className="text-white/45 mt-4 text-lg">
            Watch ongoing competitive matches and esports events.
          </p>
        </div>

        {/* MATCH GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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
                      Valorant Championship
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

                <div className="mt-5 flex items-center justify-between text-sm text-white/60">
                  <span>120K Viewers</span>

                  <span>Round 18</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}