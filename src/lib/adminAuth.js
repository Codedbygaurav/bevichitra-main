import { cookies } from "next/headers";
import { verify } from "./auth";

export function requireAdmin() {
  const cookieStore = cookies();

  const value = cookieStore.get("admin-auth")?.value;
  const signature = cookieStore.get("admin-sign")?.value;

  if (!value || !signature) {
    return false;
  }

  // ✅ structure: value = "username|timestamp"
  const [username, timestamp] = value.split("|");

  if (!username || !timestamp) {
    return false;
  }

  // ✅ expiry check (1 day)
  const age = Date.now() - Number(timestamp);
  if (age > 24 * 60 * 60 * 1000) {
    return false;
  }

  // ✅ signature verify
  if (!verify(value, signature)) {
    return false;
  }

  return true;
}