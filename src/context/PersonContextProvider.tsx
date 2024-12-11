import { createContext, ReactNode, useEffect, useReducer } from "react";
import { ServicePerson, TechField } from "../types/person";
import { supabase } from "../database/supabase";
import userManagementReducer, { PersonManagementState } from "../hooks/personManagementReducer";
// import { addNewPerson } from "../database/supabase";

export const newPersonContext = createContext<{
  persons: PersonManagementState;

  addNewPerson: (newPerson: ServicePerson) => void;
  updatePerson: (newPerson: ServicePerson) => void;
  deletePerson: (newPerson: ServicePerson) => void;
  fetchPersonsData: () => void;
}>({
  persons: [],
  addNewPerson: function () {},
  updatePerson: function () {},
  deletePerson: function () {},
  fetchPersonsData: function () {},
});

type Props = {
  children: ReactNode;
};

// type TechField = {
//   field_of_app: number;
//   note: string | null;
//   technician: number;
// };

// function PersonContextProvider({children}: {children: ReactNode}) {
function PersonContextProvider(props: Props) {
  // console.log(props.children);
  useEffect(() => {
    fetchPersonsData();
  }, []);

  const [persons, personsDispatch] = useReducer(userManagementReducer, []);

  function slicePersonData(person: ServicePerson) {
    const { id, first_name, last_name, personal_nr } = person;

    const newPerson = {
      id: id,
      personal_nr: personal_nr,
      first_name: first_name,
      last_name: last_name,
    };
    // console.log(newPerson);

    const { tech_field } = person;
    // console.log(tech_field);
    return { newPerson, tech_field };
  }

  function addNewPerson(newPerson: ServicePerson) {
    console.log("Neue Person und Dispatch");

    const addPerson = async () => {
      const { data, error } = await supabase.from("service_technician").insert({
        first_name: newPerson.first_name,
        last_name: newPerson.last_name,
        personal_nr: newPerson.personal_nr,
      });
      if (error) {
        console.log(error);
      }
      console.log(data);
      personsDispatch({ type: "ADD_PERSON", person: newPerson });
      fetchPersonsData();
    };

    addPerson();
  }

  function updatePerson(newPersonData: ServicePerson) {
    console.log("Neue Person und Dispatch");
    console.log(newPersonData);

    const { newPerson, tech_field } = slicePersonData(newPersonData);
    console.log(newPerson, tech_field);

    const prevPerson = persons.find((person) => {
      return person.id === newPerson.id;
    });

    async function removeFieldOfApp(personId: number, field: number) {
      // console.log("remove", personId);
      const { error } = await supabase.from("tech_field").delete().eq("technician, field_of_app", personId).in("field_of_app", [field]);
      if (error) {
        console.log(error);
      }
      // console.log(data);
    }

    async function writeNewFieldOFApp(field: TechField) {
      const { error } = await supabase.from("tech_field").insert({
        field_of_app: field.field_of_app,
        technician: field.technician,
        note: field.note,
      });
      if (error) {
        console.log(error);
      }
      // console.log(data);
    }

    console.log(prevPerson);

    if (prevPerson) {
      let arrayPrev: number[] = [];
      let arraySelected: number[] = [];

      prevPerson.tech_field.map((field) => {
        // console.log("#", field.field_of_app);
        arrayPrev.push(field.field_of_app);
      });
      tech_field.map((selectedField) => {
        // console.log("**", selectedField.field_of_app);
        arraySelected.push(selectedField.field_of_app);
      });

      let symDifference = arrayPrev.filter((x) => !arraySelected.includes(x)).concat(arraySelected.filter((x) => !arrayPrev.includes(x)));
      console.log(arrayPrev, arraySelected, symDifference);
      //   console.log(difference, intersection, symDifference);

      symDifference.map((x) => {
        if (arrayPrev.includes(x)) {
          console.log("delete", x);
          removeFieldOfApp(newPerson.id, x);
        }

        if (arraySelected.includes(x)) {
          console.log("write", x);
          writeNewFieldOFApp({
            field_of_app: x,
            technician: newPerson.id,
            note: "new",
          });
        }
      });
    }

    const update = async () => {
      const { error } = await supabase.from("service_technician").update(newPerson).eq("id", newPerson.id).select();
      if (error) {
        console.log(error);
      }

      personsDispatch({ type: "UPDATE_PERSON", person: newPersonData });
      // fetchPersonsData();
    };

    update();
  }

  function deletePerson(newPersonData: ServicePerson) {
    console.log(newPersonData);
    const deletePerson = async () => {
      const { data, error } = await supabase.from("service_technician").delete().eq("id", newPersonData.id).select();
      if (error) {
        console.log(error);
      }
      console.log(data);
    };
    personsDispatch({ type: "REMOVE_PERSON", person: newPersonData });
    deletePerson();
  }

  function fetchPersonsData() {
    // console.log("in fechtPersonsData");
    const fetchPersons = async () => {
      const { data, error } = await supabase.from("service_technician").select("id, personal_nr,  first_name, last_name, tech_field(*)");

      if (error) {
        console.log(error);
      }

      if (data) {
        personsDispatch({ type: "INIT_PERSONS", person: data });
      } else return;

      console.log(data);
    };

    fetchPersons();
  }

  return (
    <newPersonContext.Provider value={{ addNewPerson, updatePerson, deletePerson, fetchPersonsData, persons }}>{props.children}</newPersonContext.Provider>
  );
}

export default PersonContextProvider;
