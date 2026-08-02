import { createClient } from "@supabase/supabase-js";
import { config } from "./config.js";

const options = { auth: { persistSession: false, autoRefreshToken: false } };

export const catalog = config.SUPABASE_URL && config.SUPABASE_PUBLISHABLE_KEY
  ? createClient(config.SUPABASE_URL, config.SUPABASE_PUBLISHABLE_KEY, options)
  : null;

export const admin = config.SUPABASE_URL && config.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY, options)
  : null;
