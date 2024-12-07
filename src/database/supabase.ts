import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";
import { ServicePerson } from "../types/person";

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

export async function testPerson(id: number) {
  console.log("in testPerson", id);
}

// export function addNewPerson(newPerson: ServicePerson) {
//   // const { personsDispatch } = useContext(PersonContext);

//   const addPerson = async () => {
//     const { data, error } = await supabase
//       .from("service_technician")
//       .insert({ first_name: newPerson.first_name, last_name: newPerson.last_name, personal_nr: newPerson.personal_nr });
//     if (error) {
//       console.log(error);
//     }
//     console.log(data);
//   };

//   addPerson();
//   // personsDispatch({ type: "ADD_PERSON", person: newPerson });
// }

// export async function fetchData() {
//   const { data, error } = await supabase
//     .from("service_technician")
//     .select("id, personal_nr,  first_name, last_name, technician-field_of_app(service_technician(first_name), field_of_app, field_of_application(type), note)");

//   if (error) {
//     console.log(error);
//   }
//   console.log(data);
//   return data;
// }

//       "id, personal_nr,  first_name, last_name, technician-field_of_app(service_technician(first_name), field_of_app, field_of_application(type), note)",
//     row: { personal_nr: 1018, first_name: "Duke", last_name: "Power" },
