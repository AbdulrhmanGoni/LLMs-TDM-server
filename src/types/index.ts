declare module "bun" {
  interface Env {
    PORT: string;
    DB_URL: string;
    CLIENT_ORIGIN: string;
    MUTE_LOGS: string;
    TESTING_USER_ID: string;
  }
}
