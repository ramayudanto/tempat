import { getSession } from "next-auth/react";

async function getValidSession(context: any) {
  const session = await getSession(context);

  if (!session || new Date(session?.expires) < new Date()) {
    return null; // Session is expired or doesn't exist
  }

  return session;
}
