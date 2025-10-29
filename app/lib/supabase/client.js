import { createBrowserClient } from "@supabase/ssr";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const service_key = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function createClient() {
  const supabase = createBrowserClient(url, key);
  return supabase;
}
