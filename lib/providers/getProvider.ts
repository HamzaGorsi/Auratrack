import { providers } from "./index";

export function getProvider(platform: string) {
  return providers[
    platform as keyof typeof providers
  ];
}