import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import ws from "ws";

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const supabsae = createClient(SUPABASE_URL, SUPABASE_KEY, {
  realtime: {
    transport: ws,
  },
});

const storage = supabsae.storage;

export default storage;
