import { createContext, ReactNode, useEffect, useReducer } from "react";
import { ServicePerson, TechField } from "../types/person";
import { supabase } from "../database/supabase";
import userManagementReducer, { PersonManagementState } from "../hooks/personManagementReducer";

export const NewPersonContext = createContext<{
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

function PersonContextProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    fetchPersonsData();
  }, []);

  const [persons, personsDispatch] = useReducer(userManagementReducer, []);

  function slicePersonData(person: ServicePerson) {
    const { id, first_name, last_name, personal_nr, tech_field } = person;

    const newPerson = {
      id: id,
      personal_nr: personal_nr,
      first_name: first_name,
      last_name: last_name,
    };

    return { newPerson, tech_field };
  }

  function addNewPerson(newPerson: ServicePerson) {
    const addPerson = async () => {
      const { error } = await supabase.from("service_technician").insert({
        first_name: newPerson.first_name,
        last_name: newPerson.last_name,
        personal_nr: newPerson.personal_nr,
      });
      if (error) {
        console.log(error);
      }

      personsDispatch({ type: "ADD_PERSON", person: newPerson });
      fetchPersonsData();
    };

    addPerson();
  }

  function updatePerson(newPersonData: ServicePerson) {
    const { newPerson, tech_field } = slicePersonData(newPersonData);

    const prevPerson = persons.find((person) => {
      return person.id === newPerson.id;
    });

    async function removeFieldOfApp(personId: number, field: number) {
      const { error } = await supabase.from("tech_field").delete().eq("technician, field_of_app", personId).in("field_of_app", [field]);
      if (error) {
        console.log(error);
      }
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
    }

    if (prevPerson) {
      let arrayPrev: number[] = [];
      let arraySelected: number[] = [];

      prevPerson.tech_field.map((field) => {
        arrayPrev.push(field.field_of_app);
      });
      tech_field.map((selectedField) => {
        arraySelected.push(selectedField.field_of_app);
      });

      let symDifference = arrayPrev.filter((x) => !arraySelected.includes(x)).concat(arraySelected.filter((x) => !arrayPrev.includes(x)));

      symDifference.map((x) => {
        if (arrayPrev.includes(x)) {
          removeFieldOfApp(newPerson.id, x);
        }

        if (arraySelected.includes(x)) {
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
    };

    update();
  }

  function deletePerson(newPersonData: ServicePerson) {
    const deletePerson = async () => {
      const { error } = await supabase.from("service_technician").delete().eq("id", newPersonData.id).select();
      if (error) {
        console.log(error);
      }
    };
    personsDispatch({ type: "REMOVE_PERSON", person: newPersonData });
    deletePerson();
  }

  function fetchPersonsData() {
    const fetchPersons = async () => {
      const { data, error } = await supabase.from("service_technician").select("id, personal_nr,  first_name, last_name, tech_field(*)");

      if (error) {
        console.log(error);
      }

      if (data) {
        personsDispatch({ type: "INIT_PERSONS", person: data });
      } else return;
    };

    fetchPersons();
  }

  return <NewPersonContext.Provider value={{ addNewPerson, updatePerson, deletePerson, fetchPersonsData, persons }}>{children}</NewPersonContext.Provider>;
}

export default PersonContextProvider;
