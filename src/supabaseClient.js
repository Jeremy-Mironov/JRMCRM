import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wpjopfqehfakqiesjbas.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indwam9wZnFlaGZha3FpZXNqYmFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NDQ2NjAsImV4cCI6MjA3NjEyMDY2MH0.sBB056zaACg8vzLi7YuqabcMhDmjF2Na9KAS5RR9fKY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);