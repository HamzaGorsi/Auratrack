export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="animate-pulse space-y-8">
        <div className="h-20 rounded-3xl bg-white/[0.05]" />

        <div className="grid grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-40 rounded-3xl bg-white/[0.05]"
            />
          ))}
        </div>

        <div className="space-y-5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-36 rounded-3xl bg-white/[0.05]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}