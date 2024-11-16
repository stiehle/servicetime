import { useEffect, useReducer } from "react";

import { supabase } from "../../utils/supabase";
import "./Persons.scss";
// import { service_person, service_persons } from "../../types/person";
import userManagementReducer from "../../hooks/personManagementReducer";

function Persons() {
  // const [persons, setPersons] = useState<service_persons>([]);

  const [persons, personsDispatch] = useReducer(userManagementReducer, []);

  useEffect(() => {
    // checkUserLogIn();
    // fetchPersonData();
    //test();
    fetchPersonData();
    // test();
  }, []);

  // async function dummy() {
  //   console.log("dummy");
  //   return [];
  // }

  // "id, personal_nr,  first_name, last_name, technician-field_of_app(service_technician(first_name), field_of_app, field_of_application(type), note)",
  async function fetchPersonData() {
    // const { data, error } = await supabase.from("service_technician").select("*");
    const { data, error } = await supabase.from("service_technician").select("id, personal_nr,  first_name, last_name, technician_field_of_app(*)");

    if (error) {
      console.log(error);
    }

    if (data) {
      personsDispatch({ type: "INIT_PERSONS", person: data });
    } else return;

    console.log(data);
    // return data ?? [];
  }

  // function test() {
  //   personsDispatch({
  //     type: "ADD_PERSON",
  //     person: {
  //       id: 0,
  //       personal_nr: 0,
  //       first_name: "hi",
  //       last_name: "hi",
  //       technician_field_of_app: [],
  //     },
  //   });
  //   console.log(pers);
  //   // console.log(persons);
  // }

  return (
    <div className="person">
      {persons.map((person) => {
        return (
          <div key={person.id} className="person__item">
            <div className="person__name">{person.first_name + " " + person.last_name}</div>
            <div className="person__number">{person.id + ", " + person.personal_nr}</div>

            {person.technician_field_of_app &&
              person.technician_field_of_app.map((field) => {
                // console.log(":", field);
                return (
                  <div key={field.field_of_app & field.technician}>
                    <div>
                      <p>#{field.field_of_app}</p>
                    </div>
                    <h6>{field.note}</h6>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}

export default Persons;
