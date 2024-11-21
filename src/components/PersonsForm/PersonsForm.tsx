import { useEffect, useState } from "react";
import { useFormInput } from "../../hooks/useFormInput";
import { ServicePerson } from "../../types/person";
import TextInput from "../Textinput/Textinput";

import "./PersonsForm.scss";
import { supabase } from "../../utils/supabase";

type PersonProp = {
  selectedPerson: ServicePerson;
};

type FieldOFApp = {
  id: number;
  type: string;
  note: string;
  checked: boolean;
};

function PersonsForm(person: PersonProp) {
  console.log(person);

  useEffect(() => {
    fetchFieldOfApplication();
  }, []);

  const [fieldOfApp, setFieldOfApp] = useState<FieldOFApp[]>([]);
  // const [fieldOfApp, setFieldOfApp] = useState<Tables<"field_of_application">[]>([]);

  const firstName = useFormInput(person ? person.selectedPerson.first_name : "", true);
  const lastName = useFormInput(person ? person.selectedPerson.last_name : "", true);
  const personalNr = useFormInput(person ? String(person.selectedPerson.personal_nr) : "", true);

  async function fetchFieldOfApplication() {
    // const { data, error } = await supabase.from("service_technician").select("*");
    const { data, error } = await supabase.from("field_of_application").select("*");

    if (error) {
      console.log(error);
    }

    if (data) {
      let fieldofApp: FieldOFApp[] = [];
      console.log(data);
      // setFieldOfApp(data);
      data.map((item) => {
        console.log(item, fieldOfApp);
        fieldofApp.push({ id: item.id, type: item.type, note: "", checked: false });

        //console.log();

        // setFieldOfApp([
        //   ...fieldOfApp,
        //   ...[{ id: item.id, type: item.type, note: "", checked: false }],
        // ]);
        // setFieldOfApp([...fieldOfApp, { id: item.id, type: item.type }]);
        // setFieldOfApp([{ id: item.id, type: item.type }], ...[]);
      });
      setFieldOfApp(fieldofApp);
      console.log(fieldOfApp);
    } else return;

    // console.log(data);
  }

  function fieldOfApplication() {
    console.log(person.selectedPerson.technician_field_of_app);
    return (
      <>
        {person.selectedPerson.technician_field_of_app.map((field, nr) => {
          return (
            <div key={field.field_of_app & nr} className="person-form__fieldofapp">
              <div className="person-form__wrapper">
                <p>{field.field_of_app}</p>
                {person.selectedPerson.field_of_application.map((x) => {
                  return (
                    x.id === field.field_of_app && (
                      <div key={x.id}>
                        <p>{x.type}</p>
                      </div>
                    )
                  );
                })}
                <p>{field.note}</p>
              </div>
              {/* {person.selectedPerson.field_of_application[2].type} */}
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div className="person-form">
      {/* {test()} */}
      <h2>Personendaten ändern</h2>
      <TextInput value={firstName.value} onChange={firstName.handleInputChangeEvent} error={firstName.error} id={firstName.value} name={"Vorname"} />
      <TextInput value={lastName.value} onChange={lastName.handleInputChangeEvent} error={lastName.error} id={lastName.value} name={"Nachname"} />
      <TextInput
        value={personalNr.value}
        onChange={personalNr.handleInputChangeEvent}
        error={personalNr.error}
        id={personalNr.value}
        name={"Personal Nummer"}
      />

      <h2>Einsatzbereiche</h2>
      <>{console.log(fieldOfApp)}</>
      <div>{fieldOfApplication()}</div>
    </div>
  );
}

export default PersonsForm;
