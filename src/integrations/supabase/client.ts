// src/integrations/supabase/client.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://kzvxlkxjmdzodsxotoya.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6dnhsa3hqbWR6b2RzeG90b3lhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1MDg5OTMsImV4cCI6MjA3MTA4NDk5M30.WOma97Vdo6OGRXFA99I66HIC_q7UTyDFj47G891dRkw",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);