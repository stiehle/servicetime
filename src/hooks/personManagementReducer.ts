import { ServicePerson } from "../types/person";
import { supabase } from "../database/supabase";

// type TechField = {
//   field_of_app: number;
//   note: string | null;
//   technician: number;
// };

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

  // function slicePersonData(person: ServicePerson) {
  //   const { id, first_name, last_name, personal_nr } = person;

  //   const newPerson = {
  //     id: id,
  //     personal_nr: personal_nr,
  //     first_name: first_name,
  //     last_name: last_name,
  //   };
  //   // console.log(newPerson);

  //   const { tech_field } = person;
  //   // console.log(tech_field);

  //   return { newPerson, tech_field };
  // }

  // async function removeFieldOfApp(personId: number, field: number) {
  //   // console.log("remove", personId);

  //   const { error } = await supabase.from("tech_field").delete().eq("technician, field_of_app", personId).in("field_of_app", [field]);

  //   if (error) {
  //     console.log(error);
  //   }
  //   // console.log(data);
  // }

  // const { error } = await supabase.from("tech_field").delete().eq("technician, field_of_app", personId).in("field_of_app", [2]);

  // async function removeFieldsOfApp(personId: number) {
  //   console.log("remove", personId);

  //   const { error } = await supabase.from("tech_field").delete().eq("technician", personId).in("field_of_app", [1, 2, 3, 4]);
  //   if (error) {
  //     console.log(error);
  //   }
  //   // console.log(data);
  // }

  // const writeNewFieldsOfApp = (technician_field_of_app: { field_of_app: number; note: string | null; technician: number }[]) => {
  //   technician_field_of_app.map(async (fieldOfApp) => {
  //     const { data, error } = await supabase.from("technician_field_of_app").insert(fieldOfApp);
  //     if (error) {
  //       console.log(error);
  //     }
  //     console.log(data);
  //   });
  // };

  // const writeNewFieldOfApp = (field: FieldOfApp) => {
  //   console.log("write", field);
  //   async () => {
  //     const { data, error } = await supabase.from("technician_field_of_app").insert(field);
  //     if (error) {
  //       console.log(error);
  //     }
  //     console.log(data);
  //   };
  // };

  // async function writeNewFieldOFApp(field: TechField) {
  //   const { error } = await supabase.from("tech_field").upsert({
  //     field_of_app: field.field_of_app,
  //     technician: field.technician,
  //     note: field.note,
  //   });
  //   if (error) {
  //     console.log(error);
  //   }
  //   // console.log(data);
  // }

  switch (action.type) {
    case "ADD_PERSON": {
      console.log("add Person");
      updatedState = [...prevState, action.person];
      console.log(updatedState, action.person);
      // updatedState = prevState;

      // const addPerson = async () => {
      //   const { data, error } = await supabase
      //     .from("service_technician")
      //     .insert({ first_name: action.person.first_name, last_name: action.person.last_name, personal_nr: action.person.personal_nr });
      //   if (error) {
      //     console.log(error);
      //   }
      //   console.log(data);
      // };

      // addPerson();

      break;
    }

    case "REMOVE_PERSON": {
      updatedState = prevState.filter((pers) => pers.id !== action.person.id);
      console.log("remove", action.person);

      // const removePerson = async () => {
      //   const { data, error } = await supabase.from("service_technician").delete().eq("id", action.person.id).select();
      //   if (error) {
      //     console.log(error);
      //   }
      //   console.log(data);
      // };

      // removePerson();

      break;
    }

    case "UPDATE_PERSON": {
      updatedState = prevState.map((pers) => (pers.id === action.person.id ? action.person : pers));
      // console.log(updatedState, action.person);

      // let x = [{ ...action.person.technician_field_of_app }];
      // console.log(x);

      // const { newPerson, tech_field } = slicePersonData(action.person);
      // console.log(newPerson, tech_field);

      // const prevPerson = prevState.find((person) => {
      //   return person.id === action.person.id;
      // });

      // if (prevPerson) {
      //   let array1: number[] = [];
      //   let array2: number[] = [];
      //   prevPerson.tech_field.map((field) => {
      //     console.log("#", field.field_of_app);
      //     array1.push(field.field_of_app);
      //   });

      //   tech_field.map((selectedField) => {
      //     array2.push(selectedField.field_of_app);
      //   });

      //   console.log(array1, array2);
      //   let difference = array1.filter((x) => !array2.includes(x));
      //   let intersection = array1.filter((x) => array2.includes(x));
      //   let symDifference = array1.filter((x) => !array2.includes(x)).concat(array2.filter((x) => !array1.includes(x)));
      //   console.log(difference, intersection, symDifference);
      // }

      // const updatePerson = async () => {
      //   const { error } = await supabase.from("service_technician").update(newPerson).eq("id", newPerson.id).select();
      //   if (error) {
      //     console.log(error);
      //   }
      // };

      // if (prevPerson) {
      //   let arrayPrev: number[] = [];
      //   let arraySelected: number[] = [];

      //   prevPerson.tech_field.map((field) => {
      //     // console.log("#", field.field_of_app);
      //     arrayPrev.push(field.field_of_app);
      //   });
      //   tech_field.map((selectedField) => {
      //     // console.log("**", selectedField.field_of_app);
      //     arraySelected.push(selectedField.field_of_app);
      //   });

      //   let symDifference = arrayPrev.filter((x) => !arraySelected.includes(x)).concat(arraySelected.filter((x) => !arrayPrev.includes(x)));
      //   console.log(arrayPrev, arraySelected, symDifference);
      //   //   console.log(difference, intersection, symDifference);

      //   symDifference.map((x) => {
      //     if (arrayPrev.includes(x)) {
      //       console.log("delete", x);
      //       removeFieldOfApp(newPerson.id, x);
      //     }

      //     if (arraySelected.includes(x)) {
      //       console.log("write", x);
      //       writeNewFieldOFApp({
      //         field_of_app: x,
      //         technician: newPerson.id,
      //         note: "new",
      //       });
      //     }
      //   });
      // }

      // updatePerson();

      // let tempTechnicianFieldOfApp: FieldOfApp[] = [...technician_field_of_app];

      // removeFieldsOfApp(newPerson.id);
      // removeFieldsOfApp(field.technician, field.field_of_app);

      // const test = tech_field.map((field, nr) => {
      //   console.log(nr, field);

      //   writeNewFieldOFApp(field);
      //   console.log("write!");
      // });

      // test;
      // dev = false;

      // technician_field_of_app = [];

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
