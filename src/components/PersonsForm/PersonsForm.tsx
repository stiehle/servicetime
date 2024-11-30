import { useContext, useEffect, useState } from "react";
import { useFormInput } from "../../hooks/useFormInput";
import { ServicePerson } from "../../types/person";
import TextInput from "../Textinput/Textinput";

import "./PersonsForm.scss";
import { supabase } from "../../utils/supabase";

import { IconContext } from "react-icons";
import { FaRegCheckCircle, FaRegTrashAlt } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { PersonContext } from "../../context/PersonContext";
import { useNavigate } from "react-router-dom";
import { MdCancel, MdSaveAlt } from "react-icons/md";

type PersonProp = {
  person: ServicePerson | null;
};

type FieldOFApp = {
  id: number;
  type: string;
  note: string;
  checked: boolean;
};

function PersonsForm({ person }: PersonProp) {
  useEffect(() => {
    fetchFieldOfApplication();
    // console.log(person);
  }, []);

  const navigate = useNavigate();
  // console.log(person);

  const [fieldOfApp, setFieldOfApp] = useState<FieldOFApp[]>([]);

  const { personsDispatch } = useContext(PersonContext);

  const firstName = useFormInput(person ? person.first_name : "", true);
  const lastName = useFormInput(person ? person.last_name : "", true);
  const personalNr = useFormInput(person ? String(person.personal_nr) : "", true);

  function isValidInputs(): boolean {
    const isFirstNameValid = firstName.validateInput(firstName.value);
    const isLastNameValid = lastName.validateInput(lastName.value);
    const isPersonalNrValid = personalNr.validateInput(personalNr.value);

    return isFirstNameValid && isLastNameValid && isPersonalNrValid;
  }

  function checkPersonFieldOfApplication(id: number) {
    // console.log(id);
    if (person) {
      const found = person.tech_field.find((item) => {
        return item.field_of_app === id;
      });

      if (found) {
        if (found.note) {
          return { note: found.note, checked: true };
        } else {
          return { note: "", checked: true };
        }
      } else {
        return { note: "", checked: false };
      }
    } else return { note: "", checked: false };

    //  console.log(found);
  }

  async function fetchFieldOfApplication() {
    const newFieldOfApp: FieldOFApp[] = [];
    // const { data, error } = await supabase.from("service_technician").select("*");
    const { data, error } = await supabase.from("field_of_application").select("*");

    if (error) {
      console.log(error);
    }

    if (data) {
      data.map((item) => {
        const check = checkPersonFieldOfApplication(item.id);
        newFieldOfApp.push({ id: item.id, type: item.type, note: check.note, checked: check.checked });
      });
    } else return;
    setFieldOfApp(newFieldOfApp);
  }

  function containerClick(id: number) {
    // console.log("click", id);
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

      //console.log(found);
    }
    // console.log(found, fieldOfApp);
    setFieldOfApp(newField);
  }

  function savePersonData() {
    // console.log("save");
    // console.log(person);
    // console.log(fieldOfApp);

    if (isValidInputs()) {
      function createFieldOfApp(newPerson: ServicePerson) {
        fieldOfApp.forEach((item) => {
          // console.log(item);
          if (item.checked) {
            newPerson.tech_field.push({ note: item.note, technician: newPerson.id, field_of_app: item.id });
          }
        });
      }

      if (person) {
        const newPerson: ServicePerson = { ...person };

        // console.log("new", newPerson);
        newPerson.tech_field = [];

        createFieldOfApp(newPerson);

        newPerson.first_name = firstName.value;
        newPerson.last_name = lastName.value;
        newPerson.personal_nr = Number(personalNr.value);

        console.log("new", newPerson);

        personsDispatch({ type: "UPDATE_PERSON", person: newPerson });

        // console.log("save Update Person");

        // console.log(updatePersons);
        navigate("/");
      } else {
        const newPerson: ServicePerson = {
          id: Math.random(),
          first_name: firstName.value,
          last_name: lastName.value,
          personal_nr: Number(personalNr.value),
          tech_field: [],
        };

        createFieldOfApp(newPerson);
        personsDispatch({ type: "ADD_PERSON", person: newPerson });

        console.log("save New Person");

        navigate("/");
      }
    }
  }

  function cancelForm() {
    navigate("/");
  }

  function deleteButton() {
    if (person) {
      const question = confirm("Soll diese Person wirklich gelöscht werden");
      if (question) {
        personsDispatch({ type: "REMOVE_PERSON", person: person });
        navigate("/");
      }
    } else {
      cancelForm();
    }
  }

  function fieldOfApplication() {
    //  console.log(person.technician_field_of_app);
    return (
      <div className="fieldofapplication">
        <div className="fieldofapplication__header">
          <h2>Einsatzbereiche</h2>
        </div>

        {fieldOfApp.map((fields) => {
          return (
            <div key={fields.id}>
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
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <IconContext.Provider value={{ size: "25px" }}>
      <div className="person-form">
        <div className="person-form__menu">
          {person ? (
            <div className="person-form__menu-wrapper">
              <h2>Personendaten ändern </h2>
            </div>
          ) : (
            <div className="person-form__menu-wrapper">
              <h2>Neue Person hinzufügen</h2>
            </div>
          )}

          <div className="person-form__menu-wrapper">
            <FaRegTrashAlt className="person-form__delete-button" onClick={deleteButton} />
            <MdCancel className="person-form__cancel-button" onClick={cancelForm} />
          </div>
        </div>

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

        <button className={"person-form__button"} onClick={savePersonData}>
          <MdSaveAlt />
          <h3>Speichern</h3>
        </button>
      </div>
    </IconContext.Provider>
  );
}

export default PersonsForm;
