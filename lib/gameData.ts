export type GameKey = "apex" | "fortnite" | "valorant" | "cod";

export const games = [
  {
    key: "apex",
    name: "Apex Legends",
    icon: "/icons/apex.svg",
    color: "from-red-500 to-orange-500",
    glow: "shadow-red-500/30",
  },
  {
    key: "fortnite",
    name: "Fortnite",
    icon: "/icons/fortnite.svg",
    color: "bg-black-500 to-cyan-400",
    glow: "shadow-blue-500/30",
  },
  {
    key: "valorant",
    name: "Valorant",
    icon: "/icons/valorant.svg",
    color: "from-green-500 to-emerald-400",
    glow: "shadow-green-500/30",
  },
  {
    key: "cod",
    name: "Call of Duty",
    icon: "/icons/cod.svg",
    color: "from-yellow-500 to-amber-400",
    glow: "shadow-yellow-500/30",
  },
];

export const gameStats: Record<
  GameKey,
  {
    kd: number;
    wins: number;
    matches: number;
    rank: string;
  }
> = {
  apex: { kd: 2.31, wins: 184, matches: 932, rank: "Diamond II" },
  fortnite: { kd: 1.85, wins: 120, matches: 800, rank: "Champion" },
  valorant: { kd: 1.42, wins: 95, matches: 540, rank: "Immortal" },
  cod: { kd: 1.9, wins: 210, matches: 1100, rank: "Platinum" },
};