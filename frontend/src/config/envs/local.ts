import { defineConfig } from "./../defineConfig";

export function createLocalConfig() {
  return defineConfig({
    env: "local",
    apiURL: import.meta.env.VITE_API_URL,
    port: import.meta.env.VITE_PORT as number,
  });
}
