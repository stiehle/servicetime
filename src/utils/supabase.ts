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

export async function fetchData() {
  const { data, error } = await supabase
    .from("service_technician")
    .select("id, personal_nr,  first_name, last_name, technician-field_of_app(service_technician(first_name), field_of_app, field_of_application(type), note)");

  if (error) {
    console.log(error);
  }
  console.log(data);
  return data;
}

//       "id, personal_nr,  first_name, last_name, technician-field_of_app(service_technician(first_name), field_of_app, field_of_application(type), note)",
//     row: { personal_nr: 1018, first_name: "Duke", last_name: "Power" },
