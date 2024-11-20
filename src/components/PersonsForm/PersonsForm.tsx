import { useState } from "react";
import { useFormInput } from "../../hooks/useFormInput";
import { service_person } from "../../types/person";
import TextInput from "../Textinput/Textinput";

import "./PersonsForm.scss";

type personProp = {
  selectedPerson: service_person;
};

function PersonsForm(person: personProp) {
  console.log(person);

  const [fieldOfApp, setFieldOfApp] = useState<{ nr: number; type: string; note: string; checked: boolean }[]>([]);

  const firstName = useFormInput(person ? person.selectedPerson.first_name : "", true);
  const lastName = useFormInput(person ? person.selectedPerson.last_name : "", true);
  const personalNr = useFormInput(person ? String(person.selectedPerson.personal_nr) : "", true);

  // function test() {
  //   if (person) {
  //     return (
  //       <>
  //         {/* <h3>OK</h3>
  //         <p>{person.selectedPerson.first_name}</p> */}
  //         <TextInput
  //           value={firstName.value}
  //           onChange={firstName.handleInputChangeEvent}
  //           error={firstName.error}
  //           id={String(person.selectedPerson.id)}
  //           name={"Vorname"}
  //         />
  //       </>
  //     );
  //   }
  //   return <h2>Hallo</h2>;
  // }

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
      <div>{fieldOfApplication()}</div>
    </div>
  );
}

export default PersonsForm;
