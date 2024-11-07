import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";

// export enum tableName {
//   technician = "service_technician",
// }

// export type supabaseAction = {
//   type: "READ_DATA" | "ADD_DATA" | "REMOVE_DATA" | "UPDATE_DATA";
//   table: tableName;
//   command: string;
//   row: {};
// };

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

// export async function supabaseManagement(action: supabaseAction) {
//   switch (action.type) {
//     case "READ_DATA": {
//       const { data, error } = await supabase.from(action.table).select(action.command);

//       if (error) {
//         console.log(error);
//       }

//       return data;
//     }

//     case "ADD_DATA": {
//       const { error } = await supabase.from(action.table).insert(action.row);
//       console.log(action.row);
//       if (error) {
//         console.log(error);
//       }

//       return true;
//     }

//     case "REMOVE_DATA": {
//       const { data, error } = await supabase.from(action.table).delete().eq("personal_nr", Number(action.command)).select();
//       if (error) {
//         console.log(error);
//       }
//       return data;
//     }
//   }

//console.log(data);
