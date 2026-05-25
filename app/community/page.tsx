export default function CommunityPage() {
  const posts = new Array(10).fill(0);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1200px] mx-auto px-6 py-10">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-6xl font-black">
            Community
          </h1>

          <p className="text-white/45 mt-4 text-lg">
            Discover trending discussions and player highlights.
          </p>
        </div>

        {/* POSTS */}
        <div className="space-y-5">
          {posts.map((_, index) => (
            <div
              key={index}
              className="rounded-[20px] border border-white/[0.04] bg-white/[0.03] p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-violet-600" />

                <div>
                  <div className="text-xl font-bold">
                    Player#{index + 1}
                  </div>

                  <div className="text-white/45 text-sm">
                    Posted 2 minutes ago
                  </div>
                </div>
              </div>

              <p className="mt-5 text-white/60 leading-relaxed">
                Massive ranked grind session today.
                Reached a new personal best after a huge winning streak.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}