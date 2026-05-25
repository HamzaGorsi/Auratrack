export function calculateRank(
  kd: number,
  wins: number,
  games: number
) {
  if (games < 5) {
    return "Unranked";
  }

  if (kd >= 5 && wins >= 50) {
    return "Predator";
  }

  if (kd >= 4) {
    return "Master";
  }

  if (kd >= 3) {
    return "Diamond";
  }

  if (kd >= 2) {
    return "Platinum";
  }

  if (kd >= 1.5) {
    return "Gold";
  }

  if (kd >= 1) {
    return "Silver";
  }

  return "Bronze";
}

export function rankColor(rank: string) {
  switch (rank) {
    case "Predator":
      return "from-red-500 to-orange-500";

    case "Master":
      return "from-pink-500 to-violet-500";

    case "Diamond":
      return "from-cyan-400 to-blue-500";

    case "Platinum":
      return "from-emerald-400 to-green-500";

    case "Gold":
      return "from-yellow-400 to-orange-400";

    case "Silver":
      return "from-gray-300 to-gray-500";

    case "Bronze":
      return "from-orange-700 to-orange-900";

    default:
      return "from-zinc-500 to-zinc-700";
  }
}