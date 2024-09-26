declare module "bun" {
  interface Env {
    PORT: string;
    DB_URL: string;
    CLIENT_ORIGIN: string;
  }
}
