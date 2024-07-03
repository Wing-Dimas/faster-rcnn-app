import { createLocalConfig } from "./envs/local";
import { createProdConfig } from "./envs/prod";

export const appConfig = getConfig();

function getConfig() {
  switch (import.meta.env.VITE_APP_ENV) {
    case "local":
      return createLocalConfig();
    case "production":
      return createProdConfig();
    default:
      throw new Error(`Invalid APP_ENV "${import.meta.env.VITE_APP_ENV}"`);
  }
}
