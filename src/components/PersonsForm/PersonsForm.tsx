import { useEffect, useState } from "react";
import { useFormInput } from "../../hooks/useFormInput";
import { ServicePerson } from "../../types/person";
import TextInput from "../Textinput/Textinput";

import "./PersonsForm.scss";
import { supabase } from "../../utils/supabase";

import { IconContext } from "react-icons";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";

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
  // console.log(person);

  useEffect(() => {
    fetchFieldOfApplication();
  }, []);

  const [fieldOfApp, setFieldOfApp] = useState<FieldOFApp[]>([]);

  const firstName = useFormInput(person ? person.selectedPerson.first_name : "", true);
  const lastName = useFormInput(person ? person.selectedPerson.last_name : "", true);
  const personalNr = useFormInput(person ? String(person.selectedPerson.personal_nr) : "", true);

  function checkPersonFieldOfApplication(id: number) {
    console.log(id);
    const found = person.selectedPerson.technician_field_of_app.find((item) => {
      return item.field_of_app === id;
    });
    console.log(found);
    if (found) {
      if (found.note) {
        return { note: found.note, checked: true };
      } else {
        return { note: "", checked: true };
      }
    } else {
      return { note: "", checked: false };
    }
  }

  async function fetchFieldOfApplication() {
    // const { data, error } = await supabase.from("service_technician").select("*");
    const { data, error } = await supabase.from("field_of_application").select("*");

    if (error) {
      console.log(error);
    }

    if (data) {
      const fieldofApp: FieldOFApp[] = [];

      data.map((item) => {
        const check = checkPersonFieldOfApplication(item.id);
        fieldofApp.push({ id: item.id, type: item.type, note: check.note, checked: check.checked });
      });
      setFieldOfApp(fieldofApp);
    } else return;
  }

  function containerClick(id: number) {
    console.log("click", id);
    const newField: FieldOFApp[] = [...fieldOfApp];

    const found = newField.filter((item) => {
      return item.id === id;
    });

    if (found) {
      found.map((item) => {
        if (item.checked) {
          item.checked = false;
        } else {
          item.checked = true;
        }
      });

      console.log(found);
    }
    console.log(found, fieldOfApp);
    setFieldOfApp(newField);
  }

  function fieldOfApplication() {
    //  console.log(person.selectedPerson.technician_field_of_app);
    return (
      <div className="fieldofapplication">
        <div className="fieldofapplication__header">
          <h2>Einsatzbereiche</h2>
        </div>

        {fieldOfApp.map((fields) => {
          return (
            <div key={fields.id}>
              <IconContext.Provider value={{ size: "25px" }}>
                <div
                  className="fieldofapplication__container"
                  onClick={() => {
                    containerClick(fields.id);
                  }}>
                  <div className="fieldofapplication__item-icon">
                    {fields.checked ? (
                      <FaRegCheckCircle className="fieldofapplication__icon" />
                    ) : (
                      <FaRegCircleXmark className="fieldofapplication__icon--unchecked" />
                    )}
                  </div>
                  <div className="fieldofapplication__item">
                    <p>{fields.type}</p>
                  </div>
                  <div className="fieldofapplication__item-note">
                    {fields.note}
                    {/* {fields.checked && ""} */}
                  </div>
                </div>
              </IconContext.Provider>
            </div>
          );
        })}
      </div>
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
      {fieldOfApplication()}
    </div>
  );
}

export default PersonsForm;
