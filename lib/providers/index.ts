import { riotProvider } from "./riot";
import { steamProvider } from "./steam";

import { fortniteProvider } from "./fortnite";
import { apexProvider } from "./apex";
const placeholderProvider = {
  async searchPlayer(username: string) {
    return {
      username,
      platform: "COMING SOON",
    };
  },

  async getMatches() {
    return [];
  },
};

export const providers = {
  RIOT: riotProvider,
  STEAM: steamProvider,

  EPIC: fortniteProvider,
  PSN: placeholderProvider,
  XBOX: placeholderProvider,
  EA: apexProvider,
  UBISOFT: placeholderProvider,
  "BATTLE.NET": placeholderProvider,
};