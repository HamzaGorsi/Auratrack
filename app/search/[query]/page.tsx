import Link from "next/link";
import { prisma } from "@/lib/prisma";
export default async function SearchPage({
  params,
}: {
  params: Promise<{
    query: string;
  }>;
}) {
  const { query } =
    await params;

  const players =
  await prisma.player.findMany({
    where: {
      username: {
        contains: query,
        mode: "insensitive",
      },
    },

    take: 20,
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1200px] mx-auto px-6 pt-36 pb-20">
        <div className="text-white/40 uppercase tracking-[4px] text-sm">
          Search Results
        </div>

        <h1 className="text-5xl font-black mt-3">
          {query}
        </h1>

        <div className="mt-10 space-y-4">
          {players.map((player: any) => (
            <Link
              key={player.id}
              href={`/player/${player.platform}/${encodeURIComponent(
                player.username
              )}`}
              className="
  flex
  items-center
  justify-between

  rounded-2xl
  border
  border-white/[0.04]
  bg-white/[0.03]

  p-5

  hover:bg-white/[0.05]
  transition-all
"
            >
              <div className="text-xl font-black">
                {player.username}
              </div>

              <div>
  <img
    src={
      player.platform === "RIOT"
        ? "/platforms/riot.svg"
        : player.platform === "STEAM"
        ? "/platforms/steam.svg"
        : player.platform === "EPIC"
        ? "/platforms/epic.svg"
        : player.platform === "PSN"
        ? "/platforms/psn.svg"
        : player.platform === "XBOX"
        ? "/platforms/xbox.svg"
        : player.platform === "EA"
        ? "/platforms/ea.svg"
        : player.platform === "UBISOFT"
        ? "/platforms/ubisoft.svg"
        : "/platforms/battlenet.svg"
    }
    alt={player.platform}
    className="w-7 h-7"
  />
</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}