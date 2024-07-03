import { defineConfig } from "./../defineConfig";

export function createProdConfig() {
  return defineConfig({
    env: "production",
    apiURL: import.meta.env.VITE_API_URL,
    port: import.meta.env.VITE_PORT as number,
  });
}
