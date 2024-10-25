declare module "bun" {
  interface Env {
    PORT: string;
    DB_URL: string;
    CLIENT_ORIGIN: string;
    MUTE_LOGS: string;
    TESTING_USER_ID: string;
    HF_AUTH_REDIRECT_URL: string;
    HF_CLIENT_SECRET: string;
    HF_CLIENT_ID: string;
  }
}
