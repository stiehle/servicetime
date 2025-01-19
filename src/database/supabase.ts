import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";

export const supabase = createClient<Database>(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ACCESS_TOKEN);

export async function signInWithPassword() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: import.meta.env.VITE_EMAIL,
    password: import.meta.env.VITE_PASSWORD,
  });

  if (error) {
    console.log(error);
    return false;
  } else {
    return data;
  }
}

export async function checkUser() {
  const { data } = await supabase.auth.getSession();
  return data;
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut();
  return error;
}
