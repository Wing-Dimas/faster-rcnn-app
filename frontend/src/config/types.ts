export type AppConfig = {
  env: "local" | "staging" | "production";
  apiURL: string;
  port: number;
};
