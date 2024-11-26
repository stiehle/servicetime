import { ServicePerson } from "../types/person";
import { supabase } from "../utils/supabase";

export type PersonManagementState = ServicePerson[];

export type PersonMangementAction =
  | {
      type: "INIT_PERSONS";
      person: ServicePerson[];
    }
  | {
      type: "ADD_PERSON" | "REMOVE_PERSON" | "UPDATE_PERSON";
      person: ServicePerson;
    };

export default function userManagementReducer(prevState: PersonManagementState, action: PersonMangementAction) {
  let updatedState: ServicePerson[];
  // console.log(prevState);

  switch (action.type) {
    case "ADD_PERSON": {
      updatedState = [...prevState, action.person];
      break;
    }

    case "REMOVE_PERSON": {
      updatedState = prevState.filter((pers) => pers.id !== action.person.id);
      break;
    }

    case "UPDATE_PERSON": {
      updatedState = prevState.map((pers) => (pers.id === action.person.id ? action.person : pers));
      console.log(action.person);

      // test(action);

      // async function test(action: { person: ServicePerson }) {
      //   console.log("test");
      //   const { data, error } = await supabase.from("service_technician").update(action.person).eq("id", action.person.id).select();
      //   if (error) {
      //     console.log(error);
      //   }
      //   // return data;
      //   console.log(data);
      // }

      // const { data, error } = await supabase.from("service_technician").select("id, personal_nr,  first_name, last_name, technician_field_of_app(*)");

      // export async function updateData(updatedData: { id: number; row: {} }) {
      //   const { data, error } = await supabase.from("tasklist").update(updatedData.row).eq("id", updatedData.id).select();
      //   if (error) {
      //     console.log(error);
      //   }
      //   return data;
      // }

      break;
    }

    case "INIT_PERSONS": {
      // updatedState = [...prevState, ...action.person];
      updatedState = [...action.person];
      // console.log(updatedState);
      break;
    }

    default: {
      updatedState = prevState;

      break;
    }
  }

  return updatedState;
}
