import {
  Provider,
} from "./types";

export const apexProvider: Provider = {
  async searchPlayer(username) {
    try {
      const res = await fetch(
        `/api/apex/player?username=${encodeURIComponent(
          username
        )}`
      );

      if (!res.ok) {
        return null;
      }

      const data =
        await res.json();

      return {
        username:
          data.username,

        platform:
          "APEX",

        avatar:
          data.avatar || "",

        level:
          data.level || 0,

        rank:
          data.rank || "Unknown",
      };
    } catch {
      return null;
    }
  },

  async getMatches(
    username
  ) {
    try {
      const res = await fetch(
        `/api/apex/matches?username=${encodeURIComponent(
          username
        )}`
      );

      if (!res.ok) {
        return [];
      }

      return await res.json();
    } catch {
      return [];
    }
  },
};