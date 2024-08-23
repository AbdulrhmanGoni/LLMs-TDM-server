import type { ClientSession } from "mongoose";
import { startSession } from "mongoose";

export default async function createTransactionSession(): Promise<ClientSession> {
  const session = await startSession();
  session.startTransaction();
  return session;
}
