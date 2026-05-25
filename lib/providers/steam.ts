import {
  Match,
  PlayerProfile,
  Provider,
} from "./types";

export const steamProvider: Provider = {
  async searchPlayer(username) {
    return {
      username,
      platform: "STEAM",
      avatar: "",
      level: 145,
    };
  },

  async getMatches(username) {
    return [];
  },
};