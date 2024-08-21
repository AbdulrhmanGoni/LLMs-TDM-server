declare module "bun" {
  interface Env {
    PORT: string;
    DB_URL: string;
  }
}
