import { riotProvider } from "./riot";
import { steamProvider } from "./steam";

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

  EPIC: placeholderProvider,
  PSN: placeholderProvider,
  XBOX: placeholderProvider,
  EA: placeholderProvider,
  UBISOFT: placeholderProvider,
  "BATTLE.NET": placeholderProvider,
};